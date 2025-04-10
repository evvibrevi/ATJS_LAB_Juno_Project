import { BasePage } from './base.page';

export class HomePage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('');
  }
}
