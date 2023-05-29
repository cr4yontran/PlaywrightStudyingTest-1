const { test, expect } = require("@playwright/test");
import ENV from "../utils/env";



test.describe.configure({ mode: 'serial' });

test("test env", async ({ page }) => {
  await page.goto(ENV.BASE_URL);
  console.log(page.url());
  console.log(ENV.TEXT);
});
