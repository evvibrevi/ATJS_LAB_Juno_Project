import { Page } from '@playwright/test';

export abstract class BasePopup {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
