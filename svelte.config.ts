import adapter from "@sveltejs/adapter-static";
import type { Config } from "@sveltejs/kit";
import { mdsvex } from "mdsvex";

const config: Config = {
  kit: {
    adapter: adapter(),
    alias: {
      "$/*": "src/*",
      "$style/*": "src/lib/style/*",
    },
  },
  preprocess: [mdsvex({ extensions: [".svx", ".md"] })],
  extensions: [".svelte", ".svx", ".md"],
};

export default config;
