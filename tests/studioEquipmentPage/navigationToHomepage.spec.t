import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';

test('Navigation to home Juno page', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);

  await studioPage.open();
  await studioPage.header.logo.click();

  await expect(page).toHaveURL('https://www.juno.co.uk');
});
