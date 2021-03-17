import { fixture, fixtureCleanup, html, waitUntil } from "@open-wc/testing-helpers";
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
    const element = await fixture<PhoneInput.ELEMENT>(
      html`
        <md-phone-input></md-phone-input>
      `
    );
    expect(customArraySpy).toHaveBeenCalled();
    expect(element).not.toBeNull();
  });

  test("should render a Pill shape", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(
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
    const element = await fixture<PhoneInput.ELEMENT>(
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
  test("should not trigger a Country Change if the field is exited without a value", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(
      html`
        <md-phone-input></md-phone-input>
      `
    );
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
    const parentElement = await fixture(
      html`
        <div class="parent"></div>
      `
    );
    const element = await fixture<PhoneInput.ELEMENT>(
      html`
        <md-phone-input></md-phone-input>
      `
    );

    const mockFunc = jest.fn();
    parentElement.appendChild(element);
    parentElement.addEventListener("phoneinput-blur", mockFunc);

    const event: Event = new Event("input-blur");
    element.handleBlur(event);

    expect(mockFunc).toHaveBeenCalled();
    expect(element.value).toBeFalsy();
  });
  test("should verify phone number on input blur", async () => {
    const parentElement = await fixture(
      html`
        <div class="parent"></div>
      `
    );
    const element = await fixture<PhoneInput.ELEMENT>(
      html`
        <md-phone-input value="(773)-777-6002"></md-phone-input>
      `
    );

    parentElement.appendChild(element);

    const event: Event = new Event("input-blur");
    element.handleBlur(event);

    expect(element.value).toBeTruthy();
  });

  test("should trigger a Phone Change event", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(
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
    const element = await fixture<PhoneInput.ELEMENT>(
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

  test("should show the US flag when default country code is +1", async () => {
    const element = await fixture(
      html`
        <md-phone-input codePlaceholder="+1"></md-phone-input>
      `
    );

    expect(element.shadowRoot?.querySelector('md-combobox')?.classList).toContain("flag__usa");
  });

  test("should not show the US flag when default country code is not +1", async () => {
    const element = await fixture(
      html`
        <md-phone-input codePlaceholder="+7"></md-phone-input>
      `
    );

    expect(element.shadowRoot?.querySelector('md-combobox')?.classList).not.toContain("flag__usa");
  });

  test("should show the US flag when united states is selected from a list", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(
      html`
        <md-phone-input></md-phone-input>
      `
    );

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

    expect(element.shadowRoot?.querySelector('md-combobox')?.classList).toContain("flag__usa");
  });

  test("should NOT show the US flag when united states is selected from a list", async () => {
    const element = await fixture<PhoneInput.ELEMENT>(
      html`
        <md-phone-input></md-phone-input>
      `
    );
    const classList = element.shadowRoot?.querySelector('md-combobox')?.classList;

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

    await waitUntil(() => !classList?.contains('flag__usa'), 'Class "flag__usa" never disappeared');

    expect(classList).not.toContain("flag__usa");
  });

});
