const { test, expect } = require('@playwright/test');

test.describe('Admin Login – Unauthenticated Access', () => {
  test('Unauthenticated user is redirected to login page', async ({ page }) => {
    await page.goto('/admin');

    await expect(page).toHaveURL(/login/);
  });
});
