import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';
import { HomePage } from '../../pages/home.page';
import { SearchBar } from '../../pages/components/common/header/searchBar.component';

test('Add to Cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchBar = new SearchBar(page);
  const searchTerm = 'CME 25DIN6mini TRS 2.5mm To DIN6mini Cable (10cm)';
  const itemClass = 'img-fluid';

  await homePage.open();
  await homePage.header.searchBar.search(searchTerm);
  await searchBar.clickFoundItem(itemClass);

  const productPage = new ProductPage(page);
  const productName = await productPage.getProductName();
  const productPrice = await productPage.getProductPrice();

  await productPage.addProductToCart();
  await productPage.cartPopup.goToCart();

  const cartPage = new CartPage(page); //
  expect(await cartPage.getProductName()).toContain(productName ?? '');
  expect(await cartPage.getProductPrice()).toContain(productPrice ?? '');

  await cartPage.increaseQuantity();
  await cartPage.waitForCartUpdate();
  expect(await cartPage.getQuantity()).toBe(2);


  await cartPage.decreaseQuantity();
  await cartPage.waitForCartUpdate();
  expect(await cartPage.getQuantity()).toBe(1);


  await cartPage.removeProduct();
  await cartPage.waitForCartUpdate();
  expect(await cartPage.isCartEmpty()).toBeTruthy();
});
