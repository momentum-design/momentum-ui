import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import countryCodesList, { customArray } from "country-codes-list";
import "libphonenumber-js";
import "./CountryCodePicker";
import { CountryCodePicker } from "./CountryCodePicker";

const countryData = [
  { name: "Andorra", value: "376", code: "AD" },
  { name: "Afghanistan", value: "93", code: "AF" },
  { name: "Antigua and Barbuda", value: "1268", code: "AG" }
];

describe("CountryCodePicker Component", () => {
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
    expect(codeList).not.toBeNull();
  });

  test("should render a Pill shape", async () => {
    const element = await fixture<CountryCodePicker.ELEMENT>(html`
      <md-country-code-picker pill></md-country-code-picker>
    `);
    expect(customArraySpy).toHaveBeenCalled();
    expect(element.hasAttribute("pill")).toBeTruthy();
    expect(element.shadowRoot!.querySelector("md-combobox")?.shape).toEqual("pill");
  });

  test("should trigger a Country Change", async () => {
    const element = await fixture<CountryCodePicker.ELEMENT>(html`<md-country-code-picker></md-country-code-picker>`);
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
    const element = await fixture<CountryCodePicker.ELEMENT>(html`<md-country-code-picker></md-country-code-picker>`);
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

  test("should mark the selected country option with aria-selected so screen readers announce it", async () => {
    const element = await fixture<CountryCodePicker.ELEMENT>(html`
      <md-country-code-picker .countryCallingCode=${"+376, Andorra, AD"}></md-country-code-picker>
    `);
    await elementUpdated(element);
    const combobox = element.shadowRoot!.querySelector("md-combobox") as HTMLElement & {
      expanded: boolean;
    };
    combobox.expanded = true;
    await elementUpdated(combobox);
    jest.advanceTimersByTime(600);
    await elementUpdated(combobox);

    const options = [...combobox.shadowRoot!.querySelectorAll(".md-combobox-option")];
    const selected = combobox.shadowRoot!.querySelector('.md-combobox-option[aria-selected="true"]');

    expect(selected).not.toBeNull();
    expect(selected!.getAttribute("role")).toEqual("option");
    expect(selected!.id).toEqual("+376, Andorra, AD");
    // Every option exposes an explicit selected state; only the chosen one is true.
    options.forEach((option) => {
      expect(option.getAttribute("role")).toEqual("option");
      expect(option.getAttribute("aria-selected")).toEqual(option === selected ? "true" : "false");
    });
  });

  test("Should render a flag image when show-flags is true", async () => {
    const element = await fixture<CountryCodePicker.ELEMENT>(
      html`<md-country-code-picker show-flags></md-country-code-picker>`
    );
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
});
