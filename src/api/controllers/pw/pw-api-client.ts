import PWPetsController from "./pw-pet-contoller";
import {ControllerOptions} from "./pw-base-controller";
import {CONFIG} from "../../../utils/env";
import PwStoreController from "./pw-store-controller";

export default class PWApiClient {
    public readonly pet: PWPetsController;
    public readonly store: PwStoreController;

    constructor(options?: Partial<ControllerOptions>) {
        const defaultOptions = {
            prefixUrl: CONFIG.PETSTORE_URL,
            prefixPath: CONFIG.PETSTORE_BASE_PATH
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options
        }

        this.pet = new PWPetsController(mergedOptions);
        this.store = new PwStoreController(mergedOptions);
    }

    static unauthorized() {
        return new PWApiClient();
    }
}