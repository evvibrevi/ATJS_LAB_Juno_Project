import { test as setup, expect, Locator } from '@playwright/test';

setup(
  'Close startup banner, accept cookies and save browser state',
  async ({ page }) => {
    await page.goto('https://www.juno.co.uk/');

    const ShopNowBanner: Locator = page
      .locator('button[data-dismiss="modal"]')
      .filter({ hasText: 'Shop now!' });
    if (await ShopNowBanner.isVisible()) {
      await ShopNowBanner.click();
      await expect(ShopNowBanner).toBeHidden();
    }

    const cookieConsent: Locator = page.locator('#juno-cookie-consent');
    if (await cookieConsent.isVisible()) {
      await page.locator('#cookie-consent-s div').click();
      await page.locator('#cookie-consent-m div').click();
      await page.getByRole('button', { name: 'OK' }).click();

      await expect(cookieConsent).toHaveClass('');
    }

    await page.context().storageState({ path: 'state.json' });
  }
);
