import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Add Child - Age Group Display', () => {
  test('should display age group correctly with helper text', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent to get to add-child page
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Verify age group field shows correct value
    const ageGroupValue = await addChildPage.getAgeGroupValue();
    expect(ageGroupValue).toContain('10-11 years');
    
    // Verify age group field is disabled
    const isDisabled = await addChildPage.isAgeGroupDisabled();
    expect(isDisabled).toBe(true);
    
    // Verify helper text is displayed
    await expect(addChildPage.ageGroupHelperText).toBeVisible();
    const helperText = await addChildPage.ageGroupHelperText.textContent();
    expect(helperText).toContain('Default year group for the 11+ exam preparation');
  });
});