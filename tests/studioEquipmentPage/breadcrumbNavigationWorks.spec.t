import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';
import { ProductPage } from '../../pages/product.page';

test('Breadcrumb navigation works', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);
  const productPage: ProductPage = new ProductPage(page);

  await studioPage.open();
  await studioPage.openFirstProduct();

  await productPage.header.studioEquipmentBreadCrumb.click();

  await expect(page).toHaveURL(/studio-equipment/);
});
