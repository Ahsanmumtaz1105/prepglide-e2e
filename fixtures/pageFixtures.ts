import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

/**
 * Custom test fixtures for Page Object Model
 * Extends Playwright's base test with pre-initialized page objects
 * 
 * This approach provides:
 * - Automatic page object instantiation
 * - Consistent test structure
 * - Easy dependency injection
 * - Better test maintainability
 */

// Define the types for our fixtures
type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

// Extend base test with page objects
export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

// Re-export expect from Playwright
export { expect } from '@playwright/test';
