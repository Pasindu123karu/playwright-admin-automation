const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const users = require('../../../test-data/users.json');

test.describe('Admin Login – Trim Spaces', () => {

  test('Login succeeds with spaces around email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      `  ${users.validUser.email}  `,
      users.validUser.password
    );

    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('Login succeeds with spaces around password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      `  ${users.validUser.password}  `
    );

    await expect(loginPage.logoutLink).toBeVisible();
  });
});
