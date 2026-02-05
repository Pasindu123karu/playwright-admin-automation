# Playwright Automation – Admin Portal

This project contains UI automation tests for the **Admin Portal** using **Playwright**.
The framework follows the **Page Object Model (POM)** and supports both **headed** and **headless** execution.

---

## 1. Prerequisites

The following software must be installed on your machine:

- **Node.js** (version 18 or higher)
- **npm** (bundled with Node.js)
- **Git**

Verify installations:

```bash
node -v
npm -v
git --version
```

---

## 2. Project Setup (New Machine)

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Step 2: Install project dependencies

```bash
npm install
```

### Step 3: Install Playwright browsers

```bash
npx playwright install
```

---

## 3. Environment Configuration

Admin credentials must be set as environment variables before running tests.

### Windows (PowerShell)

```powershell
$env:ADMIN_EMAIL="pasindu@getnada.com"
$env:ADMIN_PASSWORD="Kvns@1234"
```

### macOS / Linux (Bash)

```bash
export ADMIN_EMAIL="pasindu@getnada.com"
export ADMIN_PASSWORD="Kvns@1234"
```

---

## 4. Running Playwright (Interactive Mode)

```bash
npx playwright test --ui
```

---

## 5. Login Test Commands

```bash
npx playwright test tests/ui/login/login.valid.spec.js --headed
npx playwright test tests/ui/login/login.invalid-email.spec.js --headed
npx playwright test tests/ui/login/login.invalid-password.spec.js --headed
npx playwright test tests/ui/login/login.empty-fields.spec.js --headed
npx playwright test tests/ui/login/login.logout.valid.spec.js --headed
npx playwright test tests/ui/login/login.unauthenticated-access.spec.js --headed
npx playwright test tests/ui/login/login.trim-spaces.spec.js --headed
npx playwright test tests/ui/login/login.enter-key.spec.js --headed
npx playwright test tests/ui/login --headed
```

---

## 6. User Management Test Commands

```bash
npx playwright test tests/ui/users/create.users.spec.js --headed
npx playwright test tests/ui/users/create.users.negative.spec.js --headed
npx playwright test tests/ui/users/view.users.spec.js --headed
npx playwright test tests/ui/users/search.users.spec.js --headed
npx playwright test tests/ui/users/edit.users.spec.js --headed
npx playwright test tests/ui/users/delete.users.spec.js --headed
npx playwright test tests/ui/users/delete.by-id.users.spec.js --headed
npx playwright test tests/ui/users/active.users.spec.js --headed
npx playwright test tests/ui/users/active.by-id.users.spec.js --headed
npx playwright test tests/ui/users --headed
```

---

## 7. Headless Execution

```bash
npx playwright test
npx playwright test tests/ui/users/create.users.spec.js
```

---

## 8. Playwright Code Generation

```bash
npx playwright codegen http://weadev.epicbusinessapps.com/admin/login
```

---

## 9. Test Reports

```bash
npx playwright show-report
```

---

## 10. Project Structure

```plaintext
├── pages/                  # Page Object Models (Locators & Methods)
│   ├── LoginPage.js
│   └── UsersPage.js
│
├── tests/                  # Test Specs
│   └── ui/
│       ├── login/          # Login Module Tests
│       │   ├── login.valid.spec.js
│       │   ├── login.invalid-email.spec.js
│       │   └── ...
│       └── users/          # User Management Tests
│           ├── create.users.spec.js
│           ├── edit.users.spec.js
│           └── ...
│
├── test-data/              # Externalized JSON Data
│   ├── newUser.json
│   └── users.json
│
├── playwright.config.js    # Framework Configuration
└── README.md               # Documentation
```

---

## 11. Creating a New Playwright Project

```bash
npm init playwright@latest
npx playwright test
```

## 12. Playwright Code Generator (Recorder)

```bash
npx playwright codegen http://weadev.epicbusinessapps.com/admin/login
```
    1. A browser opens at
    http://weadev.epicbusinessapps.com/admin/login

    2. You perform actions (login, click buttons, fill forms)

    3. Playwright generates:

        * Reliable locators

        * Actions like click(), fill(), expect()

    4. You can copy the generated code into your test files


## 13. CI/CD Integration (GitHub Actions)
This project is integrated with GitHub Actions for Continuous Integration.

CI behavior:
- Tests run automatically on every push or pull request
- Execution is headless using the Chromium browser
- Sensitive credentials are stored securely using GitHub Secrets
- Playwright HTML reports are generated as workflow artifacts

CI execution command used:

```bash
npx playwright test --project=chromium  
```

Benefits of CI integration:
- Automated regression testing
- Consistent execution across environments
- Secure credential handling
- Early detection of failures

---