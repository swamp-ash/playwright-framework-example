import { test, expect, type Page } from '@playwright/test';
import * as dotenv from "dotenv";

dotenv.config();

interface Links {
    BASE_URL: string;
    webAppURL: string;
};

interface Sel {
    pageIsLoaded: string;
    firstTableCell: string;
}

export class WebAppUserPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async pageSetup(s: any, baseUrl: string) {

        const { pageIsLoaded } = s;

        await test.step('Open /users page', async () => {
            await this.page.goto(baseUrl + '/users');
            await this.page.waitForSelector(pageIsLoaded);
        })
    }

    public async redirect(links: Links, s) {
        await this.pageSetup(s, links.BASE_URL);
        await this.page.waitForTimeout(3000);
        const newUrl: string = this.page.url();
        await expect(newUrl.trim()).toMatch(links.webAppURL.trim());
    }

    public async searchInputTest(
        links: Links,
        s: Sel,
        user: {id: number}) {

        let result: number

        await this.pageSetup(s, links.BASE_URL);

        await test.step('Find & fill Search input by userId', async () => {
            await this.page.getByPlaceholder('Search').fill(`${user.id}`);
        })

        await test.step('Parse ID from first cell', async () => {
            result = parseInt(
                await this.page.locator(s.firstTableCell).textContent()
            );
        })

        await test.step('Compare result with userId', async () => {
            expect(result).toEqual(user.id);
        });

    }

}