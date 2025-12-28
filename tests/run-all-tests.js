/**
 * Test Runner Script
 * Executes all tests and generates a report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEST_RESULTS_DIR = path.join(__dirname, '../test-results');
const FAILED_TESTS_FILE = path.join(TEST_RESULTS_DIR, 'failed-tests.json');

// Ensure test results directory exists
if (!fs.existsSync(TEST_RESULTS_DIR)) {
  fs.mkdirSync(TEST_RESULTS_DIR, { recursive: true });
}

console.log('🚀 Starting TranquilMindQuest UI Tests...\n');

try {
  // Run Playwright tests
  console.log('📋 Running all test suites...\n');
  
  execSync('npx playwright test', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  
  console.log('\n✅ All tests passed!');
  
} catch (error) {
  console.error('\n❌ Some tests failed!');
  
  // Read test results
  const resultsFile = path.join(TEST_RESULTS_DIR, 'results.json');
  if (fs.existsSync(resultsFile)) {
    const results = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
    const failedTests = results.suites
      .flatMap(suite => suite.specs)
      .filter(spec => spec.tests.some(test => test.results.some(r => r.status === 'failed')))
      .map(spec => ({
        file: spec.file,
        title: spec.title,
        tests: spec.tests
          .filter(test => test.results.some(r => r.status === 'failed'))
          .map(test => ({
            title: test.title,
            status: test.results[0].status,
            error: test.results[0].error?.message || 'Unknown error',
          })),
      }));
    
    // Save failed tests to file
    fs.writeFileSync(FAILED_TESTS_FILE, JSON.stringify(failedTests, null, 2));
    
    console.log(`\n📊 Found ${failedTests.length} failed test suite(s)`);
    console.log(`\n📝 Failed tests saved to: ${FAILED_TESTS_FILE}`);
    console.log('\n💡 Review the HTML report for detailed information:');
    console.log(`   ${path.join(TEST_RESULTS_DIR, 'html-report', 'index.html')}`);
    
    // Exit with error code
    process.exit(1);
  } else {
    process.exit(1);
  }
}

