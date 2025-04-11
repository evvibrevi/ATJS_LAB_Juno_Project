import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';
import { ProductPage } from '../../pages/product.page';

test('Add to cart functionality', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);
  const productPage: ProductPage = new ProductPage(page);

  await studioPage.open();
  await studioPage.openFirstProduct();

  await productPage.addProductToCart();

  await expect(productPage.cartPopup.viewCartButton).toBeVisible();
});
