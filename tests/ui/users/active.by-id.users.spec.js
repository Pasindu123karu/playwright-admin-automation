const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');

test.describe('Admin – Toggle Active Status (Existing User)', () => {
  test('Admin can activate or deactivate user by ID', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const usersPage = new UsersPage(page);

    // CHANGE THIS ID WHEN NEEDED
    const USER_ID = 1844;

    await loginPage.goto();
    await loginPage.login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    await usersPage.goToUsers();

    await usersPage.toggleUserActiveById(USER_ID);

    // Basic UI safety assertion
    await expect(
      page.locator(`#toggle-user-${USER_ID}-active`)
    ).toBeVisible();
  });
});
