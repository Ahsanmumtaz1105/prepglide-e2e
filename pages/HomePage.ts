import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object
 * Represents the main landing/home page of the application
 */
export class HomePage extends BasePage {
  // Locators using recommended Playwright selectors
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly logo: Locator;
  readonly navigationMenu: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    super(page);
    
    // Using role-based and accessible selectors (Playwright best practice)
    this.searchInput = page.getByRole('searchbox').or(page.getByPlaceholder(/search/i));
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.logo = page.getByRole('img', { name: /logo/i }).or(page.locator('[data-testid="logo"]'));
    this.navigationMenu = page.getByRole('navigation');
    this.mainContent = page.getByRole('main');
    this.footer = page.getByRole('contentinfo');
  }

  /**
   * Navigate to the home page
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Wait for the home page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for main content to be visible
    await this.mainContent.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
      // Fallback if main role is not found
    });
  }

  /**
   * Perform a search
   */
  async search(query: string): Promise<void> {
    await this.fill(this.searchInput, query);
    await this.click(this.searchButton);
    await this.waitForNavigation();
  }

  /**
   * Check if the logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.isVisible(this.logo);
  }

  /**
   * Get navigation items
   */
  async getNavigationItems(): Promise<string[]> {
    const navLinks = this.navigationMenu.getByRole('link');
    return await navLinks.allTextContents();
  }

  /**
   * Click on a navigation item by name
   */
  async clickNavigationItem(name: string): Promise<void> {
    await this.navigationMenu.getByRole('link', { name }).click();
    await this.waitForNavigation();
  }

  /**
   * Get main content text
   */
  async getMainContentText(): Promise<string> {
    return await this.getText(this.mainContent);
  }

  /**
   * Verify page has loaded correctly
   */
  async verifyPageLoaded(): Promise<boolean> {
    const title = await this.getTitle();
    return title.length > 0;
  }
}
