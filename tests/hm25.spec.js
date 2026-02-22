const { test, expect } = require('@playwright/test');
const { NewUserRegistration } = require('../page-objects/newUserRegistration');
const { login } = require('../helpers/login.helper.js');

test.describe('Registration tests', () => {
  let regPage;

  test.beforeEach(async ({ page }) => {
    regPage = new NewUserRegistration(page);
    await login(page); 
    await regPage.signInButton.click();
    await regPage.registrationButton.click();
  });

  test('Successful registration', async ({ page }) => {
    const email = `test-user-${Date.now()}@test.com`;
    await regPage.fillInRegistrationForm('John', 'Doe', email, 'Aa123456', 'Aa123456');
    await regPage.registerButton.click();
    await expect(page.locator('h1')).toHaveText('Garage');
  });

  test('Sign in_invalid_length', async () => {
    const email = `test-user-${Date.now()}@test.com`;
    await regPage.fillInRegistrationForm('J', 'Doe', email, 'Aa123456', 'Aa123456');
    await expect(regPage.registerButton).toBeDisabled();
    await expect(regPage.page.locator('p', { hasText: 'Name has to be from 2 to 20 characters long' })).toBeVisible();
  });

  test('Sign in_invalid_email', async () => {
    await regPage.fillInRegistrationForm('Joe', 'Doe', 'aqa-john.doe@testcom', 'Aa123456', 'Aa123456');
    await expect(regPage.registerButton).toBeDisabled();
    await expect(regPage.page.locator('p', { hasText: 'Email is incorrect' })).toBeVisible();
  });
  
  test('Sign in_passwords_unmatched', async () => {
    const email = `test-user-${Date.now()}@test.com`;
    await regPage.fillInRegistrationForm('John', 'Doe', email, 'Aa123456', 'Aa1234567');
    await regPage.nameInput.focus();
    await expect(regPage.registerButton).toBeDisabled();
    await expect(regPage.page.locator('p', { hasText: 'Passwords do not match' })).toBeVisible();
  });

  test('Sign in_invalid_password', async () => {
    const email = `test-user-${Date.now()}@test.com`;
    await regPage.fillInRegistrationForm('John', 'Doe', email, 'aa123456', 'aa123456');
    await expect(regPage.registerButton).toBeDisabled();
    const passError = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
    await expect(regPage.page.locator('p', { hasText: passError })).toBeVisible();
  });

  test('Sign in_user_already_exists', async () =>  {
    await regPage.fillInRegistrationForm('Joe', 'Doe', 'aqa-john.doe@test.com', 'Aa123456', 'Aa123456');
    await regPage.registerButton.click();
    const userExistsError = regPage.page.locator('p.alert-danger', { hasText: 'User already exists' });
    await expect(userExistsError).toBeVisible();
  });
});