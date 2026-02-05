const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');
const baseUser = require('../../../test-data/newUser.json');

test.describe('Admin – Edit User', () => {

  let createdUser;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const usersPage = new UsersPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    await usersPage.goToUsers();
    await usersPage.openNewUserForm();

    createdUser = {
      ...baseUser,
      firstName: `Edit${Date.now()}`,
      email: `edit_${Date.now()}@getnada.com`,
      imsId: `${Date.now()}`
    };

    await usersPage.createUser(createdUser);
    await page.close();
  });

  test('Admin can edit a user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const usersPage = new UsersPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    await usersPage.goToUsers();
    await usersPage.filterByKeyword(createdUser.firstName);

    const updatedLastName = `Updated${Date.now()}`;
    await usersPage.editFirstUser(updatedLastName);

    await usersPage.goToUsers();
    await usersPage.filterByKeyword(updatedLastName);

    await expect(
      page.locator('td').filter({ hasText: updatedLastName }).first()
    ).toBeVisible();
  });
});
