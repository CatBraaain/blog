import { expect, test } from "@playwright/test";

const POST_TITLE = "タスクスケジューラからPycharmのPythonファイルを実行する";

test("filters posts by a search word", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const searchInput = page.getByPlaceholder("Search...");
  await searchInput.click();
  await searchInput.fill("Pycharm");

  await expect(page).toHaveURL(/\/\?q=Pycharm$/);

  const posts = page.locator("main ul li article");
  await expect(posts.filter({ hasText: POST_TITLE })).toHaveCount(1, { timeout: 15000 });
});

test("shows the empty state when filters match nothing", async ({ page }) => {
  // Every "Tech"-only tag (e.g. Python) is absent from the Life category,
  // so this client-side filter combination yields zero posts.
  await page.goto(`/?q=${encodeURIComponent("c:Life t:Python")}`);

  await expect(page.getByText("No articles found", { exact: true })).toBeVisible({
    timeout: 15000,
  });
});

test("filters posts by category", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("radio", { name: /^Tech / }).click();

  await expect(page).toHaveURL(/\/\?q=c:Tech$/);

  const metaBelt = page
    .locator("main ul li article")
    .first()
    .locator('[data-pagefind-ignore="all"]');
  await expect(metaBelt).toContainText("Tech", { timeout: 15000 });
});

test("filters posts by tag", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("radio", { name: /^Python / }).click();

  await expect(page).toHaveURL(/\/\?q=t:Python$/);

  const metaBelt = page
    .locator("main ul li article")
    .first()
    .locator('[data-pagefind-ignore="all"]');
  await expect(metaBelt).toContainText("Python", { timeout: 15000 });
});
