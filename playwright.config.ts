import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './src/tests/',
    testMatch: '**/*.spec.ts',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 10,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [["html"], ["list"]],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    expect: {timeout: 15_000},
    use: {
        video: {
            mode: 'retain-on-failure'
        },
        baseURL: 'https://demoqa.com/',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',
        headless: true
    },
    globalSetup: 'src/utils/generate-types.ts',
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
    ],
});
