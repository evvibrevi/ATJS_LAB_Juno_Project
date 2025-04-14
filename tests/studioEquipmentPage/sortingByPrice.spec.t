import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';
import { isArraySortedAscending } from '../../helpers/array-utils';
import { ProductListingPage } from '../../pages/productListing.page';

test('Sorting by price', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);
  const productListingPage: ProductListingPage = new ProductListingPage(page);

  await studioPage.open();
  await studioPage.openNewStudioEquipmentSecton();

  await productListingPage.productSortingFilter.sortByPrice('Low to high');

  const AllPricesOnPage = await productListingPage.findAllPrices();

  expect(isArraySortedAscending(AllPricesOnPage)).toBeTruthy();
});
