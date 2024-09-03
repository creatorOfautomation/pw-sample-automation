import test from "./fixtures/login-to-book-store.ft";
import {UserAccountPage} from "../../pages/user-account-page";

test.describe("Book store tests", () => {

    test('Check user can log in to account', async ({page}) => {
        const accountPage = new UserAccountPage(page);
        await accountPage.checkUsername('pw_autotest')
        await page.goto('/books');
        await accountPage.searchForBook("Git");
        await accountPage.verifyBookList(1);
    });

})