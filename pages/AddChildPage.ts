import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Add Child Page Object
 * Represents the child account setup page at /add-child
 */
export class AddChildPage extends BasePage {
  // Page heading and description
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  
  // Form field locators
  readonly childNameInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly ageGroupInput: Locator;
  
  // Buttons
  readonly createChildButton: Locator;
  readonly passwordToggleButton: Locator;
  
  // Error messages
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  
  // Information messages
  readonly ageGroupHelperText: Locator;
  readonly trialMessage: Locator;
  
  // Navigation elements
  readonly dashboardLink: Locator;
  readonly assignTestsLink: Locator;
  readonly trackProgressLink: Locator;
  readonly billingLink: Locator;
  readonly settingsLink: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page elements
    this.pageHeading = page.getByText('Child Account Setup');
    this.pageDescription = page.getByText(/let's create your child's profile/i);
    
    // Form fields
    this.childNameInput = page.getByRole('textbox', { name: /example.*lewis smith/i });
    this.usernameInput = page.getByRole('textbox', { name: /example.*sam110|lewis\.smith/i });
    this.passwordInput = page.getByRole('textbox', { name: /create a memorable password/i });
    this.ageGroupInput = page.getByRole('textbox', { name: /10-11 years/i }).or(
      page.locator('input[disabled]').filter({ hasText: /10-11/ })
    );
    
    // Buttons
    this.createChildButton = page.getByRole('button', { name: /create child account/i });
    this.passwordToggleButton = page.getByRole('button', { name: /appended action/i });
    
    // Error messages
    this.usernameError = page.getByRole('alert').filter({ hasText: /username can only contain/i });
    this.passwordError = page.getByRole('alert').filter({ hasText: /password must be/i });
    
    // Information
    this.ageGroupHelperText = page.getByText(/default year group for the 11\+ exam/i);
    this.trialMessage = page.getByText(/after creating your child's account.*free 7-day trial/i);
    
    // Navigation
    this.dashboardLink = page.getByRole('link', { name: /dashboard/i });
    this.assignTestsLink = page.getByRole('link', { name: /assign tests/i });
    this.trackProgressLink = page.getByRole('link', { name: /track progress/i });
    this.billingLink = page.getByRole('link', { name: /billing/i });
    this.settingsLink = page.getByRole('link', { name: /settings/i });
    this.signOutButton = page.getByRole('button', { name: /sign out/i });
  }

  /**
   * Navigate to the add child page
   */
  async goto(): Promise<void> {
    await this.page.goto('https://app.prepglide.co.uk/add-child');
    await this.waitForPageLoad();
  }

  /**
   * Wait for the page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Fill child account form
   */
  async fillChildForm(name: string, username: string, password: string): Promise<void> {
    await this.fill(this.childNameInput, name);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
  }

  /**
   * Click create child account button
   */
  async clickCreateChild(): Promise<void> {
    await this.click(this.createChildButton);
  }

  /**
   * Create child account
   */
  async createChild(name: string, username: string, password: string): Promise<void> {
    await this.fillChildForm(name, username, password);
    await this.clickCreateChild();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Toggle password visibility
   */
  async togglePasswordVisibility(): Promise<void> {
    await this.click(this.passwordToggleButton);
  }

  /**
   * Check if create button is enabled
   */
  async isCreateButtonEnabled(): Promise<boolean> {
    return await this.createChildButton.isEnabled();
  }

  /**
   * Check if create button is disabled
   */
  async isCreateButtonDisabled(): Promise<boolean> {
    return await this.createChildButton.isDisabled();
  }

  /**
   * Get username error message
   */
  async getUsernameError(): Promise<string> {
    await this.waitForVisible(this.usernameError);
    return await this.getText(this.usernameError);
  }

  /**
   * Get password error message
   */
  async getPasswordError(): Promise<string> {
    await this.waitForVisible(this.passwordError);
    return await this.getText(this.passwordError);
  }

  /**
   * Get age group value
   */
  async getAgeGroupValue(): Promise<string> {
    return await this.getText(this.ageGroupInput);
  }

  /**
   * Check if age group field is disabled
   */
  async isAgeGroupDisabled(): Promise<boolean> {
    return await this.ageGroupInput.isDisabled();
  }

  /**
   * Get trial message text
   */
  async getTrialMessage(): Promise<string> {
    return await this.getText(this.trialMessage);
  }

  /**
   * Check if page heading is visible
   */
  async isPageHeadingVisible(): Promise<boolean> {
    return await this.isVisible(this.pageHeading);
  }

  /**
   * Check if page description is visible
   */
  async isPageDescriptionVisible(): Promise<boolean> {
    return await this.isVisible(this.pageDescription);
  }

  /**
   * Check if trial message is visible
   */
  async isTrialMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.trialMessage);
  }

  /**
   * Check if username error is displayed
   */
  async isUsernameErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.usernameError);
  }

  /**
   * Check if password error is displayed
   */
  async isPasswordErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.passwordError);
  }

  /**
   * Navigation methods
   */
  async navigateToDashboard(): Promise<void> {
    await this.click(this.dashboardLink);
    await this.waitForNavigation();
  }

  async navigateToAssignTests(): Promise<void> {
    await this.click(this.assignTestsLink);
    await this.waitForNavigation();
  }

  async navigateToTrackProgress(): Promise<void> {
    await this.click(this.trackProgressLink);
    await this.waitForNavigation();
  }

  async navigateToBilling(): Promise<void> {
    await this.click(this.billingLink);
    await this.waitForNavigation();
  }

  async navigateToSettings(): Promise<void> {
    await this.click(this.settingsLink);
    await this.waitForNavigation();
  }

  async signOut(): Promise<void> {
    await this.click(this.signOutButton);
    await this.waitForNavigation();
  }

  /**
   * Check if navigation menu items are visible
   */
  async areNavigationItemsVisible(): Promise<boolean> {
    const items = [
      this.dashboardLink,
      this.assignTestsLink,
      this.trackProgressLink,
      this.billingLink,
      this.settingsLink
    ];

    for (const item of items) {
      if (!(await this.isVisible(item))) {
        return false;
      }
    }
    return true;
  }
}