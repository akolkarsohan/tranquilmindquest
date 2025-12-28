const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-024: Hero section is visible', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
  });

  test('TC-025: Hero title is displayed', async ({ page }) => {
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Tranquil Mind');
  });

  test('TC-027: Explore Free Resources button is clickable', async ({ page }) => {
    const exploreButton = page.locator('a.btn-primary:has-text("Explore Free Resources")');
    await expect(exploreButton).toBeVisible();
    await expect(exploreButton).toHaveAttribute('href', '#coping-techniques');
  });

  test('TC-028: Take 5-Minute Calm Break button is clickable', async ({ page }) => {
    const calmBreakButton = page.locator('a.btn-secondary:has-text("Take 5-Minute Calm Break")');
    await expect(calmBreakButton).toBeVisible();
    await expect(calmBreakButton).toHaveAttribute('href', 'breathing.html');
  });

  test('TC-034: Stats section title is displayed', async ({ page }) => {
    const statsSection = page.locator('#mental-health-stats');
    await expect(statsSection).toBeVisible();
    await expect(statsSection.locator('h2')).toContainText('You\'re Not Alone');
  });

  test('TC-035: All 4 stat cards are visible', async ({ page }) => {
    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(4);
  });

  test('TC-045: Coping techniques section is visible', async ({ page }) => {
    const techniquesSection = page.locator('#coping-techniques');
    await expect(techniquesSection).toBeVisible();
  });

  test('TC-046: All 4 technique cards are visible', async ({ page }) => {
    const techniqueCards = page.locator('.technique-card');
    await expect(techniqueCards).toHaveCount(4);
  });

  test('TC-048: Start Meditating button navigates correctly', async ({ page }) => {
    const meditationButton = page.locator('a:has-text("Start Meditating")');
    await expect(meditationButton).toHaveAttribute('href', 'meditation.html');
  });

  test('TC-053: Wellness journey section is visible', async ({ page }) => {
    const journeySection = page.locator('#wellness-journey');
    await expect(journeySection).toBeVisible();
  });

  test('TC-054: All 5 journey steps are visible', async ({ page }) => {
    const journeySteps = page.locator('.journey-step');
    await expect(journeySteps).toHaveCount(5);
  });

  test('TC-058: Products section is visible', async ({ page }) => {
    const productsSection = page.locator('#wellness-products');
    await expect(productsSection).toBeVisible();
  });

  test('TC-061: View on Amazon buttons are clickable', async ({ page }) => {
    const amazonButtons = page.locator('a.btn-primary:has-text("View on Amazon")');
    const count = await amazonButtons.count();
    expect(count).toBeGreaterThan(0);
    
    const firstButton = amazonButtons.first();
    await expect(firstButton).toHaveAttribute('target', '_blank');
    await expect(firstButton).toHaveAttribute('rel', 'noopener');
  });

  test('TC-065: Blog section is visible', async ({ page }) => {
    const blogSection = page.locator('#latest-resources');
    await expect(blogSection).toBeVisible();
  });

  test('TC-071: Newsletter section is visible', async ({ page }) => {
    const newsletterSection = page.locator('#newsletter');
    await expect(newsletterSection).toBeVisible();
  });

  test('TC-072: Email input field is present', async ({ page }) => {
    const emailInput = page.locator('#newsletter-form input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('TC-074: Form validation works for empty email', async ({ page }) => {
    const submitButton = page.locator('#newsletter-form button[type="submit"]');
    await submitButton.click();
    
    const emailInput = page.locator('#newsletter-form input[type="email"]');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('TC-075: Invalid email format shows error', async ({ page }) => {
    const emailInput = page.locator('#newsletter-form input[type="email"]');
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    
    // Check if browser validation catches it
    const validity = await emailInput.evaluate((el) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('TC-079: Footer is visible', async ({ page }) => {
    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();
  });

  test('TC-080: Footer sections are displayed', async ({ page }) => {
    const footerSections = page.locator('.footer-section');
    await expect(footerSections).toHaveCount(4);
  });
});

