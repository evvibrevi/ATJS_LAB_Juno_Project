// filepath: /Users/altynaykabidesheva/Desktop/Projects/ATJS_LAB_Juno_Project/tests/vinylCareHifiSectionPage/vinylCareFixture.ts
import { test as baseTest } from '@playwright/test';
import { MusicMagazinesPage } from '../../pages/musicMagazines.page';

type Fixtures = {
  vinylCarePage: MusicMagazinesPage;
};

export const test = baseTest.extend<Fixtures>({
  vinylCarePage: async ({ page }, use) => {
    const vinylCarePage = new MusicMagazinesPage(page);
    await use(vinylCarePage);
  },
});

export { expect } from '@playwright/test';