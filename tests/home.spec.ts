import { test, expect } from '@playwright/test';

test.describe('Home Page - Structural & Functional Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('contains exactly one single H1 element', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeAttached();
    await expect(h1).toContainText('HARNESS');
  });

  test('renders all 7 sections in proper semantic structure', async ({ page }) => {
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('section#hero')).toBeVisible();
    await expect(page.locator('section#servicios')).toBeVisible();
    await expect(page.locator('section#proceso')).toBeVisible();
    await expect(page.locator('section#faq')).toBeVisible();
    await expect(page.locator('section#contacto')).toBeVisible();
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
  });

  test('renders 4 service cards with valid links', async ({ page }) => {
    const serviceCards = page.locator('section#servicios article');
    await expect(serviceCards).toHaveCount(4);

    const expectedSlugs = [
      '/servicios/landing-pages',
      '/servicios/tiendanube',
      '/servicios/tienda-online',
      '/servicios/software-a-medida',
    ];

    for (const slug of expectedSlugs) {
      const link = page.locator(`section#servicios a[href="${slug}"]`);
      await expect(link).toBeAttached();
    }
  });

  test('FAQ accordion opens and closes properly', async ({ page }) => {
    const firstAccordion = page.locator('section#faq details').first();
    await expect(firstAccordion).toHaveAttribute('open', '');

    const secondAccordion = page.locator('section#faq details').nth(1);
    await expect(secondAccordion).not.toHaveAttribute('open', '');

    // Click to open second accordion
    await secondAccordion.locator('summary').click();
    await expect(secondAccordion).toHaveAttribute('open', '');
  });

  test('floating WhatsApp button is not present on Home', async ({ page }) => {
    await expect(page.locator('aside a[aria-label="Contactar por WhatsApp"]')).toHaveCount(0);
  });

  test('JSON-LD structured data is present for Organization and FAQPage', async ({ page }) => {
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const allContent = await jsonLdScripts.allTextContents();
    const joined = allContent.join(' ');
    expect(joined).toContain('"@type":"Organization"');
    expect(joined).toContain('"@type":"FAQPage"');
  });

  test('has no horizontal scrollbar across viewports', async ({ page }) => {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
});
