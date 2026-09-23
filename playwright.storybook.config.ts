import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "storybook-tests",
  fullyParallel: true,
  reporter: process.env.CI ? "github" : "list",
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:6011",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "bunx storybook dev -p 6011 --ci --no-open",
    url: "http://localhost:6011",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
