const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');
const baseUser = require('../../../test-data/newUser.json');

test.describe('Admin – Toggle User Active Status', () => {
  let createdUserId;

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

    const user = {
      ...baseUser,
      email: `active_${Date.now()}@getnada.com`,
      imsId: `${Date.now()}`
    };

    await usersPage.createUser(user);

    createdUserId = page.url().match(/\/users\/(\d+)/)[1];
    await page.close();
  });

  test('Admin can toggle user active status', async ({ page }) => {
    const usersPage = new UsersPage(page);
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    await usersPage.goToUsers();

    await usersPage.toggleUserActiveById(createdUserId);

    // Optional visual assertion (switch exists)
    await expect(
      page.locator(`#toggle-user-${createdUserId}-active`)
    ).toBeVisible();
  });
});
