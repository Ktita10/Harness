import { test, expect } from '@playwright/test';

const services = [
  {
    slug: 'landing-pages',
    name: 'Landing pages',
    expectedPlan: 'Landing Pro',
  },
  {
    slug: 'tiendanube',
    name: 'Personalización de Tienda Nube',
    expectedPlan: 'Rediseño Integral',
  },
  {
    slug: 'tienda-online',
    name: 'Tienda online',
    expectedPlan: 'E-commerce Completo',
  },
  {
    slug: 'software-a-medida',
    name: 'Software a medida',
    expectedPlan: 'Sistema Integral',
  },
];

test.describe('Service Pages Functional & SEO Verification', () => {
  for (const service of services) {
    test(`renders ${service.name} (/servicios/${service.slug}) with complete hierarchy`, async ({ page }) => {
      await page.goto(`/servicios/${service.slug}`);

      // 1. Single H1 check
      const h1s = page.locator('h1');
      await expect(h1s).toHaveCount(1);
      await expect(h1s).toBeVisible();

      // 2. Breadcrumb check
      const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
      await expect(breadcrumbNav).toBeVisible();
      await expect(breadcrumbNav.locator('a[href="/"]')).toBeVisible();
      await expect(breadcrumbNav.locator('li[aria-current="page"]')).toContainText(service.name);

      // 3. Deliverables section ("Qué incluye")
      const incluyeHeading = page.locator('#incluye-heading');
      await expect(incluyeHeading).toBeVisible();
      await expect(page.locator('section[aria-labelledby="incluye-heading"] .border-brutal')).toHaveCount(4);

      // 4. Pricing section with tiered plans
      const preciosSection = page.locator('#precios');
      await expect(preciosSection).toBeVisible();
      const planCards = preciosSection.locator('[data-plan-card]');
      await expect(planCards).toHaveCount(3);

      // 5. Plan-specific WhatsApp CTA links
      const featuredPlanBtn = preciosSection.locator(`a[href*="${encodeURIComponent(service.expectedPlan)}"]`);
      await expect(featuredPlanBtn).toBeVisible();
      const href = await featuredPlanBtn.getAttribute('href');
      expect(href).toContain('wa.me');
      expect(href).toContain(encodeURIComponent(service.expectedPlan));

      // 6. FAQs accordion interactive check
      const faqSection = page.locator('section[aria-labelledby="faqs-servicio-heading"]');
      if (await faqSection.count() > 0) {
        await expect(faqSection).toBeVisible();
        const firstSummary = faqSection.locator('details summary').first();
        await expect(firstSummary).toBeVisible();
      }

      // 7. Structured Data verification
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      expect(count).toBeGreaterThanOrEqual(3);

      let foundOrg = false;
      let foundService = false;
      let foundBreadcrumbs = false;
      let foundFaq = false;

      for (let i = 0; i < count; i++) {
        const text = await jsonLdScripts.nth(i).textContent();
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed['@type'] === 'Organization') foundOrg = true;
          if (parsed['@type'] === 'Service') {
            foundService = true;
            expect(parsed.name).toBe(service.name);
          }
          if (parsed['@type'] === 'BreadcrumbList') {
            foundBreadcrumbs = true;
            expect(parsed.itemListElement.length).toBe(3);
          }
          if (parsed['@type'] === 'FAQPage') foundFaq = true;
        }
      }

      expect(foundOrg).toBe(true);
      expect(foundService).toBe(true);
      expect(foundBreadcrumbs).toBe(true);
      expect(foundFaq).toBe(true);

      // 8. Horizontal scroll overflow check
      const hasHorizontalScrollbar = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScrollbar).toBe(false);
    });
  }
});
