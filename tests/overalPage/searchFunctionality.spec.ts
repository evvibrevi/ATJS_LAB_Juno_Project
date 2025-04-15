import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductListingPage } from '../../pages/productListing.page';

test('Validate Search Functionality', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);
  const productListingPage: ProductListingPage = new ProductListingPage(page);
  const searchTerm: string = 'Alabama Shakes';

  await homePage.open();
  await homePage.header.searchBar.search(searchTerm);

  const numberOfProductsOnPage = await productListingPage.countProductsOnPage();
  const numberOfSearchedProductsOnPage =
    await productListingPage.countProductsWithSearchKeyword(searchTerm);

  expect(numberOfProductsOnPage).toEqual(numberOfSearchedProductsOnPage);
});