import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object
 * Represents the login/authentication page
 */
export class LoginPage extends BasePage {
  // Locators using recommended accessible selectors
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Using multiple selector strategies for resilience (auto-healing approach)
    this.usernameInput = page.getByLabel(/username/i)
      .or(page.getByPlaceholder(/username/i))
      .or(page.locator('[data-testid="username"]'));
    
    this.emailInput = page.getByLabel(/email/i)
      .or(page.getByPlaceholder(/email/i))
      .or(page.locator('[data-testid="email"]'));
    
    this.passwordInput = page.getByLabel(/password/i)
      .or(page.getByPlaceholder(/password/i))
      .or(page.locator('[data-testid="password"]'));
    
    this.loginButton = page.getByRole('button', { name: /log\s*in|sign\s*in|submit/i })
      .or(page.locator('[data-testid="login-button"]'));
    
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot.*password/i });
    this.signUpLink = page.getByRole('link', { name: /sign\s*up|register|create.*account/i });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember/i });
    this.errorMessage = page.getByRole('alert').or(page.locator('.error, [data-testid="error"]'));
    this.successMessage = page.locator('.success, [data-testid="success"]');
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
    await this.waitForPageLoad();
  }

  /**
   * Wait for the login page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Login with username and password
   */
  async loginWithUsername(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Login with email and password
   */
  async loginWithEmail(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Check "Remember Me" option
   */
  async checkRememberMe(): Promise<void> {
    await this.check(this.rememberMeCheckbox);
  }

  /**
   * Click on forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
    await this.waitForNavigation();
  }

  /**
   * Click on sign up link
   */
  async clickSignUp(): Promise<void> {
    await this.click(this.signUpLink);
    await this.waitForNavigation();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    await this.waitForVisible(this.successMessage);
    return await this.getText(this.successMessage);
  }

  /**
   * Verify user is on login page
   */
  async isOnLoginPage(): Promise<boolean> {
    const url = this.getCurrentUrl();
    return url.includes('/login') || url.includes('/signin');
  }
}
