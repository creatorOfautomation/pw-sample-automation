import {definitions, operations} from "../../../../.temp/types";
import {PWBaseController} from "./pw-base-controller";

export default class PWPetsController extends PWBaseController {

    async getById(id: string | number) {
        return (await this.request()
                .url(`pet/${id}`)
                .method('GET')
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    async createPet(body: Partial<definitions['Pet']>) {
        return (await this.request()
            .body(body)
            .url("pet")
            .method('POST')
            .send<Required<operations['getPetById']['responses']['200']['schema']>>())
            .body
    }

    async updatePet(body: Partial<definitions['Pet']>) {
        return (await this.request()
            .body(body)
            .method('PUT')
            .url('pet')
            .send<definitions['Pet']>()).body
    }

    async deleteById(id: string | number) {
        return (await this.request()
                .url(`pet/${id}`)
                .method('DELETE')
                .send()
        );
    }

    async findByTags(tags: string) {
        const searchParams = new URLSearchParams();
        searchParams.set('tags', tags);
        return (await this.request()
            .url('pet/findByTags')
            .method('GET')
            .searchParams(searchParams)
            .send<operations['findPetsByTags']['responses']['200']['schema']>())
            .body
    }

    async findByStatus(status: definitions['Pet']["status"]) {
        if (!status) {
            throw Error('Status must not be null)');
        }
        return (await this.request()
            .url('pet/findByStatus')
            .method('GET')
            .searchParams({status})
            .send<operations['findPetsByStatus']['responses']['200']['schema']>())
    }
}