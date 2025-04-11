import { BaseComponent } from './base.component';

export class Footer extends BaseComponent {
  get socialInstagramButton() {
    return this.page.getByRole('link', { name: 'Join us on Instagram' }).nth(1);
  }
}
