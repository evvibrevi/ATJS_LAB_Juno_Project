import { BaseComponent } from '../base.component';
import { Locator } from '@playwright/test';
import { FilterName } from '../../../../types/header';

export class SearchBar extends BaseComponent {
  get searchButton(): Locator {
    return this.page.getByRole('button', { name: 'Search' });
  }

  get searchInputField(): Locator {
    return this.page.locator('#query-main');
  }

  searchFilter(filterName: FilterName): Locator {
    return this.page.getByRole('button', { name: filterName });
  }

  async search(searchWord: string, filtername: FilterName = 'All') {
    await this.searchFilter('All').click();
    await this.searchFilter(filtername).click();
    await this.searchInputField.fill(searchWord);
    await this.searchButton.click();
    await this.page.waitForURL(/search/);
  }

foundItem(selector: string): Locator {
  const cssSelector = selector.startsWith('.') ? selector : `.${selector}`;
  return this.page.locator(cssSelector).first();
}

async clickFoundItem(selector: string): Promise<void> {
  await this.foundItem(selector).click();
}
}
