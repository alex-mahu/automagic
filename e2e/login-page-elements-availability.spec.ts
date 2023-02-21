import { test } from '@playwright/test';
import { APP_URL } from '../general-configuration';
import { LandingPage } from '../source/pages/page-landing';
import { LoginPassword } from '../source/pages/page-login-password';
import { LoginSso } from '../source/pages/page-login-sso';

test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

test('check availability of elements in landing page that do not modify based on login type', async ({page}) => {
    const landingPage = new LandingPage(page);
    await landingPage.validateStaticElements();
    // expect(test.info().errors).toHaveLength(0); // not really needed but ... there is an option to to stop tests at any point
});

test('check availability of elements in landing page for login with password', async ({page}) => {
    const loginWithPasswordPage = new LoginPassword(page);
    await loginWithPasswordPage.validateElementsVisibility();
    // expect(test.info().errors).toHaveLength(0); // not really needed but ... there is an option to to stop tests at any point
});

test('check availability of elements in landing page for login with sso', async ({page}) => {
  const loginWithPasswordPage = new LoginPassword(page);
  await loginWithPasswordPage.switchToSsoLogin();

  const loginWithSsoPage = new LoginSso(page);
  await loginWithSsoPage.validateElementsVisibility();
  // expect(test.info().errors).toHaveLength(0); // not really needed but ... there is an option to to stop tests at any point
});