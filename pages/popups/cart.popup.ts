import { Locator } from '@playwright/test';
import { BasePopup } from './base.popup';

export class CartPopup extends BasePopup {
  get viewCartButton(): Locator {
    return this.page.getByRole('link', { name: 'View cart' });
  }

  async openCart(): Promise<void> {
    await this.viewCartButton.click();
  }

  async waitForPopup(): Promise<void> {
    await this.page.locator('.cart_popup').waitFor({ state: 'visible', timeout: 5000 });
  }

  async goToCart(): Promise<void> {
    await this.viewCartButton.click();
  }
}