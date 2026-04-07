import type { Code, InlineCode, Root, Text } from "mdast";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import visit from "unist-util-visit";
import type { Plugin } from "vite";

export function md2svelte(): Plugin {
  return {
    name: "vite-plugin-md2svelte",
    async transform(code: string, id: string) {
      if (!id.endsWith(".md")) return;

      const file = await unified()
        .use(remarkParse)
        .use(escapeMarkdownContent)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(code);
      const html = String(file);

      const svelte = `<scripts></scripts>${html}`.trim();

      return {
        code: svelte,
        map: null,
      };
    },
  };
}

function escapeMarkdownContent() {
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
