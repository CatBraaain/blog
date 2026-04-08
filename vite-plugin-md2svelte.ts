import matter from "gray-matter";
import { h } from "hastscript";
import type { Code, InlineCode, Root, Text } from "mdast";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import {
  extendedTableHandlers,
  remarkExtendedTable,
} from "remark-extended-table";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Plugin } from "vite";

export function md2svelte(): Plugin {
  return {
    name: "vite-plugin-md2svelte",
    async transform(code: string, id: string) {
      if (!id.endsWith(".md")) return;

      const { content, data: frontmatter } = matter(code);

      const file = await unified()
        .use(remarkParse)
        .use(remarkEscapeMarkdownContent)
        .use(remarkDirective)
        .use(remarkDirective2CustomTag)
        .use(remarkExtendedTable)
        .use(remarkFlexibleMarkers)
        .use(remarkGfm)
        .use(remarkRehype, {
          handlers: {
            ...extendedTableHandlers,
          },
        })
        .use(addMetaScript, frontmatter)
        .use(rehypeStringify)
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

function remarkDirective2CustomTag() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective") {
        if (!node.data) node.data = {};
        const hast = h(node.name, node.attributes || {});
        node.data.hName = hast.tagName[0].toUpperCase() + hast.tagName.slice(1);
        node.data.hProperties = hast.properties;
      }
    });
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

function addMetaScript(meta: Record<string, any>) {
  return (tree: any) => {
    const scriptNode = h(
      "script",
      { lang: "ts", context: "module" },
      `export const meta = ${JSON.stringify(meta)};`,
    );
    tree.children.unshift(scriptNode);
  };
}
