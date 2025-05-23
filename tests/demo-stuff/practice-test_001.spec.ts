//Import 'test' and 'expect' the Playwright test library:
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.waitForLoadState("networkidle");

  //click the 'Reject All' cookies button if it's visible:
  if (await page.locator('role=button[name="Reject all"]').isVisible()) {
    await page.locator('role=button[name="Reject all"]').click();
  }
});

test("Has Google title", async ({ page }) => {
  //Assert that the title is "Google":
  await expect(page).toHaveTitle("Google");

  //Get the title of "Google.com",
  //Then assert that the length of "Google" is 6 characters long:
  expect(await page.title()).toHaveLength(6);
});

test("Has Store page title", async ({ page }) => {
  //Wait for the 'Store' link to be visible (was having issues with it not being visible):
  await page.locator('role=link[name="Store"]').waitFor({ state: "visible" });

  //Click the 'Store' link:
  await page.locator('role=link[name="Store"]').click();

  //Wait for the Store page to be fully loaded first:
  await page.waitForLoadState("networkidle");

  //Assert that the Store page title contains "Google store" substring:
  await expect(page).toHaveTitle(/Google Store/);
});

test("Invalid Google email", async ({ page }) => {
  await page.locator('role=link[name="Sign in"]').click();

  //Locate the input field using the 'name' attribute
  //I double checked, the name of google's input box is "identifier"
  //Then fill it with an invalid email address:
  await page.fill('[name="identifier"]', "blah123@gmail.com");

  //Click the 'Next' button with the invalid email address
  await page.click("#identifierNext");

  await page.waitForLoadState("networkidle");

  //This is the exact element name for the error message:
  await page.waitForSelector('[jsname="r4nke"]', { state: "visible" });

  //RegEx to check if the text contains both "sign" and "in":
  const regex_signin = /(?=.*\bsign\b)(?=.*\bin\b)/i;
  //Assert that the error message is correct:
  expect(await page.locator('[jsname="r4nke"]').textContent()).toMatch(regex_signin);
});
