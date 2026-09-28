import { test, expect } from '@playwright/test';

test.describe('Foundation & Smoke Tests', () => {
  test('home page renders with single H1 and accessible landmarks', async ({ page }) => {
    await page.goto('/');

    // Check single H1 per SPEC.md & AGENTS.md
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Hacemos webs que');

    // Check skip link targets main content
    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Check main container
    const main = page.locator('main#main-content');
    await expect(main).toBeAttached();

    // Verify WhatsApp button has noopener
    const waBtn = page.locator('aside a[aria-label="Contactar por WhatsApp"]');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
