import * as dotenv from 'dotenv';
import {cleanEnv, str, url} from "envalid";

dotenv.config();
export const CONFIG = cleanEnv(process.env, {
        PETSTORE_URL: url({
            default: 'https://petstore.swagger.io',
            desc: 'This is the base url of a petstore server',
        }),
        PETSTORE_BASE_PATH: str({
            default: '/v2/'
        }),
        BOOK_STORE_ACCOUNT_PASSWORD: str({
            desc: 'This is encoded password for Book Store user account'
        }),

        PETSTORE_ADMIN_PASSWORD: str({
            desc: 'This is encoded password for Petstore user account(admin) for API tests'
        }),

    }
)