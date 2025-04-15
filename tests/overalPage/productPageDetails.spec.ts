import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductListingPage } from '../../pages/productListing.page';
import { SearchBar } from '../../pages/components/common/header/searchBar.component';
import { ProductPage } from '../../pages/product.page';

test('Product Details Visible', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchBar = new SearchBar(page);
    const searchTerm = 'CME 25DIN6mini TRS 2.5mm To DIN6mini Cable (10cm)';
    const itemClass = 'img-fluid'; // class name
    await homePage.open();
    await homePage.header.searchBar.search(searchTerm);
    // click on the first element with class 'img-fluid'
    await searchBar.clickFoundItem(itemClass);
    const productPage = new ProductPage(page);
    await productPage.getProductName
    await productPage.verifyFeaturesTabIsVisible();
    const actualProductName = await productPage.getProductName();
    expect(actualProductName).toBe(searchTerm);
    await expect(productPage.featuresTab).toHaveText('Features');
    await expect(productPage.cartButton).toBeVisible();
    await expect(productPage.reviews).toBeVisible();
    await page.waitForTimeout(3000);
});