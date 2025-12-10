import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Parent Registration Page Object
 * Represents the parent/guardian registration page at /parent-register
 */
export class ParentRegistrationPage extends BasePage {
  // Form field locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly humanCheckbox: Locator;
  readonly captchaInput: Locator;
  readonly registerButton: Locator;
  
  // Toggle buttons
  readonly passwordToggleButton: Locator;
  readonly confirmPasswordToggleButton: Locator;
  
  // Navigation links
  readonly signInLink: Locator;
  
  // Cookie banner
  readonly acceptAllCookiesButton: Locator;
  readonly essentialOnlyButton: Locator;
  
  // Error messages
  readonly topErrorMessage: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator;
  readonly captchaError: Locator;
  
  // Loading state
  readonly loadingMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Form fields using accessible selectors
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByRole('textbox', { name: /^password/i }).first();
    this.confirmPasswordInput = page.getByRole('textbox', { name: /confirm password/i });
    this.humanCheckbox = page.getByRole('checkbox', { name: /i am a human/i });
    this.captchaInput = page.getByRole('textbox', { name: /what is/i });
    this.registerButton = page.getByRole('button', { name: /register/i });
    
    // Toggle buttons
    this.passwordToggleButton = page.getByRole('button', { name: /password appended action/i }).first();
    this.confirmPasswordToggleButton = page.getByRole('button', { name: /confirm password appended action/i });
    
    // Navigation
    this.signInLink = page.getByRole('link', { name: /sign in/i });
    
    // Cookie banner
    this.acceptAllCookiesButton = page.getByRole('button', { name: /accept all/i });
    this.essentialOnlyButton = page.getByRole('button', { name: /essential only/i });
    
    // Error messages
    this.topErrorMessage = page.getByRole('alert').filter({ hasText: /please fill in all required fields/i });
    this.emailError = page.getByRole('alert').filter({ hasText: /email/i });
    this.passwordError = page.getByRole('alert').filter({ hasText: /password/i }).first();
    this.confirmPasswordError = page.getByRole('alert').filter({ hasText: /confirm|match/i });
    this.captchaError = page.getByRole('alert').filter({ hasText: /incorrect answer/i });
    
    // Loading
    this.loadingMessage = page.getByText(/setting up your account/i);
  }

  /**
   * Navigate to the parent registration page
   */
  async goto(): Promise<void> {
    await this.page.goto('https://app.prepglide.co.uk/parent-register');
    await this.waitForPageLoad();
  }

  /**
   * Wait for the registration page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.registerButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Accept all cookies
   */
  async acceptCookies(): Promise<void> {
    try {
      await this.acceptAllCookiesButton.click({ timeout: 3000 });
    } catch {
      // Cookie banner might not be visible if already accepted
    }
  }

  /**
   * Fill registration form
   */
  async fillRegistrationForm(email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.fill(this.confirmPasswordInput, confirmPassword);
  }

  /**
   * Check the human verification checkbox
   */
  async checkHumanVerification(): Promise<void> {
    await this.check(this.humanCheckbox);
  }

  /**
   * Get the captcha question text
   */
  async getCaptchaQuestion(): Promise<string> {
    // Wait for captcha to appear after checking the checkbox
    await this.captchaInput.waitFor({ state: 'visible', timeout: 5000 });
    const label = await this.captchaInput.getAttribute('aria-label') || '';
    return label;
  }

  /**
   * Answer the captcha
   */
  async answerCaptcha(answer: string): Promise<void> {
    await this.fill(this.captchaInput, answer);
  }

  /**
   * Solve the math captcha automatically
   */
  async solveCaptcha(): Promise<void> {
    const question = await this.getCaptchaQuestion();
    // Extract numbers from question like "What is 4 + 1?"
    const match = question.match(/(\d+)\s*\+\s*(\d+)/);
    if (match) {
      const num1 = parseInt(match[1]);
      const num2 = parseInt(match[2]);
      const answer = (num1 + num2).toString();
      await this.answerCaptcha(answer);
    }
  }

  /**
   * Toggle password visibility
   */
  async togglePasswordVisibility(): Promise<void> {
    await this.click(this.passwordToggleButton);
  }

  /**
   * Toggle confirm password visibility
   */
  async toggleConfirmPasswordVisibility(): Promise<void> {
    await this.click(this.confirmPasswordToggleButton);
  }

  /**
   * Click register button
   */
  async clickRegister(): Promise<void> {
    await this.click(this.registerButton);
  }

  /**
   * Complete full registration flow
   */
  async register(email: string, password: string): Promise<void> {
    await this.fillRegistrationForm(email, password, password);
    await this.checkHumanVerification();
    await this.solveCaptcha();
    await this.clickRegister();
    // Wait for navigation or loading state
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to sign in page
   */
  async navigateToSignIn(): Promise<void> {
    await this.click(this.signInLink);
    await this.waitForNavigation();
  }

  /**
   * Get error message text
   */
  async getTopErrorMessage(): Promise<string> {
    await this.waitForVisible(this.topErrorMessage);
    return await this.getText(this.topErrorMessage);
  }

  /**
   * Get email error message
   */
  async getEmailError(): Promise<string> {
    return await this.getText(this.emailError);
  }

  /**
   * Get password error message
   */
  async getPasswordError(): Promise<string> {
    return await this.getText(this.passwordError);
  }

  /**
   * Get confirm password error message
   */
  async getConfirmPasswordError(): Promise<string> {
    return await this.getText(this.confirmPasswordError);
  }

  /**
   * Get captcha error message
   */
  async getCaptchaError(): Promise<string> {
    return await this.getText(this.captchaError);
  }

  /**
   * Check if loading message is visible
   */
  async isLoadingMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.loadingMessage);
  }

  /**
   * Wait for redirect to add-child page
   */
  async waitForRedirectToAddChild(): Promise<void> {
    await this.page.waitForURL('**/add-child', { timeout: 15000 });
  }
}