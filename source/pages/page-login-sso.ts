import { expect, Locator, Page } from "@playwright/test";
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
}