import {ApiClient} from "./api-client";
import {CONFIG} from "../../utils/env";

export class PetstoreApiClient extends ApiClient {

    constructor(endpoint: string) {
        super({
            baseUrl: CONFIG.PETSTORE_URL,
            basePath: CONFIG.PETSTORE_BASE_PATH,
            endpoint: endpoint,
            headers: {"Content-Type": "application/json"}
        });
    }
}