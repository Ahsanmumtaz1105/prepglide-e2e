import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Add Child - Password Too Short Validation', () => {
  test('should show validation error for password less than 6 characters', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent to get to add-child page
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Fill form with short password
    await addChildPage.fillChildForm(
      'Test Child',
      'testusername',
      'abc'  // Less than 6 characters
    );
    
    // Verify password error is displayed
    await expect(addChildPage.passwordError).toBeVisible();
    const passwordError = await addChildPage.getPasswordError();
    expect(passwordError).toContain('Password must be at least 6 characters');
    
    // Verify create button is disabled
    const isButtonDisabled = await addChildPage.isCreateButtonDisabled();
    expect(isButtonDisabled).toBe(true);
  });
});