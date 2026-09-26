import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: process.env.CI ? "github" : [["list"], ["./tests/support/recording-reporter.ts"]],
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    // Record e2e runs locally; CI keeps only traces to avoid artifact bloat.
    video: process.env.CI ? "off" : "on",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "bun run build && bun run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
