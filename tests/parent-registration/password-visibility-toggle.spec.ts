import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Parent Registration - Password Visibility Toggle', () => {
  test('should toggle password visibility correctly', async ({ parentRegistrationPage }) => {
    // Navigate to registration page
    await parentRegistrationPage.goto();
    
    // Accept cookies
    await parentRegistrationPage.acceptCookies();
    
    // Enter password
    const password = 'Test@12345';
    await parentRegistrationPage.passwordInput.fill(password);
    
    // Verify password is initially hidden (type="password")
    const initialType = await parentRegistrationPage.passwordInput.getAttribute('type');
    expect(initialType).toBe('password');
    
    // Click toggle button to show password
    await parentRegistrationPage.togglePasswordVisibility();
    
    // Verify password is now visible (type="text")
    const visibleType = await parentRegistrationPage.passwordInput.getAttribute('type');
    expect(visibleType).toBe('text');
    
    // Click toggle button again to hide password
    await parentRegistrationPage.togglePasswordVisibility();
    
    // Verify password is hidden again (type="password")
    const hiddenType = await parentRegistrationPage.passwordInput.getAttribute('type');
    expect(hiddenType).toBe('password');
  });
});