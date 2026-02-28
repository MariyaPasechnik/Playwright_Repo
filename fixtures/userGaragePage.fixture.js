const { test: base } = require('@playwright/test');
const { GaragePage } = require('../page-objects/GaragePage');
const fs = require('fs');

exports.test = base.extend({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'playwright/.auth/user.json',
        });
        const page = await context.newPage();

        const user = process.env.HTTP_USER;
        const pass = process.env.HTTP_PASS;
        const domain = process.env.BASE_URL.replace('https://', '');
        await page.goto(`https://${user}:${pass}@${domain}`);

        const sessionData = fs.readFileSync('playwright/.auth/session.json', 'utf-8');
        await page.evaluate((data) => {
            const parsed = JSON.parse(data);
            for (const [key, value] of Object.entries(parsed)) {
                sessionStorage.setItem(key, value);
            }
        }, sessionData);

        await page.goto(`https://${user}:${pass}@${domain}panel/garage`);
        const garagePage = new GaragePage(page);
        await use(garagePage);
        await context.close();
    },
});
