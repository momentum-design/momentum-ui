import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
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
  afterEach(() => {
    fixtureCleanup();
    jest.restoreAllMocks();
  });

  let customArraySpy: jest.SpyInstance<unknown, unknown[]>;
  beforeEach(() => {
    customArraySpy = jest.spyOn(countryCodesList, "customArray").mockReturnValueOnce(countryData);
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
    const element = await fixture<PhoneInput>(
      html`
        <md-phone-input></md-phone-input>
      `
    );
    expect(customArraySpy).toHaveBeenCalled();
    expect(element).not.toBeNull();
  });

  test("should render a Pill shape", async () => {
    const element = await fixture<PhoneInput>(
      html`
        <md-phone-input pill></md-phone-input>
      `
    );
    expect(element.hasAttribute("pill")).toBeTruthy();
    expect(element.shadowRoot!.querySelector("md-combobox")?.shape).toEqual("pill");
    expect(element.shadowRoot!.querySelector("md-input")?.shape).toEqual("pill");
  });
  // test("should render an error message", async () => {
  //   const element = await fixture<PhoneInput>(
  //     html`
  //       <md-phone-input errorMessage="Error"></md-phone-input>
  //     `
  //   );
  //   const isValidNumberForRegion = jest.mock("libphonenumber-js", jest.fn().mockReturnValue(false));
  //   const inputElement = element.shadowRoot!.querySelector("md-input");
  //   inputElement?.dispatchEvent(new FocusEvent("blur"));
  //   expect(inputElement?.messageArr.length).toBeGreaterThan(0);
  // });
  // test("should assign a country calling code to value prop of ComboBox", async () => {
  //   const element = await fixture<PhoneInput>(
  //     html`
  //       <md-phone-input country-calling-code="US"></md-phone-input>
  //     `
  //   );
  //   const comboBoxElement = element.shadowRoot?.querySelector("md-combobox");
  //   expect(comboBoxElement!.value).toEqual(["US"]);
  // });
  // test("should validate the phone choice input", async () => {
  //   const element = await fixture<PhoneInput>(
  //     html`
  //       <md-phone-input></md-phone-input>
  //     `
  //   );
  //   const event = new CustomEvent("change-selected", {
  //     composed: true,
  //     bubbles: true,
  //     detail: {
  //       value: {
  //         id: "+1268,AntiguaandBarbuda,AG",
  //         value: "+1268"
  //       }
  //     }
  //   });
  //   element.handlePhoneChange(event);
  //   const validator = jest.spyOn(element, "validateInput");
  //   expect(validator).toHaveBeenCalled();
  // });
  test("should trigger a Country Change", async () => {
    const element = await fixture<PhoneInput>(
      html`
        <md-phone-input></md-phone-input>
      `
    );
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

  test("should trigger a Phone Change event", async () => {
    const element = await fixture<PhoneInput>(
      html`
        <md-phone-input></md-phone-input>
      `
    );
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
  test("should register a KeyDwon event", async () => {
    const element = await fixture<PhoneInput>(
      html`
        <md-phone-input></md-phone-input>
      `
    );
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
});
