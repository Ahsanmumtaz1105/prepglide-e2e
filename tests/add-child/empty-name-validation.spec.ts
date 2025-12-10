import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Add Child - Empty Name Validation', () => {
  test('should disable create button when name field is empty', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent to get to add-child page
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Fill username and password but leave name empty
    await addChildPage.usernameInput.fill('testusername');
    await addChildPage.passwordInput.fill('Test@123');
    
    // Verify create button is disabled
    const isButtonDisabled = await addChildPage.isCreateButtonDisabled();
    expect(isButtonDisabled).toBe(true);
    
    // Clear name field explicitly to ensure it's empty
    await addChildPage.childNameInput.clear();
    
    // Button should still be disabled
    const isStillDisabled = await addChildPage.isCreateButtonDisabled();
    expect(isStillDisabled).toBe(true);
  });
});