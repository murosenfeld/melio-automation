import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  // Define selectors
  // readonly page: Page
  readonly passwordInput: Locator
  readonly emailInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly loginForm: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    // this.page = page
    super(page)
    this.emailInput = page.locator('[data-testid="input-email"]')
    this.passwordInput = page.locator('[data-testid="input-password"]')
    this.submitButton = page.locator('[data-testid="button-auth.signIn.buttonLabel"]')
  }

  // Define login page methods
  async login(email: string, password: string) {
    await this.emailInput.type(email)
    await this.passwordInput.type(password)
    await this.submitButton.click()
  }
}
