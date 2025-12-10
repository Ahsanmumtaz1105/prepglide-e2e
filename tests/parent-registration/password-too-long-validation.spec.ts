import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Password Too Long Validation', () => {
  test('should show validation error for password more than 15 characters', async ({ parentRegistrationPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    const longPassword = 'ValidPassword123!';
    
    // Fill form with password longer than 15 characters
    await parentRegistrationPage.fillRegistrationForm(
      'testuser@example.com',
      longPassword,
      longPassword
    );
    
    // Click register
    await parentRegistrationPage.clickRegister();
    
    // Verify password validation error
    await expect(parentRegistrationPage.passwordError).toBeVisible();
    const passwordError = await parentRegistrationPage.getPasswordError();
    expect(passwordError).toContain('Password must be less than 15 characters');
    
    // Verify top error message
    await expect(parentRegistrationPage.topErrorMessage).toBeVisible();
    const topError = await parentRegistrationPage.getTopErrorMessage();
    expect(topError).toContain('Please fill in all required fields correctly');
  });
});