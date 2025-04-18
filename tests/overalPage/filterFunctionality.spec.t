import { test, expect } from '@playwright/test';
import { ProductListingPage } from '../../pages/productListing.page';
import { isArraySortedAscending } from '../../helpers/array-utils';


test('Product listing filters work correctly', async ({ page }) => {
    const listingPage = new ProductListingPage(page);
    await page.goto('all/eight-weeks/');
    await listingPage.productSortingFilter.sortByPrice('High to low');
    await page.waitForTimeout(1000)
// prices filter check
    const initialPrices = await listingPage.findAllPrices();
    console.log('Prices before sorting:', initialPrices);
    await listingPage.productSortingFilter.sortByPrice('Low to high');
    await expect(async () => {
      const currentPrices = await listingPage.findAllPrices();
      expect(currentPrices).not.toEqual(initialPrices);
    }).toPass({ timeout: 10000 });
    const sortedPrices = await listingPage.findAllPrices();
    console.log('Prices after sorting:', sortedPrices);
    expect(sortedPrices).not.toEqual(initialPrices);
    expect(isArraySortedAscending(sortedPrices)).toBe(true);
  // Brand filter
  const brandName = 'cme';
  // Choose "cme" brand in the checkbox
  await listingPage.productFilterSidebar.filterByBrand(brandName);
  await page.waitForTimeout(3000);
  const initialCMECount = await listingPage.countProductsWithSelectedBrandAlternative(brandName);
  expect(initialCMECount).toBeGreaterThan(0);
  await expect(page.locator('.dv-item')).toHaveCount(initialCMECount);
})