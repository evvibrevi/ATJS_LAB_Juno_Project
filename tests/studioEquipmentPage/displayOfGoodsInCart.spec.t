import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';
import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';

test('Cart page displays correct items', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);
  const productPage: ProductPage = new ProductPage(page);
  const cartPage: CartPage = new CartPage(page);

  await studioPage.open();
  await studioPage.openFirstProduct();

  const productNameOnProductPage = await productPage.getProductName();
  const productPriceOnProductPage = await productPage.getProductPrice();

  await productPage.addProductToCart();
  await productPage.cartPopup.openCart();

  const productNameInCart = await cartPage.getProductName();
  const productPriceInCart = await cartPage.getProductPrice();

  expect(productNameOnProductPage).toEqual(productNameInCart);
  expect(productPriceOnProductPage).toEqual(productPriceInCart);
});
