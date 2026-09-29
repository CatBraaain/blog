import { expect } from "@playwright/test";

import {
  clickWithMotion,
  highlight,
  showStep,
  smoothScroll,
  test,
} from "./support/recording-fixture";

// Recording scenarios defined by SPEC.md, the canonical source. One test per
// recorded video, walking through the spec steps in order at a pace a human
// can follow on video.
// Record at the full viewport size instead of Playwright's default 800px-wide scale.
test.use({ video: { mode: "on", size: { width: 1280, height: 720 } } });

const POST_SLUG = "20201002113048";
const POST_TITLE = "タスクスケジューラからPycharmのPythonファイルを実行する";
// Narrows the list to exactly the one post above ("Pycharm" alone matches 5 posts).
const SEARCH_TERM = "スケジューラからPycharm";

// Linger long enough on each step's outcome for a human to follow along on video.
const STEP_PAUSE_MS = 1500;
// Steps whose outcome needs a longer read (fresh article view, restored list, theme flip).
const READING_PAUSE_MS = 2000;
const OPENING_PAUSE_MS = 2000;
const TYPING_DELAY_MS = 150;

test.describe("recorded flows", () => {
  test("browse list, search, filters and post page", async ({ page }) => {
    // The paced walkthrough outgrows Playwright's 30s default test timeout.
    test.setTimeout(120_000);

    // Step 1: home shows search, filters, 10 posts and pagination.
    await page.goto("/");
    await showStep(page, "手順 1: ホームを開く → 検索・フィルタ・投稿 10 件・ページネーション");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(`Home | CatBraaain's Blog`);
    const searchInput = page.getByPlaceholder("Search...");
    await expect(searchInput).toBeVisible();
    await expect(page.getByRole("radio", { name: /^Tech / })).toBeVisible();
    await expect(page.getByRole("radio", { name: /^Python / })).toBeVisible();
    const posts = page.locator("main ul li article");
    // The post list itself, excluding the pagination lists; used for highlight outlines.
    const postList = page.getByRole("list").filter({ has: page.getByRole("article") });
    await expect(posts).toHaveCount(10);
    const pagination = page.getByRole("navigation", { name: "pagination" }).first();
    await expect(pagination).toBeVisible();
    await page.waitForTimeout(OPENING_PAUSE_MS);

    // Step 2: the next page keeps 10 posts.
    const next = pagination.getByRole("link", { name: "Go to next page" });
    const previous = pagination.getByRole("link", { name: "Go to previous page" });
    await showStep(page, "手順 2: 「次へ」→ 2 ページ目の投稿 10 件");
    await clickWithMotion(page, next);
    await expect(page).toHaveURL(/\/\?page=2$/);
    await expect(posts).toHaveCount(10);
    await highlight(page, [postList]);
    await page.waitForTimeout(STEP_PAUSE_MS);

    // Step 3: previous returns to the first page.
    await showStep(page, "手順 3: 「前へ」→ 1 ページ目の投稿 10 件に戻る");
    await clickWithMotion(page, previous);
    await expect(page).toHaveURL(/\/$/);
    await expect(posts).toHaveCount(10);
    await highlight(page, [postList]);
    await page.waitForTimeout(STEP_PAUSE_MS);

    // Step 4: typing a word narrows the list to the Pycharm post.
    await showStep(page, '手順 4: "スケジューラからPycharm" と入力 → 1 件に絞り込まれる');
    await clickWithMotion(page, searchInput);
    await searchInput.pressSequentially(SEARCH_TERM, { delay: TYPING_DELAY_MS });
    await expect(page).toHaveURL(new RegExp(`/\\?q=${encodeURIComponent(SEARCH_TERM)}$`));
    await expect(posts).toHaveCount(1, { timeout: 15000 });
    await highlight(page, [postList]);
    await page.waitForTimeout(STEP_PAUSE_MS);

    // Step 5: opening the post shows its title.
    await showStep(page, "手順 5: 投稿を開く → タイトルが見出しに表示");
    await clickWithMotion(page, posts.getByRole("link", { name: POST_TITLE }));
    await expect(page).toHaveURL(new RegExp(`/posts/${POST_SLUG}$`));
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toHaveText(POST_TITLE);
    await highlight(page, [heading]);
    await page.waitForTimeout(READING_PAUSE_MS);

    // Step 6: scroll past the headings and images, then settle with the inline code in view.
    await showStep(page, "手順 6: 下へスクロール → 本文の見出し・画像・コード");
    await smoothScroll(page, 1600);
    const articleCode = page.locator("article code");
    await expect(articleCode.nth(0)).toBeInViewport({ ratio: 1 });
    await expect(articleCode.nth(1)).toBeInViewport({ ratio: 1 });
    await highlight(page, [articleCode.nth(0), articleCode.nth(1)]);
    await page.waitForTimeout(STEP_PAUSE_MS);

    // Step 7: going back restores the still-filtered list.
    await showStep(page, "手順 7: 戻る → 検索語と 1 件の絞り込みを維持");
    // Playwright's keyboard cannot drive browser-level shortcuts; show the key
    // on the input band, then navigate back for real.
    await page.keyboard.press("Alt+ArrowLeft");
    await page.waitForTimeout(600);
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/\\?q=${encodeURIComponent(SEARCH_TERM)}$`));
    await expect(searchInput).toHaveValue(SEARCH_TERM);
    await expect(posts).toHaveCount(1, { timeout: 15000 });
    await highlight(page, [searchInput, postList]);
    await page.waitForTimeout(READING_PAUSE_MS);

    // Step 8: clearing the search restores the full list. Select all, then delete:
    // per-character Backspace stalls on the app's URL-syncing of the input value.
    await showStep(page, "手順 8: 検索語を消す → 投稿 10 件に戻る");
    await clickWithMotion(page, searchInput);
    await searchInput.press("Control+a");
    await page.waitForTimeout(400);
    await searchInput.press("Backspace");
    await expect(page).toHaveURL(/\/$/);
    await expect(posts).toHaveCount(10, { timeout: 15000 });
    await highlight(page, [searchInput, postList]);
    await page.waitForTimeout(STEP_PAUSE_MS);

    // Step 9: the category filter narrows to Tech.
    await showStep(page, "手順 9: Categories で Tech → Tech の投稿だけ");
    await clickWithMotion(page, page.getByRole("radio", { name: /^Tech / }));
    await expect(page).toHaveURL(/\/\?q=c:Tech$/);
    await highlight(page, [postList]);
    await page.waitForTimeout(STEP_PAUSE_MS);

    // Step 10: bring the tag into view with visible wheel motion before moving the cursor.
    await showStep(page, "手順 10: Tags で Python → Tech の選択は解除、Python の投稿だけ");
    const pythonTag = page.getByRole("radio", { name: /^Python / });
    await smoothScroll(page, 160);
    await expect(pythonTag).toBeInViewport({ ratio: 1 });
    await clickWithMotion(page, pythonTag);
    await expect(page).toHaveURL(/\/\?q=t:Python$/);
    await expect(posts).toHaveCount(10, { timeout: 15000 });
    await highlight(page, [postList]);
    await page.waitForTimeout(OPENING_PAUSE_MS);
  });

  test("toggle theme and persist across reload", async ({ page }) => {
    // Step 1: home opens in the dark theme for a dark OS color scheme.
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await showStep(page, "手順 1: ダーク配色で開く → ダークテーマ");
    await page.waitForLoadState("networkidle");

    const themeButton = page.locator("header button");
    const html = page.locator("html");
    const isDark = () => html.evaluate((el) => el.classList.contains("dark"));

    await expect.poll(isDark).toBe(true);
    await page.waitForTimeout(OPENING_PAUSE_MS);

    // Step 2: the header button switches to the light theme.
    await showStep(page, "手順 2: 切替ボタンを押す → ライトテーマ");
    await clickWithMotion(page, themeButton);
    await expect.poll(isDark).toBe(false);
    await highlight(page, [themeButton]);
    await page.waitForTimeout(READING_PAUSE_MS);

    // Step 3: the choice survives a reload.
    await showStep(page, "手順 3: 再読み込み → ライトテーマのまま");
    // Playwright's keyboard cannot drive browser-level shortcuts; show the key
    // on the input band, then reload for real.
    await page.keyboard.press("Control+r");
    await page.waitForTimeout(800);
    await page.reload();
    await expect.poll(isDark).toBe(false);
    await page.waitForTimeout(STEP_PAUSE_MS);

    // Step 4: switching again restores the dark theme.
    await showStep(page, "手順 4: もう一度押す → ダークテーマに戻る");
    await clickWithMotion(page, themeButton);
    await expect.poll(isDark).toBe(true);
    await highlight(page, [themeButton]);
    await page.waitForTimeout(OPENING_PAUSE_MS);
  });
});
