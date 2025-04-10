import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class StudioEquipmentPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('/studio-equipment/');
  }

  get newStudioEquipmentHeader(): Locator {
    return this.page.getByRole('link', { name: 'New studio equipment' });
  }

  async openNewStudioEquipmentSecton(): Promise<void> {
    await this.newStudioEquipmentHeader.click();
  }

  get firstProduct(): Locator {
    return this.page.locator('a.jw-title.jwt-eq').first();
  }

  async openFirstProduct(): Promise<void> {
    await this.firstProduct.click();
  }
}
