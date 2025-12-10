import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Add Child - Trial Message Display', () => {
  test('should display trial information message', async ({ addChildPage, parentRegistrationPage }) => {
    // First register as parent to get to add-child page
    const timestamp = Date.now();
    const parentEmail = `testparent${timestamp}@example.com`;
    const parentPassword = 'Test@12345';
    
    await parentRegistrationPage.goto();
    await parentRegistrationPage.acceptCookies();
    await parentRegistrationPage.register(parentEmail, parentPassword);
    
    // Should be on add-child page
    await expect(addChildPage.pageHeading).toBeVisible();
    
    // Verify trial message is visible
    await expect(addChildPage.trialMessage).toBeVisible();
    
    // Verify trial message content
    const trialMessage = await addChildPage.getTrialMessage();
    expect(trialMessage).toContain('After creating your child\\'s account, you\\'ll be able to start a free 7-day trial');
  });
});