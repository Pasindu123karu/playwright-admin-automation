const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const users = require('../../../test-data/users.json');

test.describe('Admin Login - Invalid Email', () => {

  test('Login with invalid email should fail', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      'wrong@email.com',
      users.validUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.logoutLink).not.toBeVisible();
  });

});
