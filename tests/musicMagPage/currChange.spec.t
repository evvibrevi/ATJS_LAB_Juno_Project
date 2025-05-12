import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { MusicMagazinesPage } from '../../pages/musicMagazines.page';
import { CookiePopup } from '../../pages/popups/cookie.popup';
import { DeliveryPopup } from '../../pages/popups/delivery.popup';

test('should display product pricing in USD currency', async ({ page }) => {
  // Initialize page objects
  const homePage = new HomePage(page);
  const musicMagazinesPage = new MusicMagazinesPage(page);
    const cookiePopup = new CookiePopup(page);
    const deliveryPopup = new DeliveryPopup(page);

  // Step 1: Navigate to the homepage
  await homePage.open();
   await deliveryPopup.closeIfVisible();
    await cookiePopup.closeIfVisible();
  // Step 2: Click on "DJ Equipment" category
  await musicMagazinesPage.selectDjEquipmentCategory();

  // Step 3: Select "Music magazine" subcategory
  await musicMagazinesPage.selectMusicMagazineSubcategory();

    await musicMagazinesPage.selectSubcategory();
    await musicMagazinesPage.filterCurrency();
    await musicMagazinesPage.verifyCurrency();

});

// Unfortunately, the test case for GBP currency is not implemented in this code snippet. The currency locator is not defined in the MusicMagazinesPage class, 
// and the test case is not provided.