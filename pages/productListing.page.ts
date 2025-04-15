import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';
import { ProductFilterSidebar } from './components/productLisitingPage/productFilterSidebar.component';
import { ProductSortingFilter } from './components/productLisitingPage/productSortingFilter.component';

export class ProductListingPage extends BasePage {
  readonly productFilterSidebar: ProductFilterSidebar;
  readonly productSortingFilter: ProductSortingFilter;

  constructor(page: Page) {
    super(page);
    this.productFilterSidebar = new ProductFilterSidebar(page);
    this.productSortingFilter = new ProductSortingFilter(page);
  }

  async countProductsOnPage(): Promise<number> {
    return await this.page.locator('.dv-item').count();
  }

  async countProductsWithSearchKeyword(searchWord: string): Promise<number> {
    return await this.page
      .locator('.text-md .highlight.highlight-1')
      .filter({ hasText: searchWord })
      .count();
  }

  async countProductsWithSelectedBrand(brandName: string): Promise<number> {
    return await this.page
      .locator('.text-md.text-light')
      .filter({ hasText: brandName })
      .count();
  }
  async countProductsWithSelectedBrandAlternative(brandName: string): Promise<number> {
    // more concrete structure <a class="text-md text-light">CME</a>
    return await this.page.locator(`a.text-md.text-light:has-text("${brandName.toUpperCase()}")`).count();
  }

  async findAllPrices(): Promise<number[]> {
    const priceElements: Locator = this.page.locator('.price_lrg');

    const count: number = await priceElements.count();

    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      let priceText: string | null = await priceElements.nth(i).textContent();
      if (priceText) {
        if (priceText.includes(',')) {
          priceText = priceText.replace(',', '');
        }
        prices.push(Number(priceText.slice(1)));
      }
    }

    return prices;
  }
  // utils to check the order of sorting is in Project/helpers/array-utils.ts
}
