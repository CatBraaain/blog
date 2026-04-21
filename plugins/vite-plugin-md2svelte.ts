import { uneval } from "devalue";
import matter from "gray-matter";
import { h } from "hastscript";
import remarkBreaks from "remark-breaks";
import { extendedTableHandlers, remarkExtendedTable } from "remark-extended-table";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Plugin } from "vite";
import { type PostMeta, postMetaSchema } from "../src/lib/post-meta";
import { rehypeCodeBlock } from "./rehype-code-block";
import { rehypeSveltify } from "./rehype-sveltify";
import { remarkFenced } from "./remark-fenced";

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
        .use(rehypeCodeBlock)
        .use(exportMeta, postMetaSchema.parse(frontmatter))
        .use(importImage)
        .use(importCustomComponent)
        .use(rehypeSveltify)
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
