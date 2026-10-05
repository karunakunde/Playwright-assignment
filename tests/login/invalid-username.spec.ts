import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('SauceDemo Login', () => {
  test('Unknown username is rejected', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Open https://www.saucedemo.com/ in a fresh browser context.
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // 2. Enter `invalid_user` in Username and `secret_sauce` in Password.
    await loginPage.enterCredentials('invalid_user', 'secret_sauce');
    await expect(loginPage.usernameInput).toHaveValue('invalid_user');
    await expect(loginPage.passwordInput).toHaveValue('secret_sauce');

    // 3. Click Login.
    await loginPage.submit();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorAlert).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
