import { Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly signInButton: Locator
  readonly searchBox: Locator
  readonly linkFeedback: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.linkFeedback = page.locator('.login-submit')
  }

  async visit() {
    const urlAuto = process.env.MEETUP_URL_AUTO ?? '';
    await this.page.goto(urlAuto, { timeout: 34000 });
  }

  async clickOnSignIn() {
    await this.signInButton.click()
  }

  async clickOnFeedbackLink() {
    await this.linkFeedback.click()
  }

  async searchFor(phrase: string) {
    await this.searchBox.type(phrase)
    await this.page.keyboard.press('Enter')
  }
}
