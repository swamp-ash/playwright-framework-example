import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [

    { name: 'ui-setup',
      testDir: './tests/ui/web-app',
      use: {
        headless: true
      },
      testMatch: /.*\.setup\.ts/
    },

    {
      name: 'UI-landing',
      testDir: './tests/ui/landing',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
      }
      },

    {
      name: 'UI',
      testDir: './tests/ui/web-app',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        storageState: './.auth/admin.json',
      },
      dependencies: ['ui setup'],
    },

    { name: 'api-setup',
      testDir: './tests/api/web-app',
      use: {
        headless: true
      },
      testMatch: /.*\.setup\.ts/
    },

    {
      name: 'API',
      testDir: './tests/api-tests',
      use: { ...devices['Desktop Chrome'],},
    },

    { name: 'e2e-setup',
      testDir: './tests/e2e/web-app',
      use: {
        headless: true
      },
      testMatch: /.*\.setup\.ts/
    },

    {
      name: 'E2E',
      testDir: './tests/e2e/web-app',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        storageState: './.auth/admin.json',
      },
      dependencies: ['e2e-setup'],
    },

    { name: 'tg-setup',
      testDir: './tests/tg',
      use: {
        headless: false,
        storageState: './.auth/tg-user.json',
      },
      testMatch: /.*\.setup\.ts/
    },

    {
      name: 'TG',
      testDir: './tests/tg',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        storageState: './.auth/tg-user.json',
      },
      dependencies: ['tg setup'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
