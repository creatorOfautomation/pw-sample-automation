import {test} from "@playwright/test";
import PWApiClient from "../../../api/controllers/pw/pw-api-client";
import {definitions} from "../../../../.temp/types";

const client = PWApiClient.unauthorized();

test.describe('PW - STORE API test cases', () => {
    test('PW - Verify Order can be placed', async () => {
        const body: Omit<definitions['Order'], 'id'> = {
            petId: 1,
            quantity: 1,
            shipDate: new Date().toISOString(),
            status: 'placed'
        };

        const id = (await client.store.placeOrder(body)).id;
        const admin = await PWApiClient.loginAs({username: 'admin', password: 'admin'});
        (await admin.store.getOrderById(id as number));
    })
})