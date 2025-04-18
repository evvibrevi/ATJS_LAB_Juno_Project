import { Locator } from '@playwright/test';
import { BaseComponent } from '../common/base.component';

export class ProductFilterSidebar extends BaseComponent {
  async filterByBrand(name: string): Promise<void> {
    try {
      await this.page.locator(`div[title="${name}"]`).click();
      await this.page.waitForURL(/brand/);
    } catch {
      throw new Error(
        `Unable to filter by brand "${name}". Check the name of the brand`
      );
    }
  }

  get brandSearchField(): Locator {
    return this.page.locator('#filters input[placeholder="Search brand"]');
  }

  async searchAndSelectBrand(name: string): Promise<void> {
    await this.brandSearchField.fill(name);
    await this.page.locator(`div[title="${name}"]`).click();
  }
}
