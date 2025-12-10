import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Add Child - Invalid Username Validation', () => {
  test('should show validation error for invalid username characters', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent to get to add-child page
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Fill form with invalid username
    await addChildPage.fillChildForm(
      'Test Child',
      'user@#$',  // Invalid characters
      'Test@123'
    );
    
    // Verify username error is displayed
    await expect(addChildPage.usernameError).toBeVisible();
    const usernameError = await addChildPage.getUsernameError();
    expect(usernameError).toContain('Username can only contain letters, numbers, and .-_');
    
    // Verify create button is disabled
    const isButtonDisabled = await addChildPage.isCreateButtonDisabled();
    expect(isButtonDisabled).toBe(true);
  });
});