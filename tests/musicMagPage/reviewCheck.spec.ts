import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { MusicMagazinesPage } from '../../pages/musicMagazines.page';
import { SlipmatsPage } from '../../pages/slipmats.page';
import { CookiePopup } from '../../pages/popups/cookie.popup';
import { DeliveryPopup } from '../../pages/popups/delivery.popup';

test('should filter by "Reviewed" and verify reviews navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    const slipmatsPage = new SlipmatsPage(page);
    const cookiePopup = new CookiePopup(page);
    const deliveryPopup = new DeliveryPopup(page);
    const musicMagazinesPage = new MusicMagazinesPage(page);

    await homePage.open();
    await deliveryPopup.closeIfVisible();
    await cookiePopup.closeIfVisible();
    await musicMagazinesPage.selectDjEquipmentCategory();
    await slipmatsPage.selectSubcategory();
    await slipmatsPage.isReviewedCheckboxChecked();
    await slipmatsPage.verifyReviewsNavigation();

});

// Unfotrunately, the test is not working as expected. The checkbox is not being checked and the reviews navigation is not being verified.
// When aria-hidden="true" is set on a container, tools like Playwright (and screen readers) treat all children as hidden — even if they’re visually present. 
