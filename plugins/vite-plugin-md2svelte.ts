import fs from "node:fs";
import { join } from "node:path";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { uneval } from "devalue";
import matter from "gray-matter";
import type { Element } from "hast";
import { h } from "hastscript";
import type { Code, InlineCode, Root, Text } from "mdast";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import { extendedTableHandlers, remarkExtendedTable } from "remark-extended-table";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { bundledLanguages, bundledLanguagesInfo, bundledThemes, createHighlighter } from "shiki";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Plugin } from "vite";
import { type PostMeta, postMetaSchema } from "../src/lib/post-meta";
import { parseMeta } from "./parse-meta";
import { remarkFenced } from "./remark-fenced";

const languageAliasMap = Object.fromEntries(
  bundledLanguagesInfo.flatMap(({ id, aliases }) => (aliases ?? []).map((alias) => [alias, id])),
);
const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: [
    ...Object.keys(bundledLanguages),
    ...["./shiki/shellsession.tm.json", "./shiki/ahk.tm.json", "./shiki/ahk2.tm.json"].map(
      (grammer) => JSON.parse(fs.readFileSync(join(import.meta.dirname, grammer), "utf8")),
    ),
  ],
});

export function md2svelte(): Plugin {
  return {
    name: "vite-plugin-md2svelte",
    async transform(code: string, id: string) {
      if (!id.endsWith(".md")) return;

      const { content, data: frontmatter } = matter(code);

      const file = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkExtendedTable)
        .use(remarkFenced)
        .use(remarkFlexibleMarkers)
        .use(remarkGfm)
        .use(remarkRehype, {
          handlers: {
            ...extendedTableHandlers,
          },
        })
        .use(rehypeShikiFromHighlighter, highlighter, {
          theme: "github-dark-default",
          transformers: [
            {
              name: "custom-html-postprocessor",
              root(node) {
                delete this.pre.properties.tabindex;

                const langId = this.options.lang;
                const resolvedLangId = languageAliasMap[langId] ?? langId;
                const meta = this.options.meta?.__raw ?? "";
                this.root.children = [
                  {
                    type: "element",
                    tagName: "CodeBlock",
                    properties: {
                      lang: resolvedLangId,
                      style: this.pre.properties.style,
                      ...Object.fromEntries(parseMeta(meta)),
                    },
                    children: [this.pre],
                  },
                ];
              },
            },
          ],
        })
        .use(rehypeEscapeForSvelte)
        .use(exportMeta, postMetaSchema.parse(frontmatter))
        .use(importImage)
        .use(importCustomComponent)
        .use(rehypeStringify, {
          allowDangerousHtml: true,
        })
        .process(content);
      const html = String(file);

      const svelte = `${html}`.trim();

      return {
        code: svelte,
        map: null,
      };
    },
  };
}

function rehypeEscapeForSvelte() {
  return (tree: Root) => {
    const escapeSign = (str: string) =>
      str.replace(/[{}]/g, (c) => {
        switch (c) {
          case "{":
            return '{"{"}';
          case "}":
            return '{"}"}';
          default:
            return c;
        }
      });

    visit(tree, "text", (node: Text) => {
      node.value = escapeSign(node.value);
    });
    visit(tree, "code", (node: Code) => {
      node.value = escapeSign(node.value);
    });
    visit(tree, "inlineCode", (node: InlineCode) => {
      node.value = escapeSign(node.value);
    });
  };
}

function exportMeta(frontmatter: PostMeta) {
  return (tree: any) => {
    const scriptNode = h(
      "script",
      { lang: "ts", context: "module" },
      `\nexport const meta = ${uneval(frontmatter)};\n`,
    );
    tree.children.unshift(scriptNode);
  };
}

function importImage() {
  return (tree: any) => {
    let scriptNode: any = null;
    visit(
      tree,
      {
        type: "element",
        tagName: "script",
      },
      (node) => {
        scriptNode = node;
      },
    );

    const imagePaths: string[] = [];
    visit(
      tree,
      {
        type: "element",
        tagName: "img",
      },
      (node) => {
        imagePaths.push(node.properties.src);
        node.type = "raw";
        node.value = `<img src={image${imagePaths.length}} alt="${node.properties.alt}">`;
      },
    );

    scriptNode.children[0].value =
      scriptNode.children[0].value +
      imagePaths.map((filePath, i) => `import image${i + 1} from "${filePath}";\n`).join("");
  };
}

function importCustomComponent() {
  return (tree: any) => {
    let scriptNode: any = null;
    visit(
      tree,
      {
        type: "element",
        tagName: "script",
      },
      (node) => {
        scriptNode = node;
      },
    );

    const customComponents: Set<string> = new Set();
    visit(
      tree,
      {
        type: "element",
        tagName: "CodeBlock",
      },
      (node) => {
        customComponents.add("CodeBlock");
      },
    );

    // scriptNode.children[0].value =
    //   scriptNode.children[0].value +
    //   costomComponents.map((filePath, i) => `import image${i + 1} from "${filePath}";\n`).join("");
    if (customComponents.size > 0) {
      scriptNode.children[0].value =
        scriptNode.children[0].value +
        `import CodeBlock from "$lib/components/CodeBlock.svelte";\n`;
    }
  };
}
