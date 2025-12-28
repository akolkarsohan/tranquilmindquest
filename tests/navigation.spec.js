const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-001: Logo is visible and clickable', async ({ page }) => {
    const logo = page.locator('.nav-brand');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', 'index.html');
  });

  test('TC-002: Logo links to homepage', async ({ page }) => {
    await page.goto('/about.html');
    await page.click('.nav-brand');
    await expect(page).toHaveURL(/index\.html/);
  });

  test('TC-003: All navigation links are visible', async ({ page }) => {
    const navLinks = page.locator('.nav-menu a.nav-link');
    await expect(navLinks).toHaveCount(5); // Home, About, Wellness, Resources, Contact
  });

  test('TC-004: Wellness dropdown appears on hover', async ({ page }) => {
    const wellnessDropdown = page.locator('.nav-dropdown');
    await wellnessDropdown.hover();
    const dropdownMenu = page.locator('.dropdown-menu');
    await expect(dropdownMenu).toBeVisible();
  });

  test('TC-005: Dropdown menu contains correct links', async ({ page }) => {
    const wellnessDropdown = page.locator('.nav-dropdown');
    await wellnessDropdown.hover();
    
    const dropdownLinks = page.locator('.dropdown-link');
    await expect(dropdownLinks).toHaveCount(4);
    await expect(dropdownLinks.nth(0)).toHaveAttribute('href', 'meditation.html');
    await expect(dropdownLinks.nth(1)).toHaveAttribute('href', 'breathing.html');
    await expect(dropdownLinks.nth(2)).toHaveAttribute('href', 'yoga.html');
    await expect(dropdownLinks.nth(3)).toHaveAttribute('href', 'mindfulness.html');
  });

  test('TC-006: Dropdown links navigate correctly', async ({ page }) => {
    await page.locator('.nav-dropdown').hover();
    await page.click('a[href="meditation.html"]');
    await expect(page).toHaveURL(/meditation\.html/);
  });

  test('TC-007: Active page is highlighted', async ({ page }) => {
    const homeLink = page.locator('a.nav-link[href="index.html"]');
    await expect(homeLink).toHaveClass(/active/);
  });

  test('TC-011: Mobile menu button is visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuToggle = page.locator('#mobile-menu-toggle');
    await expect(mobileMenuToggle).toBeVisible();
  });

  test('TC-012: Mobile menu opens when clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuToggle = page.locator('#mobile-menu-toggle');
    await mobileMenuToggle.click();
    
    const navMenu = page.locator('#nav-menu');
    await expect(navMenu).toHaveClass(/active/);
  });

  test('TC-016: Mobile menu closes on Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuToggle = page.locator('#mobile-menu-toggle');
    await mobileMenuToggle.click();
    
    await page.keyboard.press('Escape');
    const navMenu = page.locator('#nav-menu');
    await expect(navMenu).not.toHaveClass(/active/);
  });

  test('TC-021: Skip link is accessible', async ({ page }) => {
    // Skip link is hidden by default, becomes visible on focus
    const skipLink = page.locator('.skip-link');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('TC-022: Skip link navigates to main content', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await skipLink.click();
    
    // Wait for scroll to complete
    await page.waitForTimeout(300);
    
    // Check that we scrolled to main content (main should be in viewport)
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeInViewport();
  });
});

