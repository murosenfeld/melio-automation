import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import { format } from 'date-fns';

export class VendorPage extends AbstractPage {

  readonly clickToAddVendor: Locator
  readonly setVendorBusinessName: Locator
  readonly setVendorContactName: Locator
  readonly setEmailAdress: Locator
  readonly setPhoneNumber: Locator
  readonly clickToContinue: Locator
  readonly clickToSkipNow: Locator
  readonly searchVendor: Locator
  readonly clickAvatar: Locator
  readonly getbusiness: Locator
  readonly getErrorBusiness: Locator
  readonly getEmailError: Locator


    
      // Init selectors using constructor
    constructor(page: Page) {
    // this.page = page
    super(page);
    this.clickToAddVendor = page.locator('[data-testid="vendors-tab-add-vendor-button"]');
    this.setVendorBusinessName = page.locator("#companyName");
    this.setVendorContactName = page.locator('[data-testid="form-input-fullName"]');
    this.setEmailAdress = page.locator('[data-testid="form-input-email"]');
    this.setPhoneNumber = page.locator('[data-testid="form-input-phone"]');
    this.clickToContinue = page.locator('[data-testid="continue-button"]');
    this.clickToSkipNow = page.locator('[data-component="NewSinglePaymentStepLayout.Actions"]');
    this.searchVendor = page.locator('[data-testid="search-input"]');
    this.clickAvatar = page.locator('[data-testid="avatar-content"]');
    this.getErrorBusiness = page.locator('[data-testid="form-error-message-companyName"]');
    this.getEmailError = page.locator('[data-testid="form-error-message-email"]');
  }

  async clickSettings() {
    await this.clickToAddVendor.click()
  }
  
  async addVendor(business: string, contact: string, email: string, phone: string, page: Page) {
    await this.clickToAddVendor.click()
    await page.waitForTimeout(2000);
    await this.setVendorBusinessName.click()
    await this.setVendorBusinessName.type(business);
    await page.waitForTimeout(2000);
    await this.setVendorContactName.click()
    await this.setVendorContactName.type(contact);
    await page.waitForTimeout(2000);
    await this.setEmailAdress.click()
    await this.setEmailAdress.type(email);
    await page.waitForTimeout(2000);
    await this.setPhoneNumber.click()
    await this.setPhoneNumber.type(phone);
    await page.waitForTimeout(2000);
    await this.clickToContinue.click();
    await page.waitForTimeout(6000);
    await this.clickToSkipNow.click();
  }

  async searchToVendor(vendor: string) {
    await this.searchVendor.click()
    await this.searchVendor.click({clickCount: 3})
    await this.searchVendor.press('Backspace')
    await this.searchVendor.type(vendor);
    await this.searchVendor.click()
  }
  
  async clickToVendor(vendor: string) {
    await this.searchVendor.click()
    await this.searchVendor.click({clickCount: 3})
    await this.searchVendor.press('Backspace')
    await this.searchVendor.type(vendor);
  }
  
  async clickToAvatar(number: number) {
    await this.clickAvatar.nth(number).click()
  }

  async getTobusiness(page: Page) {
    const elementHandle = await page.$("#companyName");
    let getText = await elementHandle?.getAttribute('value');
    return getText
  }

  async getToContact(page: Page) {
    const elementHandle = await page.$("#fullName");
    let getText = await elementHandle?.getAttribute('value');
    return getText
  }

  async getToEmailAdress(page: Page) {
    const elementHandle = await page.$("#email");
    let getText = await elementHandle?.getAttribute('value');
    return getText
  }

  async getToPhone(page: Page) {
    const elementHandle = await page.$("#phone");
    let getText = await elementHandle?.getAttribute('value');
    return getText
  }

  async getToErrorBusiness() {
    let getText = await this.getErrorBusiness.textContent()
    return getText
  }

  async getToEmailError() {
    let getText = await this.getEmailError.textContent()
    return getText
  }

  async setDate() {
    const now: Date = new Date();
    const formattedTime: string = format(now, 'HH:mm:ss');
    const currentDate: Date = new Date();
    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const year: number = currentDate.getFullYear();
    console.log(formattedTime);
    const date = day+'_'+month+'_'+year+'_'+formattedTime;
    const business = 'Auto_'+date;
    return business;
  }
}

