import {test as setup, Browser, BrowserContext, chromium} from '@playwright/test';

const userFile: string = '../../.auth/user.json';
const successSelector: string = 'some selector string'

// BROWSER SETUP
let browser: Browser;
let context: BrowserContext;
let page: any

setup.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
});

setup.afterAll(async () => {
    await browser.close();
});

setup('auth', async ({}) => {

    await setup.step('Goto tg auth page', async () => {
        await page.goto(process.env.BASE_URL+'/login')
        await page.waitForSelector(successSelector, {timeout: 100000});
    });

    await setup.step('Set localstorage', async () => {
        await page.context().storageState({path: userFile});
        console.log('Successful authorization.')
    });

});