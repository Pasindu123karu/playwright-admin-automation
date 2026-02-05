const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');

test.describe('Login – Network Validation (Success)', () => {

  test('Login request is sent and succeeds', async ({ page }) => {
    expect(process.env.ADMIN_EMAIL).toBeTruthy();
    expect(process.env.ADMIN_PASSWORD).toBeTruthy();

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const [response] = await Promise.all([
      page.waitForResponse(response =>
        response.url().toLowerCase().includes('/login') &&
        response.request().method() === 'POST'
      ),
      loginPage.login(
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD
      )
    ]);

    expect(response.status()).toBeLessThan(300);
  });

});
