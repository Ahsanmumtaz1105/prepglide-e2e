import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Invalid Email Validation', () => {
  test('should show validation error for invalid email format', async ({ parentRegistrationPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Fill form with invalid email
    await parentRegistrationPage.fillRegistrationForm(
      'invalid-email',
      'Test@12345',
      'Test@12345'
    );
    
    // Click register
    await parentRegistrationPage.clickRegister();
    
    // Verify email validation error
    await expect(parentRegistrationPage.emailError).toBeVisible();
    const emailError = await parentRegistrationPage.getEmailError();
    expect(emailError).toContain('Email must be valid');
    
    // Verify top error message
    await expect(parentRegistrationPage.topErrorMessage).toBeVisible();
    const topError = await parentRegistrationPage.getTopErrorMessage();
    expect(topError).toContain('Please fill in all required fields correctly');
  });
});