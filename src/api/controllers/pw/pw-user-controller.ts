import {PWBaseController} from "./pw-base-controller";
import {definitions, operations} from "../../../../.temp/types";

export default class PwUserController extends PWBaseController {

    async create(body: Partial<definitions['User']>) {
        return (await this.request()
            .body(body)
            .method('POST')
            .url('user')
            .send<definitions["User"]>())
            .body;
    }

    async getUserByUserName(username: string): Promise<definitions['User']> {
        return (await this.request()
            .method('GET')
            .url(`user/${username}`)
            .send<definitions["User"]>())
            .body
    }

    async login(user: { username: string, password: string }) {
        return (await this.request()
            .method('GET')
            .searchParams({username: user.username, password: user.password})
            .url('user/login')
            .send<operations['loginUser']['responses']['200']['schema']>())
            .headers['token'] as string
    }
}