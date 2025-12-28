# TranquilMindQuest UI Test Suite

This directory contains automated UI tests for the TranquilMindQuest website using Playwright.

## Test Structure

- `navigation.spec.js` - Navigation and header tests
- `homepage.spec.js` - Homepage functionality tests
- `contact-page.spec.js` - Contact page and form tests
- `responsive.spec.js` - Responsive design tests
- `accessibility.spec.js` - Accessibility and a11y tests
- `page-navigation.spec.js` - Page loading and navigation tests

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/homepage.spec.js
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests for specific browser
```bash
npx playwright test --project=chromium
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

Or open: `test-results/html-report/index.html`

## Configuration

Test configuration is in `playwright.config.js` at the root of the project.

## Writing New Tests

1. Create a new test file in the `tests/` directory
2. Follow the existing test structure
3. Use descriptive test names matching TC-XXX format from TEST-CASES.md
4. Add appropriate assertions using Playwright's expect API

Example:
```javascript
const { test, expect } = require('@playwright/test');

test.describe('My Feature Tests', () => {
  test('TC-XXX: Test description', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.my-element')).toBeVisible();
  });
});
```

## CI/CD Integration

Tests can be run in CI/CD pipelines. The configuration supports:
- Parallel test execution
- Retry on failure
- Screenshot and video capture on failure
- HTML report generation

## Troubleshooting

### Tests fail with "Server not running"
Make sure the local server is running:
```bash
npm run serve
```

Or tests will auto-start the server if `webServer` is configured.

### Tests timeout
Increase timeout in `playwright.config.js`:
```javascript
timeout: 60 * 1000, // 60 seconds
```

### Browser not found
Install browsers:
```bash
npx playwright install
```

