import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Empty Fields Validation', () => {
  test('should show validation errors for empty fields', async ({ parentRegistrationPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies if banner appears
    await parentRegistrationPage.acceptCookies();
    
    // Click register without filling any fields
    await parentRegistrationPage.clickRegister();
    
    // Verify top error message
    await expect(parentRegistrationPage.topErrorMessage).toBeVisible();
    const topError = await parentRegistrationPage.getTopErrorMessage();
    expect(topError).toContain('Please fill in all required fields correctly');
    
    // Verify email error
    await expect(parentRegistrationPage.emailError).toBeVisible();
    const emailError = await parentRegistrationPage.getEmailError();
    expect(emailError).toContain('Email is required');
    
    // Verify password error
    await expect(parentRegistrationPage.passwordError).toBeVisible();
    const passwordError = await parentRegistrationPage.getPasswordError();
    expect(passwordError).toContain('Password is required');
    
    // Verify confirm password error
    await expect(parentRegistrationPage.confirmPasswordError).toBeVisible();
    const confirmError = await parentRegistrationPage.getConfirmPasswordError();
    expect(confirmError).toContain('Please confirm your password');
  });
});