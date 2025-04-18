import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('Verify Homepage UI Elements', async ({ page }) => {
  const homePage: HomePage = new HomePage(page);
  await homePage.open();
  // header
  await expect(homePage.header.logo).toBeVisible();
  await expect(homePage.header.cart).toBeVisible();
  await expect(homePage.header.searchBar.searchButton).toBeVisible();
  await expect(homePage.header.searchBar.searchInputField).toBeVisible();
  // main sections
  await expect(homePage.header.getHeaderDropdownByLocation('DJ Equipment dropdown')).toBeVisible();
  await expect(homePage.header.getHeaderDropdownByLocation('Music dropdown')).toBeVisible();
  await expect(homePage.header.getHeaderDropdownByLocation('Studio Equipment dropdown')).toBeVisible();
  await expect(homePage.header.getHeaderDropdownByLocation('Vinyl care & hi-fi dropdown')).toBeVisible();
  // footer
  await expect(page.locator('div.footer')).toBeVisible();
});
