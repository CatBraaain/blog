import { expect } from "@playwright/test";

import { clickWithMotion, test } from "./support/recording-fixture";

test("paginates posts with the next and previous buttons", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const posts = page.locator("main ul li article");
  await expect(posts).toHaveCount(10);

  const pagination = page.getByRole("navigation", { name: "pagination" }).first();
  const previous = pagination.getByRole("link", { name: "Go to previous page" });
  const next = pagination.getByRole("link", { name: "Go to next page" });

  await expect(previous).toHaveAttribute("aria-disabled", "true");
  await clickWithMotion(page, next);

  await expect(page).toHaveURL(/\/\?page=2$/);
  await expect(posts).toHaveCount(10);
  await expect(previous).toHaveAttribute("aria-disabled", "false");

  await clickWithMotion(page, previous);
  await expect(page).toHaveURL(/\/$/);
});

test("marks the current page as active when opened directly", async ({ page }) => {
  await page.goto("/?page=2");

  await expect(page).toHaveURL(/\/\?page=2$/);
  const activePage = page
    .getByRole("navigation", { name: "pagination" })
    .first()
    .locator('a[data-active="true"]');
  await expect(activePage).toHaveText("2");
});
