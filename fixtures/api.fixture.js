const { test: base, expect } = require('@playwright/test');
const ApiClient = require('../api/clients/apiClient');
const UsersApi = require('../api/services/users.api');

const test = base.extend({
  usersApi: async ({}, use) => {
    const apiClient = new ApiClient('http://weadev.epicbusinessapps.com');
    await apiClient.init();

    const usersApi = new UsersApi(apiClient);
    await use(usersApi);
  }
});

module.exports = {
  test,
  expect
};
