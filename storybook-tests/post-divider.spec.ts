import { expect, test } from "@playwright/test";

const story = (name: string) => `/iframe.html?id=blocks-post--${name}&viewMode=story`;

for (const name of ["list-item", "list-item-with-excerpt", "standalone-title"]) {
  test(`shows the divider for ${name}`, async ({ page }) => {
    await page.goto(story(name));
    await expect(page.locator("[data-slot=post-card] article")).toBeVisible({ timeout: 30_000 });

    await expect(page.locator("[data-slot=post-card] article > div:first-child")).toHaveCSS(
      "border-bottom-width",
      "1px",
    );
    if (name === "list-item-with-excerpt") {
      await expect(page.getByText("A search result excerpt.")).toBeVisible();
    }
  });
}

test("omits the divider and empty body for a list item without a description", async ({ page }) => {
  await page.goto(story("list-item-without-description"));

  const article = page.locator("[data-slot=post-card] article");
  await expect(article).toBeVisible({ timeout: 30_000 });
  await expect(article.locator(":scope > div:first-child")).toHaveCSS("border-bottom-width", "0px");
  await expect(article.locator(":scope > div:first-child")).toHaveCSS("padding-bottom", "0px");
  await expect(article.locator(":scope > div")).toHaveCount(1);
});
