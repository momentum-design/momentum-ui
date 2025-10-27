import { Key } from "@/constants";
import { now } from "@/utils/dateUtils";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { TemplateResult } from "lit-element";
import { DateTime, Settings } from "luxon";
import "../button/Button";
import "../popover/Popover";
import "./DatePicker";
import { DatePickerControlButton, type DatePicker } from "./DatePicker";

const DATE1 = DateTime.fromObject({ year: 2025, month: 4, day: 10 });
const DATE2 = DateTime.fromObject({ year: 2025, month: 5, day: 15 });

const keyNavEvent = (key: KeyboardEvent["code"], date: DateTime): CustomEvent => {
  return new CustomEvent("day-key-event", {
    detail: {
      date: date,
      sourceEvent: new KeyboardEvent("keydown", { code: key })
    }
  });
};

const createKeyboardEvent = (code: string) =>
  new KeyboardEvent("keydown", {
    code
  });

async function createFixture(template: string | TemplateResult): Promise<DatePicker.ELEMENT> {
  const element = await fixture<DatePicker.ELEMENT>(template);
  return element;
}

describe("DatePicker Component with menu-overlay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html` <md-datepicker></md-datepicker> `);
    expect(el).not.toBeNull();
  });

  test("should open on pressing arrowDown on input", async () => {
    const startDate = now();
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .focusedDate=${startDate}></md-datepicker>
    `);
    const input = el.shadowRoot!.querySelector("md-input");
    input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
    expect(el.menuOverlay.isOpen).toBeTruthy();
  });

  test("should close on pressing cancel button", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .controlButtons=${{ cancel: { value: "CANCEL" } }}></md-datepicker>
    `);
    const input = el.shadowRoot!.querySelector("md-input");
    input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
    expect(el.menuOverlay.isOpen).toBeTruthy();

    const cancelButton = el.shadowRoot!.querySelector("md-button.cancel-button");
    cancelButton?.dispatchEvent(new MouseEvent("button-click"));
    expect(el.menuOverlay.isOpen).toBeFalsy();
  });

  test.each([[false], [true]])(
    "should automatically update date selection unless Apply button present (%s)",
    async (includeApplyButton: boolean) => {
      const firstDate = DateTime.fromObject({ month: 11, day: 15 });
      const secondDate = firstDate.plus({ days: 2 });
      let el: DatePicker.ELEMENT;
      if (includeApplyButton) {
        el = await createFixture(
          html` <md-datepicker .selectedDate=${firstDate} .controlButtons=${{ apply: { value: "APPLY" } }}>
          </md-datepicker>`
        );
      } else {
        el = await createFixture(html` <md-datepicker .selectedDate=${firstDate}></md-datepicker> `);
      }
      const event = new CustomEvent("day-select", {
        detail: {
          date: secondDate
        }
      });
      const selectFunc = jest.spyOn(el, "handleSelect");
      el.handleSelect(event);
      expect(selectFunc).toHaveBeenCalled();
      if (includeApplyButton) {
        expect(el.selectedDate).toEqual(firstDate);
        const applyButton = el.shadowRoot!.querySelector("md-button.apply-button");
        applyButton?.dispatchEvent(new MouseEvent("button-click"));
        expect(el.selectedDate).toEqual(secondDate);
      } else {
        expect(el.selectedDate).toEqual(secondDate);
      }
    }
  );

  test.each([
    { cancel: { value: "CANCEL" }, apply: { value: "APPLY" } },
    { cancel: { value: "FOO" } },
    { apply: { value: "BAR" } }
  ])(
    "should have correct strings for control buttons",
    async (controlButtons: { cancel?: DatePickerControlButton; apply?: DatePickerControlButton }) => {
      const el: DatePicker.ELEMENT = await createFixture(
        html` <md-datepicker .controlButtons=${controlButtons}> </md-datepicker>`
      );
      const cancelButton = el.shadowRoot!.querySelector("md-button.cancel-button");
      const applyButton = el.shadowRoot!.querySelector("md-button.apply-button");

      if (Object.prototype.hasOwnProperty.call(controlButtons, "cancel")) {
        expect(cancelButton?.textContent).toContain(controlButtons["cancel"]?.value);
      } else {
        expect(cancelButton).toBeNull();
      }
      if (Object.prototype.hasOwnProperty.call(controlButtons, "apply")) {
        expect(applyButton?.textContent).toContain(controlButtons["apply"]?.value);
      }
    }
  );

  test("should handle date selection update", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.plus({ days: 2 });
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .selectedDate=${firstDate}></md-datepicker>
    `);
    const event = new CustomEvent("day-select", {
      detail: {
        date: secondDate
      }
    });
    const selectFunc = jest.spyOn(el, "handleSelect");
    el.handleSelect(event);
    expect(selectFunc).toHaveBeenCalled();
    expect(el.selectedDate).toEqual(secondDate);
  });

  test("should NOT handle date selection update WHEN 'Apply' button present", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.plus({ days: 2 });
    const el: DatePicker.ELEMENT = await createFixture(
      html` <md-datepicker .selectedDate=${firstDate} .controlButtons=${{ apply: { value: "APPLY" } }}>
      </md-datepicker>`
    );
    const event = new CustomEvent("day-select", {
      detail: {
        date: secondDate
      }
    });
    const selectFunc = jest.spyOn(el, "handleSelect");
    el.handleSelect(event);
    expect(selectFunc).toHaveBeenCalled();
    expect(el.selectedDate).toEqual(firstDate);
  });

  test("should navigate focus with keydown events", async () => {
    const startDate = now();
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .focusedDate=${startDate}></md-datepicker>
    `);
    const navLeft = keyNavEvent("ArrowLeft", startDate);
    el.handleKeyDown(navLeft);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal - 1);
    const navRight = keyNavEvent("ArrowRight", startDate);
    el.handleKeyDown(navRight);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal);
    const navUp = keyNavEvent("ArrowUp", startDate);
    el.handleKeyDown(navUp);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal - 7);
    const navDown = keyNavEvent("ArrowDown", startDate);
    el.handleKeyDown(navDown);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal);
  });
  test("should select date with keydown events", async () => {
    const startDate = now();
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .focusedDate=${startDate}></md-datepicker>
    `);
    const selectionFunc = jest.spyOn(el, "handleSelect");
    const enterSelect = keyNavEvent("Enter", startDate);
    el.handleKeyDown(enterSelect);
    await el.updateComplete;
    expect(selectionFunc).toHaveBeenCalled();
    const spaceSelect = keyNavEvent("Space", startDate);
    el.handleKeyDown(spaceSelect);
    await el.updateComplete;
    expect(selectionFunc).toHaveBeenCalled();
  });

  test("should render with custom date trigger", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker custom-trigger>
        <md-button slot="date-trigger" variant="primary">Date Trigger</md-button>
      </md-datepicker>
    `);
    expect(el).not.toBeNull();
  });

  test("should use default aria label if no ariaLabel prop is set", async () => {
    Settings.defaultLocale = "en-US";
    const el: DatePicker.ELEMENT = await createFixture(html` <md-datepicker value="2024-05-01"></md-datepicker> `);
    const input = el.shadowRoot?.querySelector("md-input");
    expect(input).not.toBeNull();
    expect(input?.ariaLabel).toBe("Choose Date, selected date is May 1, 2024");
  });

  test("should use custom aria label if ariaLabel prop is set", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker value="2024-05-01" ariaLabel="Custom aria label"></md-datepicker>
    `);
    const input = el.shadowRoot?.querySelector("md-input");
    expect(input).not.toBeNull();
    expect(input?.ariaLabel).toBe("Custom aria label");
  });

  test("should render with default date if we set showDefaultNowDate as true", async () => {
    const todayDate = now();
    const expectedDate = todayDate.toISO()?.slice(0, 10);
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .useISOFormat=${true} .showDefaultNowDate=${true} placeholder="Select date"></md-datepicker>
    `);
    await elementUpdated(el);

    const mdInput = el.shadowRoot?.querySelector("md-input");
    expect(mdInput?.value).not.toBeNull();
    expect(mdInput?.value).not.toBe("");
    expect(mdInput?.value).toBe(expectedDate);
  });

  test("should render with default locale placeholder if we set showDefaultNowDate as false without passing placeholder", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .useISOFormat=${true} .showDefaultNowDate=${false}></md-datepicker>
    `);

    await elementUpdated(el);
    const mdInput = el.shadowRoot?.querySelector("md-input");
    expect(mdInput?.value).toBe("");
    expect(mdInput?.value).not.toBeNull();
    const input = mdInput?.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("placeholder")).toBe("YYYY-MM-DD");
  });

  test("should not render with default date if we set showDefaultNowDate as false", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker .useISOFormat=${true} .showDefaultNowDate=${false} placeholder="Select date"></md-datepicker>
    `);

    await elementUpdated(el);
    const mdInput = el.shadowRoot?.querySelector("md-input");
    expect(mdInput?.value).toBe("");
    expect(mdInput?.value).not.toBeNull();
    const input = mdInput?.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("placeholder")).toBe("Select date");
  });

  test("should update value and fire the date-input-change event when handleDateInputChange is called with an empty string", async () => {
    const el: DatePicker.ELEMENT = await fixture(html` <md-datepicker></md-datepicker> `);
    const eventSpy = jest.spyOn(el, "dispatchEvent");
    const event = new CustomEvent("input-change", { detail: { value: "" } });
    el.handleDateInputChange(event);
    expect(el.value).toBe("");
    expect(eventSpy).toHaveBeenCalledWith(
      new CustomEvent("date-input-change", {
        bubbles: true,
        composed: true,
        detail: {
          sourceEvent: event,
          value: ""
        }
      })
    );
  });

  test("should pass positioning strategy to menu overlay", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker positioning-strategy="fixed"></md-datepicker>
    `);

    const menuOverlay = el.shadowRoot!.querySelector("md-menu-overlay");
    expect(menuOverlay?.getAttribute("positioning-strategy")).toBe("fixed");
  });

  test("should handle loading/error properties with defaults and attribute reflection", async () => {
    // Test default values
    const el: DatePicker.ELEMENT = await createFixture(html` <md-datepicker></md-datepicker> `);

    expect(el.isDatePickerMonthLoading).toBe(false);
    expect(el.isDatePickerMonthError).toBe(false);
    expect(el.hasAttribute("is-date-picker-month-loading")).toBe(false);
    expect(el.hasAttribute("is-date-picker-month-error")).toBe(false);

    // Test setting via attributes
    const elWithAttrs: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker is-date-picker-month-loading is-date-picker-month-error></md-datepicker>
    `);

    expect(elWithAttrs.isDatePickerMonthLoading).toBe(true);
    expect(elWithAttrs.isDatePickerMonthError).toBe(true);
    expect(elWithAttrs.hasAttribute("is-date-picker-month-loading")).toBe(true);
    expect(elWithAttrs.hasAttribute("is-date-picker-month-error")).toBe(true);
  });

  test("should handle localisedStrings and retryFunction properties", async () => {
    const localisedStrings = { error: "Custom Error", retry: "Custom Retry" };
    const mockRetryFunction = jest.fn();

    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker
        .localisedStrings=${localisedStrings}
        .retryFunction=${mockRetryFunction}
      ></md-datepicker>
    `);

    expect(el.localisedStrings).toEqual(localisedStrings);
    expect(el.retryFunction).toBe(mockRetryFunction);
  });

  test("should pass localisedStrings and retryFunction to calendar in menu-overlay", async () => {
    const localisedStrings = { LOADING: "Loading...", HEADER: "Error Header", TEXT: "Error Text", RETRY: "Retry" };
    const mockRetryFunction = jest.fn();

    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker
        .localisedStrings=${localisedStrings}
        .retryFunction=${mockRetryFunction}
      ></md-datepicker>
    `);

    // Open the menu overlay
    const input = el.shadowRoot!.querySelector("md-input");
    input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
    await elementUpdated(el);

    const calendar = el.shadowRoot!.querySelector("md-datepicker-calendar");
    expect(calendar).toBeTruthy();

    // Test that localisedStrings and retryFunction are properly passed to calendar
    expect((calendar as any)?.localisedStrings).toEqual(localisedStrings);
    expect((calendar as any)?.retryFunction).toBe(mockRetryFunction);
  });

  test.each([
    { loading: true, error: false, shouldHideButtons: true },
    { loading: false, error: true, shouldHideButtons: true },
    { loading: true, error: true, shouldHideButtons: true },
    { loading: false, error: false, shouldHideButtons: false }
  ])(
    "should control button visibility based on loading/error states",
    async ({ loading, error, shouldHideButtons }) => {
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker
          ?is-date-picker-month-loading=${loading}
          ?is-date-picker-month-error=${error}
          .controlButtons=${{ cancel: { value: "CANCEL" }, apply: { value: "APPLY" } }}
        ></md-datepicker>
      `);

      const input = el.shadowRoot!.querySelector("md-input");
      input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      await elementUpdated(el);

      const controlButtonsDiv = el.shadowRoot!.querySelector(".control-buttons");

      if (shouldHideButtons) {
        expect(controlButtonsDiv).toBeNull();
      } else {
        expect(controlButtonsDiv).toBeTruthy();
        expect(el.shadowRoot!.querySelector("md-button.cancel-button")).toBeTruthy();
        expect(el.shadowRoot!.querySelector("md-button.apply-button")).toBeTruthy();
      }
    }
  );

  describe("Localised + ISO format testing", () => {
    test.each([{ useISOFormat: true }, { useISOFormat: false }])(
      "should use ISO format unless useISOFormat ($useISOFormat) is set to false",
      async ({ useISOFormat }) => {
        // set global locale to en-US
        Settings.defaultLocale = "en-US";

        const date = DateTime.fromObject({ year: 2025, month: 5, day: 27 });

        const el: DatePicker.ELEMENT = await createFixture(
          html`<md-datepicker .selectedDate=${date} .useISOFormat=${useISOFormat}> </md-datepicker> `
        );
        expect(el).not.toBeNull();

        if (useISOFormat) {
          expect(el.value).toBe("2025-05-27");
        } else {
          expect(el.value).toBe("5/27/2025");
        }
      }
    );

    test.each([
      { useISOFormat: true, locale: "en-US", placeholder: undefined, expected: "YYYY-MM-DD" },
      { useISOFormat: true, locale: "en-US", placeholder: "FOOBAR", expected: "FOOBAR" },
      { useISOFormat: false, locale: "en-US", placeholder: undefined, expected: "M/D/YYYY" },
      { useISOFormat: false, locale: "fr-FR", placeholder: undefined, expected: "DD/MM/YYYY" },
      { useISOFormat: false, locale: "fr-FR", placeholder: "FOOBAR", expected: "FOOBAR" }
    ])(
      "should use ISO format placeholder unless useISOFormat is set to false or placeholder prop used (%s)",
      async ({ useISOFormat, locale, placeholder, expected }) => {
        Settings.defaultLocale = locale;
        const el: DatePicker.ELEMENT = await createFixture(html`
          <md-datepicker .useISOFormat=${useISOFormat} .placeholder=${placeholder}> </md-datepicker>
        `);
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.placeholder).toBe(expected);
      }
    );

    test.each([
      { locale: "en-US", expected: "4/10/2025" },
      { locale: "fr-FR", expected: "10/04/2025" },
      { locale: "de-DE", expected: "10.4.2025" }
    ])("should get locale-specific date format when locale is set to $locale", async ({ locale, expected }) => {
      Settings.defaultLocale = locale;
      // note: no .locale prop used!
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker .selectedDate=${DATE1} .useISOFormat=${false}> </md-datepicker>
      `);
      expect(el.value).toBe(expected);
    });

    test.each([
      { locale: "en-US", expected: "4/10/2025" },
      { locale: "fr-FR", expected: "10/04/2025" },
      { locale: "de-DE", expected: "10.4.2025" }
    ])("should use $locale date format when global locale is set to $locale", async ({ locale, expected }) => {
      Settings.defaultLocale = locale;
      // note: no .locale prop used!
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker .selectedDate=${DATE1} .useISOFormat=${false}> </md-datepicker>
      `);
      expect(el.value).toBe(expected);
    });

    test.each([
      { globalLocale: "en-US", passedLocale: "fr-FR", expected: "10/04/2025" },
      { globalLocale: "fr-FR", passedLocale: "en-US", expected: "4/10/2025" }
    ])(
      "should use locale date format when locale is explicitly passed in ($passedLocale)",
      async ({ globalLocale, passedLocale, expected }) => {
        Settings.defaultLocale = globalLocale;
        const el: DatePicker.ELEMENT = await createFixture(html`
          <md-datepicker .selectedDate=${DATE1} .useISOFormat=${false} .locale=${passedLocale}> </md-datepicker>
        `);
        expect(el.value).toBe(expected);
      }
    );

    test("should use locale format when date is changed and useISOFormat is set to false", async () => {
      Settings.defaultLocale = "fr-FR";
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker .selectedDate=${DATE1} .useISOFormat=${false}> </md-datepicker>
      `);
      const event = new CustomEvent("day-select", {
        detail: {
          date: DATE2
        }
      });
      el.handleSelect(event);
      expect(el.value).toBe("15/05/2025");
    });

    test.each([
      { value: "2025-04-10", invalid: false },
      { value: "2025/04/10", invalid: false },
      { value: "04/10/2025", invalid: true },
      { value: "4/10/2025", invalid: true },
      { value: "10/04/2025", invalid: true },
      { value: "FOOBAR", invalid: true }
    ])("input should be marked invalid if value is invalid (ISO Format; args: %s )", async ({ value, invalid }) => {
      const el: DatePicker.ELEMENT = await createFixture(html`<md-datepicker value=${value}> </md-datepicker> `);
      expect(el).not.toBeNull();
      const input = el.shadowRoot?.querySelector("md-input");
      expect(input).not.toBeNull();
      expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
    });

    test.each([
      { value: "2025-04-10", locale: "en-US", invalid: true },
      { value: "4/10/2025", locale: "en-US", invalid: false },
      { value: "04/10/2025", locale: "en-US", invalid: false },
      { value: "2025-04-10", locale: "fr-FR", invalid: true },
      { value: "4/10/2025", locale: "fr-FR", invalid: true },
      { value: "10/04/2025", locale: "fr-FR", invalid: false }
    ])(
      "input should be marked invalid if value is invalid (using SYSTEM locale; args: %s )",
      async ({ value, locale, invalid }) => {
        Settings.defaultLocale = locale;
        const el: DatePicker.ELEMENT = await createFixture(
          html`<md-datepicker value=${value} .useISOFormat=${false}> </md-datepicker> `
        );
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );

    test.each([
      { value: "2025-04-10", locale: "en-US", invalid: true },
      { value: "4/10/2025", locale: "en-US", invalid: false },
      { value: "04/10/2025", locale: "en-US", invalid: false },
      { value: "2025-04-10", locale: "fr-FR", invalid: true },
      { value: "4/10/2025", locale: "fr-FR", invalid: true },
      { value: "10/04/2025", locale: "fr-FR", invalid: false }
    ])(
      "input should be marked invalid if value is invalid (using PASSED IN locale; args: %s )",
      async ({ value, locale, invalid }) => {
        Settings.defaultLocale = "jp-JP"; // diffferent format to above regions (yyyy/M/d)
        const el: DatePicker.ELEMENT = await createFixture(
          html`<md-datepicker value=${value} .locale=${locale} .useISOFormat=${false}> </md-datepicker> `
        );
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );

    test.each([
      { useISOFormat: true, validateDate: true, invalid: true },
      { useISOFormat: true, validateDate: false, invalid: false },
      { useISOFormat: false, validateDate: true, invalid: true },
      { useISOFormat: false, validateDate: false, invalid: false }
    ])(
      "validateDate should prevent validation of both localised and ISO dates. args: %s",
      async ({ useISOFormat, validateDate, invalid }) => {
        Settings.defaultLocale = "en-US";
        const el: DatePicker.ELEMENT = await createFixture(html`
          <md-datepicker value=${"NOT A VALID DATE!"} .useISOFormat=${useISOFormat} .validateDate=${validateDate}>
          </md-datepicker>
        `);
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );
  });
});

