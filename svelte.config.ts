import adapter from "@sveltejs/adapter-static";
import type { Config } from "@sveltejs/kit";

const config: Config = {
  kit: {
    adapter: adapter({
      pages: "dist",
    }),
    alias: {
      "$/*": "src/*",
      "$style/*": "src/lib/style/*",
      "$content/*": "content/*",
    },
  },
  extensions: [".svelte", ".md"],
};

export default config;
