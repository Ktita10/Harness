import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4322',
  },
  webServer: {
    command: 'npm run preview -- --port 4322',
    port: 4322,
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile 360px',
      use: {
        viewport: { width: 360, height: 640 },
      },
    },
  ],
});
