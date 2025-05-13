import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { MusicMagazinesPage } from '../../pages/musicMagazines.page';
import { CookiePopup } from '../../pages/popups/cookie.popup';
import { DeliveryPopup } from '../../pages/popups/delivery.popup';
import { HumanPopup } from '../../pages/popups/human.popup';

test('should sort products by price in ascending order', async ({ page }) => {
  const cookiePopup = new CookiePopup(page);
  const deliveryPopup = new DeliveryPopup(page);
  const homePage = new HomePage(page);
  const musicMagazinesPage = new MusicMagazinesPage(page);
  const humanPopup = new HumanPopup(page);

  await homePage.open();
  await deliveryPopup.closeIfVisible();
  await cookiePopup.closeIfVisible();
  await humanPopup.isVisible();
  await musicMagazinesPage.selectDjEquipmentCategory();
  await musicMagazinesPage.selectMusicMagazineSubcategory();
  await musicMagazinesPage.sortByPriceLowToHigh();
  await musicMagazinesPage.verifyPriceSorting();
});