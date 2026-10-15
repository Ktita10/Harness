import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('Transversal Features & Technical SEO Assets (Phase 3)', () => {
  test('floating WhatsApp button is not rendered on any page', async ({ page }) => {
    for (const url of ['/', '/servicios/landing-pages', '/404']) {
      await page.goto(url);
      await expect(page.locator('aside[aria-label="Contacto directo por WhatsApp"]')).toHaveCount(0);
    }
  });

  test('404 page has single H1 and valid return navigation', async ({ page }) => {
    await page.goto('/404');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText('Página no encontrada');

    // Return to home button
    const homeBtn = page.locator('a[href="/"]').filter({ hasText: 'Volver a la Home' });
    await expect(homeBtn).toBeVisible();

    // Services button
    const servicesBtn = page.locator('a[href="/#servicios"]');
    await expect(servicesBtn).toBeVisible();
  });

  test('sitemap does not include /404', async () => {
    const sitemapPath = path.resolve('dist/sitemap-index.xml');
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      expect(content).not.toContain('/404');
    }
  });

  test('declares complete favicon bundle in head and assets return 200', async ({ page, request }) => {
    await page.goto('/');

    const svgIcon = page.locator('link[rel="icon"][type="image/svg+xml"]');
    await expect(svgIcon).toHaveAttribute('href', '/favicon.svg');

    const png32Icon = page.locator('link[rel="icon"][sizes="32x32"]');
    await expect(png32Icon).toHaveAttribute('href', '/favicon-32x32.png');

    const png192Icon = page.locator('link[rel="icon"][sizes="192x192"]');
    await expect(png192Icon).toHaveAttribute('href', '/favicon-192x192.png');

    const png512Icon = page.locator('link[rel="icon"][sizes="512x512"]');
    await expect(png512Icon).toHaveAttribute('href', '/favicon-512x512.png');

    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleIcon).toHaveAttribute('href', '/apple-touch-icon.png');

    // Verify all asset endpoints return HTTP 200
    const assets = [
      '/favicon.svg',
      '/favicon-32x32.png',
      '/favicon-192x192.png',
      '/favicon-512x512.png',
      '/apple-touch-icon.png',
      '/og-image.png',
    ];

    for (const asset of assets) {
      const response = await request.get(asset);
      expect(response.status()).toBe(200);
    }
  });

  test('declares valid Open Graph and Twitter Card tags', async ({ page }) => {
    await page.goto('/');

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveCount(1);
    const ogImageUrl = await ogImage.getAttribute('content');
    expect(ogImageUrl).toMatch(/^https?:\/\/.+\/og-image\.png$/);

    const ogWidth = page.locator('meta[property="og:image:width"]');
    await expect(ogWidth).toHaveAttribute('content', '1200');

    const ogHeight = page.locator('meta[property="og:image:height"]');
    await expect(ogHeight).toHaveAttribute('content', '630');

    const twitterCard = page.locator('meta[property="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');

    const twitterImage = page.locator('meta[property="twitter:image"]');
    const twitterImageUrl = await twitterImage.getAttribute('content');
    expect(twitterImageUrl).toMatch(/^https?:\/\/.+\/og-image\.png$/);
  });

  test('JSON-LD emits valid Organization schema with safe absolute logo URL', async ({ page }) => {
    await page.goto('/');

    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    let orgFound = false;

    for (let i = 0; i < count; i++) {
      const text = await jsonLdScripts.nth(i).textContent();
      if (text) {
        const parsed = JSON.parse(text);
        if (parsed['@type'] === 'Organization') {
          orgFound = true;
          expect(parsed.name).toBe('HARNESS STUDIO');
          expect(parsed.logo).toMatch(/^https?:\/\/.+\/favicon\.svg$/);
          expect(parsed.logo).not.toContain('//favicon.svg');
          expect(parsed.logo).not.toContain('harness.studiofavicon');
        }
      }
    }

    expect(orgFound).toBe(true);
  });

  test('no horizontal scrollbar on any viewport with floating WhatsApp', async ({ page }) => {
    const routes = ['/', '/servicios/landing-pages', '/404'];

    for (const route of routes) {
      await page.goto(route);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    }
  });
});
