import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Icons from "unplugin-icons/vite";
import { md2svelte } from "vite-plugin-md2svelte";
import { defineConfig } from "vitest/config";
import { rehypeCodeBlock } from "./plugins/rehype-code-block";
import { remarkFenced } from "./plugins/remark-fenced";
import { postMetaSchema } from "./src/lib/post-meta";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tailwindcss(),
    md2svelte({
      components: { CodeBlock: "$lib/components/CodeBlock.svelte" },
      remarkPlugins: [remarkBreaks, remarkFenced, remarkGfm],
      rehypePlugins: [rehypeCodeBlock],
      frontmatterSchema: postMetaSchema,
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
});
