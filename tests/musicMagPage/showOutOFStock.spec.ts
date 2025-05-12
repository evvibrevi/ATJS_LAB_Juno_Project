import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { MusicMagazinesPage } from '../../pages/musicMagazines.page';
import { CookiePopup } from '../../pages/popups/cookie.popup';
import { DeliveryPopup } from '../../pages/popups/delivery.popup';

test('should show only out-of-stock products when filter is applied', async ({ page }) => {
  const cookiePopup = new CookiePopup(page);
  const deliveryPopup = new DeliveryPopup(page);
  const homePage = new HomePage(page);
  const musicMagazinesPage = new MusicMagazinesPage(page);

  await homePage.open();
  await deliveryPopup.closeIfVisible();
  await cookiePopup.closeIfVisible();
  await page.context().clearPermissions();
  await musicMagazinesPage.selectDjEquipmentCategory();
  await musicMagazinesPage.selectMusicMagazineSubcategory();

  await musicMagazinesPage.selectShowOutOfStock();
  await musicMagazinesPage.verifyNoAddToCartButtons();

});
