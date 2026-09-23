// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Icons from "unplugin-icons/vite";
import { md2svelte } from "vite-plugin-md2svelte";
import { defineConfig } from "vite-plus";
import { configDefaults } from "vitest/config";

import { rehypeCodeBlock } from "./plugins/rehype-code-block";
import { remarkFenced } from "./plugins/remark-fenced";
import { postMetaSchema } from "./src/lib/post-meta";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig({
  plugins: [
    tailwindcss(),
    md2svelte({
      frontmatterSchema: postMetaSchema,
      remarkPlugins: [remarkBreaks, remarkFenced, remarkGfm],
      rehypePlugins: [rehypeCodeBlock],
      customComponents: {
        CodeBlock: "$lib/components/CodeBlock.svelte",
      },
    }),
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
  ],
  server: {
    fs: {
      allow: ["./content", "./.pagefind-client"],
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
  test: {
    projects: [
      {
        extends: true,
        test: {
          // E2E specs in tests/ are run by Playwright, not vitest.
          // Storybook specs in storybook-tests/ are run by playwright.storybook.config.ts.
          exclude: [...configDefaults.exclude, "tests/**", "storybook-tests/**"],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
