import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts|svelte)"],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/sveltekit",
  viteFinal: async (config) => {
    // post-module.ts reads content/*.md via import.meta.glob,
    // so the Storybook dev server must be allowed to serve them.
    config.server = config.server ?? {};
    config.server.fs = config.server.fs ?? {};
    config.server.fs.allow = [...(config.server.fs.allow ?? []), "content"];
    return config;
  },
};
export default config;
