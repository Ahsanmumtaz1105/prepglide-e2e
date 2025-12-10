import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Password Mismatch Validation', () => {
  test('should show validation error for password mismatch', async ({ parentRegistrationPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Fill form with mismatched passwords
    await parentRegistrationPage.fillRegistrationForm(
      'testuser@example.com',
      'Test@12345',
      'Different123'
    );
    
    // Click register
    await parentRegistrationPage.clickRegister();
    
    // Verify password mismatch error
    await expect(parentRegistrationPage.confirmPasswordError).toBeVisible();
    const confirmError = await parentRegistrationPage.getConfirmPasswordError();
    expect(confirmError).toContain('Passwords do not match');
    
    // Verify top error message
    await expect(parentRegistrationPage.topErrorMessage).toBeVisible();
    const topError = await parentRegistrationPage.getTopErrorMessage();
    expect(topError).toContain('Please fill in all required fields correctly');
  });
});