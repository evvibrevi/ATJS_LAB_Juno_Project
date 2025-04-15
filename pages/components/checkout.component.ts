import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './common/base.component';

export class CheckoutForm extends BaseComponent {
  get firstName(): Locator {
    return this.page.locator('input[name="form[first_name]"]');
  }

  get lastName(): Locator {
    return this.page.locator('input[name="form[last_name]"]');
  }

  get address(): Locator {
    return this.page.locator('input[name="form[address1]"]');
  }

  get city(): Locator {
    return this.page.locator('input[name="form[town_city]"]');
  }

  get postcode(): Locator {
    return this.page.locator('input[name="form[postcode]"]');
  }

  get phone(): Locator {
    return this.page.locator('input[name="form[phone_number]"]');
  }


  get cardIframe() {
    return this.page.frameLocator('iframe#access-worldpay-pan');
  }


  get cardNumber() {
    return this.cardIframe.locator('input[autocomplete="cc-number"]');
  }

  get expiryDate() {
    return this.cardIframe.locator('input[autocomplete="cc-exp"]');
  }

  get cvv() {
    return this.cardIframe.locator('input[autocomplete="cc-csc"]');
  }

  async fillForm(): Promise<void> {
    await this.firstName.fill('John');
    await this.lastName.fill('Doe');
    await this.address.fill('123 Test Street');
    await this.city.fill('London');
    await this.postcode.fill('W1A 1AA');
    await this.phone.fill('07123456789');

    // iframe
    await this.cardNumber.fill('4111 1111 1111 1111');
    await this.cardNumber.evaluate((el) => el.blur())
    await this.expiryDate.fill('12/30');
    await this.expiryDate.evaluate((el) => el.blur())
    await this.cvv.fill('123');
    await this.cvv.evaluate((el) => el.blur())
  }
}
