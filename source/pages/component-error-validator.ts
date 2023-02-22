import { expect, Locator, Page } from '@playwright/test';
import { LANDING_PAGE_LOCALIZATION } from '../localization-data';

export class ErrorLableValidator {
    private readonly page:Page;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = page.locator('[class*="ErrorMessage_message"]');
    }

    public async checkEmptyLoginInputsErrorLabel(language: string) {
        await expect.soft(this.errorMessage).toHaveText(LANDING_PAGE_LOCALIZATION.errorEmpty[language], { timeout: 1000 });
    }

    public async checkWrongPasswordErrorLabel(language: string) {
        const localization = LANDING_PAGE_LOCALIZATION.password;
        await expect.soft(this.errorMessage).toHaveText(localization.errorWrongPassword[language], { timeout: 1000 });
    }

    public async checkErrorInvalidEmailErrorLabel(language: string) {
        await expect.soft(this.errorMessage).toHaveText(LANDING_PAGE_LOCALIZATION.errorInvalidEmail[language], { timeout: 1000 });
    }

    public async checkUnknownSsoEmailErrorLabel(language: string) {
        const localization = LANDING_PAGE_LOCALIZATION.sso;
        await expect.soft(this.errorMessage).toHaveText(localization.errorUnknownEmail[language], { timeout: 1000 });
    }

    
}