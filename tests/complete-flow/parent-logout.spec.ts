import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Complete Flow - Parent Logout', () => {
  test('should logout parent successfully', async ({ parentRegistrationPage, addChildPage, loginPage }) => {
    // First complete parent registration
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Click Sign Out button
    await addChildPage.signOut();
    
    // Verify we're redirected to login page or home page
    const currentUrl = addChildPage.getCurrentUrl();
    expect(currentUrl.includes('/login') || currentUrl.includes('/')).toBe(true);
    
    // Try to access add-child page directly (should redirect to login)
    await addChildPage.goto();
    
    // Should be redirected back to login
    const finalUrl = addChildPage.getCurrentUrl();
    expect(finalUrl).toContain('/login');
  });
});