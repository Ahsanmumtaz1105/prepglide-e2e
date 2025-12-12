import { test, expect, type PageFixtures } from '../../fixtures/pageFixtures';
import { TestDataGenerator } from '../../utils/helpers';

test.describe('Parent Registration - Successful Registration', () => {
  test('should successfully register parent with valid credentials', async ({ parentRegistrationPage, addChildPage }: PageFixtures) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Generate unique test data
    const timestamp = Date.now();
    const email = `testparent${timestamp}@example.com`;
    const password = 'Test@12345';
    
    // Fill registration form
    await parentRegistrationPage.fillRegistrationForm(email, password, password);
    
    // Check human verification
    await parentRegistrationPage.checkHumanVerification();
    
    // Solve captcha
    await parentRegistrationPage.solveCaptcha();
    
    // Submit registration
    await parentRegistrationPage.clickRegister();
    
    // Verify loading message appears
    await expect(parentRegistrationPage.loadingMessage).toBeVisible();
    
    // Wait for redirect to add-child page
    await parentRegistrationPage.waitForRedirectToAddChild();
    
    // Verify we're on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    expect(addChildPage.getCurrentUrl()).toContain('/add-child');
    
    // Verify page description is visible
    await expect(addChildPage.pageDescription).toBeVisible();
    
    // Verify trial message is visible
    await expect(addChildPage.trialMessage).toBeVisible();
  });
});