import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Navigation - Parent Menu Items', () => {
  test('should display all parent navigation menu items with correct accessibility', async ({ parentRegistrationPage, addChildPage }) => {
    // First complete parent registration to get authenticated state
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page with parent navigation
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Verify Dashboard link is visible
    await expect(addChildPage.dashboardLink).toBeVisible();
    
    // Verify Assign Tests link is visible
    await expect(addChildPage.assignTestsLink).toBeVisible();
    
    // Verify Track Progress link is visible
    await expect(addChildPage.trackProgressLink).toBeVisible();
    
    // Verify Billing link is visible
    await expect(addChildPage.billingLink).toBeVisible();
    
    // Verify Settings link is visible
    await expect(addChildPage.settingsLink).toBeVisible();
    
    // Verify all navigation items are visible using helper method
    const areAllItemsVisible = await addChildPage.areNavigationItemsVisible();
    expect(areAllItemsVisible).toBe(true);
    
    // Verify Sign Out button is visible
    await expect(addChildPage.signOutButton).toBeVisible();
  });

  test('should navigate to each menu item correctly', async ({ parentRegistrationPage, addChildPage }) => {
    // First complete parent registration
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Test each navigation item
    const navigationItems = [
      { link: addChildPage.dashboardLink, expectedUrl: '/dashboard', name: 'Dashboard' },
      { link: addChildPage.assignTestsLink, expectedUrl: '/assign-test', name: 'Assign Tests' },
      { link: addChildPage.trackProgressLink, expectedUrl: '/child-progress', name: 'Track Progress' },
      { link: addChildPage.billingLink, expectedUrl: '/billing', name: 'Billing' },
      { link: addChildPage.settingsLink, expectedUrl: '/settings', name: 'Settings' }
    ];
    
    for (const item of navigationItems) {
      // Click the navigation link
      await item.link.click();
      
      // Wait for navigation
      await addChildPage.page.waitForLoadState('networkidle');
      
      // Verify URL
      const currentUrl = addChildPage.getCurrentUrl();
      expect(currentUrl).toContain(item.expectedUrl);
      
      // Go back to add-child page for next test
      await addChildPage.goto();
      await expect(addChildPage.pageHeading).toBeVisible();
    }
  });
});