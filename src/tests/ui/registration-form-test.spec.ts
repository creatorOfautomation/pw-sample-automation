import test from "./fixtures/start-browser-ft";
import {ColumnName, FormPage} from "../../pages/form/registration-form-page";
import {RegistrationUser} from "../../objects/registration-form";
import * as random from "../../utils/randomizer";
import {faker} from "@faker-js/faker";

test.describe('Registration form use cases tests', () => {
    let form: FormPage;

    test.beforeEach(async ({page}) => {
        form = new FormPage(page);
        await form.open();
        await form.practiceForms();
    });

    test('Check user can be registered', async ({page}) => {
        await form.chooseGender('Male');
        let data = generateUserData();
        await form.fillRegistrationForm(data);
        await verifyFormSubmitted()
        const exp = new Map<ColumnName, string>([
            ["Address", data.currentAddress],
            ["Student Name", `${data.firstName} ${data.lastName}`],
            ["Student Email", data.email],
            ["Mobile", data.mobile],
        ]);
        await form.verifyResultTableBulk(exp)
    });

    test('Check user can upload file when registered', async ({page}) => {
        await form.chooseGender('Female');
        await form.fillRegistrationForm(generateUserData());
        await form.uploadTestFile();
        await verifyFormSubmitted()

    });

    test('Check user can select hobbies when registered', async ({page}) => {
        await form.chooseGender('Female');
        await form.fillRegistrationForm(generateUserData());
        await form.chooseHobbies(["Sports", "Music"])
        await verifyFormSubmitted()
        await form.verifyResultTable('Hobbies', "Sports, Music")
    })

    async function verifyFormSubmitted() {
        await form.submitForm();
        await form.verifyFormSubmitted();
    }
});


function generateUserData(): RegistrationUser {
    return new RegistrationUser({
        firstName: random.generateFirstName(),
        lastName: random.generateFirstName(), email: faker.internet.email(),
        mobile: faker.string.numeric({length: 10}),
        subject: random.generateString(50),
        currentAddress: faker.location.streetAddress()
    });
}