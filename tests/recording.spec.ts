import { expect } from "@playwright/test";

import { clickWithMotion, test } from "./support/recording-fixture";

// Recording-only scenarios. One test per major web flow, kept separate from the
// regular e2e specs so they can move at a pace a human can follow on video.
test.use({ video: "on" });

const POST_SLUG = "20201002113048";
const POST_TITLE = "タスクスケジューラからPycharmのPythonファイルを実行する";

test.describe("recorded flows", () => {
  test("home shows search, filters and posts", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(`Home | CatBraaain's Blog`);
    await expect(page.getByPlaceholder("Search...")).toBeVisible();
    await expect(page.getByRole("radio", { name: /^Tech / })).toBeVisible();
    await expect(page.locator("main ul li article")).toHaveCount(10);

    // Let the first page settle on screen before the recording ends.
    await page.waitForTimeout(800);
  });

  test("search narrows posts by a word", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const searchInput = page.getByPlaceholder("Search...");
    await clickWithMotion(page, searchInput);
    await searchInput.pressSequentially("Pycharm", { delay: 120 });

    await expect(page).toHaveURL(/\/\?q=Pycharm$/);

    const posts = page.locator("main ul li article");
    await expect(posts.filter({ hasText: POST_TITLE })).toHaveCount(1, { timeout: 15000 });
    await page.waitForTimeout(800);
  });

  test("category filter narrows posts", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await clickWithMotion(page, page.getByRole("radio", { name: /^Tech / }));

    await expect(page).toHaveURL(/\/\?q=c:Tech$/);
    await page.waitForTimeout(800);
  });

  test("tag filter narrows posts", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await clickWithMotion(page, page.getByRole("radio", { name: /^Python / }));

    await expect(page).toHaveURL(/\/\?q=t:Python$/);
    await page.waitForTimeout(800);
  });

  test("pagination moves between pages", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const posts = page.locator("main ul li article");
    await expect(posts).toHaveCount(10);

    const pagination = page.getByRole("navigation", { name: "pagination" }).first();
    const next = pagination.getByRole("link", { name: "Go to next page" });
    const previous = pagination.getByRole("link", { name: "Go to previous page" });

    await clickWithMotion(page, next);
    await expect(page).toHaveURL(/\/\?page=2$/);
    await expect(posts).toHaveCount(10);
    await page.waitForTimeout(800);

    await clickWithMotion(page, previous);
    await expect(page).toHaveURL(/\/$/);
    await page.waitForTimeout(800);
  });

  test("theme toggles and persists", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const themeButton = page.locator("header button");
    const html = page.locator("html");
    const isDark = () => html.evaluate((el) => el.classList.contains("dark"));

    await expect.poll(isDark).toBe(true);
    await page.waitForTimeout(800);

    await clickWithMotion(page, themeButton);
    await expect.poll(isDark).toBe(false);
    // Hold the light theme briefly so the recording can capture it.
    await page.waitForTimeout(800);

    await clickWithMotion(page, themeButton);
    await expect.poll(isDark).toBe(true);

    await page.reload();
    await expect.poll(isDark).toBe(true);
    await page.waitForTimeout(800);
  });

  test("post page renders the article", async ({ page }) => {
    await page.goto(`/posts/${POST_SLUG}`);
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(`${POST_TITLE} | CatBraaain's Blog`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(POST_TITLE);
    await expect(page.locator("article p").first()).toBeVisible();

    // Scroll through the article so the recording shows the body.
    await page.mouse.wheel(0, 720);
    await page.waitForTimeout(400);
    await page.mouse.wheel(0, 720);
    await page.waitForTimeout(800);
  });
});