describe("DatePicker Component with popover", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html` <md-datepicker use-popover></md-datepicker> `);
    expect(el).not.toBeNull();
  });

  test("should open on pressing arrowDown on input", async () => {
    const startDate = now();
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover .focusedDate=${startDate}></md-datepicker>
    `);
    const input = el.shadowRoot!.querySelector("md-input");
    input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
    await elementUpdated(el.popoverElement);
    expect(el.popoverElement.controller?.isVisible()).toBeTruthy();
  });

  test("should close on pressing cancel button", async () => {
    jest.useFakeTimers();
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover .controlButtons=${{ cancel: { value: "CANCEL" } }}></md-datepicker>
    `);
    await elementUpdated(el.popoverElement);
    expect(el.popoverElement.controller?.isVisible()).toBeFalsy();

    const input = el.shadowRoot!.querySelector("md-input");
    input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
    await elementUpdated(el.popoverElement);

    expect(el.popoverElement.controller?.isVisible()).toBeTruthy();

    const cancelButton = el.shadowRoot!.querySelector("md-button.cancel-button");
    cancelButton?.dispatchEvent(new MouseEvent("button-click"));
    await elementUpdated(el.popoverElement);
    jest.runAllTimers();
    expect(el.popoverElement.controller?.isVisible()).toBeFalsy();
    jest.useRealTimers();
  });

  test.each([[false], [true]])(
    "should automatically update date selection unless Apply button present (%s)",
    async (includeApplyButton: boolean) => {
      const firstDate = DateTime.fromObject({ month: 11, day: 15 });
      const secondDate = firstDate.plus({ days: 2 });
      let el: DatePicker.ELEMENT;
      if (includeApplyButton) {
        el = await createFixture(
          html` <md-datepicker use-popover .selectedDate=${firstDate} .controlButtons=${{ apply: { value: "APPLY" } }}>
          </md-datepicker>`
        );
      } else {
        el = await createFixture(html` <md-datepicker use-popover .selectedDate=${firstDate}></md-datepicker> `);
      }
      const event = new CustomEvent("day-select", {
        detail: {
          date: secondDate
        }
      });
      const selectFunc = jest.spyOn(el, "handleSelect");
      el.handleSelect(event);
      expect(selectFunc).toHaveBeenCalled();
      if (includeApplyButton) {
        expect(el.selectedDate).toEqual(firstDate);
        const applyButton = el.shadowRoot!.querySelector("md-button.apply-button");
        applyButton?.dispatchEvent(new MouseEvent("button-click"));
        expect(el.selectedDate).toEqual(secondDate);
      } else {
        expect(el.selectedDate).toEqual(secondDate);
      }
    }
  );

  test.each([
    { cancel: { value: "CANCEL" }, apply: { value: "APPLY" } },
    { cancel: { value: "FOO" } },
    { apply: { value: "BAR" } }
  ])(
    "should have correct strings for control buttons",
    async (controlButtons: { cancel?: DatePickerControlButton; apply?: DatePickerControlButton }) => {
      const el: DatePicker.ELEMENT = await createFixture(
        html` <md-datepicker use-popover .controlButtons=${controlButtons}> </md-datepicker>`
      );
      const cancelButton = el.shadowRoot!.querySelector("md-button.cancel-button");
      const applyButton = el.shadowRoot!.querySelector("md-button.apply-button");

      if (Object.prototype.hasOwnProperty.call(controlButtons, "cancel")) {
        expect(cancelButton?.textContent).toContain(controlButtons["cancel"]?.value);
      } else {
        expect(cancelButton).toBeNull();
      }
      if (Object.prototype.hasOwnProperty.call(controlButtons, "apply")) {
        expect(applyButton?.textContent).toContain(controlButtons["apply"]?.value);
      }
    }
  );

  test("should handle date selection update", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.plus({ days: 2 });
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover .selectedDate=${firstDate}></md-datepicker>
    `);
    const event = new CustomEvent("day-select", {
      detail: {
        date: secondDate
      }
    });
    const selectFunc = jest.spyOn(el, "handleSelect");
    el.handleSelect(event);
    expect(selectFunc).toHaveBeenCalled();
    expect(el.selectedDate).toEqual(secondDate);
  });

  test("should NOT handle date selection update WHEN 'Apply' button present", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.plus({ days: 2 });
    const el: DatePicker.ELEMENT = await createFixture(
      html` <md-datepicker use-popover .selectedDate=${firstDate} .controlButtons=${{ apply: { value: "APPLY" } }}>
      </md-datepicker>`
    );
    const event = new CustomEvent("day-select", {
      detail: {
        date: secondDate
      }
    });
    const selectFunc = jest.spyOn(el, "handleSelect");
    el.handleSelect(event);
    expect(selectFunc).toHaveBeenCalled();
    expect(el.selectedDate).toEqual(firstDate);
  });

  test("should navigate focus with keydown events", async () => {
    const startDate = now();
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover .focusedDate=${startDate}></md-datepicker>
    `);
    const navLeft = keyNavEvent("ArrowLeft", startDate);
    el.handleKeyDown(navLeft);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal - 1);
    const navRight = keyNavEvent("ArrowRight", startDate);
    el.handleKeyDown(navRight);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal);
    const navUp = keyNavEvent("ArrowUp", startDate);
    el.handleKeyDown(navUp);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal - 7);
    const navDown = keyNavEvent("ArrowDown", startDate);
    el.handleKeyDown(navDown);
    await elementUpdated(el);
    expect(el.focusedDate.ordinal).toEqual(startDate.ordinal);
  });
  test("should select date with keydown events", async () => {
    const startDate = now();
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover .focusedDate=${startDate}></md-datepicker>
    `);
    const selectionFunc = jest.spyOn(el, "handleSelect");
    const enterSelect = keyNavEvent("Enter", startDate);
    el.handleKeyDown(enterSelect);
    await el.updateComplete;
    expect(selectionFunc).toHaveBeenCalled();
    const spaceSelect = keyNavEvent("Space", startDate);
    el.handleKeyDown(spaceSelect);
    await el.updateComplete;
    expect(selectionFunc).toHaveBeenCalled();
  });

  test("should render with custom date trigger", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover triggerID="custom-trigger" custom-trigger>
        <md-button id="custom-trigger" slot="date-trigger" variant="primary">Date Trigger</md-button>
      </md-datepicker>
    `);
    expect(el).not.toBeNull();
  });

  test("should use default aria label if no ariaLabel prop is set", async () => {
    Settings.defaultLocale = "en-US";
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover value="2024-05-01"></md-datepicker>
    `);
    const input = el.shadowRoot?.querySelector("md-input");
    expect(input).not.toBeNull();
    expect(input?.ariaLabel).toBe("Choose Date, selected date is May 1, 2024");
  });

  test("should use custom aria label if ariaLabel prop is set", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover value="2024-05-01" ariaLabel="Custom aria label"></md-datepicker>
    `);
    const input = el.shadowRoot?.querySelector("md-input");
    expect(input).not.toBeNull();
    expect(input?.ariaLabel).toBe("Custom aria label");
  });

  test("should render with default date if we set showDefaultNowDate as true", async () => {
    const todayDate = now();
    const expectedDate = todayDate.toISO()?.slice(0, 10);
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker
        use-popover
        .useISOFormat=${true}
        .showDefaultNowDate=${true}
        placeholder="Select date"
      ></md-datepicker>
    `);
    await elementUpdated(el);

    const mdInput = el.shadowRoot?.querySelector("md-input");
    expect(mdInput?.value).not.toBeNull();
    expect(mdInput?.value).not.toBe("");
    expect(mdInput?.value).toBe(expectedDate);
  });

  test("should render with default locale placeholder if we set showDefaultNowDate as false without passing placeholder", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover .useISOFormat=${true} .showDefaultNowDate=${false}></md-datepicker>
    `);

    await elementUpdated(el);
    const mdInput = el.shadowRoot?.querySelector("md-input");
    expect(mdInput?.value).toBe("");
    expect(mdInput?.value).not.toBeNull();
    const input = mdInput?.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("placeholder")).toBe("YYYY-MM-DD");
  });

  test("should not render with default date if we set showDefaultNowDate as false", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker
        use-popover
        .useISOFormat=${true}
        .showDefaultNowDate=${false}
        placeholder="Select date"
      ></md-datepicker>
    `);

    await elementUpdated(el);
    const mdInput = el.shadowRoot?.querySelector("md-input");
    expect(mdInput?.value).toBe("");
    expect(mdInput?.value).not.toBeNull();
    const input = mdInput?.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("placeholder")).toBe("Select date");
  });

  test("should update value and fire the date-input-change event when handleDateInputChange is called with an empty string", async () => {
    const el: DatePicker.ELEMENT = await fixture(html` <md-datepicker use-popover></md-datepicker> `);
    const eventSpy = jest.spyOn(el, "dispatchEvent");
    const event = new CustomEvent("input-change", { detail: { value: "" } });
    el.handleDateInputChange(event);
    expect(el.value).toBe("");
    expect(eventSpy).toHaveBeenCalledWith(
      new CustomEvent("date-input-change", {
        bubbles: true,
        composed: true,
        detail: {
          sourceEvent: event,
          value: ""
        }
      })
    );
  });

  test("should pass positioning strategy to menu overlay", async () => {
    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover positioning-strategy="fixed"></md-datepicker>
    `);

    const popover = el.shadowRoot!.querySelector("md-popover");
    expect(popover?.getAttribute("strategy")).toBe("fixed");
  });

  test("should handle loading/error properties with defaults and attribute reflection", async () => {
    // Test default values
    const el: DatePicker.ELEMENT = await createFixture(html` <md-datepicker use-popover></md-datepicker> `);

    expect(el.isDatePickerMonthLoading).toBe(false);
    expect(el.isDatePickerMonthError).toBe(false);
    expect(el.hasAttribute("is-date-picker-month-loading")).toBe(false);
    expect(el.hasAttribute("is-date-picker-month-error")).toBe(false);

    // Test setting via attributes
    const elWithAttrs: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker use-popover is-date-picker-month-loading is-date-picker-month-error></md-datepicker>
    `);

    expect(elWithAttrs.isDatePickerMonthLoading).toBe(true);
    expect(elWithAttrs.isDatePickerMonthError).toBe(true);
    expect(elWithAttrs.hasAttribute("is-date-picker-month-loading")).toBe(true);
    expect(elWithAttrs.hasAttribute("is-date-picker-month-error")).toBe(true);
  });

  test("should handle localisedStrings and retryFunction properties", async () => {
    const localisedStrings = { error: "Custom Error", retry: "Custom Retry" };
    const mockRetryFunction = jest.fn();

    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker
        use-popover
        .localisedStrings=${localisedStrings}
        .retryFunction=${mockRetryFunction}
      ></md-datepicker>
    `);

    expect(el.localisedStrings).toEqual(localisedStrings);
    expect(el.retryFunction).toBe(mockRetryFunction);
  });

  test("should handle new properties with popover - loading/error states and localized strings", async () => {
    const localisedStrings = { error: "Custom Error", retry: "Custom Retry" };
    const mockRetryFunction = jest.fn();

    const el: DatePicker.ELEMENT = await createFixture(html`
      <md-datepicker
        use-popover
        is-date-picker-month-loading
        is-date-picker-month-error
        .localisedStrings=${localisedStrings}
        .retryFunction=${mockRetryFunction}
      ></md-datepicker>
    `);

    // Test properties are set
    expect(el.isDatePickerMonthLoading).toBe(true);
    expect(el.isDatePickerMonthError).toBe(true);
    expect(el.localisedStrings).toEqual(localisedStrings);
    expect(el.retryFunction).toBe(mockRetryFunction);

    // Test attributes are reflected
    expect(el.hasAttribute("is-date-picker-month-loading")).toBe(true);
    expect(el.hasAttribute("is-date-picker-month-error")).toBe(true);

    // Test calendar receives properties when opened
    const input = el.shadowRoot!.querySelector("md-input");
    input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
    await elementUpdated(el.popoverElement);

    const calendar = el.shadowRoot!.querySelector("md-datepicker-calendar");
    expect(calendar?.hasAttribute("is-date-picker-month-loading")).toBe(true);
    expect(calendar?.hasAttribute("is-date-picker-month-error")).toBe(true);

    // Test that localisedStrings is properly passed to calendar
    expect((calendar as any)?.localisedStrings).toEqual(localisedStrings);
    expect((calendar as any)?.retryFunction).toBe(mockRetryFunction);
  });

  test.each([
    { loading: true, error: false, shouldHideButtons: true },
    { loading: false, error: true, shouldHideButtons: true },
    { loading: true, error: true, shouldHideButtons: true },
    { loading: false, error: false, shouldHideButtons: false }
  ])(
    "should control button visibility in popover based on loading/error states",
    async ({ loading, error, shouldHideButtons }) => {
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker
          use-popover
          ?is-date-picker-month-loading=${loading}
          ?is-date-picker-month-error=${error}
          .controlButtons=${{ cancel: { value: "CANCEL" }, apply: { value: "APPLY" } }}
        ></md-datepicker>
      `);

      const input = el.shadowRoot!.querySelector("md-input");
      input?.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      await elementUpdated(el.popoverElement);

      const controlButtonsDiv = el.shadowRoot!.querySelector(".control-buttons");

      if (shouldHideButtons) {
        expect(controlButtonsDiv).toBeNull();
      } else {
        expect(controlButtonsDiv).toBeTruthy();
      }
    }
  );

  describe("Localised + ISO format testing", () => {
    test.each([{ useISOFormat: true }, { useISOFormat: false }])(
      "should use ISO format unless useISOFormat ($useISOFormat) is set to false",
      async ({ useISOFormat }) => {
        // set global locale to en-US
        Settings.defaultLocale = "en-US";

        const date = DateTime.fromObject({ year: 2025, month: 5, day: 27 });

        const el: DatePicker.ELEMENT = await createFixture(
          html`<md-datepicker use-popover .selectedDate=${date} .useISOFormat=${useISOFormat}> </md-datepicker> `
        );
        expect(el).not.toBeNull();

        if (useISOFormat) {
          expect(el.value).toBe("2025-05-27");
        } else {
          expect(el.value).toBe("5/27/2025");
        }
      }
    );

    test.each([
      { useISOFormat: true, locale: "en-US", placeholder: undefined, expected: "YYYY-MM-DD" },
      { useISOFormat: true, locale: "en-US", placeholder: "FOOBAR", expected: "FOOBAR" },
      { useISOFormat: false, locale: "en-US", placeholder: undefined, expected: "M/D/YYYY" },
      { useISOFormat: false, locale: "fr-FR", placeholder: undefined, expected: "DD/MM/YYYY" },
      { useISOFormat: false, locale: "fr-FR", placeholder: "FOOBAR", expected: "FOOBAR" }
    ])(
      "should use ISO format placeholder unless useISOFormat is set to false or placeholder prop used (%s)",
      async ({ useISOFormat, locale, placeholder, expected }) => {
        Settings.defaultLocale = locale;
        const el: DatePicker.ELEMENT = await createFixture(html`
          <md-datepicker use-popover .useISOFormat=${useISOFormat} .placeholder=${placeholder}> </md-datepicker>
        `);
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.placeholder).toBe(expected);
      }
    );

    test.each([
      { locale: "en-US", expected: "4/10/2025" },
      { locale: "fr-FR", expected: "10/04/2025" },
      { locale: "de-DE", expected: "10.4.2025" }
    ])("should get locale-specific date format when locale is set to $locale", async ({ locale, expected }) => {
      Settings.defaultLocale = locale;
      // note: no .locale prop used!
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker use-popover .selectedDate=${DATE1} .useISOFormat=${false}> </md-datepicker>
      `);
      expect(el.value).toBe(expected);
    });

    test.each([
      { locale: "en-US", expected: "4/10/2025" },
      { locale: "fr-FR", expected: "10/04/2025" },
      { locale: "de-DE", expected: "10.4.2025" }
    ])("should use $locale date format when global locale is set to $locale", async ({ locale, expected }) => {
      Settings.defaultLocale = locale;
      // note: no .locale prop used!
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker use-popover .selectedDate=${DATE1} .useISOFormat=${false}> </md-datepicker>
      `);
      expect(el.value).toBe(expected);
    });

    test.each([
      { globalLocale: "en-US", passedLocale: "fr-FR", expected: "10/04/2025" },
      { globalLocale: "fr-FR", passedLocale: "en-US", expected: "4/10/2025" }
    ])(
      "should use locale date format when locale is explicitly passed in ($passedLocale)",
      async ({ globalLocale, passedLocale, expected }) => {
        Settings.defaultLocale = globalLocale;
        const el: DatePicker.ELEMENT = await createFixture(html`
          <md-datepicker use-popover .selectedDate=${DATE1} .useISOFormat=${false} .locale=${passedLocale}>
          </md-datepicker>
        `);
        expect(el.value).toBe(expected);
      }
    );

    test("should use locale format when date is changed and useISOFormat is set to false", async () => {
      Settings.defaultLocale = "fr-FR";
      const el: DatePicker.ELEMENT = await createFixture(html`
        <md-datepicker use-popover .selectedDate=${DATE1} .useISOFormat=${false}> </md-datepicker>
      `);
      const event = new CustomEvent("day-select", {
        detail: {
          date: DATE2
        }
      });
      el.handleSelect(event);
      expect(el.value).toBe("15/05/2025");
    });

    test.each([
      { value: "2025-04-10", invalid: false },
      { value: "2025/04/10", invalid: false },
      { value: "04/10/2025", invalid: true },
      { value: "4/10/2025", invalid: true },
      { value: "10/04/2025", invalid: true },
      { value: "FOOBAR", invalid: true }
    ])("input should be marked invalid if value is invalid (ISO Format; args: %s )", async ({ value, invalid }) => {
      const el: DatePicker.ELEMENT = await createFixture(
        html`<md-datepicker use-popover value=${value}> </md-datepicker> `
      );
      expect(el).not.toBeNull();
      const input = el.shadowRoot?.querySelector("md-input");
      expect(input).not.toBeNull();
      expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
    });

    test.each([
      { value: "2025-04-10", locale: "en-US", invalid: true },
      { value: "4/10/2025", locale: "en-US", invalid: false },
      { value: "04/10/2025", locale: "en-US", invalid: false },
      { value: "2025-04-10", locale: "fr-FR", invalid: true },
      { value: "4/10/2025", locale: "fr-FR", invalid: true },
      { value: "10/04/2025", locale: "fr-FR", invalid: false }
    ])(
      "input should be marked invalid if value is invalid (using SYSTEM locale; args: %s )",
      async ({ value, locale, invalid }) => {
        Settings.defaultLocale = locale;
        const el: DatePicker.ELEMENT = await createFixture(
          html`<md-datepicker use-popover value=${value} .useISOFormat=${false}> </md-datepicker> `
        );
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );

    test.each([
      { value: "2025-04-10", locale: "en-US", invalid: true },
      { value: "4/10/2025", locale: "en-US", invalid: false },
      { value: "04/10/2025", locale: "en-US", invalid: false },
      { value: "2025-04-10", locale: "fr-FR", invalid: true },
      { value: "4/10/2025", locale: "fr-FR", invalid: true },
      { value: "10/04/2025", locale: "fr-FR", invalid: false }
    ])(
      "input should be marked invalid if value is invalid (using PASSED IN locale; args: %s )",
      async ({ value, locale, invalid }) => {
        Settings.defaultLocale = "jp-JP"; // diffferent format to above regions (yyyy/M/d)
        const el: DatePicker.ELEMENT = await createFixture(
          html`<md-datepicker use-popover value=${value} .locale=${locale} .useISOFormat=${false}> </md-datepicker> `
        );
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );

    test.each([
      { useISOFormat: true, validateDate: true, invalid: true },
      { useISOFormat: true, validateDate: false, invalid: false },
      { useISOFormat: false, validateDate: true, invalid: true },
      { useISOFormat: false, validateDate: false, invalid: false }
    ])(
      "validateDate should prevent validation of both localised and ISO dates. args: %s",
      async ({ useISOFormat, validateDate, invalid }) => {
        Settings.defaultLocale = "en-US";
        const el: DatePicker.ELEMENT = await createFixture(html`
          <md-datepicker
            use-popover
            value=${"NOT A VALID DATE!"}
            .useISOFormat=${useISOFormat}
            .validateDate=${validateDate}
          >
          </md-datepicker>
        `);
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );
  });
});
