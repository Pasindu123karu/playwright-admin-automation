const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');

test.describe('Admin – Search Users', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    await page.goto('/admin');
  });

  test('Admin can search users by keyword', async ({ page }) => {
    const usersPage = new UsersPage(page);
    await usersPage.goToUsers();
    await usersPage.filterByKeyword('Pasindu');

    await expect(
      page.locator('tbody tr').first()
    ).toBeVisible();
  });
});
