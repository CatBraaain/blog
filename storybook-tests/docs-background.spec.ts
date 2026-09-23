import { expect, test } from "@playwright/test";

for (const docsPath of ["pages-post--docs", "pages-home--docs"]) {
  test(`matches the ${docsPath} preview background to the website`, async ({ page }) => {
    await page.goto(`/?path=/docs/${docsPath}`);

    const previewFrame = page.locator("#storybook-preview-iframe");
    const preview = previewFrame
      .contentFrame()
      .locator(`#anchor--primary--${docsPath.replace("--docs", "--default")} > .sbdocs-preview`);

    await expect(preview).toBeVisible({ timeout: 30_000 });
    await expect
      .poll(
        () =>
          preview.evaluate((element) => {
            const siteBackground = getComputedStyle(element.ownerDocument.documentElement)
              .getPropertyValue("--background")
              .trim();
            return getComputedStyle(element).backgroundColor === siteBackground;
          }),
        { timeout: 10_000 },
      )
      .toBe(true);

    await expect(previewFrame.contentFrame().locator(".sbdocs-wrapper")).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
  });
}

test("does not change other Docs preview backgrounds", async ({ page }) => {
  await page.goto("/?path=/docs/blocks-post--docs");

  const previewFrame = page.locator("#storybook-preview-iframe");
  const preview = previewFrame
    .contentFrame()
    .locator("#anchor--primary--blocks-post--list-item > .sbdocs-preview");

  await expect(preview).toBeVisible({ timeout: 30_000 });
  await expect(preview).toHaveCSS("background-color", "rgb(255, 255, 255)");
});
