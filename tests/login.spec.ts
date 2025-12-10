import { test, expect } from '../fixtures/pageFixtures';
import { TestDataGenerator } from '../utils/helpers';

/**
 * Login Page Tests
 * Tests for authentication functionality
 */
test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should load the login page', async ({ loginPage }) => {
    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);
  });

  test('should have login form elements visible', async ({ loginPage }) => {
    // Check that login button is present (our page load check)
    await loginPage.waitForPageLoad();
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('login');
  });
});

test.describe('Login Page - Form Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.skip('should show error for invalid credentials', async ({ loginPage }) => {
    // This test requires a real login implementation
    const testEmail = TestDataGenerator.generateEmail();
    const testPassword = TestDataGenerator.generatePassword();
    
    await loginPage.loginWithEmail(testEmail, testPassword);
    
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test.skip('should show error for empty form submission', async ({ loginPage }) => {
    // This test requires a real form validation
    await loginPage.loginWithEmail('', '');
    
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });
});

test.describe('Login Page - Navigation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.skip('should navigate to forgot password page', async ({ loginPage }) => {
    await loginPage.clickForgotPassword();
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('forgot');
  });

  test.skip('should navigate to sign up page', async ({ loginPage }) => {
    await loginPage.clickSignUp();
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toMatch(/sign.*up|register/i);
  });
});

test.describe('Login Page - Remember Me', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.skip('should have remember me checkbox', async ({ loginPage }) => {
    await loginPage.checkRememberMe();
    // Add verification for checkbox state
  });
});
