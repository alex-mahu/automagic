import { Locator, Page } from '@playwright/test';

export class LanguageSelector {
    private readonly page: Page;
    private readonly languageSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.languageSelector = page.locator('#language-switcher');
    }

    public async switchToLanguage(language: string) {
        const currentLanguage = await this.languageSelector.textContent();
        if (language == currentLanguage) {
            return
        }

        await this.openLanguagePopover();
        await this.selectLanguage(language);
    }

    private async selectLanguage(language: string) {
        const languagesHolder = this.page.locator('.rc-virtual-list-holder-inner')
                                        .locator(`[label=${language}]`);
        await languagesHolder.click();
    }

    private async openLanguagePopover() {
        await this.languageSelector.click();
    }


}
