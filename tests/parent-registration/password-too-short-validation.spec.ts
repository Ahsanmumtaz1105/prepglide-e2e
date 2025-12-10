import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Password Too Short Validation', () => {
  test('should show validation error for password less than 6 characters', async ({ parentRegistrationPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Fill form with short password
    await parentRegistrationPage.fillRegistrationForm(
      'testuser@example.com',
      'abc',
      'abc'
    );
    
    // Click register
    await parentRegistrationPage.clickRegister();
    
    // Verify password validation error
    await expect(parentRegistrationPage.passwordError).toBeVisible();
    const passwordError = await parentRegistrationPage.getPasswordError();
    expect(passwordError).toContain('Password must be at least 6 characters');
    
    // Verify top error message
    await expect(parentRegistrationPage.topErrorMessage).toBeVisible();
    const topError = await parentRegistrationPage.getTopErrorMessage();
    expect(topError).toContain('Please fill in all required fields correctly');
  });
});