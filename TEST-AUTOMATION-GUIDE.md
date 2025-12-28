# TranquilMindQuest - UI Test Automation Guide

## Overview

This guide explains how to set up and run automated UI tests for the TranquilMindQuest website. The test suite uses **Playwright**, a modern end-to-end testing framework.

## Why Playwright?

- **Cross-browser**: Tests run on Chromium, Firefox, and WebKit (Safari)
- **Fast**: Parallel test execution and auto-waiting for elements
- **Reliable**: Built-in retries and automatic screenshots/videos on failure
- **Modern**: Supports modern web features and APIs
- **Developer-friendly**: Great debugging tools and test reports

> **Note**: You mentioned "Amazon nova act" - I'm not familiar with this tool. If you have a specific requirement for Amazon Q or another AWS service, we can integrate it. For now, Playwright provides comprehensive UI testing capabilities.

## Quick Start

### 1. Install Dependencies

```bash
cd tranquilmindquest-website
npm install
```

### 2. Install Playwright Browsers

```bash
npm run test:install
```

This installs Chromium, Firefox, and WebKit browsers needed for testing.

### 3. Run Tests

```bash
# Run all tests
npm test

# Run tests with browser visible (headed mode)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run specific test file
npx playwright test tests/homepage.spec.js
```

### 4. View Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

Or open: `test-results/html-report/index.html`

## Test Structure

### Test Files

All tests are in the `tests/` directory:

- **navigation.spec.js** - Navigation menu, mobile menu, skip links
- **homepage.spec.js** - Homepage sections, hero, stats, products, newsletter
- **contact-page.spec.js** - Contact form, chatbot, FAQ
- **responsive.spec.js** - Mobile, tablet, desktop layouts
- **accessibility.spec.js** - Keyboard navigation, screen readers, ARIA
- **page-navigation.spec.js** - All pages load correctly

### Test Cases

See `TEST-CASES.md` for the complete list of 200+ test cases covering:
- Navigation functionality
- Page content visibility
- Form validation
- Responsive design
- Accessibility (WCAG 2.1 AA)
- Cross-browser compatibility
- Performance

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests for specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests on mobile viewports
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Run specific test
npx playwright test -g "TC-024"

# Run tests in debug mode
npm run test:debug
```

### Advanced Options

```bash
# Run tests with specific timeout
npx playwright test --timeout=60000

# Run tests in parallel (default)
npx playwright test --workers=4

# Run tests sequentially
npx playwright test --workers=1

# Run only failed tests
npx playwright test --last-failed

# Update snapshots (for visual regression)
npx playwright test --update-snapshots
```

## Understanding Test Results

### Success Output

```
Running 45 tests using 4 workers

  ✓ tests/navigation.spec.js:10:5 › TC-001: Logo is visible (2.1s)
  ✓ tests/homepage.spec.js:5:5 › TC-024: Hero section is visible (1.8s)
  ...

  45 passed (45.2s)
```

### Failure Output

When tests fail, you'll see:

1. **Console output** showing which test failed and why
2. **Screenshots** in `test-results/` directory
3. **Videos** (if configured) showing the test execution
4. **HTML report** with detailed failure information

Example failure:
```
  ✘ tests/homepage.spec.js:15:5 › TC-027: Explore button is clickable (5.2s)

  Error: expect(received).toBeVisible()

  Expected: visible
  Received: hidden

  Call log:
    - expect.toBeVisible() at tests/homepage.spec.js:16:45
