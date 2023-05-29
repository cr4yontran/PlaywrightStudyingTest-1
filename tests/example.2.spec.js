const { test, expect } = require("@playwright/test");
import ENV from "../utils/env";

test("env test", async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  console.log(page.url());
  console.log(ENV.TEXT);
});

console.log('alo alo?');
