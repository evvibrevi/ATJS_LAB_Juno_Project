import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';
import { HomePage } from '../../pages/home.page';
import { SearchBar } from '../../pages/components/common/header/searchBar.component';
import { CheckoutPage } from '../../pages/checkout.page';

const browsers = ['chromium', 'firefox', 'webkit'] as const;

for (const browserType of browsers) {
  test(`Checkout in ${browserType}`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
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
    
    const cartPage = new CartPage(page);
    expect(await cartPage.getProductName()).toContain(productName ?? '');
    expect(await cartPage.getProductPrice()).toContain(productPrice ?? '');
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.open();
    await checkoutPage.form.fillForm();
    expect(await checkoutPage.isSubmitEnabled()).toBe(true);

    await context.close();
  });
}