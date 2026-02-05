const { expect } = require('@playwright/test');

class UsersPage {
  constructor(page) {
    this.page = page;

    /* ===== Navigation ===== */
    this.usersTable = page.locator('table');
    this.newUserButton = page.getByRole('link', { name: 'New User' });

    /* ===== Account ===== */
    this.emailInput = page.getByRole('textbox', { name: 'Personal E-Mail (Non-Work)*' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password*' });
    this.passwordConfirmInput = page.getByRole('textbox', { name: 'Password Confirmation*' });
    this.consentCheckbox = page.getByRole('checkbox', { name: /consent/i });

    /* ===== Personal Info ===== */
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name*' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name*' });
    this.nicknameInput = page.getByRole('textbox', { name: 'Nickname' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone number' });

    /* ===== DOB ===== */
    this.dobInput = page.getByRole('textbox', { name: 'Date of Birth' });
    this.monthSelect = page.getByLabel('Select month');

    /* ===== Select2 roots ===== */
    this.schoolDropdown = page.locator('#user_school_id_input');
    this.localAssociationDropdown = page.locator('#user_local_association_id_input');
    this.workLocationDropdown = page.locator('#user_work_location_id_input');
    this.uniservDropdown = page.locator('#user_uniserv_council_id_input');

    /* ===== Other ===== */
    this.imsIdInput = page.getByRole('textbox', { name: 'IMS ID' });

    /* ===== Roles ===== */
    this.rolesSection = page.getByText('Roles');
    this.removeRoleLink = page.getByRole('link', { name: 'Remove' });

    /* ===== Actions ===== */
    this.createUserButton = page.getByRole('button', { name: 'Create User' });
    this.updateUserButton = page.getByRole('button', { name: 'Update User' });
  }

  /* ================= SELECT2 HELPERS ================= */

  async selectFromSearchableDropdown(dropdownRoot, value, search = value.slice(0, 3)) {
    await dropdownRoot.locator('[role="combobox"]').click();

    const panel = this.page.locator('.select2-dropdown:visible');
    await expect(panel).toBeVisible({ timeout: 15000 });

    await panel.locator('input.select2-search__field').fill(search);

    await panel
      .locator('li.select2-results__option')
      .filter({ hasText: new RegExp(`^${value}$`, 'i') })
      .first()
      .click();
  }

  async selectFromTagDropdown(label, value) {
    await this.page.getByText(label).click();

    const searchBox = this.page.getByRole('searchbox').first();
    await searchBox.fill(value);
    await this.page.keyboard.press('Enter');

    await expect(
      this.page.locator('.select2-selection__choice').filter({ hasText: value })
    ).toBeVisible();
  }

  async selectPosition(position) {
    const positionRow = this.page.getByText('Position*').locator('..');
    await positionRow.locator('[role="combobox"]').click();

    const panel = this.page.locator('.select2-dropdown:visible');
    await expect(panel).toBeVisible({ timeout: 15000 });

    await panel.locator('input.select2-search__field').fill(position);

    await panel
      .locator('li.select2-results__option')
      .filter({ hasText: new RegExp(`^${position}$`, 'i') })
      .first()
      .click();
  }

  /* ================= NAVIGATION ================= */

  async goToUsers() {
    await this.page.goto('/admin/users');
    await expect(this.usersTable).toBeVisible();
  }

  async openNewUserForm() {
    await this.newUserButton.click();
  }

  /* ================= CREATE USER ================= */

  async createUser(user) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.passwordConfirmInput.fill(user.password);
    await this.consentCheckbox.check();

    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.nicknameInput.fill(user.nickname);
    await this.phoneInput.fill(user.phone);

    await this.dobInput.click();
    await this.monthSelect.selectOption(user.dob.month);
    await this.page.getByRole('link', { name: user.dob.day, exact: true }).click();

    await this.selectFromSearchableDropdown(
      this.schoolDropdown,
      user.employment.school,
      user.employment.schoolSearch
    );

    await this.selectFromSearchableDropdown(
      this.localAssociationDropdown,
      user.employment.localAssociation,
      user.employment.localAssociationSearch
    );

    await this.selectFromSearchableDropdown(
      this.workLocationDropdown,
      user.employment.workLocation,
      user.employment.workLocationSearch
    );

    await this.selectFromTagDropdown(
      'Grade Level*',
      user.employment.gradeLevel
    );

    await this.selectFromSearchableDropdown(
      this.uniservDropdown,
      user.employment.uniservCouncil,
      user.employment.uniservCouncilSearch
    );

    await this.selectPosition(user.employment.position);

    await this.rolesSection.click();
    await this.removeRoleLink.click();

    await this.imsIdInput.fill(user.imsId);

    await this.createUserButton.click();
    await expect(this.page).toHaveURL(/\/admin\/users\/\d+$/);
  }

  /* ================= LIST ACTIONS ================= */

  async filterByKeyword(keyword) {
    const keywordInput = this.page.getByRole('textbox', { name: 'Keyword' });
    const filterButton = this.page.getByRole('button', { name: 'Filter' });

    await keywordInput.fill(keyword);
    await filterButton.click();
  }

  async viewFirstUser() {
    await this.page.getByRole('link', { name: 'View' }).first().click();
  }

  async editFirstUser(newLastName) {
    await this.page.getByRole('link', { name: 'Edit' }).first().click();
    await this.lastNameInput.fill(newLastName);
    await this.updateUserButton.click();
  }

  /* ===== FIXED DELETE (ROW-BASED) ===== */

  async deleteFirstUser() {
    this.page.once('dialog', d => d.accept());

    const firstRow = this.page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();

    await firstRow.locator('.delete_link').click();
    await expect(firstRow).toBeHidden({ timeout: 10000 });
  }

  async deleteUserById(userId) {
    const row = this.page.locator(`#user_${userId}`);
    await expect(row).toBeVisible({ timeout: 10000 });

    this.page.once('dialog', d => d.accept());
    await row.locator('.delete_link').click();

    await expect(row).toBeHidden({ timeout: 10000 });
  }

  /* ===== ACTIVE / INACTIVE TOGGLE ===== */

  async toggleUserActiveById(userId) {
    const toggle = this.page.locator(`#toggle-user-${userId}-active`);
    await expect(toggle).toBeVisible({ timeout: 10000 });
    await toggle.click();
  }
}

module.exports = { UsersPage };
