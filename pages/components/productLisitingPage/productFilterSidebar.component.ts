import { BaseComponent } from '../common/base.component';

export class ProductFilterSidebar extends BaseComponent {
  async filterByBrand(name: string): Promise<void> {
    try {
      await this.page.locator(`div[title="${name}"]`).click();
    } catch {
      throw new Error(
        `Unable to filter by brand "${name}". Check the name of the brand`
      );
    }
  }
}
