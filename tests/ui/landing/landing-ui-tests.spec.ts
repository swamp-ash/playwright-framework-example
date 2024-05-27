import { test, Browser, BrowserContext, chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LandingPageUi } from "../../../lib/pom/ui/landing-page-ui";
import { allure } from "allure-playwright";

dotenv.config();


const links: {
  BASE_URL: string;
  signupURL: string;
} = {
  BASE_URL: 'http://'+process.env.BASE_URL,
  signupURL: 'http://'+process.env.BASE_URL+'/signup'
}


// selectors
const s: {
  pageIsLoaded: string;
  ppSelector: string;
  ppModalSelector: string;
  ppModalTextSelector: string;
  ppModalOkSelector: string;
  tiffButton: string;
  tiffPageIsLoaded: string;
} = {
  pageIsLoaded: "some selector string",
  // privacy policy
  ppSelector: "some selector string",
  ppModalSelector: "some selector string",
  ppModalTextSelector: "some selector string",
  ppModalOkSelector: "some selector string",

  // "try it for free"
  tiffButton: "some selector string",
  tiffPageIsLoaded: "some selector string"
}


// text content validation
const texts: {

  privacyPolicy: string

} = require('../../../lib/pom/ui/landing-texts.json');


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
test.describe('Landing - Main page - UI tests', () => {

  test.beforeEach(async ()=> {
    await allure.id('some test-case id');
    const lp: LandingPageUi = new LandingPageUi(page);
    await lp.setup(page, links.BASE_URL, s);
  });

  test('Try it for free - user flow - redirect', async ({}) => {
    await allure.id('some test-case id');
    const lp: LandingPageUi = new LandingPageUi(page);
    await lp.tiffRedirect(page, links, s);
  })

  test('Privacy policy check', async ({}) => {
    await allure.id('some test-case id');
    const lp: LandingPageUi = new LandingPageUi(page);
    await lp.ppCheck(page, s, texts);
  });


})
