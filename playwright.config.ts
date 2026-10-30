import { defineConfig } from '@playwright/test'
export default defineConfig({
  testMatch: 'experience.spec.ts',
  webServer: { command: 'npm run dev -- --host 127.0.0.1', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI },
})
