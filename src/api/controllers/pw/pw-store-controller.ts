import {PWBaseController} from "./pw-base-controller";
import {definitions, operations} from "../../../../.temp/types";

export default class PwStoreController extends PWBaseController {

    async placeOrder(body: Partial<definitions['Order']>) {
        return (await this.request().url('store/order')
            .method('POST')
            .body(body)
            .send<operations['placeOrder']['responses']['200']['schema']>())
            .body
    }

    async getOrderById(id: string | number) {
        return (await this.request()
            .method('GET')
            .url(`store/order/${id}`)
            .send<operations['getOrderById']['responses']['200']['schema']>())
            .body
    }
}