import {test} from "@playwright/test";
import PetsController from "../../api/controllers/pet-contoller";
import {definitions} from "../../../.temp/types";
import {faker} from "@faker-js/faker";
import assert from "node:assert";

test.describe('PET API test cases', () => {
    test("Verify that Pet can be created, updated, deleted", async () => {
        let petsController = new PetsController();
        const petData = generateDataForPet();
        let createdPet: definitions['Pet'] = await petsController.createPet(petData);
        createdPet = await petsController.getById(createdPet?.id as number);

        await petsController.updatePet({
            id: createdPet.id,
            name: `${createdPet.name}-updated`,
        });
        createdPet = await petsController.getById(createdPet?.id as number);
        assert(createdPet.name === `${petData.name}-updated`, 'Pet should be updated');
        await petsController.deletePet(String(createdPet.id));
    })

    test("Verify that Pet can be received by tagId", async () => {
        let petsController = new PetsController();
        const petData = generateDataForPet();
        let createdPet: definitions['Pet'] = await petsController.createPet(petData);
        let resp;
        if (petData.tags) {
            resp = await petsController.findByTags([petData.tags[0].name as string])
        }
        assert(resp !== undefined && resp !== null, 'Response should not be empty');
        assert.strictEqual(resp?.length, 1, 'Response should contain only 1 element');
        assert(createdPet.id === resp[0].id, 'Response contains wrong id')
    });

    test('Verify that Pet can be received by status', async () => {
        const petsController = new PetsController();
        const resp = await petsController.findByStatus('available');
        assert(resp !== undefined && resp !== null, 'Response should not be empty');
    })
})

function generateDataForPet(): definitions['Pet'] {
    return {
        id: faker.number.int(),
        name: faker.person.fullName(),
        photoUrls: ["http://example.com/photo1.jpg", "http://example.com/photo2.jpg"],
        status: "available",
        tags: [{name: faker.word.noun()}],
        category: {name: faker.word.noun()},
    }
}