import { Page, Locator, expect } from '@playwright/test';
import { BasePopup } from './base.popup';

export class CookiePopup extends BasePopup {
  private popupContainer: Locator;
  private desktopOkButton: Locator;
  private mobileOkButton: Locator;

  constructor(page: Page) {
    super(page);
    this.popupContainer = this.page.locator('#juno-cookie-consent.show');
    this.desktopOkButton = this.popupContainer.locator('div.d-none.d-md-block > button.btn-primary:has-text("OK")');
    this.mobileOkButton = this.popupContainer.locator('button.btn-primary.d-md-none.mt-3:has-text("OK")');
  }

  async closeIfVisible(): Promise<void> {
    try {
      if (await this.popupContainer.isVisible({ timeout: 3000 })) {
        console.log('Cookie popup is visible. Attempting to close it.');

        if (await this.desktopOkButton.isVisible()) {
          await this.desktopOkButton.click();
        } else if (await this.mobileOkButton.isVisible()) {
          await this.mobileOkButton.click();
        }

        await this.page.waitForSelector('#juno-cookie-consent.show', { state: 'hidden', timeout: 5000 });
        console.log('Cookie popup successfully closed.');
      } else {
        console.log('Cookie popup is not visible.');
      }
    } catch (error) {
      console.warn('Failed to close the cookie popup:', error);
    }
  }
}
