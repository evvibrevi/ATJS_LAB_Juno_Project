import { Page } from '@playwright/test';
import { Header } from './components/common/header/header.component';
import { Footer } from './components/common/footer.component';

export abstract class BasePage {
  readonly page: Page;
  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async open(): Promise<void> {
    await this.page.goto('');
  }
}
