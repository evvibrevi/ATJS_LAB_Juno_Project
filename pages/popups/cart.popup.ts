import { Locator } from '@playwright/test';
import { BasePopup } from './base.popup';

export class CartPopup extends BasePopup {
  get viewCartButton(): Locator {
    return this.page.getByRole('link', { name: 'View cart' });
  }
}
