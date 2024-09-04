import {test} from "@playwright/test";
import PWApiClient from "../../../api/controllers/pw/pw-api-client";
import {definitions} from "../../../../.temp/types";
import assert from "node:assert";
import {faker} from "@faker-js/faker";

const client = PWApiClient.unauthorized();
test.describe('PW - USER API test cases', () => {

    test('Verify user can be registered', async () => {
        const userToCreate: Omit<definitions['User'], 'id' | 'userStatus'> = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: `user+${Date.now()}@93.126.97.71`,
            phone: '12312312',
            username: `user${Date.now()}`,
            password: '123456'
        }
        await client.user.create(userToCreate);
        if (!userToCreate.username)
            throw Error(`User ${userToCreate.username} is not registered`);

        const createdUser = await client.user.getUserByUserName(userToCreate.username);
        assert.deepEqual(createdUser, {
                ...userToCreate,
                id: createdUser.id,
                userStatus: createdUser.userStatus,
            }
        );
    })
})