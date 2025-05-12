import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';

export class MusicMagazinesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async selectDjEquipmentCategory(): Promise<void> {
        const djEquipmentLink = this.page.locator('a[href="/dj-equipment/"]:has-text("DJ Equipment")').first();
        await djEquipmentLink.click();
    }

    async selectMusicMagazineSubcategory(): Promise<void> {
        const musicMagazineLink = this.page.locator('div.eqs-box a[href="https://www.juno.co.uk/dj-equipment/music-magazine/"]');
        await musicMagazineLink.click();
    }

    async openFirstProduct(): Promise<void> {
        const firstProduct = this.page.locator('.product-list .dv-item').first();
        const productLink = firstProduct.locator('a.text-md:not(.text-light)');
        await productLink.click();
    }

    async scrollToRecommendationSection(): Promise<void> {
        const firstProductPage = this.page.locator('div#product-page-equipment');
        await firstProductPage.waitFor({ state: 'visible' });
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        const recommendationSection = this.page.locator('div#jw-pwbt h4.jw-title-main:has-text("People who bought this also bought")');
        await recommendationSection.waitFor({ state: 'visible' });
        await expect(recommendationSection).toHaveText('People who bought this also bought');
    }

    async verifyAddToCartButtons(): Promise<void> {
        const recommendationSection = this.page.locator('h4.jw-title-main:has-text("People who bought this also bought")');
        await expect(recommendationSection).toBeVisible();

        const productItems = this.page.locator('.jw-item');
        const productCount = await productItems.count();

        for (let i = 0; i < productCount; i++) {
            const product = productItems.nth(i);
            const addToCartButton = product.locator('button.btn-widget-atc');

            await expect(addToCartButton, `Missing "Add to Cart" on product #${i + 1}`).toBeVisible();
            await expect(addToCartButton, `"Add to Cart" not enabled on product #${i + 1}`).toBeEnabled();
        }
    }

    // currency change currChange.spec.ts (The problem is that the currency dropdown is not visible when the page loads)

    async selectSubcategory(): Promise<void> {
        console.log('Waiting for the page to load...');
        await this.page.waitForLoadState('networkidle');

        console.log('Waiting for currency dropdown to be attached...');
        await this.page.waitForSelector('#ht-dd-currency', { state: 'attached', timeout: 10000 });

        const currencyDropdown = this.page.locator('#ht-dd-currency');
        const isVisible = await currencyDropdown.isVisible();
        console.log(`Currency dropdown visibility: ${isVisible}`);

        if (!isVisible) {
            console.log('Forcing click on the currency dropdown...');
            await currencyDropdown.click({ force: true });
        } else {
            console.log('Clicking on the currency dropdown...');
            await currencyDropdown.click();
        }
    }

    async filterCurrency(): Promise<void> {
        console.log('Waiting for USD option...');

        const currencyDropdown = this.page.locator('#ht-dd-currency');
        await currencyDropdown.click();
        await this.page.waitForSelector('.dropdown-menu.show', { state: 'visible', timeout: 10000 });

        const usdOption = this.page.locator('.dropdown-menu.show button.dropdown-item:has-text("USD")');
        const isVisible = await usdOption.isVisible();
        console.log(`USD option visibility: ${isVisible}`);

        if (!isVisible) {
            console.log('Forcing click on the USD option...');
            await usdOption.click({ force: true });
        } else {
            console.log('Clicking on the USD option...');
            await usdOption.click();
        }

        console.log('Waiting for page to load...');
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector('.price_lrg.text-cta', { timeout: 10000 });
    }

    async verifyCurrency(): Promise<void> {
        console.log('Opening currency dropdown...');
        await this.page.waitForSelector('#ht-dd-currency', { state: 'visible', timeout: 10000 });
        const currencyDropdown = this.page.locator('#ht-dd-currency');
        await currencyDropdown.click({ timeout: 10000 });

        console.log('Selecting USD...');
        const usdOption = this.page.locator('button.dropdown-item', { hasText: 'USD' });
        await usdOption.waitFor({ timeout: 10000 });
        await usdOption.click({ timeout: 10000 });

        console.log('Waiting for prices to appear...');
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector('.price_lrg.text-cta', { timeout: 10000 });

        const productPrices = this.page.locator('.price_lrg.text-cta');
        const priceCount = await productPrices.count();

        expect(priceCount).toBeGreaterThan(0);
        for (let i = 0; i < priceCount; i++) {
            const priceText = await productPrices.nth(i).innerText();
            console.log(`Verified price: ${priceText}`);
            expect(priceText).toContain('$');
        }
    }

    // Check if the product image is present imageCheck.spec.ts
    async verifyProductImage(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('.product-list', { state: 'visible', timeout: 10000 });
        console.log('Page loaded and product list is visible.');

        const productImages = this.page.locator('img.img-fluid');
        const imageCount = await productImages.count();

        expect(imageCount).toBeGreaterThan(0);

        for (let i = 0; i < imageCount; i++) {
            const imageSrc = await productImages.nth(i).getAttribute('src');
            console.log(`Image ${i + 1}: ${imageSrc}`);
            expect(imageSrc).not.toBeNull();
        }
        console.log(`Total number of product images found: ${imageCount}`);
    }

    // Filter by "Show Out Of Stock" showOutOFStock.spec.ts
    async selectShowOutOfStock(): Promise<void> {
        // Wait for the filter section to be visible
        await this.page.waitForSelector('.facet-items', { state: 'visible' });

        // Locate and click the "Show Out Of Stock" checkbox
        const showOutOfStockCheckbox = this.page.locator('.facet-items .facet-item', {
            hasText: 'Show Out Of Stock',
        }).locator('input[type="checkbox"]');

        if (await showOutOfStockCheckbox.isVisible()) {
            await showOutOfStockCheckbox.click();
            console.log('Clicked "Show Out Of Stock" checkbox.');
        }

        // Wait for filtering to finish and products to load
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('.product-list', { state: 'visible' });

        // Check that "e-mail alert" buttons are visible, confirming out-of-stock items
        const outOfStockButtons = this.page.locator('button[title*="e-mail alert"]');
        const outOfStockCount = await outOfStockButtons.count();

        expect(outOfStockCount).toBeGreaterThan(0);
        console.log(`Found ${outOfStockCount} out-of-stock items.`);

        for (let i = 0; i < outOfStockCount; i++) {
            expect(await outOfStockButtons.nth(i).isVisible()).toBeTruthy();
        }
    }

    async verifyNoAddToCartButtons(): Promise<void> {
        // Wait for product list to fully load
        await this.page.waitForSelector('.product-list', { state: 'visible' });
        await this.page.waitForLoadState('networkidle');

        // Look for visible "Add to Cart" buttons
        const addToCartButtons = this.page.locator('button:has-text("Add to Cart")');

        // Count visible ones
        const addToCartCount = await addToCartButtons.count();
        console.log(`Number of "Add to Cart" buttons found: ${addToCartCount}`);

        // Assert that none are present (since we only show out-of-stock)
        expect(addToCartCount).toBe(0);
    }

    // Filter by price range from Low to High priceRange.spec.ts 

    async sortByPriceLowToHigh(): Promise<void> {
        const sortingDropdown = this.page.locator('.juno-dropdown-menu.dropdown-toggle');
        await sortingDropdown.click();

        const lowToHighOption = this.page.locator('li.dd-item > a:has-text("Low to high")').nth(0);
        await lowToHighOption.click({ force: true });
        console.log('Clicked "Low to High" sorting option using updated locator.');

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('.price_lrg.text-cta', { state: 'visible', timeout: 10000 });
    }

    async verifyPriceSorting(): Promise<void> {
        const productPrices = await this.page.locator('.price_lrg.text-cta').allTextContents();
        console.log('Raw product prices:', productPrices);

        const numericPrices = productPrices
            .map(price => parseFloat(price.replace('$', '').trim()))
            .filter(price => !isNaN(price));

        if (numericPrices.length === 0) {
            console.warn('No valid prices found on the page.');
            return;
        }

        console.log('Numeric product prices:', numericPrices);

        for (let i = 0; i < numericPrices.length - 1; i++) {
            expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
        }

        console.log('Products are sorted by price in ascending order.');
    }

    // Filer by word "wire" wireFilter.spec.ts
    async filterByWord(): Promise<void> {
        const myFiltersHeader = this.page.locator('.facet-search.sb_widget .h-new', { hasText: 'My filters' });
        await expect(myFiltersHeader).toBeVisible();

        const searchInput = this.page.locator('#query-within');
        await searchInput.fill('wire');

        const searchButton = this.page.locator('.btn-search-within');
        await searchButton.click();

        await this.page.waitForLoadState('networkidle');

    }
    async verifyFilerByWord(): Promise<void> {
        const productHighlights = this.page.locator('.vi-text.mb-1.jq_highlight');
        const totalCount = await productHighlights.count();
        expect(totalCount).toBeGreaterThan(0);

        let wireMatchCount = 0;

        for (let i = 0; i < totalCount; i++) {
            const productHTML = await productHighlights.nth(i).innerHTML();
            if (productHTML.toLowerCase().includes('wire')) {
                wireMatchCount++;
            }
        }
        expect(wireMatchCount).toBe(totalCount);

        console.log(`Total products: ${totalCount}`);
        console.log(`Products containing 'wire': ${wireMatchCount}`);
    }

    // Make sure subcategory is displayed subcatDisplay.spec.ts
    async verifySubcategoryDisplay(): Promise<void> {
        const sidebar = this.page.locator('#switch-equipment-container');

        await expect(sidebar).toBeVisible();
        await this.page.waitForLoadState('networkidle');

        const heading = sidebar.locator('h5.h-new');
        await expect(heading).toHaveText('Equipment');
        console.log('Sidebar is visible and contains expected heading text');
    }

    // Check if the product is presand after adding to cart shoppingCard.spec.ts
    async addToCart(): Promise<void> {

        const addToCartButton = this.page.locator('button[onclick*="addToCart(925242"]');
        await addToCartButton.click();
        await this.page.waitForLoadState('networkidle');

    }
    async openCart(): Promise<void> {
        const viewCardButton = this.page.locator('a.btn.btn-lg.btn-success', { hasText: 'View cart' });
        await viewCardButton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async verifyProductInCart(): Promise<void> {
        await this.page.waitForURL('**/cart/');
        const productArtist = this.page.locator('.cart-artist', { hasText: 'UGLY THINGS' });
        await expect(productArtist).toBeVisible();

        const productLabel = this.page.locator('.cart-label a', { hasText: 'Ugly Things US' });
        await expect(productLabel).toBeVisible();
        console.log('Product is present in the cart');
    }

}