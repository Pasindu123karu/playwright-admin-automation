const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');

test.describe('Login – Network Validation (Success)', () => {

  test('Login request returns success response', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    const [response] = await Promise.all([
      page.waitForResponse(response =>
        response.url().toLowerCase().includes('login') &&
        response.status() === 200
      ),
      loginPage.login(
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD
      )
    ]);

    expect(response.status()).toBe(200);
  });

});
