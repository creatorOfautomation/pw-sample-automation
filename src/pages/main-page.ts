import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LandingPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    async open() : Promise<void>{
        this.page.goto('/')
    }
}