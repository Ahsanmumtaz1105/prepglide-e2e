# PrepGlide E2E Testing Framework

End-to-end testing framework built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** pattern.

## 🚀 Features

- **Playwright Latest Features**: Leverages Playwright's advanced capabilities
  - **Smart Locators**: Role-based selectors with auto-healing capabilities
  - **Auto-waiting**: Built-in intelligent waiting mechanisms
  - **Code Generator**: Record and generate tests with `npm run codegen`
  - **UI Mode**: Visual test runner with `npm run test:ui`
  - **Trace Viewer**: Debug failed tests with detailed traces

- **Page Object Model (POM)**: Clean, maintainable test architecture
- **TypeScript**: Full type safety and IntelliSense support
- **Cross-browser Testing**: Chromium, Firefox, WebKit, and mobile viewports
- **Parallel Execution**: Fast test runs with parallel workers

## 📁 Project Structure

```
prepglide-e2e/
├── fixtures/           # Test fixtures for dependency injection
│   ├── pageFixtures.ts # Page object fixtures
│   └── index.ts
├── pages/              # Page Object Model classes
│   ├── BasePage.ts     # Base page with common methods
│   ├── HomePage.ts     # Home page object
│   ├── LoginPage.ts    # Login page object
│   └── index.ts
├── tests/              # Test specifications
│   ├── home.spec.ts    # Home page tests
│   ├── login.spec.ts   # Login page tests
│   └── example.spec.ts # Example/demo tests
├── utils/              # Utility functions
│   ├── helpers.ts      # Test helpers and data generators
│   └── index.ts
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Ahsanmumtaz1105/prepglide-e2e.git
cd prepglide-e2e

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:ui` | Open Playwright UI Mode (interactive) |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:chromium` | Run tests only in Chromium |
| `npm run test:firefox` | Run tests only in Firefox |
| `npm run test:webkit` | Run tests only in WebKit |
| `npm run test:mobile` | Run tests on mobile viewports |
| `npm run codegen` | Open Playwright Code Generator |
| `npm run report` | Open HTML test report |
| `npm run trace` | Open trace viewer |

## 🎭 Using Playwright Features

### Code Generator (Record Tests)
```bash
# Open code generator to record tests
npm run codegen

# Record tests for a specific URL
npx playwright codegen https://your-app.com
```

### UI Mode (Visual Test Runner)
```bash
npm run test:ui
```

### Debug Mode
```bash
npm run test:debug
```

### View Test Report
```bash
npm run report
```

## 📝 Writing Tests

### Using Page Objects with Fixtures

```typescript
import { test, expect } from '../fixtures/pageFixtures';

test('should login successfully', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginWithEmail('user@example.com', 'password');
  // Add assertions
});
```

### Using Base Playwright

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to home', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Home/);
});
```

## 🔧 Configuration

Edit `playwright.config.ts` to customize:
- Base URL
- Browser projects
- Timeouts
- Reporters
- Parallel execution settings

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npm run report
```

Reports are saved in the `playwright-report/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