```

## Test Reports

### HTML Report

The HTML report provides:
- Test execution timeline
- Screenshots of failures
- Video recordings
- Console logs
- Network requests
- Full page traces

View it with:
```bash
npm run test:report
```

### JSON Report

Test results are also saved as JSON:
- `test-results/results.json` - Full test results
- `test-results/failed-tests.json` - Only failed tests (for fixing)

## Fixing Failed Tests

### Step 1: Identify the Failure

1. Run tests: `npm test`
2. Check the console output for failed test names
3. View HTML report: `npm run test:report`

### Step 2: Understand the Issue

Common failure reasons:
- **Element not found**: Selector changed or element removed
- **Timeout**: Page loads slowly or element appears after delay
- **Assertion failed**: Content changed or functionality broken
- **Network error**: Server not running or API endpoint changed

### Step 3: Debug the Test

```bash
# Run specific failing test in debug mode
npx playwright test tests/homepage.spec.js -g "TC-027" --debug
```

This opens Playwright Inspector where you can:
- Step through test execution
- Inspect page state
- See element selectors
- View console logs

### Step 4: Fix the Issue

**Option A: Fix the Website Code**
- If functionality is broken, fix the HTML/CSS/JS
- Update selectors if structure changed
- Add missing elements or attributes

**Option B: Update the Test**
- If test is incorrect, update the test code
- Adjust selectors to match current HTML
- Add wait conditions for dynamic content

### Step 5: Re-run Tests

```bash
# Run only failed tests
npx playwright test --last-failed

# Run all tests again
npm test
```

## Automated Test Fixing (Future Enhancement)

The test runner (`tests/run-all-tests.js`) saves failed tests to `test-results/failed-tests.json`. 

**Potential AI Integration:**
You could use Cursor AI to:
1. Read `failed-tests.json`
2. Analyze the failure reason
3. Suggest fixes or automatically fix code
4. Re-run tests to verify fixes

Example workflow:
```javascript
// Read failed tests
const failedTests = JSON.parse(fs.readFileSync('test-results/failed-tests.json'));

// For each failure, analyze and fix
for (const test of failedTests) {
  // Use AI to understand failure
  // Generate fix suggestion
  // Apply fix
  // Re-run test
}
```

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/tests.yml`:

```yaml
name: UI Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

## Best Practices

### 1. Test Organization
- Group related tests in `describe` blocks
- Use descriptive test names matching TC-XXX format
- Keep tests independent (no shared state)

### 2. Selectors
- Prefer stable selectors (IDs, data-testid)
- Avoid brittle selectors (CSS classes that change)
- Use semantic selectors when possible

### 3. Assertions
- Use specific assertions (`toBeVisible()` vs `toBeTruthy()`)
- Check both positive and negative cases
- Verify user-visible behavior, not implementation

### 4. Waits
- Playwright auto-waits, but add explicit waits for:
  - Network requests
  - Animations
  - Dynamic content loading

### 5. Test Data
- Use realistic test data
- Clean up after tests (clear localStorage, etc.)
- Don't rely on external services

## Troubleshooting

### Issue: "Server not running"

**Solution**: Tests auto-start the server, but if it fails:
```bash
# Start server manually
npm run serve

# Then run tests in another terminal
npm test
```

### Issue: "Browser not found"

**Solution**: Install browsers:
```bash
npm run test:install
```

### Issue: Tests timeout

**Solution**: Increase timeout in `playwright.config.js`:
```javascript
timeout: 60 * 1000, // 60 seconds
```

### Issue: Tests are flaky

**Solution**:
- Add explicit waits for dynamic content
- Use `waitForLoadState('networkidle')`
- Increase timeout
- Check for race conditions

### Issue: Selectors not found

**Solution**:
- Use Playwright Inspector to find correct selectors
- Check if element is in iframe (use `frameLocator()`)
- Verify element appears after some action

## Next Steps

1. **Run initial test suite**: `npm test`
2. **Review failures**: Check HTML report
3. **Fix critical issues**: Start with P0 tests
4. **Expand test coverage**: Add more test cases
5. **Set up CI/CD**: Automate test runs
6. **Integrate AI fixing**: Use Cursor AI to auto-fix failures

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Test Cases List](./TEST-CASES.md)
- [Test Files](./tests/README.md)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## Support

If you encounter issues:
1. Check test output and HTML report
2. Review `TEST-CASES.md` for expected behavior
3. Use debug mode to step through tests
4. Check Playwright documentation

---

**Happy Testing! 🚀**

