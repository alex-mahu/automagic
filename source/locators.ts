import { Locator, Page } from "@playwright/test";

export const LOGIN_LABEL_LOCATOR = 'h1[class*="ContentBoxTitle"]';
export const LOGIN_EMAIL_LABEL_LOCATOR = 'label[for="email"]';
export const LOGIN_EMAIL_INPUT_LOCATOR = '#email';

export const LOGIN_BUTTON_LOCATOR = 'button[type="submit"]';
export const OR_LABEL_LOCATOR = '[class*="AlternativeAction_label"]';

export function getSwitchButtonLocator(page:Page) : Locator {
    return page.locator('[class*="AlternativeAction_container"]').getByRole('button');
}