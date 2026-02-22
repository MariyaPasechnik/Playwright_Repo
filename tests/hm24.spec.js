const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login.helper.js');

test('Sign in', async ({ page }) => {
  await login(page, 'guest', 'welcome2qauto');
  const email = `aqa-john${Date.now()}@test.com`;
  const h1 = page.locator('h1'); 
  await expect(h1).toHaveText('Do more!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();
  await page.locator('#signupName').fill('John');
  await page.locator('#signupLastName').fill('Doe');
  
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill('Aa123456');
  await page.locator('#signupRepeatPassword').fill('Aa123456');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(h1).toHaveText('Garage');
  
});

test('Sign in_invalid_length', async ({ page }) => {
  await login(page, 'guest', 'welcome2qauto');

  const h1 = page.locator('h1'); 
  await expect(h1).toHaveText('Do more!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();
  await page.locator('#signupName').fill('J');
  await page.locator('#signupLastName').focus(); 
  const registerBtn = page.getByRole('button', { name: 'Register' });
  await expect(registerBtn).toBeDisabled();
 await expect(page.locator('p', { hasText: 'Name has to be from 2 to 20 characters long' })).toBeVisible();

  
});
test('Sign in_invalid_email', async ({ page }) => {
  await login(page, 'guest', 'welcome2qauto');

  const h1 = page.locator('h1'); 
  await expect(h1).toHaveText('Do more!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();
  await page.locator('#signupName').fill('Joe');
  await page.locator('#signupLastName').fill('Doe'); 
  await page.locator('#signupEmail').fill('aqa-john.doe@testcom');
  await page.locator('#signupPassword').fill('Aa123456');
  await page.locator('#signupRepeatPassword').fill('Aa123456');
  const registerBtn = page.getByRole('button', { name: 'Register' });
  await expect(registerBtn).toBeDisabled();
  await expect(page.locator('p:text("Email is incorrect")')).toBeVisible();

  
});

test('Sign in_passwords_unmatched', async ({ page }) => {
  await login(page, 'guest', 'welcome2qauto');

  const h1 = page.locator('h1'); 
  await expect(h1).toHaveText('Do more!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();
  await page.locator('#signupName').fill('Joe');
  await page.locator('#signupLastName').fill('Doe'); 
  await page.locator('#signupEmail').fill('aqa-john.doe@test.com');
  await page.locator('#signupPassword').fill('Aa123456');
  await page.locator('#signupRepeatPassword').fill('Aa123457');
  await page.locator('#signupRepeatPassword').blur();
  const registerBtn = page.getByRole('button', { name: 'Register' });
  await expect(registerBtn).toBeDisabled();
  await expect(page.locator('p', { hasText: 'Passwords do not match' })).toBeVisible();


  
});
test('Sign in_invalid_password', async ({ page }) => {
  await login(page, 'guest', 'welcome2qauto');

  const h1 = page.locator('h1'); 
  await expect(h1).toHaveText('Do more!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();
  await page.locator('#signupName').fill('Joe');
  await page.locator('#signupLastName').fill('Doe'); 
  await page.locator('#signupEmail').fill('aqa-john.doe@test.com');
  await page.locator('#signupPassword').fill('aa123456');
  await page.locator('#signupRepeatPassword').fill('aa123457');
  const registerBtn = page.getByRole('button', { name: 'Register' });
  await expect(registerBtn).toBeDisabled();
  await expect(page.locator('p:text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();

  
});
test('Sign in_user_already_exists', async ({ page }) => {
  await login(page, 'guest', 'welcome2qauto');

  const h1 = page.locator('h1'); 
  await expect(h1).toHaveText('Do more!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();
  await page.locator('#signupName').fill('Joe');
  await page.locator('#signupLastName').fill('Doe'); 
  await page.locator('#signupEmail').fill('aqa-john.doe@test.com');
  await page.locator('#signupPassword').fill('Aa123456');
  await page.locator('#signupRepeatPassword').fill('Aa123456');
  await page.getByRole('button', { name: 'Register' }).click();
  const userExistsError = page.locator('p.alert-danger', { hasText: 'User already exists' });
  await expect(userExistsError).toBeVisible();
  
});




