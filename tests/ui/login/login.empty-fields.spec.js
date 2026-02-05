const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');

test.describe('Admin Login - Empty Fields', () => {

  test('Login with empty fields should fail', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
  });

});
