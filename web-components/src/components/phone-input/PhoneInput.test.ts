import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import countryCodesList, { customArray } from "country-codes-list";
import "libphonenumber-js";
import "./PhoneInput";
import { PhoneInput } from "./PhoneInput";

const countryData = [
  { name: "Andorra", value: "376", code: "AD" },
  { name: "Afghanistan", value: "93", code: "AF" },
  { name: "Antigua and Barbuda", value: "1268", code: "AG" }
];

describe("PhoneInput Component", () => {
  let customArraySpy: jest.SpyInstance<unknown, unknown[]>;
  beforeEach(() => {
    jest.useFakeTimers();
    customArraySpy = jest.spyOn(countryCodesList, "customArray").mockReturnValueOnce(countryData);
  });

  afterEach(() => {
    fixtureCleanup();
    jest.restoreAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("should get country code list", async () => {
    const codeList = customArray({
      name: "{countryNameEn}",
      value: "{countryCallingCode}",
      code: "{countryCode}"
    });
    expect(codeList).not.toBeNull;
  });

  test("should render phone input", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);
    expect(customArraySpy).toHaveBeenCalled();
    expect(element).not.toBeNull();
  });

  test("should render a Pill shape", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input pill></md-phone-input> `);
    expect(element.hasAttribute("pill")).toBeTruthy();
    expect(element.shadowRoot!.querySelector("md-combobox")?.shape).toEqual("pill");
    expect(element.shadowRoot!.querySelector("md-input")?.shape).toEqual("pill");
  });
  test("should trigger a Country Change", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);
    const event: CustomEvent = new CustomEvent("change-selected", {
      composed: true,
      bubbles: true,
      detail: {
        value: {
          id: "+1268,AntiguaandBarbuda,AG",
          value: "+1268"
        }
      }
    });
    element.handleCountryChange(event);

    expect(element.countryCallingCode).toEqual("+1268,AntiguaandBarbuda,AG");
  });

  test("should not trigger a Country Change if the field is exited without a value", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input></md-phone-input> `);
    const event: CustomEvent = new CustomEvent("change-selected", {
      composed: true,
      bubbles: true,
      detail: {
        value: undefined
      }
    });
    element.handleCountryChange(event);

    expect(element.countryCallingCode).toEqual("");
  });
  test("should emit a custom event on input blur", async () => {
    const parentElementPromise = fixture(html` <div class="parent"></div> `);
    jest.runOnlyPendingTimers();
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
    jest.runOnlyPendingTimers();
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
    expect(mockFunc).toBeCalled();
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

  test("Should render a flag image when show-flags is true", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(html` <md-phone-input show-flags></md-phone-input> `);
    const getFlagOperation = jest.spyOn(element, "getCountryFlag");
    const event: CustomEvent = new CustomEvent("change-selected", {
      composed: true,
      bubbles: true,
      detail: {
        value: {
          id: "+1,United States of America,US",
          value: "+1"
        }
      }
    });
    element.handleCountryChange(event);
    await elementUpdated(element);
    const flag = element.shadowRoot?.querySelector("span.flag-box");
    expect(getFlagOperation).toHaveBeenCalled();
    expect(flag?.querySelector("img")).not.toBeNull();
  });

  test("should not display error on empty input text-box", async () => {
    const parentElementPromise = fixture(html` <div class="parent"></div> `);
    jest.runOnlyPendingTimers();
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
