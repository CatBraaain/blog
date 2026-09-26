import { expect } from "@playwright/test";

import { clickWithMotion, test } from "./support/recording-fixture";

test("toggles between dark and light and persists the choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const themeButton = page.locator("header button");
  const html = page.locator("html");
  const isDark = () => html.evaluate((el) => el.classList.contains("dark"));

  await expect.poll(isDark).toBe(true);

  await clickWithMotion(page, themeButton);
  await expect.poll(isDark).toBe(false);
  // Hold the light theme briefly so the recording can capture it.
  await page.waitForTimeout(600);

  await clickWithMotion(page, themeButton);
  await expect.poll(isDark).toBe(true);

  await page.reload();
  await expect.poll(isDark).toBe(true);
});
