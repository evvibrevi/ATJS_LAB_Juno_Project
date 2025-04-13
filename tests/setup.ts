import { test as setup, expect } from '@playwright/test';

setup('global setup', async ({ page }) => {
  await page.goto('https://www.juno.co.uk/');

  const cookieConsent = page.locator('#juno-cookie-consent');
  if (await cookieConsent.isVisible()) {
    await page.locator('#cookie-consent-s div').click();
    await page.locator('#cookie-consent-m div').click();
    await page.getByRole('button', { name: 'OK' }).click();

    await expect(cookieConsent).toHaveClass('');
  }

  await page.context().storageState({ path: 'state.json' });
});
