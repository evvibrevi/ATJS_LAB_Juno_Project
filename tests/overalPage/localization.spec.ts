import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('Currency should switch to EUR', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  const oldCurrency = await homePage.header.currencyPicker.textContent();

await homePage.header.selectCurrency('EUR');

await expect(homePage.header.currencyPicker).toHaveText(/EUR/);
await expect(homePage.header.currencyPicker).not.toHaveText(oldCurrency!);
});
