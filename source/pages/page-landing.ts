import { expect, Locator, Page } from '@playwright/test';
import { LANDING_PAGE_LOCALIZATION } from '../localization-data';

export class LandingPage {
    private readonly page: Page;
    private readonly languageSelector: Locator;
    private readonly sherpanyLogo: Locator;
    // Most important marker :)
    private readonly swissMadeSoftware: Locator;

    private readonly sherpanySiteHyperlink: Locator;
    private readonly meetingResourcesHyperlink: Locator;
    private readonly privacyPolicyHyperlink: Locator;
    private readonly termsOfUseHyperlink: Locator;

    private readonly downloadOnLable: Locator;
    private readonly appleStoreHyperlink: Locator;
    private readonly androidStoreHyperlink: Locator;
    private readonly windowsStoreHyperlink: Locator;

    private readonly noAccountYet: Locator;
    private readonly requestDemoHyperlink: Locator;
    private readonly contactSupportHyperlink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.languageSelector = page.locator('.ant-select-selector');
        this.sherpanyLogo = page.locator('img[alt="sherpany"]');
        this.swissMadeSoftware = page.locator('img[alt="Swiss Made Software"]');

        this.sherpanySiteHyperlink = page.locator('a[href="https://www.sherpany.com/"]');
        this.meetingResourcesHyperlink = page.locator('a[href="https://www.sherpany.com/resources/meeting-management/"]');
        this.privacyPolicyHyperlink = page.locator('a[href="https://www.sherpany.com/privacy-policy/"]');
        this.termsOfUseHyperlink = page.locator('a[href="https://app.sherpany.com/terms/"]');

        this.downloadOnLable = page.locator('[class*="NativeAppsLinks_label"]')
        this.appleStoreHyperlink = page.locator('a[href="https://itunes.apple.com/app/id1172873177"]');
        this.androidStoreHyperlink = page.locator('a[href="https://play.google.com/store/apps/details?id=ch.sherpany.boardroom"]');
        this.windowsStoreHyperlink = page.locator('a[href="https://www.microsoft.com/store/apps/9NH1PR95ZXF7"]');

        const demoInfoHolder = page.locator('[class*="RequestDemoAction"]');
        this.noAccountYet = demoInfoHolder.locator('span');
        this.requestDemoHyperlink = demoInfoHolder.locator('a[href="https://www.sherpany.com/demo/?from_app=true"]');
        this.contactSupportHyperlink = page.locator('button[class*="GetHelpAction"]');
    }

    public async validateStaticElements() {
        // BUG-017
        await expect.soft(this.languageSelector).toBeVisible();
        await expect.soft(this.sherpanyLogo).toBeVisible();
        await expect.soft(this.swissMadeSoftware).toBeVisible();

        await expect.soft(this.sherpanySiteHyperlink).toBeVisible();
        await expect.soft(this.meetingResourcesHyperlink).toBeVisible();
        await expect.soft(this.privacyPolicyHyperlink).toBeVisible();
        await expect.soft(this.termsOfUseHyperlink).toBeVisible();

        await expect.soft(this.downloadOnLable).toBeVisible();
        await expect.soft(this.appleStoreHyperlink).toBeVisible();
        await expect.soft(this.androidStoreHyperlink).toBeVisible();
        await expect.soft(this.windowsStoreHyperlink).toBeVisible();

        await expect.soft(this.noAccountYet).toBeVisible();
        await expect.soft(this.requestDemoHyperlink).toBeVisible();
        await expect.soft(this.contactSupportHyperlink).toBeVisible();
    }

    public async checkElementsForLanguage(language: string) {
        await expect.soft(this.noAccountYet).toHaveText(LANDING_PAGE_LOCALIZATION.noAccount[language], { timeout: 1000 });
        await expect.soft(this.requestDemoHyperlink).toHaveText(LANDING_PAGE_LOCALIZATION.requestDemo[language], { timeout: 1000 });
        await expect.soft(this.contactSupportHyperlink).toHaveText(LANDING_PAGE_LOCALIZATION.getHelp[language], { timeout: 1000 });

        await expect.soft(this.sherpanySiteHyperlink).toHaveText('Sherpany.com', { timeout: 1000 });
        await expect.soft(this.meetingResourcesHyperlink).toHaveText(LANDING_PAGE_LOCALIZATION.meetingResources[language], { timeout: 1000 });
        await expect.soft(this.privacyPolicyHyperlink).toHaveText(LANDING_PAGE_LOCALIZATION.privacyPolicy[language], { timeout: 1000 });
        await expect.soft(this.termsOfUseHyperlink).toHaveText(LANDING_PAGE_LOCALIZATION.termsOfUse[language], { timeout: 1000 });

        await expect.soft(this.downloadOnLable).toHaveText(LANDING_PAGE_LOCALIZATION.downloadOn[language], { timeout: 1000 });
    }
}