const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const users = require('../../../test-data/users.json');

test.describe('Admin Login - Logout', () => {

  test('User can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    );

    // Confirm login success
    await expect(loginPage.logoutLink).toBeVisible();

    // Perform logout
    await loginPage.logout();

    // Confirm redirect to login page
    await expect(page).toHaveURL(/login/);
  });

});
