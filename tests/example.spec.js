const { test, expect } = require("@playwright/test");

test("input fiedlds", async ({ page }) => {
  //go to website

  await page.goto("https://demoqa.com/text-box");

  // execute the commands

  await page.getByPlaceholder("Full Name").fill("Tran Phuc Thinh");
  await page.getByPlaceholder("name@example.com").fill("123@gmail.com");
  await page.getByPlaceholder("Current Address").fill("Berlin");
  await page.getByText("Submit").click();

  // assertion

  await expect(page.getByText("Name:")).toContainText("Tran Phuc Thinh");
  await expect(page.getByText("Email:")).toContainText("123@gmail.com");
  await expect(page.getByText("Current Address :")).toContainText("Berlin");
});

