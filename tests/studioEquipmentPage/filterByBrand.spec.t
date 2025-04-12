import { test, expect } from '@playwright/test';
import { StudioEquipmentPage } from '../../pages/studioEquipment.page';
import { ProductListingPage } from '../../pages/productListing.page';

test('Filter by brand', async ({ page }) => {
  const studioPage: StudioEquipmentPage = new StudioEquipmentPage(page);
  const productListingPage: ProductListingPage = new ProductListingPage(page);
  const brand = 'cme';

  await studioPage.open();
  await studioPage.openNewStudioEquipmentSecton();

  await productListingPage.productFilterSidebar.filterByBrand(brand);

  const numberOfProductsOnPage = await productListingPage.countProductsOnPage();
  const numberOfProductsOnPageFitlteredByBrand =
    await productListingPage.countProductsWithSelectedBrand(brand);

  expect(numberOfProductsOnPageFitlteredByBrand).toEqual(
    numberOfProductsOnPage
  );
});
