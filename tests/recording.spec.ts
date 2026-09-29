import { expect } from "@playwright/test";

import { clickWithMotion, test } from "./support/recording-fixture";

// Recording scenarios defined by SPEC.md, the canonical source. One test per
// recorded video, walking through the spec steps in order at a pace a human
// can follow on video.
// Record at the full viewport size instead of Playwright's default 800px-wide scale.
test.use({ video: { mode: "on", size: { width: 1280, height: 720 } } });

const POST_SLUG = "20201002113048";
const POST_TITLE = "タスクスケジューラからPycharmのPythonファイルを実行する";

test.describe("recorded flows", () => {
  test("browse list, search, filters and post page", async ({ page }) => {
    // Step 1: home shows search, filters, 10 posts and pagination.
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(`Home | CatBraaain's Blog`);
    const searchInput = page.getByPlaceholder("Search...");
    await expect(searchInput).toBeVisible();
    await expect(page.getByRole("radio", { name: /^Tech / })).toBeVisible();
    await expect(page.getByRole("radio", { name: /^Python / })).toBeVisible();
    const posts = page.locator("main ul li article");
    await expect(posts).toHaveCount(10);
    const pagination = page.getByRole("navigation", { name: "pagination" }).first();
    await expect(pagination).toBeVisible();
    await page.waitForTimeout(800);

    // Step 2: the next page keeps 10 posts.
    const next = pagination.getByRole("link", { name: "Go to next page" });
    const previous = pagination.getByRole("link", { name: "Go to previous page" });
    await clickWithMotion(page, next);
    await expect(page).toHaveURL(/\/\?page=2$/);
    await expect(posts).toHaveCount(10);
    await page.waitForTimeout(800);

    // Step 3: previous returns to the first page.
    await clickWithMotion(page, previous);
    await expect(page).toHaveURL(/\/$/);
    await expect(posts).toHaveCount(10);
    await page.waitForTimeout(800);

    // Step 4: typing a word narrows the list to the Pycharm post.
    await clickWithMotion(page, searchInput);
    await searchInput.pressSequentially("Pycharm", { delay: 120 });
    await expect(page).toHaveURL(/\/\?q=Pycharm$/);
    await expect(posts.filter({ hasText: POST_TITLE })).toHaveCount(1, { timeout: 15000 });
    await page.waitForTimeout(800);

    // Step 5: opening the post shows its title.
    await clickWithMotion(page, posts.getByRole("link", { name: POST_TITLE }));
    await expect(page).toHaveURL(new RegExp(`/posts/${POST_SLUG}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(POST_TITLE);
    await page.waitForTimeout(400);

    // Step 6: scrolling shows the article body.
    await page.mouse.wheel(0, 720);
    await page.waitForTimeout(400);
    await page.mouse.wheel(0, 720);
    await page.waitForTimeout(800);

    // Step 7: going back restores the still-filtered list.
    await page.goBack();
    await expect(page).toHaveURL(/\/\?q=Pycharm$/);
    await expect(searchInput).toHaveValue("Pycharm");
    await expect(posts.filter({ hasText: POST_TITLE })).toHaveCount(1, { timeout: 15000 });
    await page.waitForTimeout(800);

    // Step 8: clearing the search restores the full list.
    await searchInput.fill("");
    await expect(page).toHaveURL(/\/$/);
    await expect(posts).toHaveCount(10, { timeout: 15000 });
    await page.waitForTimeout(800);

    // Step 9: the category filter narrows to Tech.
    await clickWithMotion(page, page.getByRole("radio", { name: /^Tech / }));
    await expect(page).toHaveURL(/\/\?q=c:Tech$/);
    await page.waitForTimeout(800);

    // Step 10: the tag filter switches, clearing the category selection.
    await clickWithMotion(page, page.getByRole("radio", { name: /^Python / }));
    await expect(page).toHaveURL(/\/\?q=t:Python$/);
    await expect(posts).toHaveCount(10, { timeout: 15000 });
    await page.waitForTimeout(800);
  });

  test("toggle theme and persist across reload", async ({ page }) => {
    // Step 1: home opens in the dark theme for a dark OS color scheme.
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const themeButton = page.locator("header button");
    const html = page.locator("html");
    const isDark = () => html.evaluate((el) => el.classList.contains("dark"));

    await expect.poll(isDark).toBe(true);
    await page.waitForTimeout(800);

    // Step 2: the header button switches to the light theme.
    await clickWithMotion(page, themeButton);
    await expect.poll(isDark).toBe(false);
    await page.waitForTimeout(800);

    // Step 3: the choice survives a reload.
    await page.reload();
    await expect.poll(isDark).toBe(false);
    await page.waitForTimeout(800);

    // Step 4: switching again restores the dark theme.
    await clickWithMotion(page, themeButton);
    await expect.poll(isDark).toBe(true);
    await page.waitForTimeout(800);
  });
});
