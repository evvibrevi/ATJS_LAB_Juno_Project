import { Page } from '@playwright/test';

export abstract class BasePopup {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
