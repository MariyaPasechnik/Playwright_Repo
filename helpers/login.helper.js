async function login(page, username, password) {
  await page.goto(`https://${username}:${password}@qauto.forstudy.space/`);
}

module.exports = { login };