import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Add Child - Password Visibility Toggle', () => {
  test('should toggle password visibility correctly', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent to get to add-child page
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Enter password
    const childPassword = 'Test@123';
    await addChildPage.passwordInput.fill(childPassword);
    
    // Verify password is initially hidden (type="password")
    const initialType = await addChildPage.passwordInput.getAttribute('type');
    expect(initialType).toBe('password');
    
    // Click toggle button to show password
    await addChildPage.togglePasswordVisibility();
    
    // Verify password is now visible (type="text")
    const visibleType = await addChildPage.passwordInput.getAttribute('type');
    expect(visibleType).toBe('text');
    
    // Click toggle button again to hide password
    await addChildPage.togglePasswordVisibility();
    
    // Verify password is hidden again (type="password")
    const hiddenType = await addChildPage.passwordInput.getAttribute('type');
    expect(hiddenType).toBe('password');
  });
});