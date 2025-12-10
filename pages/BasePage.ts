import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object that all page objects should extend.
 * Contains common methods and utilities for interacting with pages.
 * 
 * Supports Playwright's latest features:
 * - Auto-waiting for elements
 * - Smart locators with auto-healing capabilities
 * - Built-in retry mechanisms
 */
export abstract class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the page's URL
   */
  abstract goto(): Promise<void>;

  /**
   * Wait for the page to be fully loaded
   */
  abstract waitForPageLoad(): Promise<void>;

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Click an element with auto-waiting
   */
  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill an input field with auto-clearing
   */
  protected async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Get text content of an element
   */
  protected async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  /**
   * Check if an element is visible
   */
  protected async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for an element to be visible
   */
  protected async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Wait for an element to be hidden
   */
  protected async waitForHidden(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'hidden' });
  }

  /**
   * Hover over an element
   */
  protected async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  /**
   * Select option from dropdown
   */
  protected async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /**
   * Check a checkbox
   */
  protected async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  /**
   * Uncheck a checkbox
   */
  protected async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  /**
   * Press a key
   */
  protected async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Scroll element into view
   */
  protected async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Get attribute value
   */
  protected async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  /**
   * Wait for a specific timeout
   */
  protected async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
