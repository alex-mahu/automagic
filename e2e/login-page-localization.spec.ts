import { test, expect } from '@playwright/test';
import { APP_URL } from '../general-configuration';
import { loginWithPasswordTitle, SUPPORTED_LANGUAGES } from '../source/localization-data';
import { LanguageSelector } from '../source/pages/language-selector';

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
});



for (const language of SUPPORTED_LANGUAGES) {
  test.describe(`localization tests for language [${language}]`, async () => {
    test('for action title we have correct text', async ({ page }) => {
      const languageSelector = new LanguageSelector(page);
      await languageSelector.switchToLanguage(language);
      
      const loginTypeTitle = page.locator('h1[class]');
      await expect(loginTypeTitle).toHaveText(loginWithPasswordTitle[language]);
    });
  });
}