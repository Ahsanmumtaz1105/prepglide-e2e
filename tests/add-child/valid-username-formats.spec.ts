import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Add Child - Valid Username Formats', () => {
  test('should accept valid username formats', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent to get to add-child page
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    const validUsernames = [
      'johnsmith',        // letters only
      'john123',          // letters and numbers
      'john.smith',       // with dot
      'john_smith',       // with underscore
      'john-smith'        // with hyphen
    ];\n    \n    for (const username of validUsernames) {\n      // Fill form with valid username\n      await addChildPage.fillChildForm(\n        'Test Child',\n        username,\n        'Test@123'\n      );\n      \n      // Verify no username error is displayed\n      const isUsernameErrorVisible = await addChildPage.isUsernameErrorDisplayed();\n      expect(isUsernameErrorVisible).toBe(false);\n      \n      // Verify create button is enabled\n      const isButtonEnabled = await addChildPage.isCreateButtonEnabled();\n      expect(isButtonEnabled).toBe(true);\n      \n      // Clear the username for next iteration\n      await addChildPage.usernameInput.clear();\n    }\n  });\n});