const { test } = require('../fixtures/userGaragePage.fixture');
const { expect } = require('@playwright/test');


test('User adds a car', async ({ userGaragePage }) => {
    await userGaragePage.addCar('Audi', 'TT', '100');
    await expect(userGaragePage.page.locator('h1:text("Garage")')).toBeVisible();
});