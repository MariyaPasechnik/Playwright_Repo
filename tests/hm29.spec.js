const { test } = require('../fixtures/userGaragePage.fixture');
const { expect } = require('@playwright/test');

test('mock body response', async ({ userGaragePage }) => {
  const page = userGaragePage.page; 

  const mockedUser = {
    "status": "ok",
    "data": {
      "userId": 123456,
      "photoFilename": "default-user.png",
      "name": "Mocked",
      "lastName": "User"
    }
  };

  await page.route('**/api/users/profile', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockedUser)
  }));

  await page.goto('/panel/profile');

  const profileName = page.locator('p.profile_name');
  await expect(profileName).toHaveText(`${mockedUser.data.name} ${mockedUser.data.lastName}`);
});

test.describe('API Cars creation', () => {
  
  test('Positive: Create car with valid data', async ({ userGaragePage }) => {
    const page = userGaragePage.page; 

    const carData = {
      carBrandId: 1, 
      carModelId: 1, 
      mileage: 100
    };

    const response = await page.request.post('/api/cars', {
      data: carData 
    });

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.data).toMatchObject({
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
        brand: "Audi",
        model: "TT"
    });
  });
test('Negative1: Create car with non-existent brand', async ({ userGaragePage }) => {
    const page = userGaragePage.page; 

    const carData = {
      carBrandId: 999, 
      carModelId: 1, 
      mileage: 100
    };

    const response = await page.request.post('/api/cars', {
      data: carData
    });

    const body = await response.json();

    expect(response.status()).toBe(404);
    expect(body.message).toBe('Brand not found');
  });

  test('Negative2: Create car with invalid mileage', async ({ userGaragePage }) => {
    const page = userGaragePage.page; 

    const carData = {
      carBrandId: 1, 
      carModelId: 1, 
      mileage: -100
    };

    const response = await page.request.post('/api/cars', {
      data: carData
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.status).toBe('error');
    expect(body.message).toBe('Mileage has to be from 0 to 999999');
  });
});