import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base.component';
import { SearchBar } from './searchBar.component';

export class Header extends BaseComponent {
  searchBar: SearchBar;

  constructor(page: Page) {
    super(page);
    this.searchBar = new SearchBar(page);
  }

  get cart(): Locator {
    return this.page.getByRole('link', { name: 'Cart', exact: true });
  }

  get logo(): Locator {
    return this.page.getByRole('link', { name: 'Juno Records' });
  }

  get currencyPicker(): Locator {
    return this.page
      .locator('div')
      .filter({ hasText: /^GBP$/ })
      .getByRole('img');
  }
}
