import {test as pw_test} from "@playwright/test";
import {UserAccountPage} from "../../../pages/user-account-page";
import '../../../utils/env';

const test = pw_test.extend({
    page: async ({page}, use) => {
        await page.setViewportSize({width: 1920, height: 1080});
        await page.emulateMedia({colorScheme: 'dark'});
        let loginPage = new UserAccountPage(page);
        await loginPage.open();
        await loginPage.login('pw_autotest', atob(process.env.BOOK_STORE_ACCOUNT_PASSWORD as string))

        await use(page);
    }
})

export default test;