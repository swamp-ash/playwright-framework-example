import { test, expect, request, Page } from '@playwright/test';
import { API } from "../../../lib/pom/api/api-general";
import {allure} from "allure-playwright";

let accessToken: string | null;

const links: { graphqlEndpointUrl: string; } = {

    graphqlEndpointUrl: 'http://app.'+process.env.BASE_URL+'/graphql'

}

test.describe('Setup', async () => {

    test.use({ storageState: '../../.auth/user.json' });

    test('Get accessToken', async ({ page, request }) => {
        const api: API = new API(request);
        await page.goto('127.0.0.1')
        accessToken = await api.accessToken(page);
    });
});

test.describe('API-tests', async () => {

    test('getUsers request - positive', async ({ request }) => {
        await allure.id('some test-case id');
        const api: API = new API(request);
        const data: object = require('../../../lib/pom/api/requests/getUsers.json');
        const schema: object = require('../../../lib/pom/api/schemas/getUsers.json');
        await api.apiTest(links, accessToken, data, schema, 200);
    });

    test('getUsers request - negative - w/o token', async ({ request }) => {
        await allure.id('some test-case id');
        const api: API = new API(request);
        const data: object = require('../../../lib/pom/api/requests/getUsers.json');
        const schema: object = require('../../../lib/pom/api/schemas/unauthorized.json');
        await api.apiTest(links, null, data, schema, 400);
    });

    test('getUsers request - negatibe - w/o headers', async ({ request }) => {
        await allure.id('some test-case id');
        const api: API = new API(request);
        const data: object = require('../../../lib/pom/api/requests/getUsers.json');
        const schema: object = require('../../../lib/pom/api/schemas/unauthorized.json');
        await api.apiTest(links, accessToken, data, schema, 400, false);
    });

})