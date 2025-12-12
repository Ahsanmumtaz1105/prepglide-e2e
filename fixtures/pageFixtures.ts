import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ParentRegistrationPage } from '../pages/ParentRegistrationPage';
import { AddChildPage } from '../pages/AddChildPage';

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

// Define and export the types for our fixtures
export interface PageFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  parentRegistrationPage: ParentRegistrationPage;
  addChildPage: AddChildPage;
}

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

  parentRegistrationPage: async ({ page }, use) => {
    const parentRegistrationPage = new ParentRegistrationPage(page);
    await use(parentRegistrationPage);
  },

  addChildPage: async ({ page }, use) => {
    const addChildPage = new AddChildPage(page);
    await use(addChildPage);
  },
});

// Re-export expect from Playwright
export { expect } from '@playwright/test';
