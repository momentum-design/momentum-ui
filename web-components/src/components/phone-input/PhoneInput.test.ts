import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";

import "./PhoneInput";
import { type PhoneInput } from "./PhoneInput";

jest.mock("country-codes-list", () => ({
  customArray: jest.fn().mockReturnValue([
    { name: "United States", value: "1", code: "US" },
    { name: "Canada", value: "1", code: "CA" },
    { name: "United Kingdom", value: "44", code: "GB" }
  ])
}));

jest.mock("country-flags-svg", () => ({
  findFlagUrlByIso2Code: jest.fn().mockReturnValue("data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=")
}));

jest.mock("libphonenumber-js", () => ({
  parsePhoneNumber: jest.fn().mockReturnValue({
    isValid: () => true,
    format: () => "+1234567890",
    country: "US"
  }),
  getCountries: jest.fn().mockReturnValue(["US", "CA", "GB"]),
  getCountryCallingCode: jest.fn().mockReturnValue("1"),
  AsYouType: jest.fn().mockImplementation(() => ({
    input: jest.fn(),
    getNumber: jest.fn().mockReturnValue("+1234567890")
  })),
  CountryCode: {
    US: "1",
    CA: "1",
    GB: "44"
  },
  isValidNumberForRegion: jest.fn().mockReturnValue(true)
}));

describe("PhoneInput Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render phone input", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);
    expect(element).not.toBeNull();
  });

  test("should render a Pill shape", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input pill></md-phone-input> `);
    expect(element.hasAttribute("pill")).toBeTruthy();
    expect(element.shadowRoot!.querySelector("md-input")?.shape).toEqual("pill");
  });

  test("should emit a custom event on input blur", async () => {
    const parentElementPromise = fixture(html` <div class="parent"></div> `);

    const parentElement = await parentElementPromise;
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);

    const mockFunc = jest.fn();
    parentElement.appendChild(element);
    parentElement.addEventListener("phoneinput-blur", mockFunc);

    const event: Event = new Event("input-blur");
    element.handleBlur(event);

    expect(mockFunc).toHaveBeenCalled();
    expect(element.value).toBeFalsy();
  });

  test("should verify phone number on input blur", async () => {
    const parentElementPromise = fixture(html` <div class="parent"></div> `);

    const parentElement = await parentElementPromise;
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input value="(773)-777-6002"></md-phone-input> `);

    parentElement.appendChild(element);

    const event: Event = new Event("input-blur");
    element.handleBlur(event);

    expect(element.value).toBeTruthy();
  });

  test("should emit a custom event on input blur with stripping the selected country code", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);

    const mockFunc = jest.fn();
    element.addEventListener("phoneinput-blur", mockFunc);

    const phoneInput = element.shadowRoot?.querySelector("md-input");
    const eventData = {
      bubbles: true,
      composed: true,
      detail: {
        value: "+19997770701"
      }
    };
    const inputEvent: CustomEvent = new CustomEvent("input-keydown", eventData);
    phoneInput?.dispatchEvent(inputEvent);

    const event1: Event = new CustomEvent("input-change", eventData);
    phoneInput?.dispatchEvent(event1);

    const event: Event = new CustomEvent("input-blur", {});
    phoneInput?.dispatchEvent(event);
    expect(mockFunc).toHaveBeenCalled();
  });

  test("should trigger a Phone Change event", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);
    const phoneChangeSpy = jest.spyOn(element, "handlePhoneChange");
    const phoneInput = element.shadowRoot?.querySelector("md-input");
    const event: CustomEvent = new CustomEvent("input-change", {
      bubbles: true,
      composed: true,
      detail: {
        value: "a"
      }
    });
    phoneInput?.dispatchEvent(event);
    expect(phoneChangeSpy).toHaveBeenCalled();
  });

  test("should register a KeyDown event", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);
    const keyDownSpy = jest.spyOn(element, "handleKeydown");
    const phoneInput = element.shadowRoot?.querySelector("md-input");
    const event: CustomEvent = new CustomEvent("input-keydown", {
      bubbles: true,
      composed: true,
      detail: {
        value: "a"
      }
    });
    phoneInput?.dispatchEvent(event);
    expect(keyDownSpy).toHaveBeenCalled();
  });

  test("should not display error on empty input text-box", async () => {
    const parentElementPromise = fixture(html` <div class="parent"></div> `);

    const parentElement = await parentElementPromise;
    const element = await fixture<PhoneInput.ELEMENT>(html`
      <md-phone-input
        type="tel"
        id="international"
        name="international-value"
        value=""
        country-calling-code="+1"
        errorMessage="invalid phone number"
      ></md-phone-input>
    `);

    parentElement.appendChild(element);

    const event: Event = new Event("input-blur");
    element.handleBlur(event);
    await elementUpdated(element);
    const input = element.shadowRoot?.querySelector("md-input");
    const helpText = input?.shadowRoot?.querySelector("md-help-text");
    const slot = helpText?.shadowRoot?.querySelector("slot");
    expect(slot?.textContent).toBeUndefined();
  });
});
