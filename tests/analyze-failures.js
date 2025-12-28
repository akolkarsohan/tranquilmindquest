/**
 * Analyze Failed Tests Script
 * 
 * This script reads failed test results and provides analysis
 * that can be used with AI tools (like Cursor) to fix issues.
 * 
 * Usage: node tests/analyze-failures.js
 */

const fs = require('fs');
const path = require('path');

const FAILED_TESTS_FILE = path.join(__dirname, '../test-results/failed-tests.json');
const RESULTS_FILE = path.join(__dirname, '../test-results/results.json');

function analyzeFailures() {
  console.log('🔍 Analyzing Failed Tests...\n');

  // Check if failed tests file exists
  if (!fs.existsSync(FAILED_TESTS_FILE)) {
    console.log('✅ No failed tests found!');
    console.log('   Run tests first: npm test\n');
    return;
  }

  // Read failed tests
  const failedTests = JSON.parse(fs.readFileSync(FAILED_TESTS_FILE, 'utf-8'));

  if (failedTests.length === 0) {
    console.log('✅ No failed tests! All tests passed.\n');
    return;
  }

  console.log(`❌ Found ${failedTests.length} failed test suite(s)\n`);

  // Categorize failures
  const categories = {
    selector: [],
    timeout: [],
    assertion: [],
    navigation: [],
    form: [],
    other: []
  };

  failedTests.forEach(suite => {
    suite.tests.forEach(test => {
      const error = test.error.toLowerCase();
      
      if (error.includes('not found') || error.includes('selector') || error.includes('locator')) {
        categories.selector.push({ suite: suite.title, test: test.title, error: test.error });
      } else if (error.includes('timeout') || error.includes('waiting')) {
        categories.timeout.push({ suite: suite.title, test: test.title, error: test.error });
      } else if (error.includes('expected') || error.includes('assertion')) {
        categories.assertion.push({ suite: suite.title, test: test.title, error: test.error });
      } else if (error.includes('navigation') || error.includes('url')) {
        categories.navigation.push({ suite: suite.title, test: test.title, error: test.error });
      } else if (error.includes('form') || error.includes('input') || error.includes('submit')) {
        categories.form.push({ suite: suite.title, test: test.title, error: test.error });
      } else {
        categories.other.push({ suite: suite.title, test: test.title, error: test.error });
      }
    });
  });

  // Print categorized failures
  console.log('📊 Failure Categories:\n');

  if (categories.selector.length > 0) {
    console.log(`🔍 Selector Issues (${categories.selector.length}):`);
    categories.selector.forEach(item => {
      console.log(`   - ${item.suite}: ${item.test}`);
      console.log(`     Error: ${item.error.substring(0, 100)}...`);
    });
    console.log('');
  }

  if (categories.timeout.length > 0) {
    console.log(`⏱️  Timeout Issues (${categories.timeout.length}):`);
    categories.timeout.forEach(item => {
      console.log(`   - ${item.suite}: ${item.test}`);
      console.log(`     Error: ${item.error.substring(0, 100)}...`);
    });
    console.log('');
  }

  if (categories.assertion.length > 0) {
    console.log(`❌ Assertion Failures (${categories.assertion.length}):`);
    categories.assertion.forEach(item => {
      console.log(`   - ${item.suite}: ${item.test}`);
      console.log(`     Error: ${item.error.substring(0, 100)}...`);
    });
    console.log('');
  }

  if (categories.navigation.length > 0) {
    console.log(`🧭 Navigation Issues (${categories.navigation.length}):`);
    categories.navigation.forEach(item => {
      console.log(`   - ${item.suite}: ${item.test}`);
      console.log(`     Error: ${item.error.substring(0, 100)}...`);
    });
    console.log('');
  }

  if (categories.form.length > 0) {
    console.log(`📝 Form Issues (${categories.form.length}):`);
    categories.form.forEach(item => {
      console.log(`   - ${item.suite}: ${item.test}`);
      console.log(`     Error: ${item.error.substring(0, 100)}...`);
    });
    console.log('');
  }

  if (categories.other.length > 0) {
    console.log(`❓ Other Issues (${categories.other.length}):`);
    categories.other.forEach(item => {
      console.log(`   - ${item.suite}: ${item.test}`);
      console.log(`     Error: ${item.error.substring(0, 100)}...`);
    });
    console.log('');
  }

  // Generate fix suggestions
  console.log('💡 Fix Suggestions:\n');

  if (categories.selector.length > 0) {
    console.log('🔍 For Selector Issues:');
    console.log('   1. Check if element exists in HTML');
    console.log('   2. Verify selector is correct (use Playwright Inspector)');
    console.log('   3. Add wait conditions if element loads dynamically');
    console.log('   4. Check if element is in iframe (use frameLocator)');
    console.log('');
  }

  if (categories.timeout.length > 0) {
    console.log('⏱️  For Timeout Issues:');
    console.log('   1. Increase timeout in playwright.config.js');
    console.log('   2. Add explicit wait: await page.waitForSelector(...)');
    console.log('   3. Wait for network: await page.waitForLoadState("networkidle")');
    console.log('   4. Check if server is running and responsive');
    console.log('');
  }

  if (categories.assertion.length > 0) {
    console.log('❌ For Assertion Failures:');
    console.log('   1. Verify expected behavior matches actual behavior');
    console.log('   2. Check if content/text changed on website');
    console.log('   3. Update test expectations if website changed intentionally');
    console.log('   4. Fix website code if functionality is broken');
    console.log('');
  }

  // Save analysis to file
  const analysisFile = path.join(__dirname, '../test-results/failure-analysis.json');
  fs.writeFileSync(analysisFile, JSON.stringify(categories, null, 2));
  console.log(`📄 Detailed analysis saved to: ${analysisFile}\n`);

  console.log('🔧 Next Steps:');
  console.log('   1. Review the HTML report: npm run test:report');
  console.log('   2. Use debug mode for specific test: npm run test:debug');
  console.log('   3. Fix issues based on suggestions above');
  console.log('   4. Re-run tests: npm test -- --last-failed\n');
}

// Run analysis
if (require.main === module) {
  analyzeFailures();
}

module.exports = { analyzeFailures };

