import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SlipmatsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectSubcategory(): Promise<void> {
    const slipmatsLink = this.page.locator('div.eqs-box a[href="https://www.juno.co.uk/dj-equipment/slipmats/"]').nth(0);
    await slipmatsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async filterByBrand(): Promise<void> {
    const targetBrands: string[] = ['idyd', 'magma', 'slipmat factory', 'other'];

    const trySelectBrand = async (brandName: string): Promise<boolean> => {
      const filterSection = this.page.locator('.facet-items').nth(3);
      await filterSection.waitFor({ state: 'visible' });

      const items = await this.page.locator('.facet-items .facet-item').elementHandles();

      for (const item of items) {
        const titleDiv = await item.$('.fw-text.text-truncate');
        const titleText = titleDiv ? (await titleDiv.textContent())?.trim().toLowerCase() : null;

        if (titleText === brandName.toLowerCase()) {
          const checkbox = await item.$('input[type="checkbox"]');
          if (checkbox) {
            const isChecked = await checkbox.isChecked();
            if (!isChecked) {
              await this.page.evaluate((checkbox) => {
                (checkbox as HTMLInputElement).checked = true;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
              }, checkbox);
            }
          }

          const parentElement = await item.$('xpath=ancestor::label');
          if (parentElement) {
            await parentElement.click();
          }

          console.log(`Brand "${brandName}" was found and clicked.`);
          return true;
        }
      }

      return false;
    };

    let found = false;
    for (const brand of targetBrands) {
      found = await trySelectBrand(brand);
      if (found) break;
    }

    if (!found) {
      throw new Error(`No target brand was found: ${targetBrands.join(', ')}`);
    }
  }

  async getAllVisibleProductBrands(): Promise<void> {
    const idydFilter = this.page.locator('.facet-items .facet-item', { hasText: 'idyd' });
    if (await idydFilter.count() > 0) {
      await idydFilter.first().click();
      await this.page.waitForLoadState('networkidle');
    }

    const labelElements = this.page.locator('.vi-text.mb-1.jq_highlight >> a.text-md.text-light');
    const labelCount = await labelElements.count();

    expect(labelCount).toBeGreaterThan(0);

    for (let i = 0; i < labelCount; i++) {
      const labelText = await labelElements.nth(i).innerText();
      expect(labelText.trim().toLowerCase()).toBe('idyd');
    }
    console.log(`Products have been successfully filtered by the brand "idyd". Total found: ${labelCount}`);
  }

  // Method to check if the "Reviewed" checkbox is checked reviewCheck.spec.ts
  async isReviewedCheckboxChecked(): Promise<void> {
    const reviewedCheckbox = this.page.locator('.facet-items .facet-item .fw-text.text-truncate[title="Reviewed"]');
    await reviewedCheckbox.click();
    console.log('Checked the "Reviewed" checkbox.');

    await this.page.waitForLoadState('networkidle');
  }
  async verifyReviewsNavigation(): Promise<void> {
    const firstProduct = this.page.locator('.vi-text.mb-1.jq_highlight a.text-md').first();
    const firstProductTitle = await firstProduct.innerText();
    await firstProduct.click();
    console.log(`Clicked on the first product: ${firstProductTitle}`);

    const reviewsSection = this.page.locator('#trustpilot-box');
    await expect(reviewsSection).toBeVisible();
    console.log('Reviews section is visible.');

}
}