const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const users = require('../../../test-data/users.json');

test.describe('Admin Login Scenarios', () => {

  test('Login with valid credentials should succeed', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    );

    await expect(loginPage.logoutLink).toBeVisible();
  });

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

  test('Login with empty fields should fail', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Login with empty password should fail', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      ''
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Login with empty email should fail', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      '',
      users.validUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Login trims email spaces', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      `  ${users.validUser.email}  `,
      users.validUser.password
    );

    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('Login trims password spaces', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      `  ${users.validUser.password}  `
    );

    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('Login using Enter key works', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.emailInput.fill(users.validUser.email);
    await loginPage.passwordInput.fill(users.validUser.password);

    await loginPage.passwordInput.press('Enter');

    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('Error message disappears after successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      'WrongPassword123'
    );

    await expect(loginPage.errorMessage).toBeVisible();

    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    );

    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('Unauthenticated user cannot access admin dashboard', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/login/);
  });

  test('User can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    );

    await expect(loginPage.logoutLink).toBeVisible();

    await loginPage.logout();

    await expect(page).toHaveURL(/login/);
  });
});
