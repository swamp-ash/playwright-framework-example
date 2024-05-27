import {test, Page, expect} from '@playwright/test'

interface Links {
    signupURL: string;
    webAppLink: string;
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

export class LandingPageUsrFlow {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // page setup
    public async setup(
        links: Links,
        s: Sel
    ) {
        await test.step('Page setup', async () => {
            await this.page.goto(links.signupURL);
            await this.page.waitForSelector(s.pageIsLoaded);
        });
    };

    public async reg(
        links: Links,
        s: Sel,
        usr: Usr
    ) {
        await this.setup(links, s);

        await test.step('Fill all fields with correct data', async () => {
            await this.page.waitForSelector(s.nameField);
            await this.page.locator(s.nameField).fill(usr.username);
            await this.page.locator(s.emailField).fill(usr.email);
            await this.page.locator(s.password).fill(usr.pass);
            await this.page.locator(s.repeatPassword).fill(usr.pass);
        });

        await test.step('Click reg button', async () => {
            await this.page.click(s.regButton);
            await this.page.waitForSelector(s.regSuccess);
        });

        await test.step('Validate URL', async () => {
           const url: string = this.page.url();
           expect(url.trim()).toMatch(links.webAppLink.trim());
        });
    };
};