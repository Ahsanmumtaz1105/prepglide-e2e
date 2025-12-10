import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Navigate to Login', () => {
  test('should navigate to login page from registration', async ({ parentRegistrationPage, loginPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Click "Sign In" link
    await parentRegistrationPage.navigateToSignIn();
    
    // Verify we're on login page
    expect(loginPage.getCurrentUrl()).toContain('/login');
    
    // Verify login form elements are visible
    await expect(loginPage.loginButton).toBeVisible();
  });
});