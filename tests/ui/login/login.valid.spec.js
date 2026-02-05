const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const users = require('../../../test-data/users.json');

test.describe('Admin Login - Valid Credentials', () => {

  test('Login with valid credentials should succeed', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    );

    // Assert successful login
    await expect(loginPage.logoutLink).toBeVisible();
  });

});
