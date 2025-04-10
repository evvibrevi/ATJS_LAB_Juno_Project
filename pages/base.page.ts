import { Page } from '@playwright/test';
import { Header } from './components/common/header/header.component';

export abstract class BasePage {
  protected page: Page;
  header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
  }

  async open(): Promise<void> {
    await this.page.goto('');
  }
}
