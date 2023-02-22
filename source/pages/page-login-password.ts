import { expect, Locator, Page } from "@playwright/test";
import { LANDING_PAGE_LOCALIZATION } from "../localization-data";
import { LOGIN_LABEL_LOCATOR, LOGIN_EMAIL_LABEL_LOCATOR, LOGIN_EMAIL_INPUT_LOCATOR, getSwitchButtonLocator, LOGIN_BUTTON_LOCATOR, OR_LABEL_LOCATOR } from "../locators";

export class LoginPassword {
    private readonly page: Page;

    private readonly loginLabel: Locator;

    private readonly emailLabel: Locator;
    private readonly emailInput: Locator;

    private readonly passwordLabel: Locator;
    private readonly passwordInput: Locator;

    private readonly forgotPasswordHyperlink: Locator;
    private readonly loginButton: Locator;

    private readonly orLabel: Locator;

    private readonly switchToSsoLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLabel = page.locator(LOGIN_LABEL_LOCATOR);

        this.emailLabel = page.locator(LOGIN_EMAIL_LABEL_LOCATOR);
        this.emailInput = page.locator(LOGIN_EMAIL_INPUT_LOCATOR);

        this.passwordLabel = page.locator('label[for="password"]');
        this.passwordInput = page.locator('#password');

        this.forgotPasswordHyperlink = page.locator('button[class*="PrimaryLogin_forgotPasswordAction"]');
        this.loginButton = page.locator(LOGIN_BUTTON_LOCATOR);

        this.orLabel = page.locator(OR_LABEL_LOCATOR);

        this.switchToSsoLoginButton = getSwitchButtonLocator(page);
    }

    public async validateElementsVisibility() {
        await expect.soft(this.loginLabel).toBeVisible();

        await expect.soft(this.emailLabel).toBeVisible();
        await expect.soft(this.emailInput).toBeVisible();

        await expect.soft(this.passwordLabel).toBeVisible();
        await expect.soft(this.passwordInput).toBeVisible();

        await expect.soft(this.forgotPasswordHyperlink).toBeVisible();
        await expect.soft(this.loginButton).toBeVisible();

        await expect.soft(this.orLabel).toBeVisible();

        await expect.soft(this.switchToSsoLoginButton).toBeVisible();
    }

    public async login(email?: string, password?: string) {
        if (email) {
            await this.emailInput.type(email);
        }
        if (password) {
            await this.passwordInput.type(password);
        }
        await this.loginButton.click();
    }

    public async switchToSsoLogin() {
        await this.switchToSsoLoginButton.click();
        // wait for text to load
        await this.page.waitForTimeout(1000);
    }

    public async checkElementsForLanguage(language: string) {
        const localization = LANDING_PAGE_LOCALIZATION.password;
        await expect.soft(this.loginLabel).toHaveText(localization.title[language], { timeout: 1000 });
        await expect.soft(this.emailLabel).toHaveText(localization.email[language], { timeout: 1000 });
        await expect.soft(this.passwordLabel).toHaveText(localization.password[language], { timeout: 1000 });
        await expect.soft(this.forgotPasswordHyperlink).toHaveText(localization.forgotPassword[language], { timeout: 1000 });
        await expect.soft(this.loginButton).toHaveText(localization.login[language], { timeout: 1000 });
        await expect.soft(this.orLabel).toHaveText(LANDING_PAGE_LOCALIZATION.or[language], { timeout: 1000 });
        await expect.soft(this.switchToSsoLoginButton).toHaveText(localization.switch[language], { timeout: 1000 });
    }

}