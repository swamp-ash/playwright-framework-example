import {test, Page, expect} from '@playwright/test'

export class LandingPageUi {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // page setup
    public async setup(
        page: any,
        link: string = process.env.BASE_URL,
        s: {
            pageIsLoaded: string
        }) {
        await test.step('Page setup', async () => {
            await page.goto(link);
            await page.waitForSelector(s.pageIsLoaded);
        });
    };

    // tests
    public async tiffRedirect(
        page: any,
        links: {
            signupURL: string
        },
        s: {
            tiffButton: string;
            tiffPageIsLoaded: string;
        }) {

        let url: string;

        await test.step('Click TIFF button', async () => {
            await page.waitForSelector(s.tiffButton);
            await page.locator(s.tiffButton).click();
        });

        await test.step('Parse current URL', async () => {
            await page.waitForSelector(s.tiffPageIsLoaded, {timeout: 10000});
            url = page.url();
        });

        await test.step('Validate URL', async () => {
            expect(url.trim()).toMatch(links.signupURL.trim());
        });
    };

    public async ppCheck(
        page: any,
        s: {
            ppSelector: string;
            ppModalSelector: string;
            ppModalTextSelector: string;
            ppModalOkSelector: string;
        },
        texts: {
            privacyPolicy: string;
        }) {

        let text: string | null;

        await test.step('Click PP button', async () => {
            await page.waitForSelector(s.ppSelector);
            await page.locator(s.ppSelector).click();
        });

        await test.step('Parse PP text', async () => {
            await page.waitForSelector(s.ppModalSelector);
            text = await page.locator(s.ppModalTextSelector).innerText();
        });

        await test.step('Validate PP text', async () => {
            expect(text.trim()).toMatch(texts.privacyPolicy.trim());
            await page.locator(s.ppModalOkSelector).click();
        });

        await test.step('Close PP modal', async () => {
            let modalLocator: any;
            try {
                modalLocator = await page.waitForSelector(s.ppModalOkSelector, { timeout: 1000 });
                if (modalLocator) {
                    expect(true).toBeFalsy();
                    console.error('Error. Modal locator was found on page.');
                }
            } catch (error) {}
            expect(modalLocator).toBeFalsy();
        });

    }

}
