const { firefox } = require("playwright");
import { test, expect } from "@playwright/test";

test("saucedemo: check backpack price", async () => {
  const browser = await firefox.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/v1/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.getByRole("button", { name: "LOGIN" }).click();

  //Check the backpack price:
  await page.getByRole("link", { name: "Sauce Labs Backpack" }).click();

  //the '.' prefix before inventory_details_price indicates you are selecting by class name:
  const priceDiv = await page.locator(".inventory_details_price");

  //get the innerText of .inventory_details_price:
  const priceText = await priceDiv.innerText();

  //assert the correct price is displayed:
  expect(await priceText.trim()).toBe("$29.99");

  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.getByRole("link", { name: "Logout" }).click();

  // ---------------------
  await context.close();
  await browser.close();
});
