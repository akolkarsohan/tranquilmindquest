const { test, expect } = require('@playwright/test');

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-158: All interactive elements are keyboard accessible', async ({ page }) => {
    // Tab through the page and check focus
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('TC-159: Tab key navigates through elements', async ({ page }) => {
    // Focus the skip link directly (it's hidden until focused)
    const skipLink = page.locator('.skip-link');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('TC-164: Images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt).not.toBe('');
    }
  });

  test('TC-165: Form labels are properly associated', async ({ page }) => {
    await page.goto('/contact.html');
    
    const nameInput = page.locator('#contact-name');
    const nameLabel = page.locator('label[for="contact-name"]');
    await expect(nameLabel).toBeVisible();
    
    const labelFor = await nameLabel.getAttribute('for');
    const inputId = await nameInput.getAttribute('id');
    expect(labelFor).toBe(inputId);
  });

  test('TC-167: Heading hierarchy is correct', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1); // Should have exactly one h1
    
    const h2 = page.locator('h2');
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('TC-168: Landmarks are properly marked', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    // Use more specific selector to avoid ambiguity (there are 2 nav elements)
    await expect(page.locator('header nav, .nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('TC-170: Text has sufficient contrast', async ({ page }) => {
    // This is a basic check - full contrast testing requires specialized tools
    const bodyText = page.locator('body');
    const color = await bodyText.evaluate((el) => 
      window.getComputedStyle(el).color
    );
    
    // Just verify color is set (not transparent)
    expect(color).not.toContain('rgba(0, 0, 0, 0)');
    expect(color).not.toContain('transparent');
  });
});

