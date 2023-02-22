import { test } from '@playwright/test';
import { APP_URL } from '../../general-configuration';
import { SUPPORTED_LANGUAGES } from '../../source/localization-data';
import { ErrorLableValidator } from '../../source/pages/component-error-validator';
import { LanguageSelector } from '../../source/pages/language-selector';
import { LandingPage } from '../../source/pages/page-landing';
import { LoginPassword } from '../../source/pages/component-login-password';
import { LoginSso } from '../../source/pages/component-login-sso';

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
});

for (const language of SUPPORTED_LANGUAGES) {
  test(`localization is loaded correctly for ${language}`, async ({ page }) => {
    // BUG-017
    // I'll leave a 2 sec wait here
    // because sometime the language slector loads slower
    await page.waitForTimeout(2000);
    const errorMessageValidator = new ErrorLableValidator(page);
    const languageSelector = new LanguageSelector(page);
    await languageSelector.switchToLanguage(language);

    // check landing page elements
    const landingPage = new LandingPage(page);
    await landingPage.checkElementsForLanguage(language);
    // check password page elements
    const loginPagePassword = new LoginPassword(page);
    await loginPagePassword.checkElementsForLanguage(language);
    await loginPagePassword.login();
    await errorMessageValidator.checkEmptyLoginInputsErrorLabel(language);
    await loginPagePassword.login('alexandru.mahu@hotmail.com');
    await errorMessageValidator.checkWrongPasswordErrorLabel(language);
    await loginPagePassword.login('alexandru.mahu');
    await errorMessageValidator.checkErrorInvalidEmailErrorLabel(language);

    await loginPagePassword.switchToSsoLogin();

    // check sso page elements
    const loginPageSso = new LoginSso(page);
    await loginPageSso.checkElementsForLanguage(language);
    await loginPageSso.login();
    await errorMessageValidator.checkEmptyLoginInputsErrorLabel(language);
    await loginPageSso.login('alexandru.mahu');
    await errorMessageValidator.checkErrorInvalidEmailErrorLabel(language);
    await loginPageSso.login('alexandru.mahu@hotmail.com');
    await errorMessageValidator.checkUnknownSsoEmailErrorLabel(language);
  });
}