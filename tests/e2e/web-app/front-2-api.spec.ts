import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Front2Api } from "../../../lib/pom/e2e/front-2-api";
import { allure } from "allure-playwright";

dotenv.config();

let accessToken: string | null;

const links: {
    signupURL: string;
    webAppLink: string;
    graphqlEndpointUrl: string;
} = {
    signupURL: 'http://'+process.env.BASE_URL+'/signup',
    webAppLink: 'http://app.'+process.env.BASE_URL,
    graphqlEndpointUrl: 'http://app.'+process.env.BASE_URL+'/graphql'
};


// random user data
const value: string = 'auto'+uuidv4();
const usr: {
    username: string;
    email: string;
    pass: string;
} = {
    username: value,
    email: "nadein.qa@gmail.com",
    pass: value
};


// selectors
const s: {
    pageIsLoaded: string;
    nameField: string;
    emailField: string;
    password: string;
    repeatPassword: string;
    regButton: string;
    regSuccess: string;
} = {
    pageIsLoaded: "some selector string",
    nameField: "some selector string",
    emailField: "some selector string",
    password: "some selector string",
    repeatPassword: "some selector string",
    regButton: "some selector string",
    regSuccess: "some selector string",
};

test.describe('Setup', async () => {

    test.use({ storageState: '../../.auth/admin.json' });

    test('Get accessToken', async ({ page, request }) => {
        const f2a: Front2Api = new Front2Api(request);
        await page.goto('127.0.0.1')
        accessToken = await f2a.accessToken(page);
    });

});


// test-cases
test.describe('Registration - Front -> API', () => {

    test('Registration', async ({ request}) => {
        await allure.id('some test-case id')
        const f2a: Front2Api = new Front2Api(request);
        await f2a.reg(accessToken, links, s, usr);
    });

});
