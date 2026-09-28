import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: process.env.CI ? "github" : [["list"], ["./tests/support/recording-reporter.ts"]],
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:4174",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "bun run build && bun run preview -- --port 4174 --strictPort",
    url: "http://localhost:4174",
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
