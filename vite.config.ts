import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vitest/config";
import { md2svelte } from "./vite-plugin-md2svelte";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tailwindcss(),
    md2svelte(),
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
});
