import { BasePage } from './base.page';

export class CartPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('/cart/');
  }

  async getProductName(): Promise<string | null> {
    return await this.page
      .locator('.cart-title.cart-title-eq > a')
      .textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.page.locator('#subtotal_val').textContent();
  }
}
