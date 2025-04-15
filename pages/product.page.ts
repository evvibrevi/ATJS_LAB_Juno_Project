import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { CartPopup } from './popups/cart.popup';

export class ProductPage extends BasePage {
  readonly cartPopup: CartPopup;

  constructor(page: Page) {
    super(page);
    this.cartPopup = new CartPopup(page);
  }

  async getProductName(): Promise<string | null> {
    return await this.page
      .locator('.product-title-eq.d-none.d-lg-block h1 span')
      .textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.page
      .locator('.product-pricing-eq h2.text-cta')
      .textContent();
  }

  get cartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to Cart' });
  }

  get reviews(): Locator {
    return this.page.locator('.juno-box-light');
  }

  async addProductToCart(): Promise<void> {
    await this.cartButton.click();
  }
}
