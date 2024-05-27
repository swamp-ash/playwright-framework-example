import {test, expect, APIRequestContext, type Page} from '@playwright/test';
import * as dotenv from "dotenv";
import { LandingPageUsrFlow } from "../ui/landing-page-usr-flow";
import { API } from "../api/api-general";


dotenv.config();

interface Links {
    signupURL: string;
    webAppLink: string;
    graphqlEndpointUrl: string;
}

interface Sel {
    pageIsLoaded: string;
    nameField: string;
    emailField: string;
    password: string;
    repeatPassword: string;
    regButton: string;
    regSuccess: string;
}

interface Usr {
    username: string;
    email: string;
    pass: string;
}

export class Front2Api {
    readonly page: Page;
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

    public async reg(
        accessToken: string,
        links: Links,
        s: Sel,
        usr: Usr,
    ) {
        const lp: LandingPageUsrFlow = new LandingPageUsrFlow(this.page);
        const api: API = new API(this.reqContext);

        let newUserName: string = usr.username;
        let response: any;
        let findUsr: any;
        let usrId: any;

        const getUsersData: object = require('../../lib/pom/api/requests/getUsers.json');
        const getUsersSchema: object = require('../../lib/pom/api/schemas/getUsers.json');
        const deleteUserSchema: object = require('../../lib/pom/api/schemas/deleteUser.json');


        await test.step('New usr frontend registration', async () => {
            await lp.reg(links, s, usr);
        });

        await test.step('Send getUsers API request', async () => {
            response = await api.apiTest(links, null, getUsersData, getUsersSchema, 200);
        });

        await test.step('Find created usr', async () => {
            const respData: any = await response.json();
            findUsr = await respData.data.users.find(obj =>
                obj.username === newUserName);
            expect(findUsr).toBeTruthy();
        });

        await test.step('Send userDelete API request', async () => {
            usrId = JSON.stringify(findUsr.id);
            const deleteUserData: object = JSON.parse(
                JSON.stringify(require('../../lib/pom/api/requests/deleteUser.json'))
                    .replace(/{USER_ID}/g, usrId)
            );

            response = await api.apiTest(links, null, deleteUserData, deleteUserSchema, 200);
        });

        await test.step('Find deleted usr', async () => {
            response = await api.apiTest(links, accessToken, getUsersData, getUsersSchema, 200);
            const respData: any = await response.json();
            findUsr = await respData.data.users.find(obj =>
                obj.username === newUserName ||
                obj.id === usrId);
            expect(findUsr).toBeFalsy();
        });


    }
}