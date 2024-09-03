import {BasePage} from "./base-page";
import {expect, Page} from "@playwright/test";

export class UserAccountPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await this.page.goto("/login");
    }

    async login(login: string, password: string) {
        await this.page.getByPlaceholder("UserName").fill(login);
        await this.page.getByPlaceholder("Password").fill(password);
        await this.page.locator("#login").click();
    }

    async checkUsername(expValue: string): Promise<void> {
        await expect(this.page.locator('#userName-value')).toHaveText(expValue);
    }

    async searchForBook(name: string): Promise<void> {
        await this.page.getByPlaceholder('Type to search').fill(name);
    }

    async verifyBookList(number: number): Promise<void> {
        await expect(this.page.locator('div[role="rowgroup"] span[class]')).toHaveCount(number);
    }
}