const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');
const baseUser = require('../../../test-data/newUser.json');

test.describe('Admin – User Module', () => {

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

  test('Admin can create a new user via UI', async ({ page }) => {
    const usersPage = new UsersPage(page);

    const user = {
      ...baseUser,
      email: `auto_user_${Date.now()}@getnada.com`
    };

    await usersPage.goToUsers();
    await usersPage.openNewUserForm();
    await usersPage.createUser(user);

    // Navigate safely (no strict-mode error)
    await usersPage.goToUsers();

    await expect(
      page.locator('td').filter({ hasText: user.firstName }).first()
    ).toBeVisible();
  });

});
