import { uneval } from "devalue";
import matter from "gray-matter";
import { h } from "hastscript";
import type { Code, InlineCode, Root, Text } from "mdast";
import rehypeStringify from "rehype-stringify";
import { extendedTableHandlers, remarkExtendedTable } from "remark-extended-table";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Plugin } from "vite";
import { type PostMeta, postMetaSchema } from "../src/lib/post-meta.js";
import { remarkFenced } from "./remark-fenced.js";

export function md2svelte(): Plugin {
  return {
    name: "vite-plugin-md2svelte",
    async transform(code: string, id: string) {
      if (!id.endsWith(".md")) return;

      const { content, data: frontmatter } = matter(code);

      const file = await unified()
        .use(remarkParse)
        .use(remarkEscapeMarkdownContent)
        .use(remarkExtendedTable)
        .use(remarkFenced)
        .use(remarkFlexibleMarkers)
        .use(remarkGfm)
        .use(remarkRehype, {
          handlers: {
            ...extendedTableHandlers,
          },
        })
        .use(addMetaScript, postMetaSchema.parse(frontmatter))
        .use(importReferencedImage)
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

function remarkEscapeMarkdownContent() {
  return (tree: Root) => {
    const escapeSign = (str: string) =>
      str.replace(/[{}<>]/g, (c) => {
        switch (c) {
          case "{":
            return '{"{"}';
          case "}":
            return '{"}"}';
          case "<":
            return '{"<"}';
          case ">":
            return '{">"}';
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

function addMetaScript(frontmatter: PostMeta) {
  return (tree: any) => {
    const scriptNode = h(
      "script",
      { lang: "ts", context: "module" },
      `\nexport const meta = ${uneval(frontmatter)};\n`,
    );
    tree.children.unshift(scriptNode);
  };
}

function importReferencedImage() {
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

