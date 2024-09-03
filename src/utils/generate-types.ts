import {execSync} from "node:child_process";
import {CONFIG} from "./env";

async function globalSetup(){
    execSync(`npx openapi-typescript ${CONFIG.PETSTORE_URL}/v2/swagger.json --output ./.temp/types.ts`, { stdio: 'inherit' })
}

export default globalSetup;