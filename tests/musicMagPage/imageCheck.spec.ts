import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { MusicMagazinesPage } from '../../pages/musicMagazines.page';
import { CookiePopup } from '../../pages/popups/cookie.popup';
import { DeliveryPopup } from '../../pages/popups/delivery.popup';

test('should check that every product in page has product image', async ({ page }) => {
  const cookiePopup = new CookiePopup(page);
  const deliveryPopup = new DeliveryPopup(page);
  const homePage = new HomePage(page);
  const musicMagazinesPage = new MusicMagazinesPage(page);

  await homePage.open();
  await deliveryPopup.closeIfVisible();
  await cookiePopup.closeIfVisible();
  await musicMagazinesPage.selectDjEquipmentCategory();
  await musicMagazinesPage.selectMusicMagazineSubcategory();  
  await musicMagazinesPage.verifyProductImage();
})