import { test, expect } from '@playwright/test'
import { HomePage } from '../../../page-objects/HomePage'
import { LoginPage } from '../../../page-objects/LoginPage'
import { VendorPage } from '../../../page-objects/vendorPage'
import { format } from 'date-fns';
import mode  from '../../../list.json'

test.describe.configure({ mode: 'parallel' });

test.describe('Main - Page - Dashboard Test', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let vendorPage: VendorPage
    const email = process.env.MEETUP_EMAIL ?? '';
    const password = process.env.MEETUP_PASSWORD ?? '';
    
    const now: Date = new Date();
    const formattedTime: string = format(now, 'HH:mm:ss');
    const currentDate: Date = new Date();
    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const year: number = currentDate.getFullYear();
    console.log(formattedTime);
    const date = day+'_'+month+'_'+year+'_'+formattedTime;
    const business = 'Auto_'+date;
    
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    vendorPage = new VendorPage(page)
    await homePage.visit()
    await loginPage.login(email, password)
  })

  test.describe('Main Page ', () => {
    test('Login Page Test case 1', async ({ page }) => {
      await page.waitForTimeout(16000);
      vendorPage.addVendor(business, mode.vendor['contact'], mode.vendor['email'], mode.vendor['phone'], page);
      await page.waitForTimeout(15000);
      vendorPage.searchToVendor(business);
      await page.waitForTimeout(10000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(10000);
      vendorPage.clickToAvatar(1);
      await page.waitForTimeout(10000);
      await page.getByTestId('form-field-companyName').locator('div').nth(2).click();
      await page.waitForTimeout(3000);
      const getbusiness = await vendorPage.getTobusiness(page);
      console.log("getbusiness"+getbusiness);
      const getContact = await vendorPage.getToContact(page);
      console.log("getContact"+getContact);
      const getEmailAdress = await vendorPage.getToEmailAdress(page);
      console.log("getEmailAdress"+getEmailAdress);
      const getPhone = await vendorPage.getToPhone(page);
      console.log("getPhone"+getPhone);
      const getVendorDetailsText = 'Auto'+mode.vendor['contact']+mode.vendor['email']+mode.vendor['phone'];
      console.log(getVendorDetailsText);
      await page.waitForTimeout(3000);
      expect.soft(getVendorDetailsText).toEqual(mode.vendor['validate']) 
    })

    test('Login Page Test case 2', async ({ page }) => {
      await page.waitForTimeout(16000);
      vendorPage.addVendor(mode.vendor['bussines'], mode.vendor['contact'], mode.vendor['wrong_email'], mode.vendor['phone'], page);
      await page.waitForTimeout(3000);
      const getErrorBusiness = await vendorPage.getToErrorBusiness();
      const getEmailError = await vendorPage.getToEmailError();
      expect.soft(getErrorBusiness).toEqual(mode.error['business']) 
      expect.soft(getEmailError).toEqual(mode.error['email'])   
    })
  })
})
