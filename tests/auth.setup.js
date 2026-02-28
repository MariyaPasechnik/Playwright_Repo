const { test: setup } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const authFile = 'playwright/.auth/user.json';
const sessionFile = 'playwright/.auth/session.json';

setup('authenticate', async ({ page }) => {
    const user = process.env.HTTP_USER;
    const pass = process.env.HTTP_PASS;
    const domain = process.env.BASE_URL.replace('https://', '');

    await page.goto(`https://${user}:${pass}@${domain}`);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('#signinEmail').fill(process.env.USER_EMAIL);
    await page.locator('#signinPassword').fill(process.env.USER_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('h1', { hasText: 'Garage' }).waitFor({ state: 'visible' });

    await page.context().storageState({ path: authFile });

    const sessionData = await page.evaluate(() => JSON.stringify(sessionStorage));
    fs.mkdirSync(path.dirname(sessionFile), { recursive: true });
    fs.writeFileSync(sessionFile, sessionData);
});
