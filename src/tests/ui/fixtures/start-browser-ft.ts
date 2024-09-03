import { test as pw_test } from "@playwright/test";
const test = pw_test.extend({
    page: async ({ page }, use) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.emulateMedia({ colorScheme: 'dark' });
        await use(page);
    }
});

export default test;