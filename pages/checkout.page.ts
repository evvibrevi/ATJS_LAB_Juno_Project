import { BasePage } from './base.page';
import { expect, Page } from '@playwright/test';
import { CheckoutForm } from '../pages/components/checkout.component';

export class CheckoutPage extends BasePage {
  form: CheckoutForm;

  constructor(page: Page) {
    super(page);
    this.form = new CheckoutForm(page);
  }

  async open(): Promise<void> {
    const checkoutButton = this.page.locator('input#btn_new_customer');
    await checkoutButton.scrollIntoViewIfNeeded();
    await checkoutButton.click();
    await this.page.waitForURL('**/cart/checkout/');
  }

  async isSubmitEnabled(): Promise<boolean> {
    const button = this.page.locator('button[id="co_submit_1"]');
    await button.waitFor({ state: 'attached', timeout: 5000 });

    await expect(button).toBeEnabled({ timeout: 5000 });
    return true;
  }
}

