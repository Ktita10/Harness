import { test, expect } from '@playwright/test';

test.describe('Progressive Enhancement & No-JS Fallback', () => {
  test('all content is 100% visible and legible without JavaScript on Home', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    // 1. H1 is visible and legible
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('HARNESS');

    // 2. All 8 sections are attached and visible
    const sections = [
      '#hero',
      '#servicios',
      '#proceso',
      '#confianza',
      '#faq',
      '#contacto',
    ];

    for (const selector of sections) {
      const section = page.locator(selector);
      await expect(section).toBeVisible();
      const opacity = await section.evaluate((el) => window.getComputedStyle(el).opacity);
      expect(parseFloat(opacity)).toBeGreaterThanOrEqual(0.9);
    }

    // 3. Service cards are visible without JS
    const serviceCards = page.locator('#servicios article');
    await expect(serviceCards).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(serviceCards.nth(i)).toBeVisible();
    }

    // 4. Metric counters in Trust display fallback values without JS
    const trustCards = page.locator('#confianza .grid > div');
    await expect(trustCards).toHaveCount(4);
    const trustText = await page.locator('#confianza').innerText();
    expect(trustText).toContain('95+');
    expect(trustText).toContain('100%');

    await context.close();
  });

  test('all content is visible without JavaScript on Service pages', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/servicios/landing-pages');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    const planCards = page.locator('#precios [data-plan-card]');
    await expect(planCards).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(planCards.nth(i)).toBeVisible();
    }

    await context.close();
  });
});

test.describe('Reduced Motion Compliance (prefers-reduced-motion: reduce)', () => {
  test('renders resting state immediately without scroll interpolation', async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto('/');

    // Check all key elements render in resting state
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();

    const trustSection = page.locator('#confianza');
    await expect(trustSection).toBeVisible();

    // Verify metrics show target values
    const counter95 = page.locator('[data-counter="95"]');
    await expect(counter95).toBeVisible();
    await expect(counter95).toHaveText('95+');

    const counter100 = page.locator('[data-counter="100"]');
    await expect(counter100).toBeVisible();
    await expect(counter100).toHaveText('100%');

    // Verify zero horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    await context.close();
  });
});

test.describe('Motion Orchestration with JavaScript Enabled', () => {
  test('counters in Trust section animate or reach target values when scrolled into view', async ({ page }) => {
    await page.goto('/');

    // Scroll to trust section
    await page.locator('#confianza').scrollIntoViewIfNeeded();

    // Wait for counter tween to complete
    const counter95 = page.locator('[data-counter="95"]');
    await expect(counter95).toBeVisible();
    await expect(counter95).toHaveText('95+', { timeout: 4000 });

    const counter100 = page.locator('[data-counter="100"]');
    await expect(counter100).toBeVisible();
    await expect(counter100).toHaveText('100%', { timeout: 4000 });
  });

  test('no horizontal scroll overflow occurs during scroll and animations', async ({ page }) => {
    await page.goto('/');

    const sections = ['#hero', '#servicios', '#proceso', '#confianza', '#faq', '#contacto'];
    for (const selector of sections) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    }
  });
});
