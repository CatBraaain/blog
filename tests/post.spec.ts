import { expect } from "@playwright/test";

import { test } from "./support/recording-fixture";

const POST_SLUG = "20201002113048";
const POST_TITLE = "タスクスケジューラからPycharmのPythonファイルを実行する";

test("renders the post page for a known post", async ({ page }) => {
  await page.goto(`/posts/${POST_SLUG}`);

  await expect(page).toHaveTitle(`${POST_TITLE} | CatBraaain's Blog`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(POST_TITLE);

  const article = page.locator("article");
  await expect(article.locator("p").first()).toBeVisible();
  await expect(article.getByText("Tech", { exact: true })).toBeVisible();
  await expect(article.getByText("Python", { exact: true })).toBeVisible();
});
