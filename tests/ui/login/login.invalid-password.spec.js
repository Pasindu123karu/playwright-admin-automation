const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const users = require('../../../test-data/users.json');

test.describe('Admin Login - Invalid Password', () => {

  test('Login with invalid password should fail', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      'WrongPassword123'
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.logoutLink).not.toBeVisible();
  });

});
