async function login(page) {
  const user = process.env.HTTP_USER;
  const pass = process.env.HTTP_PASS;
  const domain = process.env.BASE_URL.replace('https://', '');

  await page.goto(`https://${user}:${pass}@${domain}`);
}

module.exports = { login };