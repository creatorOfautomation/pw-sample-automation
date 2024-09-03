import {test} from "@playwright/test";
import {definitions} from "../../../../.temp/types";
import {faker} from "@faker-js/faker";
import assert from "node:assert";
import PWApiClient from "../../../api/controllers/pw/pw-api-client";

const client = PWApiClient.unauthorized()
test.describe('PW - PET API test cases', () => {
    test("PW - Verify that Pet can be created, updated, deleted", async () => {

        const petData = generateDataForPet();
        let createdPet: definitions['Pet'] = await client.pet.createPet(petData)
        await client.pet.getById(createdPet.id as number)

        petData.name = `${createdPet.name}-updated`
        await client.pet.updatePet(petData);
        createdPet = await client.pet.getById(createdPet?.id as number);
        assert(createdPet.name === `${petData.name}`, 'Pet should be updated');
        await client.pet.deleteById(String(createdPet.id));
    })

    test("PW - Verify that Pet can be received by tagId", async () => {
        const petData = generateDataForPet();
        let createdPet: definitions['Pet'] = await client.pet.createPet(petData)
        await client.pet.getById(createdPet.id as number)

        let resp;
        if (petData.tags) {
            resp = await client.pet.findByTags(petData.tags[0].name as string)
        }
        assert(resp !== undefined && resp !== null, 'Response should not be empty');
        assert.strictEqual(resp?.length, 1, 'Response should contain only 1 element');
        assert(createdPet.id === resp[0].id, 'Response contains wrong id')
    });

    test('Verify that Pet can be received by status', async () => {
        const resp = await client.pet.findByStatus('available');
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