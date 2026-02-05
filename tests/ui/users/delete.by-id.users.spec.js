const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');

test.describe('Admin – Delete Existing User by ID', () => {
  test('Admin can delete a user by ID', async ({ page }) => {
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
    await usersPage.deleteUserById(USER_ID);

    // Hard assertion: row is gone
    await expect(
      page.locator(`#user_${USER_ID}`)
    ).toHaveCount(0);
  });
});
