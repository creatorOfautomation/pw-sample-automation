import {PwRequest} from "../../pw/pw-request";

export type ControllerOptions = {
    token?: string,
    prefixUrl: string,
    prefixPath: string
}

export class PWBaseController {
    constructor(protected readonly options: ControllerOptions) {
    }

    protected request() {
        const preparedUrl = new URL(
            this.options.prefixPath.endsWith('/') ? this.options.prefixPath : `${this.options.prefixPath}/`,
            this.options.prefixUrl
        );

        const preparedRequest = new PwRequest().prefixUrl(preparedUrl);

        if (this.options.token) {
            return preparedRequest.headers({token: this.options.token})
        }
        return preparedRequest;
    }
}