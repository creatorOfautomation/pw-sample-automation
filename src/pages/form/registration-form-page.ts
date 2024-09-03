import {expect, Page} from "@playwright/test";
import {BasePage} from "../base-page";
import {RegistrationUser} from "../../objects/registration-form";
import {formPageFieldMapping} from "./field-to-locator-mapping";
import path from "node:path";
import logger from "../../utils/logger/logger";

export type Gender = 'Male' | 'Female';
export type ColumnName = "Student Name" | "Student Email" | "Gender" | "Mobile" | "Date of Birth" |
    "Subjects" | "Hobbies" | "Picture" | "Address" | "State and City";

export class FormPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await this.page.goto('/forms');
    }

    async practiceForms(): Promise<void> {
        await this.page.getByText('Practice Form').click();
    }

    async fillRegistrationForm(data: Partial<RegistrationUser>) {
        logger.info(`Filling Registration Form: ${JSON.stringify(data)}`);
        for (const [dtoField, selector] of Object.entries(formPageFieldMapping)) {
            const value = data[dtoField as keyof RegistrationUser];
            if (value !== undefined) {
                await this.page.locator(selector).fill(value.toString());
            }
        }
    }

    async chooseGender(gender: Gender) {
        await this.page.locator(`input[type="radio"][value="${gender}"]`).click({force: true});
    }

    async chooseHobbies(hobbies: Array<"Sports" | "Reading" | "Music">) {
        logger.info(`User choose hobbies for ${hobbies.toString()}`);
        for (const hobby of hobbies) {
            await this.page.locator(`//*[.='${hobby}']/preceding-sibling::input`).click({force: true});
        }
    }

    async uploadTestFile() {
        logger.info("Upload test file");
        await this.page.locator('#uploadPicture').setInputFiles(path.join(__dirname, '../../tests/resources/test-img.png'))
    }

    async submitForm() {
        await this.page.locator('#submit').click();
    }

    async verifyFormSubmitted() {
        await expect(this.page.getByLabel('Thanks for submitting the form')).toBeVisible();
    }

    async verifyResultTable(column: ColumnName, value: string) {
        logger.info(`Verify table column '${column}': Expected: ${value}`);
        await expect(this.page.locator(`//table//td[.="${column}"]/following-sibling::*`)).toHaveText(value);
    }

    async verifyResultTableBulk(columnValue: Map<ColumnName, string>) {
        for (const [key, value] of columnValue) {
            await this.verifyResultTable(key, value);
        }
    }
}