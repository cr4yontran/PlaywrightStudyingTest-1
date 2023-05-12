const { test, expect } = require("@playwright/test");
import ENV from "../utils/env";

test("test 1", async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  console.log(page.url());
  console.log(ENV.TEXT);
});
 
test("test 2", async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  console.log(page.url());
  console.log(ENV.TEXT);
});

test("test 3", async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  console.log(page.url());
  console.log(ENV.TEXT);
});

test("test 4", async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  console.log(page.url());
  console.log(ENV.TEXT);
});

console.log('alo alo');
