const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');

test.describe('Login – Session Validation', () => {

  test('Successful login creates authentication session', async ({ page }) => {
    expect(process.env.ADMIN_EMAIL).toBeTruthy();
    expect(process.env.ADMIN_PASSWORD).toBeTruthy();

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    const cookies = await page.context().cookies();

    const authCookie = cookies.find(cookie =>
      cookie.name.toLowerCase().includes('session') ||
      cookie.name.toLowerCase().includes('auth')
    );

    expect(authCookie).toBeTruthy();
  });

});
