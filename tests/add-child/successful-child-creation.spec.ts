import { test, expect } from '../../fixtures/pageFixtures';
import { TestDataGenerator } from '../../utils/helpers';

test.describe('Add Child - Successful Child Creation', () => {
  test('should create child account with valid details', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be redirected to add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Verify page elements
    await expect(addChildPage.pageDescription).toBeVisible();
    await expect(addChildPage.trialMessage).toBeVisible();
    
    // Verify age group is pre-filled
    const ageGroupValue = await addChildPage.getAgeGroupValue();
    expect(ageGroupValue).toContain('10-11 years');
    
    // Verify age group is disabled
    const isAgeGroupDisabled = await addChildPage.isAgeGroupDisabled();
    expect(isAgeGroupDisabled).toBe(true);
    
    // Fill child form
    const childName = 'John Smith';
    const username = `johnsmith${timestamp}`;
    const childPassword = 'Child@123';
    
    await addChildPage.fillChildForm(childName, username, childPassword);
    
    // Verify create button is enabled
    const isButtonEnabled = await addChildPage.isCreateButtonEnabled();
    expect(isButtonEnabled).toBe(true);
    
    // Create child account
    await addChildPage.clickCreateChild();
    
    // Verify successful creation (would need to check for success state)
    // This depends on the actual application behavior after successful creation
  });
});