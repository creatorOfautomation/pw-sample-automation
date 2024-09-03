import axios, {AxiosHeaders, AxiosInstance, AxiosResponse, HeadersDefaults, RawAxiosRequestHeaders} from "axios";
import logger from "../../utils/logger/logger";

export type ClientOptions = {
    baseUrl: string;
    basePath?: string;
    endpoint?: string;
    headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
}

export abstract class ApiClient {
    private axiosInstance: AxiosInstance;

    protected constructor(protected readonly options: ClientOptions) {
        this.options = options;
        this.axiosInstance = axios.create({
            baseURL: options.baseUrl + options.basePath + options.endpoint + "/",
        });
        this.setUpRequestLogging();
        this.setUpResponseLogging();
        this.setUpHeaders(options.headers);
    }

    async get<T>(addEndpoint: string | number, params: any = {}) {
        let axiosResponse: AxiosResponse<T> = await this.axiosInstance.get<T>(`${addEndpoint}`, {params});
        return axiosResponse.data;
    }

    async post<T>(body: any, endpoint = ''): Promise<T> {
        let axiosResponse = await this.axiosInstance.post<T>(endpoint, body);
        return axiosResponse.data;
    }

    async put<T>(body: any, endpoint = ''): Promise<T> {
        let axiosResponse = await this.axiosInstance.put<T>(endpoint, body);
        return axiosResponse.data;
    }

    async delete(id: string) {
        await this.axiosInstance.delete(id);
    }

    private setUpRequestLogging() {
        this.axiosInstance.interceptors.request.use((request) => {
            const url = request.baseURL as string + request.url;
            const params = request.params ? '?' + new URLSearchParams(request.params).toString() : '';
            const formattedRequest = `${request.method?.toUpperCase()} to ${url}${params}`;
            const formattedData = request.data === undefined ? '' : `\n${JSON.stringify(request.data, null, 2)}`;
            logger.info(formattedRequest + formattedData);
            return request;
        });
    }

    private setUpResponseLogging() {
        this.axiosInstance.interceptors.response.use((response) => {
                logger.info(`Response code: ${response.status}\nResponse body:\n${JSON.stringify(response.data, null, 2)}`);
                return response;
            },
            (error) => {
                if (error.response) {
                    logger.error(`Response code: ${error.response.status}\nResponse body:\n${JSON.stringify(error.response.data, null, 2)}`);
                    return Promise.reject(error.response);
                }
                return Promise.reject(error)
            })
    }

    private setUpHeaders(headers: any) {
        this.axiosInstance.interceptors.request.use(async (config) => {
            config.headers = {...config.headers, ...headers};
            return config;
        });
    }
}