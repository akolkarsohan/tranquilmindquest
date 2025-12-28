const { test, expect } = require('@playwright/test');

test.describe('Contact Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact.html');
  });

  test('TC-118: Contact form is visible', async ({ page }) => {
    const contactForm = page.locator('#contact-form-element');
    await expect(contactForm).toBeVisible();
  });

  test('TC-119: All form fields are present', async ({ page }) => {
    await expect(page.locator('#contact-name')).toBeVisible();
    await expect(page.locator('#contact-email')).toBeVisible();
    await expect(page.locator('#contact-subject')).toBeVisible();
    await expect(page.locator('#contact-message')).toBeVisible();
  });

  test('TC-120: Required fields are marked', async ({ page }) => {
    const nameLabel = page.locator('label[for="contact-name"]');
    await expect(nameLabel).toContainText('*');
    
    const emailLabel = page.locator('label[for="contact-email"]');
    await expect(emailLabel).toContainText('*');
  });

  test('TC-121: Form validation works for empty fields', async ({ page }) => {
    const submitButton = page.locator('#contact-form-element button[type="submit"]');
    await submitButton.click();
    
    // Check HTML5 validation
    const nameInput = page.locator('#contact-name');
    const validity = await nameInput.evaluate((el) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('TC-123: Subject dropdown has correct options', async ({ page }) => {
    const subjectSelect = page.locator('#contact-subject');
    const options = await subjectSelect.locator('option').allTextContents();
    
    expect(options).toContain('Select a subject');
    expect(options).toContain('General Inquiry');
    expect(options).toContain('Partnership');
    expect(options).toContain('Feedback');
    expect(options).toContain('Technical Issue');
    expect(options).toContain('Other');
  });

  test('TC-124: Newsletter checkbox is present', async ({ page }) => {
    const newsletterCheckbox = page.locator('#newsletter-signup');
    await expect(newsletterCheckbox).toBeVisible();
  });

  test('TC-128: Chatbot section is visible', async ({ page }) => {
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;
    
    if (isMobile) {
      // On mobile, chatbot is hidden by default, shown via mobile button
      // Check that mobile chat button exists instead
      const mobileChatButton = page.locator('#mobile-chat-button, .mobile-chat-button');
      await expect(mobileChatButton).toBeVisible();
    } else {
      const chatbotSection = page.locator('#chatbot-section');
      await expect(chatbotSection).toBeVisible();
    }
  });

  test('TC-130: Chatbot input field is present', async ({ page }) => {
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;
    
    if (isMobile) {
      // On mobile, open chatbot first by clicking the mobile chat button
      const mobileChatButton = page.locator('.chat-toggle-mobile, #mobile-chat-button button');
      await mobileChatButton.waitFor({ state: 'visible', timeout: 5000 });
      await mobileChatButton.click();
      
      // Wait for chatbot section to become visible (it gets mobile-open class)
      await page.waitForSelector('#chatbot-section.mobile-open, .chatbot-section.mobile-open', { 
        state: 'visible', 
        timeout: 5000 
      });
      
      // Also wait for the chatbot to be in the DOM and visible
      await page.waitForTimeout(300); // Small delay for animation
    }
    
    const chatInput = page.locator('#chat-input');
    await expect(chatInput).toBeVisible({ timeout: 10000 });
  });

  test('TC-131: Send button is clickable', async ({ page }) => {
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;
    
    if (isMobile) {
      // On mobile, open chatbot first by clicking the mobile chat button
      const mobileChatButton = page.locator('.chat-toggle-mobile, #mobile-chat-button button');
      await mobileChatButton.waitFor({ state: 'visible', timeout: 5000 });
      await mobileChatButton.click();
      
      // Wait for chatbot section to become visible (it gets mobile-open class)
      await page.waitForSelector('#chatbot-section.mobile-open, .chatbot-section.mobile-open', { 
        state: 'visible', 
        timeout: 5000 
      });
      
      // Also wait for the chatbot to be in the DOM and visible
      await page.waitForTimeout(300); // Small delay for animation
    }
    
    const sendButton = page.locator('#chat-send');
    await expect(sendButton).toBeVisible({ timeout: 10000 });
    await expect(sendButton).toBeEnabled();
  });

  test('TC-132: Suggested questions are displayed', async ({ page }) => {
    const suggestedQuestions = page.locator('.question-pill');
    const count = await suggestedQuestions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-133: Clicking suggested question populates input', async ({ page }) => {
    const firstQuestion = page.locator('.question-pill').first();
    const questionText = await firstQuestion.textContent();
    
    await firstQuestion.click();
    
    const chatInput = page.locator('#chat-input');
    const inputValue = await chatInput.inputValue();
    expect(inputValue).toBe(questionText.trim());
  });

  test('TC-140: FAQ section is visible', async ({ page }) => {
    const faqSection = page.locator('.faq-section');
    await expect(faqSection).toBeVisible();
  });

  test('TC-141: FAQ questions are clickable', async ({ page }) => {
    const faqQuestions = page.locator('.faq-question');
    const count = await faqQuestions.count();
    expect(count).toBeGreaterThan(0);
    
    await faqQuestions.first().click();
    await expect(faqQuestions.first()).toHaveAttribute('aria-expanded', 'true');
  });

  test('TC-143: Only one FAQ can be open at a time', async ({ page }) => {
    const faqQuestions = page.locator('.faq-question');
    const firstQuestion = faqQuestions.first();
    const secondQuestion = faqQuestions.nth(1);
    
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    
    await secondQuestion.click();
    await expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
    // First one should close (accordion behavior)
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });
});

