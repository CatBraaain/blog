import { expect } from "@playwright/test";

import { test } from "./support/recording-fixture";

test("shows search input, filters and the first page of posts", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveTitle(`Home | CatBraaain's Blog`);
  await expect(page.getByPlaceholder("Search...")).toBeVisible();
  await expect(page.getByRole("radio", { name: /^Tech / })).toBeVisible();
  await expect(page.getByRole("radio", { name: /^Life / })).toBeVisible();
  await expect(page.getByRole("radio", { name: /^Python / })).toBeVisible();

  const posts = page.locator("main ul li article");
  await expect(posts).toHaveCount(10);

  const firstTitleLink = posts.first().locator("h1 a");
  await expect(firstTitleLink).toHaveAttribute("href", /^\/posts\//);
});
