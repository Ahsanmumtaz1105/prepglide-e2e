import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Incorrect Captcha Validation', () => {
  test('should show validation error for incorrect captcha answer', async ({ parentRegistrationPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Fill form with valid data
    await parentRegistrationPage.fillRegistrationForm(
      'testuser@example.com',
      'Test@12345',
      'Test@12345'
    );
    
    // Check human verification to trigger captcha
    await parentRegistrationPage.checkHumanVerification();
    
    // Answer captcha incorrectly
    await parentRegistrationPage.answerCaptcha('999');
    
    // Click register
    await parentRegistrationPage.clickRegister();
    
    // Verify captcha error
    await expect(parentRegistrationPage.captchaError).toBeVisible();
    const captchaError = await parentRegistrationPage.getCaptchaError();
    expect(captchaError).toContain('Incorrect answer, please try again');
    
    // Verify top error message
    await expect(parentRegistrationPage.topErrorMessage).toBeVisible();
    const topError = await parentRegistrationPage.getTopErrorMessage();
    expect(topError).toContain('Please fill in all required fields correctly');
  });
});