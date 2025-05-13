import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { MusicMagazinesPage } from '../../pages/musicMagazines.page';
import { SlipmatsPage } from '../../pages/slipmats.page';
import { CookiePopup } from '../../pages/popups/cookie.popup';
import { DeliveryPopup } from '../../pages/popups/delivery.popup';
import { HumanPopup } from '../../pages/popups/human.popup';

test('should filter by brand', async ({ page }) => {

  const homePage = new HomePage(page);
  const slipmatsPage = new SlipmatsPage(page);
  const cookiePopup = new CookiePopup(page);
  const deliveryPopup = new DeliveryPopup(page);
  const musicMagazinesPage = new MusicMagazinesPage(page);
  const humanPopup = new HumanPopup(page);

  await homePage.open();
  await deliveryPopup.closeIfVisible();
  await cookiePopup.closeIfVisible();
  await humanPopup.isVisible();
  await musicMagazinesPage.selectDjEquipmentCategory();
  await slipmatsPage.selectSubcategory();
  await slipmatsPage.filterByBrand();
  await slipmatsPage.getAllVisibleProductBrands();
});