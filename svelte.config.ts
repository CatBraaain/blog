import adapter from "@sveltejs/adapter-static";
import type { Config } from "@sveltejs/kit";
import type { Code, InlineCode, Root, Text } from "mdast";
import { mdsvex } from "mdsvex";
import visit from "unist-util-visit";

const config: Config = {
  kit: {
    adapter: adapter(),
    alias: {
      "$/*": "src/*",
      "$style/*": "src/lib/style/*",
      "$content/*": "content/*",
    },
  },
  preprocess: [
    mdsvex({
      extensions: [".svx", ".md"],
      smartypants: false,
      remarkPlugins: [
        () => (tree: Root) => {
          const escapeSign = (str: string) =>
            str
              .replace(/\{/g, "&#123;")
              .replace(/\}/g, "&#125;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
          visit(tree, "text", (node: Text) => {
            node.value = escapeSign(node.value);
          });
          visit(tree, "code", (node: Code) => {
            node.value = escapeSign(node.value);
          });
          visit(tree, "inlineCode", (node: InlineCode) => {
            node.value = escapeSign(node.value);
          });
        },
      ],
    }),
  ],
  extensions: [".svelte", ".svx", ".md"],
};

export default config;
