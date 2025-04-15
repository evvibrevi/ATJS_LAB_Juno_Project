import { Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

export class Footer extends BaseComponent {
  get socialInstagramButton(): Locator {
    return this.page.getByRole('link', { name: 'Join us on Instagram' }).nth(1);
  }
}
