import { expect, test } from "@playwright/test";

test("toggles between dark and light and persists the choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const themeButton = page.locator("header button");
  const html = page.locator("html");
  const isDark = () => html.evaluate((el) => el.classList.contains("dark"));

  await expect.poll(isDark).toBe(true);

  await themeButton.click();
  await expect.poll(isDark).toBe(false);

  await themeButton.click();
  await expect.poll(isDark).toBe(true);

  await page.reload();
  await expect.poll(isDark).toBe(true);
});
