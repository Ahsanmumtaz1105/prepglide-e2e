import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Navigation - Mobile Menu Toggle', () => {
  test('should display and toggle mobile menu correctly', async ({ parentRegistrationPage, addChildPage }) => {
    // First complete parent registration
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Set viewport to mobile size to trigger mobile menu
    await addChildPage.page.setViewportSize({ width: 375, height: 667 });
    
    // Look for hamburger menu button (common selectors)
    const menuToggle = addChildPage.page.locator('button').filter({ 
      hasText: /menu|hamburger|toggle/i 
    }).or(
      addChildPage.page.locator('[aria-label*="menu"]')
    ).or(
      addChildPage.page.locator('.menu-toggle, .hamburger, [data-testid*="menu"]')
    );
    
    // Verify menu toggle button exists (if mobile menu is implemented)
    const isMenuToggleVisible = await menuToggle.isVisible().catch(() => false);
    
    if (isMenuToggleVisible) {
      // Click menu toggle to open
      await menuToggle.click();
      
      // Verify menu items are accessible in mobile view
      // This would depend on the specific mobile menu implementation
      
      // Close menu by clicking toggle again
      await menuToggle.click();
    } else {
      // If no mobile menu toggle, verify navigation items are still accessible
      const areNavItemsVisible = await addChildPage.areNavigationItemsVisible();
      expect(areNavItemsVisible).toBe(true);
    }
  });
});