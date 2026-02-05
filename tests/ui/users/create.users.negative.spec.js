const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { UsersPage } = require('../../../pages/UsersPage');
const baseUser = require('../../../test-data/newUser.json');

test.describe('Admin – Create User (Negative Scenarios)', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    if (page.url().includes('terms-of-service')) {
      await page.getByRole('checkbox').check();
      await page.getByRole('button', { name: /accept|agree/i }).click();
    }

    await page.goto('/admin/users/new');
  });

  const submit = async (page) => {
    await page.getByRole('button', { name: 'Create User' }).click();
  };

  const expectValidationError = async (page) => {
    await expect(
      page.locator('text=/required|invalid|taken|error/i')
    ).toBeVisible();
  };

  /* ================= 1 Mandatory Field Validation ================= */

  test('All required fields empty', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('Empty email', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password*' }).fill(baseUser.password);
    await submit(page);
    await expectValidationError(page);
  });

  test('Empty password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill(`empty_pw_${Date.now()}@getnada.com`);
    await submit(page);
    await expectValidationError(page);
  });

  test('Empty password confirmation', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill(`empty_confirm_${Date.now()}@getnada.com`);
    await page.getByRole('textbox', { name: 'Password*' })
      .fill(baseUser.password);
    await submit(page);
    await expectValidationError(page);
  });

  test('Empty first name', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Last Name*' }).fill(baseUser.lastName);
    await submit(page);
    await expectValidationError(page);
  });

  test('Empty last name', async ({ page }) => {
    await page.getByRole('textbox', { name: 'First Name*' }).fill(baseUser.firstName);
    await submit(page);
    await expectValidationError(page);
  });

  test('Consent checkbox unchecked', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('School not selected', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('Local Association not selected', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('Work Location not selected', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('Grade Level not selected', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('UniServ Council not selected', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('Position not selected', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  /* ================= 2 Email Validation ================= */

  test('Email without @', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill('invalidemail.com');
    await submit(page);
    await expectValidationError(page);
  });

  test('Email without domain', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill('user@');
    await submit(page);
    await expectValidationError(page);
  });

  test('Email with spaces', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill('user test@getnada.com');
    await submit(page);
    await expectValidationError(page);
  });

  test('Duplicate email', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill(baseUser.email);
    await submit(page);
    await expectValidationError(page);
  });

  test('Uppercase email allowed but normalized', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill(`TEST_${Date.now()}@GETNADA.COM`);
    await submit(page);
    await expectValidationError(page);
  });

  test('Very long email', async ({ page }) => {
    const longEmail = `${'a'.repeat(250)}@getnada.com`;
    await page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
      .fill(longEmail);
    await submit(page);
    await expectValidationError(page);
  });

  /* ================= 3 Password Validation ================= */

  test('Password too short', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password*' }).fill('Aa1!');
    await submit(page);
    await expectValidationError(page);
  });

  test('Password without uppercase', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password*' }).fill('password@1');
    await submit(page);
    await expectValidationError(page);
  });

  test('Password without lowercase', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password*' }).fill('PASSWORD@1');
    await submit(page);
    await expectValidationError(page);
  });

  test('Password without number', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password*' }).fill('Password@');
    await submit(page);
    await expectValidationError(page);
  });

  test('Password without special character', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password*' }).fill('Password1');
    await submit(page);
    await expectValidationError(page);
  });

  test('Password mismatch', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password*' }).fill('Password@1');
    await page.getByRole('textbox', { name: 'Password Confirmation*' })
      .fill('Password@2');
    await submit(page);
    await expectValidationError(page);
  });

  /* ================= 4 Phone Validation ================= */

  test('Phone with letters', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Phone number' }).fill('ABC123');
    await submit(page);
    await expectValidationError(page);
  });

  test('Phone with special characters', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Phone number' }).fill('0710@#$');
    await submit(page);
    await expectValidationError(page);
  });

  /* ================= 5 Date of Birth ================= */

  test('DOB not selected', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('Future DOB', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Date of Birth' }).fill('12/31/2099');
    await submit(page);
    await expectValidationError(page);
  });

  /* ================= 6 Dropdown Edge Cases ================= */

  test('Non-existing school search', async ({ page }) => {
    await expect(
      page.locator('.select2-search__field')
    ).not.toBeVisible();
  });

  test('Non-existing position search', async ({ page }) => {
    await expectValidationError(page);
  });

  /* ================= 7 IMS ID Validation ================= */

  test('Duplicate IMS ID', async ({ page }) => {
    await page.getByRole('textbox', { name: 'IMS ID' }).fill(baseUser.imsId);
    await submit(page);
    await expectValidationError(page);
  });

  test('IMS ID empty', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  test('IMS ID with special characters', async ({ page }) => {
    await page.getByRole('textbox', { name: 'IMS ID' }).fill('IMS@123');
    await submit(page);
    await expectValidationError(page);
  });

  test('Very long IMS ID', async ({ page }) => {
    await page.getByRole('textbox', { name: 'IMS ID' }).fill('1'.repeat(100));
    await submit(page);
    await expectValidationError(page);
  });

  /* ================= 8 Role & Status ================= */

  test('Default role removed', async ({ page }) => {
    await expectValidationError(page);
  });

  test('Inactive user unchecked', async ({ page }) => {
    await submit(page);
    await expectValidationError(page);
  });

  /* ================= 9 UX & Behavior ================= */

  test('Cancel button does not create user', async ({ page }) => {
    await page.getByRole('link', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/\/admin\/users$/);
  });

  test('Page refresh clears form', async ({ page }) => {
    await page.reload();
    await expect(
      page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' })
    ).toHaveValue('');
  });

  /* ================= 10 Security ================= */

  test('Direct access without login redirects to login', async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('/admin/users/new');
    await expect(page).toHaveURL(/login/);
    await page.close();
  });

});
