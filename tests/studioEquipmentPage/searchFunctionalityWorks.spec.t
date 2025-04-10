import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';
import { ProductListingPage } from '../../pages/productListing.page';

test('Product details page opens', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);
  const productListingPage: ProductListingPage = new ProductListingPage(page);
  const searchTerm: string = 'microphone';

  await studioPage.open();
  await studioPage.header.searchBar.search(searchTerm);

  const numberOfProductsOnPage = await productListingPage.countProductsOnPage();
  const numberOfSearchedProductsOnPage =
    await productListingPage.countProductsWithSearchKeyword(searchTerm);

  expect(numberOfProductsOnPage).toEqual(numberOfSearchedProductsOnPage);
});
