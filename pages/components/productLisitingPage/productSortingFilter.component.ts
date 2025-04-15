import { BaseComponent } from '../common/base.component';
import { Locator } from '@playwright/test';

export class ProductSortingFilter extends BaseComponent {
  get sortDropdown(): Locator {
    return this.page.locator('#topmenu-sort_options');
  }

  get LowToHighOption(): Locator {
    return this.page.getByRole('link', { name: 'Low to high' }).first();
  }

  get HighToLowOption(): Locator {
    return this.page.getByRole('link', { name: 'High to low' }).nth(1);
  }

  async sortByPrice(method: 'Low to high' | 'High to low'): Promise<void> {
    await this.sortDropdown.click();

    if (method === 'Low to high') {
      await this.LowToHighOption.click();
      await this.page.waitForURL(/price_up/);
    } else {
      await this.HighToLowOption.click();
      await this.page.waitForURL(/price_down/);
    }
  }
}
