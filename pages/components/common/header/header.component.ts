import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from '../base.component';
import { SearchBar } from './searchBar.component';
import { HeaderDropdown } from '../../../../types/header';


export enum Currency {
  EUR = '€',
}
export class Header extends BaseComponent {
  readonly searchBar: SearchBar;

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
    return this.page.locator('div.ht-btn.touch-btn[aria-haspopup="true"]');
  }

  get studioEquipmentBreadCrumb(): Locator {
    return this.page
      .locator('#studio')
      .getByRole('link', { name: 'Studio equipment', exact: true });
  }

  get currentCurrency(): Locator {
    return this.page.locator('.ht-dd-curr .selected-curr');
  }

  get currencyDropdownButton(): Locator {
    return this.page.locator('#ht-dd-currency');
  }

  async selectCurrency(currencyLabel: string): Promise<void> {
    await this.currencyPicker.click();
    await this.currencyDropdownButton.click();
  
    const currencyDropdown = this.page.locator('.dropdown.position-static');
    const currencyOption = currencyDropdown.locator(`.dropdown-item:has-text("${currencyLabel}")`);
    await currencyOption.first().click();
  
    await expect(this.currencyPicker).toContainText(currencyLabel); // или ждать по-своему
  }

  get selectedCurrency(): Locator {
    return this.currencyPicker.locator('text=GEL, USD, EUR и т.д.'); // Можно уточнить
  }
  
  getHeaderDropdownByLocation(location: HeaderDropdown): Locator {
    return this.page.locator(`[data-ua_location="${location}"]`);
  }
  
}

