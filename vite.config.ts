import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Icons from "unplugin-icons/vite";
import { md2svelte } from "vite-plugin-md2svelte";
import { defineConfig } from "vite-plus";

import { rehypeCodeBlock } from "./plugins/rehype-code-block";
import { remarkFenced } from "./plugins/remark-fenced";
import { postMetaSchema } from "./src/lib/post-meta";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tailwindcss(),
    md2svelte({
      frontmatterSchema: postMetaSchema,
      remarkPlugins: [remarkBreaks, remarkFenced, remarkGfm],
      rehypePlugins: [rehypeCodeBlock],
      customComponents: { CodeBlock: "$lib/components/CodeBlock.svelte" },
    }),
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
  ],
  server: {
    fs: {
      allow: ["./content"],
    },
  },
  assetsInclude: ["**/pagefind.js"],
  build: {
    rollupOptions: {
      external: ["/pagefind/pagefind.js"],
    },
  },
  fmt: {
    sortImports: true,
    sortPackageJson: {
      sortScripts: true,
    },
    svelte: true,
  },
  lint: {
    plugins: ["unicorn", "typescript", "oxc"],
    rules: {
      "unicorn/prefer-node-protocol": "warn",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          fix: {
            imports: "off",
            variables: "off",
          },
        },
      ],
    },
  },
});
