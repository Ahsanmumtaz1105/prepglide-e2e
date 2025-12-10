import { test, expect } from '../../fixtures/pageFixtures';
import { TestDataGenerator } from '../../utils/helpers';

test.describe('Complete Flow - End-to-End Parent and Child Creation', () => {
  test('should complete full parent registration and child creation flow', async ({ parentRegistrationPage, addChildPage }) => {
    // Generate unique test data
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    const childName = 'John Smith';
    const childUsername = `johnsmith${timestamp}`;
    const childPassword = 'Child@123';

    // Step 1: Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Step 2: Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Step 3: Complete parent registration
    await parentRegistrationPage.fillRegistrationForm(parentEmail, parentPassword, parentPassword);
    await parentRegistrationPage.checkHumanVerification();
    await parentRegistrationPage.solveCaptcha();
    await parentRegistrationPage.clickRegister();
    
    // Step 4: Verify loading state and redirect
    await expect(parentRegistrationPage.loadingMessage).toBeVisible();
    await parentRegistrationPage.waitForRedirectToAddChild();
    
    // Step 5: Verify add-child page elements
    await expect(addChildPage.pageHeading).toBeVisible();
    await expect(addChildPage.pageDescription).toBeVisible();
    
    // Step 6: Verify navigation menu shows parent items
    const areNavItemsVisible = await addChildPage.areNavigationItemsVisible();
    expect(areNavItemsVisible).toBe(true);
    
    // Step 7: Verify sign out button is present
    await expect(addChildPage.signOutButton).toBeVisible();
    
    // Step 8: Complete child account creation
    await addChildPage.fillChildForm(childName, childUsername, childPassword);
    
    // Step 9: Verify form is valid and button is enabled
    const isButtonEnabled = await addChildPage.isCreateButtonEnabled();
    expect(isButtonEnabled).toBe(true);
    
    // Step 10: Create child account
    await addChildPage.clickCreateChild();
    
    // Step 11: Verify trial message
    await expect(addChildPage.trialMessage).toBeVisible();
    const trialMessage = await addChildPage.getTrialMessage();
    expect(trialMessage).toContain('free 7-day trial');
  });
});