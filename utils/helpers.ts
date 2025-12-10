import { Page } from '@playwright/test';

/**
 * Test Data Generator Utilities
 * Generates random test data for various scenarios
 */
export class TestDataGenerator {
  /**
   * Generate a random email address
   */
  static generateEmail(prefix: string = 'test'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    return `${prefix}_${timestamp}_${random}@example.com`;
  }

  /**
   * Generate a random username
   */
  static generateUsername(prefix: string = 'user'): string {
    const timestamp = Date.now();
    return `${prefix}_${timestamp}`;
  }

  /**
   * Generate a random password
   */
  static generatePassword(length: number = 12): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  /**
   * Generate a random string
   */
  static generateString(length: number = 10): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Generate a random number within a range
   */
  static generateNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random phone number
   */
  static generatePhoneNumber(): string {
    const areaCode = this.generateNumber(100, 999);
    const prefix = this.generateNumber(100, 999);
    const lineNumber = this.generateNumber(1000, 9999);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  }
}

/**
 * Wait Utilities
 * Custom wait functions for various scenarios
 */
export class WaitUtils {
  /**
   * Wait for a condition to be true
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 30000,
    interval: number = 500
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Wait for URL to contain specific text
   */
  static async waitForUrlContains(page: Page, urlPart: string, timeout: number = 30000): Promise<void> {
    await page.waitForURL(`**/*${urlPart}*`, { timeout });
  }

  /**
   * Wait for API response
   */
  static async waitForApiResponse(
    page: Page,
    urlPattern: string | RegExp,
    timeout: number = 30000
  ): Promise<void> {
    await page.waitForResponse(urlPattern, { timeout });
  }
}

/**
 * API Helper Utilities
 * Helper functions for API-related operations
 */
export class ApiHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Intercept and mock an API response
   */
  async mockApiResponse(url: string | RegExp, response: object, status: number = 200): Promise<void> {
    await this.page.route(url, async (route) => {
      await route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    });
  }

  /**
   * Intercept API call and get request data
   */
  async captureApiRequest(url: string | RegExp): Promise<object> {
    return new Promise((resolve) => {
      this.page.on('request', (request) => {
        if (request.url().match(url)) {
          resolve({
            url: request.url(),
            method: request.method(),
            headers: request.headers(),
            postData: request.postData(),
          });
        }
      });
    });
  }

  /**
   * Wait for API response and get data
   */
  async waitForApiResponseData(url: string | RegExp): Promise<object> {
    const response = await this.page.waitForResponse(url);
    return await response.json();
  }
}
