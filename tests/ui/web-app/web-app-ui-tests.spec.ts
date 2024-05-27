import { test, Browser, BrowserContext, chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
import { allure } from "allure-playwright";
import { WebAppUserPage } from "../../../lib/pom/ui/web-app-ui";

dotenv.config();


const links: {
  BASE_URL: string;
  webAppURL: string;
} = {
  BASE_URL: 'http://'+process.env.BASE_URL,
  webAppURL: 'http://app.'+process.env.BASE_URL
}


// selectors
const s: {
  pageIsLoaded: string;
  firstTableCell: string;
} = {
  pageIsLoaded: 'some selector string',
  firstTableCell: 'some selector string'
}


// user info
const usr: {
  id: number;
} = {
  id: 2599
}


// browser setup
let browser: Browser;
let context: BrowserContext;
let page: any

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await browser.close();
});


// test-cases
test.describe('Web App - Users page - UI tests', () => {

  test('Redirect check', async ({}) => {
    await allure.id('some test-case id');
    const web: WebAppUserPage = new WebAppUserPage(page);
    await web.redirect(links, s);
  });

  test('User search test', async ({}) => {
    await allure.id('some test-case id');
    const web: WebAppUserPage = new WebAppUserPage(page);
    await web.searchInputTest(links, s, usr);
  });

});
