/**
 * Extract and categorize all test failures from results.json
 */

const fs = require('fs');
const path = require('path');

const RESULTS_FILE = path.join(__dirname, '../test-results/results.json');
const OUTPUT_FILE = path.join(__dirname, '../test-results/failure-analysis.json');

function extractFailures() {
  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));
  
  const failures = [];
  const categories = {
    P0: [], // Critical - Navigation, Forms, Page Load
    P1: [], // High - Content visibility, Links
    P2: [], // Medium - Responsive, Accessibility
    P3: []  // Low - Animations, Performance
  };

  function processSuite(suite) {
    if (suite.specs) {
      suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
          test.results.forEach(result => {
            if (result.status === 'failed') {
              const error = result.error?.message || 'Unknown error';
              const testTitle = spec.title;
              const testFile = spec.file;
              
              const failure = {
                file: testFile,
                title: testTitle,
                project: test.projectName,
                error: error,
                duration: result.duration,
                priority: determinePriority(testTitle, error)
              };
              
              failures.push(failure);
              categories[failure.priority].push(failure);
            }
          });
        });
      });
    }
    
    if (suite.suites) {
      suite.suites.forEach(subSuite => processSuite(subSuite));
    }
  }

  function determinePriority(title, error) {
    const titleLower = title.toLowerCase();
    const errorLower = error.toLowerCase();
    
    // P0 - Critical
    if (titleLower.includes('navigation') || 
        titleLower.includes('menu') ||
        titleLower.includes('form') ||
        titleLower.includes('submit') ||
        titleLower.includes('page loads') ||
        titleLower.includes('page has correct title')) {
      return 'P0';
    }
    
    // P1 - High
    if (titleLower.includes('visible') ||
        titleLower.includes('clickable') ||
        titleLower.includes('navigate') ||
        titleLower.includes('button') ||
        titleLower.includes('link')) {
      return 'P1';
    }
    
    // P2 - Medium
    if (titleLower.includes('responsive') ||
        titleLower.includes('mobile') ||
        titleLower.includes('tablet') ||
        titleLower.includes('accessibility') ||
        titleLower.includes('keyboard') ||
        titleLower.includes('landmark')) {
      return 'P2';
    }
    
    // P3 - Low
    return 'P3';
  }

  results.suites.forEach(suite => processSuite(suite));

  const summary = {
    totalFailures: failures.length,
    byPriority: {
      P0: categories.P0.length,
      P1: categories.P1.length,
      P2: categories.P2.length,
      P3: categories.P3.length
    },
    byFile: {},
    failures: categories
  };

  // Group by file
  failures.forEach(f => {
    if (!summary.byFile[f.file]) {
      summary.byFile[f.file] = 0;
    }
    summary.byFile[f.file]++;
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(summary, null, 2));
  
  console.log('📊 Test Failure Analysis\n');
  console.log(`Total Failures: ${summary.totalFailures}\n`);
  console.log('By Priority:');
  console.log(`  P0 (Critical): ${summary.byPriority.P0}`);
  console.log(`  P1 (High): ${summary.byPriority.P1}`);
  console.log(`  P2 (Medium): ${summary.byPriority.P2}`);
  console.log(`  P3 (Low): ${summary.byPriority.P3}\n`);
  console.log('By File:');
  Object.entries(summary.byFile).forEach(([file, count]) => {
    console.log(`  ${file}: ${count}`);
  });
  console.log(`\n✅ Detailed analysis saved to: ${OUTPUT_FILE}\n`);
  
  return summary;
}

if (require.main === module) {
  extractFailures();
}

module.exports = { extractFailures };

