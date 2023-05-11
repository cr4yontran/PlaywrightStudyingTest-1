// @ts-check
const { defineConfig, devices } = require("@playwright/test");
import dotenv from "dotenv";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

// Read from default ".env" file.
// dotenv.config();

// Alternatively, read from "../my.env" file.
dotenv.config({ path: path.resolve(__dirname, ".", "my.env") });
/**
 *
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: `./tests`,
  /* Run tests in files in parallel */
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:  [
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        channels: ["pw-tests", "ci"], // provide one or more Slack channels
        sendResults: "always", // "always" , "on-failure", "off"
        maxNumberOfFailuresToShow: 100,
        meta: [
            {
                key: 'BUILD_NUMBER',
                value: '323332-2341',
            },
            {
                key: 'WHATEVER_ENV_VARIABLE',
                value: process.env.SOME_ENV_VARIABLE, // depending on your CI environment, this can be the branch name, build id, etc
            },
            {
                key: 'HTML Results',
                value: '<https://your-build-artifacts.my.company.dev/pw/23887/playwright-report/index.html|>',
            },
        ],
        slackOAuthToken: 'xoxb-5245659500131-5258569071793-Ubi0fcQd2qOOUyLhIvo10uLY',
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions li= ke `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  fullyParallel: true,
  globalSetup: "utils/globalSetup.ts",
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
