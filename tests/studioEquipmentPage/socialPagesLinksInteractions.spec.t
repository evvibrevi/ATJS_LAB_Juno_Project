import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';

test('Social pages links interactions', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);

  await studioPage.open();
  const pagePromise = page.context().waitForEvent('page');

  await studioPage.footer.socialInstagramButton.click();

  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  const instagramUrl = newPage.url();

  expect(instagramUrl).toContain('instagram.com');
});
