class LoginPage {
  constructor(page) {
    this.page = page;

    // Login form elements
    this.emailInput = page.getByRole('textbox', { name: 'Email*' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password*' });
    this.loginButton = page.getByRole('button', { name: 'Log in' });

    // Error message shown on invalid login
    this.errorMessage = page.getByText(/invalid email or password/i);

    // Logout element (only visible after successful login)
    this.logoutLink = page.locator('#logout a');
  }

  // Navigate to login page
  async goto() {
    await this.page.goto('/admin/login');
  }

  // Perform login action
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Logout action
  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { LoginPage };
