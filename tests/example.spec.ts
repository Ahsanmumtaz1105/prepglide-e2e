import { test, expect } from '@playwright/test';

/**
 * Example Tests demonstrating Playwright's latest features
 * These tests showcase AI-assisted testing capabilities:
 * - Planner: Strategic test organization
 * - Generator: Auto-generated selectors and actions
 * - Healer: Resilient selectors with fallbacks
 */

test.describe('Playwright Demo Tests', () => {
  
  test('should demonstrate smart locators', async ({ page }) => {
    // Navigate to Playwright's demo page
    await page.goto('https://playwright.dev/');
    
    // Using role-based locators (auto-healing friendly)
    const getStartedLink = page.getByRole('link', { name: /get started/i });
    await expect(getStartedLink).toBeVisible();
    
    // Click and verify navigation
    await getStartedLink.click();
    await expect(page).toHaveURL(/.*docs\/intro/);
  });

  test('should demonstrate chained locators', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Using chained locators for specificity
    const navbar = page.locator('nav');
    const navLinks = navbar.getByRole('link');
    
    // Count should be greater than 0
    await expect(navLinks.first()).toBeVisible();
  });

  test('should demonstrate auto-waiting', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Playwright automatically waits for elements
    // No need for explicit waits in most cases
    const title = page.locator('h1');
    await expect(title).toBeVisible();
    
    const titleText = await title.textContent();
    expect(titleText).toBeTruthy();
  });

  test('should demonstrate filtering locators', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Filter locators for more precise selection
    const links = page.getByRole('link');
    const docsLink = links.filter({ hasText: /docs/i });
    
    await expect(docsLink.first()).toBeVisible();
  });

  test('should demonstrate assertions', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Web-first assertions
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.locator('body')).toBeVisible();
    
    // Soft assertions (don't stop test on failure)
    await expect.soft(page.locator('footer')).toBeVisible();
  });
});

test.describe('Visual Testing Features', () => {
  
  test('should take screenshots for visual comparison', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Full page screenshot
    await page.screenshot({ path: 'test-results/screenshots/playwright-home.png', fullPage: true });
    
    // Element screenshot
    const header = page.locator('header');
    await header.screenshot({ path: 'test-results/screenshots/header.png' });
  });

  test.skip('should perform visual comparison', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Visual regression testing (requires baseline)
    await expect(page).toHaveScreenshot('playwright-home.png');
  });
});

test.describe('Network Interception', () => {
  
  test('should intercept network requests', async ({ page }) => {
    // Set up request interception
    const requests: string[] = [];
    page.on('request', (request) => {
      requests.push(request.url());
    });
    
    await page.goto('https://playwright.dev/');
    
    // Verify requests were captured
    expect(requests.length).toBeGreaterThan(0);
  });

  test('should mock API responses', async ({ page }) => {
    // Mock an API endpoint
    await page.route('**/api/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ mocked: true }),
      });
    });
    
    await page.goto('https://playwright.dev/');
    // Any API calls to /api/** would now return the mocked response
  });
});
