import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vitest/config";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    {
      name: "fix-mdsvex-html",
      enforce: "pre",
      transform(code, id) {
        if (id.includes(".md")) {
          return {
            code: code.replace(/\{@html\s+`([\s\S]*?)`\s*\}/g, (_, content) => {
              return `${content}`;
            }),
            map: null,
          };
        }
      },
    },
  ],
  server: {
    fs: {
      allow: ["./content"],
    },
  },
});
