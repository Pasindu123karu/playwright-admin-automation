const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const users = require('../../../test-data/users.json');

test.describe('Admin Login – Enter Key', () => {
  test('Login using Enter key should succeed', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.emailInput.fill(users.validUser.email);
    await loginPage.passwordInput.fill(users.validUser.password);

    // Press Enter instead of clicking Login
    await loginPage.passwordInput.press('Enter');

    await expect(loginPage.logoutLink).toBeVisible();
  });
});
