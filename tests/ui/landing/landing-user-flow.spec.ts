import { test, Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LandingPageUsrFlow } from "../../../lib/pom/ui/landing-page-usr-flow";
import { allure } from "allure-playwright";

dotenv.config();


const links: {
  signupURL: string;
  webAppLink: string;
} = {
  signupURL: 'http://'+process.env.BASE_URL+'/signup',
  webAppLink: 'http://app.'+process.env.BASE_URL
};


// user data
const usr: {
  username: string;
  email: string;
  pass: string;
} = {
  username: "autoTestUsr",
  email: "nadein.qa@gmail.com",
  pass: "Qwerty123!"
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


// test-cases
test.describe('Landing - User registration flow', () => {

  test('Registration - positive', async ({page}) => {
    await allure.id('some test-case id');
    const lp: LandingPageUsrFlow = new LandingPageUsrFlow(page);
    await lp.reg(links, s, usr);
  });



})
