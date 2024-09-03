import {PetstoreApiClient} from "../client/petstore-api-client";
import {definitions} from "../../../.temp/types";

export default class PetsController {

    private client: PetstoreApiClient = new PetstoreApiClient('pet');

    async getById(id: string | number) {
        return await this.client.get<definitions['Pet']>(id);
    }

    async createPet(body: Partial<definitions['Pet']>) {
        return await this.client.post<definitions['Pet']>(body);
    }

    async updatePet(body: Partial<definitions['Pet']>) {
        return await this.client.put<definitions['Pet']>(body);
    }

    async deletePet(id: string) {
        return await this.client.delete(id as string);
    }

    async findByTags(tag: string[]) {
        return await this.client.get<definitions['Pet'][]>('findByTags', {tags: tag.join(',')})
    }

    async findByStatus(status: definitions['Pet']["status"]) {
        return await this.client.get<definitions['Pet'][]>('findByStatus', {status})
    }
}