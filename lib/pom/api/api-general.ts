import { test, expect, APIRequestContext, type Page } from '@playwright/test';
import * as dotenv from "dotenv";
import Ajv from 'ajv';
import headersGen from "./headers-generator-helper";

const ajv: Ajv = new Ajv;

dotenv.config();

export class API {
    readonly reqContext: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.reqContext = request;
    }

    public async accessToken(page: any) {
        const accessToken: string | null = await page.evaluate(() => {
            return window.localStorage.getItem('accessToken')
        });
        return accessToken;
    }

    public async apiTest(
        links: { graphqlEndpointUrl: string },
        accessToken: string | null,
        data: object,
        schema: object,
        status: number,
        addHeaders: boolean = true) {

        let headers: any;

        if(addHeaders) {
            headers = await headersGen(accessToken);
        } else {
            headers = null;
        }

        let response: any

        await test.step('API request', async () => {
            response = await this.reqContext.post(links.graphqlEndpointUrl, {
                data: data,
                headers: headers
            });
            console.log(await response.json())
        })

        await test.step('Check status soft expect - valid', async () => {
            await expect(await response.status()).toBe(status);
        })


        await test.step('Schema validation', async () => {
            const responseData = await response.json();
            const valid: boolean = ajv.validate(schema, responseData);
            await expect(valid).toBe(true);
        });
    }}