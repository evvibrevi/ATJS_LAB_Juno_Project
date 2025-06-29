import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }], // html
    // [
    //   '@reportportal/agent-js-playwright',
    //   {
    //     token:
    //       process.env.REPORT_PORTAL_TOKEN,
    //     endpoint: 'https://reportportal.epam.com/api/v1',
    //     project: 'ruslan_klimakov_personal',
    //     launch: 'Playwright UI tests',
    //     description: 'Juno test',
    //     attributes: [{ key: 'team', value: 'QA' }],
    //     debug: false,
    //   },
    // ],
    ['list'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.juno.co.uk',
    // Enable video recording
    video: 'on', // Options: 'on', 'off', 'retain-on-failure', 'on-first-retry'
    // Optional: Specify video size
    viewport: { width: 1280, height: 720 },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    // Adds 500ms delay between operations
    launchOptions: {
      slowMo: 500,
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  // Optional: Define where videos are saved
  outputDir: './test-results/video', // Directory for videos and other test outputs
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/setup.ts',
    },

    //{
    //  name: 'chromium',
    //  use: { ...devices['Desktop Chrome'], storageState: 'state.json' },
    //  dependencies: ['setup'],
    //},

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

     {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
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
