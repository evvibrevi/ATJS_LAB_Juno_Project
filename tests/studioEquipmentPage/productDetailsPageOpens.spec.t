import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';
import { ProductPage } from '../../pages/product.page';

test('Product details page opens', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);
  const productPage: ProductPage = new ProductPage(page);

  await studioPage.open();
  await studioPage.openFirstProduct();

  await expect(productPage.cartButton).toBeVisible();
  await expect(productPage.reviews).toBeVisible();
});
