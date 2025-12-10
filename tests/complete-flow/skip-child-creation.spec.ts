import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Complete Flow - Skip Child Creation', () => {
  test('should allow parent to skip child creation and access other features', async ({ parentRegistrationPage, addChildPage }) => {
    // First complete parent registration
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Navigate to Dashboard instead of creating child
    await addChildPage.navigateToDashboard();
    
    // Verify we can access dashboard
    const currentUrl = addChildPage.getCurrentUrl();
    expect(currentUrl).toContain('/dashboard');
    
    // Verify parent navigation items are still accessible
    // (This would require navigating back or checking the navigation state)
  });

  test('should allow navigation to other parent features without creating child', async ({ parentRegistrationPage, addChildPage }) => {
    // First complete parent registration
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Test navigation to different sections
    const navigationTests = [
      { method: 'navigateToAssignTests', expectedUrl: '/assign-test' },
      { method: 'navigateToTrackProgress', expectedUrl: '/child-progress' },
      { method: 'navigateToBilling', expectedUrl: '/billing' },
      { method: 'navigateToSettings', expectedUrl: '/settings' }
    ];
    
    for (const nav of navigationTests) {
      // Go back to add-child page
      await addChildPage.goto();
      await expect(addChildPage.pageHeading).toBeVisible();
      
      // Navigate to the section
      await (addChildPage as any)[nav.method]();
      
      // Verify URL contains expected path
      const currentUrl = addChildPage.getCurrentUrl();
      expect(currentUrl).toContain(nav.expectedUrl);
    }
  });
});