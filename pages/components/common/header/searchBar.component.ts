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
    this.searchFilter(filtername);
    await this.searchInputField.fill(searchWord);
    await this.searchButton.click();
  }
}
