import { test, expect } from "@playwright/test";

test("saucedemo: login, add backpack to cart, logout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");

  const label = page.getByRole("heading", { name: "Accepted usernames are:" });
  expect(await label.innerText()).toBe("Accepted usernames are:");

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.getByRole("button", { name: "LOGIN" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^\$29\.99ADD TO CART$/ })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
});
