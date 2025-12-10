# PrepGlide E2E Testing Framework

Comprehensive end-to-end testing framework for **PrepGlide** application built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** pattern.

## 🎯 Test Coverage

This framework provides complete test coverage for PrepGlide's core user registration and onboarding workflows:

- **Parent Registration Flow** (9 test scenarios)
- **Child Account Creation** (8 test scenarios) 
- **End-to-End User Journeys** (3 test scenarios)
- **Navigation & UI Components** (3 test scenarios)

**Total: 33 comprehensive test scenarios** covering all validation rules, error states, and user interactions.

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
│   ├── pageFixtures.ts # Page object fixtures with all page objects
│   └── index.ts
├── pages/              # Page Object Model classes
│   ├── BasePage.ts               # Base page with common methods
│   ├── HomePage.ts               # Home page object
│   ├── LoginPage.ts              # Login page object
│   ├── ParentRegistrationPage.ts # Parent registration page object
│   ├── AddChildPage.ts           # Add child account page object
│   └── index.ts
├── specs/              # Test plans and specifications
│   └── parent-registration-add-child.plan.md # Comprehensive test plan
├── tests/              # Test specifications organized by feature
│   ├── parent-registration/      # Parent registration tests (9 tests)
│   │   ├── successful-registration.spec.ts
│   │   ├── empty-fields-validation.spec.ts
│   │   ├── invalid-email-validation.spec.ts
│   │   ├── password-too-short-validation.spec.ts
│   │   ├── password-too-long-validation.spec.ts
│   │   ├── password-mismatch-validation.spec.ts
│   │   ├── incorrect-captcha-validation.spec.ts
│   │   ├── password-visibility-toggle.spec.ts
│   │   └── navigate-to-login.spec.ts
│   ├── add-child/                # Child account creation tests (8 tests)
│   │   ├── successful-child-creation.spec.ts
│   │   ├── empty-name-validation.spec.ts
│   │   ├── invalid-username-validation.spec.ts
│   │   ├── valid-username-formats.spec.ts
│   │   ├── password-too-short-validation.spec.ts
│   │   ├── password-visibility-toggle.spec.ts
│   │   ├── age-group-display.spec.ts
│   │   └── trial-message-display.spec.ts
│   ├── complete-flow/            # End-to-end workflow tests (3 tests)
│   │   ├── e2e-parent-and-child-creation.spec.ts
│   │   ├── parent-logout.spec.ts
│   │   └── skip-child-creation.spec.ts
│   ├── navigation/               # Navigation and UI tests (3 tests)
│   │   ├── parent-menu-items.spec.ts
│   │   ├── mobile-menu-toggle.spec.ts
│   │   └── logo-navigation.spec.ts
│   ├── home.spec.ts              # Home page tests
│   ├── login.spec.ts             # Login page tests
│   └── example.spec.ts           # Example/demo tests
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

### Run Specific Test Suites

```bash
# Run parent registration tests only
npm test tests/parent-registration

# Run add child tests only
npm test tests/add-child

# Run complete flow tests
npm test tests/complete-flow

# Run navigation tests
npm test tests/navigation

# Run a specific test file
npm test tests/parent-registration/successful-registration.spec.ts
```

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

// Parent Registration Test Example
test('should register parent successfully', async ({ parentRegistrationPage, addChildPage }) => {
  await parentRegistrationPage.goto();
  await parentRegistrationPage.acceptCookies();
  
  const email = `testparent${Date.now()}@example.com`;
  await parentRegistrationPage.register(email, 'Test@12345');
  
  // Verify redirect to add-child page
  await expect(addChildPage.pageHeading).toBeVisible();
});

// Add Child Test Example
test('should create child account', async ({ addChildPage }) => {
  // Assume parent is already logged in
  await addChildPage.goto();
  await addChildPage.createChild('John Doe', 'johndoe123', 'Child@123');
  
  await expect(addChildPage.trialMessage).toBeVisible();
});

// Login Test Example
test('should login successfully', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginWithEmail('user@example.com', 'password');
});
```

### Available Page Objects

- **`parentRegistrationPage`** - Parent/guardian registration functionality
- **`addChildPage`** - Child account creation and management
- **`loginPage`** - User authentication
- **`homePage`** - Home page interactions

### Test Data Management

```typescript
// Generate unique test data to avoid conflicts
const timestamp = Date.now();
const email = `testuser${timestamp}@example.com`;
const username = `testchild${timestamp}`;
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
