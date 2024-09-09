import {request} from "@playwright/test";
import logger from "../../utils/logger/logger";

type Method =
    "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "HEAD"
    | "DELETE"
    | "OPTIONS"
    | "TRACE";

export class PwRequest {

    protected options: Partial<{
        prefixUrl: string
        url: string,
        method: Method,
        headers: Record<string, string>,
        body: any,
        params: { [key: string]: string | number | boolean } | URLSearchParams,

    }> = {}

    prefixUrl(url: string | URL) {
        this.options.prefixUrl = url.toString();
        return this
    }

    url(url: string | URL): this {
        this.options.url = url.toString();
        return this;
    }

    method(method: Method): this {
        this.options.method = method;
        return this;
    }

    headers(headers: Record<string, string>): this {
        this.options.headers = this.options.headers ?? {};
        this.options.headers = {
            ...this.options.headers,
            ...headers
        }
        return this;
    }

    searchParams(searchParams: { [key: string]: string | number | boolean } | URLSearchParams): this {
        this.options.params = searchParams;
        return this;
    }

    body(body: any): this {
        this.options.body = body;
        return this;
    }


    async send<T = never>() {
        if (!this.options.url)
            throw new Error('Url is undefined, make sure you specify url')

        const reqContext = await request.newContext({
            baseURL: this.options.prefixUrl
        })
        this.logRequest();

        const response = await reqContext.fetch(this.options.url, {
            method: this.options.method,
            data: this.options.body,
            headers: this.options.headers,
            params: this.options.params,
            failOnStatusCode: true,
        })
        const responseBody = await response.json();
        logger.info(`Status: ${response.status()} Body:\n ${JSON.stringify(responseBody, null, 2)}`);
        return {
            body: responseBody as T,
            headers: response.headers()
        }
    }

    private logRequest() {
        const url = `Send ${this.options.method} to ${this.options.prefixUrl}${this.options.url}`;
        let searchParams = '';
        if (this.options.params instanceof URLSearchParams) {
            searchParams = `?${this.options.params}`;
        } else {
            searchParams = `?${JSON.stringify(this.options.params)}`
        }
        const body = this.options.body ? `\nBody:\n${JSON.stringify(this.options.body, null, 2)}` : ''
        logger.info(`${url}${searchParams}${body}`)
    }

}