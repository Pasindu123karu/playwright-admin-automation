const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');

test.describe('Admin – View Users', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    if (page.url().includes('terms-of-service')) {
      await page.getByRole('checkbox').check();
      await page.getByRole('button', { name: /accept|agree/i }).click();
    }

    await page.goto('/admin');
  });

  test('Admin can view users list', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goToUsers();
    await expect(usersPage.usersTable).toBeVisible();
  });

  test('Admin can view first user details', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goToUsers();
    await usersPage.viewFirstUser();

    await expect(page).toHaveURL(/\/admin\/users\/\d+$/);
  });
});
