import { Page, Locator, expect } from '@playwright/test';
import { BasePopup } from './base.popup';

export class HumanPopup extends BasePopup {
  private captchaIframe: Locator;
  private popupClose: Locator;

  constructor(page: Page) {
    super(page);
    this.captchaIframe = this.page.locator('iframe[src*="recaptcha"]');
    this.popupClose = this.page.locator('.popup-close, .modal-close');
  }

  // Returns whether the popup is currently visible and handles it
  async isVisible(): Promise<void> {
    // Check if CAPTCHA iframe or modal is present
    if (await this.captchaIframe.first().isVisible()) {
      console.warn('CAPTCHA detected - skipping further steps.');
      return;
    }

    // Try to close popup if it has a close button
    if (await this.popupClose.isVisible()) {
      await this.popupClose.click();
      console.log('Closed the popup');
    }

    // Continue with normal test expectations
    await expect(this.page.locator('h1')).toHaveText('Welcome');
  }
}
