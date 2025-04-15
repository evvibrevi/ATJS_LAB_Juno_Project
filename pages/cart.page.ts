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
  async increaseQuantity(): Promise<void> {
    const quantityInput = this.page.locator('input.quantity');
    const current = parseInt(await quantityInput.inputValue(), 10);
    const newValue = current + 1;
    await quantityInput.fill(newValue.toString());
    await quantityInput.press('Enter');
  }

  async decreaseQuantity(): Promise<void> {
    const quantityInput = this.page.locator('input.quantity');
    const current = parseInt(await quantityInput.inputValue(), 10);
    const newValue = Math.max(current - 1, 1);
    await quantityInput.fill(newValue.toString());
    await quantityInput.press('Enter');
  }

  async removeProduct(): Promise<void> {
    const deleteButtons = this.page.locator('a[data-ua_action="remove from cart"]');
    const count = await deleteButtons.count();
  
    for (let i = 0; i < count; i++) {
      const button = deleteButtons.nth(i);
      if (await button.isVisible()) {
        await button.click();
        break;
      }
    }
  }

  async waitForCartUpdate(): Promise<void> {
    await this.page.waitForTimeout(5000); // Даем время на обновление
  }

  async getQuantity(): Promise<number> {
    const value = await this.page.locator('input.quantity').inputValue();
    return parseInt(value, 10);
  }
  

  async isCartEmpty(): Promise<boolean> {
    return await this.page.locator('.cart_empty').isVisible();
  }
}
