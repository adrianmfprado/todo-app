import { defineConfig, devices } from '@playwright/test';

// Suíte e2e/smoke do ToDo app (React + Vite).
// Specs em tests/e2e com sufixo .pw.spec.ts para não colidir com o glob de testes do Vitest.
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.pw.spec.ts',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4318/todo-app/',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --port 4318 --strictPort',
    url: 'http://localhost:4318/todo-app/',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
