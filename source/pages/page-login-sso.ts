import { expect, Locator, Page } from "@playwright/test";
import { LANDING_PAGE_LOCALIZATION } from "../localization-data";
import { getSwitchButtonLocator, LOGIN_BUTTON_LOCATOR, LOGIN_EMAIL_INPUT_LOCATOR, LOGIN_EMAIL_LABEL_LOCATOR, LOGIN_LABEL_LOCATOR, OR_LABEL_LOCATOR } from "../locators";

export class LoginSso {
    private readonly page: Page;

    private readonly loginLabel: Locator;

    private readonly emailLabel: Locator;
    private readonly emailInput: Locator;

    private readonly loginButton: Locator;

    private readonly orLabel: Locator;

    private readonly switchToPasswordLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginLabel = page.locator(LOGIN_LABEL_LOCATOR);

        this.emailLabel = page.locator(LOGIN_EMAIL_LABEL_LOCATOR);
        this.emailInput = page.locator(LOGIN_EMAIL_INPUT_LOCATOR);

        this.loginButton = page.locator(LOGIN_BUTTON_LOCATOR);

        this.orLabel = page.locator(OR_LABEL_LOCATOR);

        this.switchToPasswordLoginButton = getSwitchButtonLocator(page);
    }

    public async validateElementsVisibility() {
        await expect.soft(this.loginLabel).toBeVisible();

        await expect.soft(this.emailLabel).toBeVisible();
        await expect.soft(this.emailInput).toBeVisible();

        await expect.soft(this.loginButton).toBeVisible();

        await expect.soft(this.orLabel).toBeVisible();

        await expect.soft(this.switchToPasswordLoginButton).toBeVisible();
    }

    public async checkElementsForLanguage(language: string) {
        const localization = LANDING_PAGE_LOCALIZATION.sso;
        await expect.soft(this.loginLabel).toHaveText(localization.title[language], { timeout: 1000 });
        await expect.soft(this.emailLabel).toHaveText(localization.email[language], { timeout: 1000 });
        await expect.soft(this.loginButton).toHaveText(localization.login[language], { timeout: 1000 });
        await expect.soft(this.orLabel).toHaveText(LANDING_PAGE_LOCALIZATION.or[language], { timeout: 1000 });
        await expect.soft(this.switchToPasswordLoginButton).toHaveText(localization.switch[language], { timeout: 1000 });
    }

    public async login(email?: string) {
        if (email) {
            await this.emailInput.type(email);
        }
        await this.loginButton.click();
    }
}