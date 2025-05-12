import { Page, Locator, expect } from '@playwright/test';
import { BasePopup } from './base.popup';

export class DeliveryPopup extends BasePopup {
  isVisible() {
    throw new Error('Method not implemented.');
  }
  private popupContainer: Locator;
  private okButton: Locator;

  constructor(page: Page) {
    super(page);
    this.popupContainer = this.page.locator('#modal-we-deliver');
    this.okButton = this.popupContainer.getByRole('button', { name: 'OK' });
  }

  async closeIfVisible(): Promise<void> {
    try {
      if (await this.popupContainer.isVisible({ timeout: 3000 })) {
        await this.okButton.click();
        await expect(this.popupContainer).toBeHidden({ timeout: 5000 });
      }
    } catch (error) {
      console.warn('Delivery popup was not visible or could not be closed:', error);
    }
  }
}