const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');
const baseUser = require('../../../test-data/newUser.json');

test.describe('Admin – Delete User', () => {
  let createdUserId;
  let createdUser;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const usersPage = new UsersPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    await usersPage.goToUsers();
    await usersPage.openNewUserForm();

    createdUser = {
      ...baseUser,
      email: `delete_${Date.now()}@getnada.com`,
      imsId: `${Date.now()}`
    };

    await usersPage.createUser(createdUser);

    // Extract user ID from URL
    const url = page.url();
    createdUserId = url.match(/\/users\/(\d+)/)[1];

    await page.close();
  });

  test('Admin can delete a user', async ({ page }) => {
    const usersPage = new UsersPage(page);
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    await usersPage.goToUsers();
    await usersPage.deleteUserById(createdUserId);

    await expect(
      page.locator(`#user_${createdUserId}`)
    ).toHaveCount(0);
  });
});
