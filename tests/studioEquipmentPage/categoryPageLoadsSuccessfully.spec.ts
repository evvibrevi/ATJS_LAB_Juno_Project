import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';

test('Page loads successfully', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);

  await studioPage.open();

  await expect(studioPage.header.logo).toBeVisible();
  await expect(studioPage.header.searchBar.searchButton).toBeVisible();
  await expect(studioPage.header.currencyPicker).toBeVisible();
});
