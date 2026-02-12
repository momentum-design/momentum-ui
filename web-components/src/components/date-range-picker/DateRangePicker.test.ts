import { now } from "@/utils/dateUtils";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime, Settings } from "luxon";
import "./DateRangePicker";
import { DateRangePicker } from "./DateRangePicker";

const fixtureFactory = async (): Promise<DateRangePicker.ELEMENT> => {
  return await fixture(html` <md-date-range-picker></md-date-range-picker> `);
};

const DATE1 = DateTime.fromObject({ year: 2025, month: 4, day: 15 });
const DATE2 = DateTime.fromObject({ year: 2025, month: 4, day: 25 });
const DATE3 = DateTime.fromObject({ year: 2025, month: 5, day: 1 });
const DATE4 = DateTime.fromObject({ year: 2025, month: 5, day: 31 });

describe("DatePicker Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should render", async () => {
    const el: DateRangePicker.ELEMENT = await fixtureFactory();
    expect(el).not.toBeNull();
  });

  test("should return a SQL formatted date string", async () => {
    const el: DateRangePicker.ELEMENT = await fixture(html` <md-date-range-picker></md-date-range-picker> `);
    const date = now();
    const formatted = date.toSQLDate();
    expect(el.dateToSqlTranslate(date)).toEqual(formatted);
  });

  test.each([[false], [true]])(
    "should handle date selection and value update automatically unless Apply button present (%s)",
    async (includeApplyButton: boolean) => {
      let el: DateRangePicker.ELEMENT;

      if (includeApplyButton) {
        el = await fixture(html`
          <md-date-range-picker
            .controlButtons=${{ apply: "APPLY" }}
            .startDate=${"1970-01-01"}
            .endDate=${"1970-01-02"}
          ></md-date-range-picker>
        `);
      } else {
        el = await fixture(html`
          <md-date-range-picker .startDate=${"1970-01-01"} .endDate=${"1970-01-02"}></md-date-range-picker>
        `);
      }

      await el.updateComplete;

      const defaultValue = "1970-01-01 - 1970-01-02";

      expect(el.value).toEqual(defaultValue);

      const selectFunc = jest.spyOn(el, "handleDateSelection");
      const updateFunc = jest.spyOn(el, "updateValue");

      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      expect(selectFunc).toHaveBeenCalledTimes(1);
      expect(updateFunc).toHaveBeenCalledTimes(includeApplyButton ? 0 : 1);

      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE2 } }));
      expect(selectFunc).toHaveBeenCalledTimes(2);
      expect(updateFunc).toHaveBeenCalledTimes(includeApplyButton ? 0 : 2);

      const newValue = "2025-04-15 - 2025-04-25";

      if (includeApplyButton) {
        expect(el.value).toEqual(defaultValue);
        const applyButton = el.shadowRoot!.querySelector("md-button.apply-button");
        applyButton?.dispatchEvent(new MouseEvent("button-click"));
        expect(updateFunc).toHaveBeenCalledTimes(1);
      }

      expect(el.value).toEqual(newValue);
    }
  );

  test.each([
    { controlButtons: { apply: "APPLY" }, shouldUpdate: true },
    { controlButtons: { apply: "APPLY", cancel: "CANCEL" }, shouldUpdate: true },
    { controlButtons: { cancel: "CANCEL" }, shouldUpdate: true },
    { controlButtons: undefined, shouldUpdate: true }
  ])(
    "updating props externally should update value, even if Apply button present (%s)",
    async ({ controlButtons, shouldUpdate }) => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker
          .controlButtons=${controlButtons}
          .startDate=${"1970-01-01"}
          .endDate=${"1970-01-02"}
        ></md-date-range-picker>
      `);

      await el.updateComplete;
      const updatedSpy = jest.spyOn(el, "updated");

      el.startDate = DATE1.toSQLDate();
      el.endDate = DATE2.toSQLDate();

      await el.updateComplete;
      await el.updateComplete;

      expect(updatedSpy).toHaveBeenCalled();

      if (shouldUpdate) {
        expect(el.value).toEqual("2025-04-15 - 2025-04-25");
      } else {
        expect(el.value).toEqual("1970-01-01 - 1970-01-02");
      }
    }
  );

  test.each([
    { controlButtons: { apply: "APPLY" }, shouldUpdate: false },
    { controlButtons: { apply: "APPLY", cancel: "CANCEL" }, shouldUpdate: false },
    { controlButtons: { cancel: "CANCEL" }, shouldUpdate: true },
    { controlButtons: undefined, shouldUpdate: true }
  ])(
    "should not update value if new range selected and Apply button present",
    async ({ controlButtons, shouldUpdate }) => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker
          .controlButtons=${controlButtons}
          .startDate=${"1970-01-01"}
          .endDate=${"1970-01-02"}
        ></md-date-range-picker>
      `);

      await el.updateComplete;
      const updatedSpy = jest.spyOn(el, "updated");

      el.handleSelect(new CustomEvent("day-select", { detail: { date: DATE1 } }));
      el.handleSelect(new CustomEvent("day-select", { detail: { date: DATE2 } }));

      await el.updateComplete;
      await el.updateComplete;

      expect(updatedSpy).toHaveBeenCalled();

      if (shouldUpdate) {
        expect(el.value).toEqual("2025-04-15 - 2025-04-25");
      } else {
        expect(el.value).toEqual("1970-01-01 - 1970-01-02");
      }
    }
  );

  test("should correctly assign start/end values if use enters in reverse order", async () => {
    const el: DateRangePicker.ELEMENT = await fixtureFactory();
    const firstSelect = new CustomEvent("date-pre-selection-change", {
      detail: {
        data: DATE2
      }
    });
    const secondSelect = new CustomEvent("date-pre-selection-change", {
      detail: {
        data: DATE1
      }
    });
    el.handleDateSelection(firstSelect);
    el.handleDateSelection(secondSelect);
    expect(el.startDate).toEqual(DATE1.toSQLDate());
    expect(el.endDate).toEqual(DATE2.toSQLDate());
  });

  test("should only emit date-range-change event when both start and end dates set", async () => {
    const el: DateRangePicker.ELEMENT = new DateRangePicker.ELEMENT();
    expect(el.startDate).toBeUndefined();
    expect(el.endDate).toBeUndefined();

    let capturedEvent: CustomEvent | null = null;
    const eventSpy = jest.fn((event: CustomEvent) => {
      capturedEvent = event;
    }) as unknown as EventListener;
    el.addEventListener("date-range-change", eventSpy as EventListener);

    el.handleDateSelection(
      new CustomEvent("date-pre-selection-change", { detail: { data: DateTime.fromObject({ month: 1, day: 1 }) } })
    );
    expect(el.startDate).not.toBeUndefined();
    expect(el.endDate).toBeUndefined();

    expect(eventSpy).not.toHaveBeenCalled();
    expect(capturedEvent).toBeNull();

    el.handleDateSelection(
      new CustomEvent("date-pre-selection-change", { detail: { data: DateTime.fromObject({ month: 1, day: 2 }) } })
    );
    expect(el.startDate).not.toBeUndefined();
    expect(el.startDate).not.toBeUndefined();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(capturedEvent).not.toBeNull();
    expect(capturedEvent!.detail).toEqual({
      startDate: el.startDate,
      endDate: el.endDate
    });
  });

  describe("should handle range modification scenarios", () => {
    test("changing start and/or endDates automatically updates value", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker .startDate=${DATE1.toSQLDate()} .endDate=${DATE2.toSQLDate()}></md-date-range-picker>
      `);
      await el.updateComplete;
      expect(el.value).toEqual(`${DATE1.toSQLDate()} - ${DATE2.toSQLDate()}`);

      const newStartDate = DATE3.toSQLDate();
      const newEndDate = DATE4.toSQLDate();
      el.startDate = newStartDate;
      el.endDate = newEndDate;
      await el.updateComplete;
      expect(el.value).toEqual(`${newStartDate} - ${newEndDate}`);

      const newStartDate2 = DATE1.toSQLDate();
      el.startDate = newStartDate2;
      await el.updateComplete;
      expect(el.value).toEqual(`${newStartDate2} - ${newEndDate}`);
    });

    test.each([
      [DATE1, DATE2, DATE3, DATE4],
      [DATE4, DATE3, DATE2, DATE1],
      [DATE2, DATE1, DATE4, DATE3],
      [DATE3, DATE4, DATE1, DATE2]
    ])("should handle date selection in order %s %s %s %s", async (dateA, dateB, dateC, dateD) => {
      const el = await fixtureFactory();
      expect(el.startDate).toBeUndefined();
      expect(el.endDate).toBeUndefined();

      const firstSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateA
        }
      });
      el.handleDateSelection(firstSelect);
      expect(el.startDate).toEqual(dateA.toSQLDate());
      expect(el.endDate).toBeUndefined();

      const secondSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateB
        }
      });
      el.handleDateSelection(secondSelect);
      // why use OR for the following two expects?
      // see above "should correctly assign start/end values if use enters in reverse order" test
      expect(el.startDate === dateA.toSQLDate() || el.startDate === dateB.toSQLDate()).toBeTruthy();
      expect(el.endDate === dateA.toSQLDate() || el.endDate === dateB.toSQLDate()).toBeTruthy();

      const thirdSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateC
        }
      });
      el.handleDateSelection(thirdSelect);
      expect(el.startDate).toEqual(dateC.toSQLDate());
      expect(el.endDate).toBeUndefined();

      const fourthSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateD
        }
      });
      el.handleDateSelection(fourthSelect);
      expect(el.startDate === dateC.toSQLDate() || el.startDate === dateD.toSQLDate()).toBeTruthy();
      expect(el.endDate === dateC.toSQLDate() || el.endDate === dateD.toSQLDate()).toBeTruthy();
    });
  });

  test("should use default aria label if no ariaLabel prop is set", async () => {
    Settings.defaultLocale = "en-US";
    const el = await fixture(html`
      <md-date-range-picker start-date="2024-12-01" end-date="2024-12-15"></md-date-range-picker>
    `);
    const input = el.shadowRoot?.querySelector("md-input");
    expect(input).not.toBeNull();
    expect(input?.ariaLabel).toBe(
      "Choose Date Range, currently selected range is December 1, 2024 to December 15, 2024"
    );
  });

  test("should use custom aria label if ariaLabel prop is set", async () => {
    const el = await fixture(html`
      <md-date-range-picker
        ariaLabel="Custom aria label"
        startDate="2024-12-01"
        endDate="2024-12-15"
      ></md-date-range-picker>
    `);
    const input = el.shadowRoot?.querySelector("md-input");
    expect(input).not.toBeNull();
    expect(input?.ariaLabel).toBe("Custom aria label");
  });

  describe("Localised + ISO format testing", () => {
    test.each([{ useISOFormat: true }, { useISOFormat: false }])(
      "should use ISO format unless useISOFormat ($useISOFormat) is set to false",
      async ({ useISOFormat }) => {
        // set global locale to en-US
        Settings.defaultLocale = "en-US";

        const el: DateRangePicker.ELEMENT = await fixture(html`
          <md-date-range-picker
            .startDate=${DATE1.toSQLDate()}
            .endDate=${DATE2.toSQLDate()}
            .useISOFormat=${useISOFormat}
          ></md-date-range-picker>
        `);

        if (useISOFormat) {
          expect(el.value).toBe("2025-04-15 - 2025-04-25");
        } else {
          expect(el.value).toBe("4/15/2025 - 4/25/2025");
        }
      }
    );

    test.each([
      { useISOFormat: true, locale: "en-US", placeholder: undefined, expected: "YYYY-MM-DD - YYYY-MM-DD" },
      { useISOFormat: true, locale: "en-US", placeholder: "FOOBAR", expected: "FOOBAR" },
      { useISOFormat: false, locale: "en-US", placeholder: undefined, expected: "M/D/YYYY - M/D/YYYY" },
      { useISOFormat: false, locale: "fr-FR", placeholder: undefined, expected: "DD/MM/YYYY - DD/MM/YYYY" },
      { useISOFormat: false, locale: "fr-FR", placeholder: "FOOBAR", expected: "FOOBAR" }
    ])(
      "should use ISO format placeholder unless useISOFormat is set to false or placeholder prop used (%s)",
      async ({ useISOFormat, locale, placeholder, expected }) => {
        Settings.defaultLocale = locale;
        const el: DateRangePicker.ELEMENT = await fixture(html`
          <md-date-range-picker .useISOFormat=${useISOFormat} .placeholder=${placeholder}> </md-date-range-picker>
        `);
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.placeholder).toBe(expected);
      }
    );

    test.each([
      { locale: "en-US", expected: "4/15/2025 - 4/25/2025" },
      { locale: "fr-FR", expected: "15/04/2025 - 25/04/2025" },
      { locale: "de-DE", expected: "15.4.2025 - 25.4.2025" }
    ])("should use $locale date format when global locale is set to $locale", async ({ locale, expected }) => {
      Settings.defaultLocale = locale;
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker .startDate=${DATE1.toSQLDate()} .endDate=${DATE2.toSQLDate()} .useISOFormat=${false}>
        </md-date-range-picker>
      `);
      expect(el.value).toBe(expected);
    });

    test.each([
      { globalLocale: "en-US", passedLocale: "fr-FR", expected: "4/15/2025 - 4/25/2025" },
      { globalLocale: "fr-FR", passedLocale: "en-US", expected: "15/04/2025 - 25/04/2025" }
    ])(
      "should use locale date format when locale is explicitly passed in ($passedLocale)",
      async ({ globalLocale, passedLocale, expected }) => {
        Settings.defaultLocale = globalLocale;
        const el: DateRangePicker.ELEMENT = await fixture(html`
          <md-date-range-picker .startDate=${DATE1.toSQLDate()} .endDate=${DATE2.toSQLDate()} .useISOFormat=${false}>
            .locale=${passedLocale}>
          </md-date-range-picker>
        `);
        expect(el.value).toBe(expected);
      }
    );

    test("should use locale format when date range is changed and useISOFormat is set to false", async () => {
      Settings.defaultLocale = "fr-FR";
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker .startDate=${DATE1.toSQLDate()} .endDate=${DATE2.toSQLDate()} .useISOFormat=${false}>
        </md-date-range-picker>
      `);
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE3 } }));
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE4 } }));
      expect(el.value).toBe("01/05/2025 - 31/05/2025");
    });

    test.each([
      { value: "2025-04-10 - 2025-05-17", invalid: false },
      { value: "2025/04/10 - 2025/05/17", invalid: false },
      { value: "2025-04-10", invalid: true },
      { value: "2025/04/10", invalid: true },
      { value: "04/10/2025 - 05/17/2025", invalid: true },
      { value: "4/10/2025 - 5/17/2025", invalid: true },
      { value: "FOOBAR", invalid: true }
    ])("input should be marked invalid if value is invalid (ISO Format; args: %s )", async ({ value, invalid }) => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker .value=${value}> </md-date-range-picker>
      `);
      expect(el).not.toBeNull();
      const input = el.shadowRoot?.querySelector("md-input");
      expect(input).not.toBeNull();
      expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
    });

    test.each([
      { value: "2025-04-10 - 2025-04-11", locale: "en-US", invalid: true },
      { value: "4/10/2025 - 4/11/2025", locale: "en-US", invalid: false },
      { value: "04/10/2025 - 04/11/2025", locale: "en-US", invalid: false },
      { value: "2025-04-10 - 2025-04-11", locale: "fr-FR", invalid: true },
      { value: "4/10/2025 - 4/11/2025", locale: "fr-FR", invalid: true },
      { value: "10/04/2025 - 11/04/2025", locale: "fr-FR", invalid: false }
    ])(
      "input should be marked invalid if value is invalid (using SYSTEM locale; args: %s )",
      async ({ value, locale, invalid }) => {
        Settings.defaultLocale = locale;
        const el: DateRangePicker.ELEMENT = await fixture(html`
          <md-date-range-picker value=${value} .useISOFormat=${false}> </md-date-range-picker>
        `);
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );

    test.each([
      { value: "2025-04-10 - 2025-04-11", locale: "en-US", invalid: true },
      { value: "4/10/2025 - 4/11/2025", locale: "en-US", invalid: false },
      { value: "04/10/2025 - 04/11/2025", locale: "en-US", invalid: false },
      { value: "2025-04-10 - 2025-04-11", locale: "fr-FR", invalid: true },
      { value: "4/10/2025 - 4/11/2025", locale: "fr-FR", invalid: true },
      { value: "10/04/2025 - 11/04/2025", locale: "fr-FR", invalid: false }
    ])(
      "input should be marked invalid if value is invalid (using PASSED IN locale; args: %s )",
      async ({ value, locale, invalid }) => {
        Settings.defaultLocale = "jp-JP"; // diffferent format to above regions (yyyy/M/d)
        const el: DateRangePicker.ELEMENT = await fixture(html`
          <md-date-range-picker value=${value} .locale=${locale} .useISOFormat=${false}> </md-date-range-picker>
        `);
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
        const el: DateRangePicker.ELEMENT = await fixture(html`
          <md-date-range-picker
            .value=${"NOT A VALID DATE!"}
            .useISOFormat=${useISOFormat}
            .validateDate=${validateDate}
          >
          </md-date-range-picker>
        `);
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );
  });

  describe("maxRangeLength functionality", () => {
    test("should apply filter when start date is selected and maxRangeLength is set", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="7"></md-date-range-picker>
      `);

      // Select start date
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      await el.updateComplete;

      expect(el.startDate).toBe(DATE1.toSQLDate());
      expect(el.endDate).toBeUndefined();
      expect(el.filterDate).toBeDefined();

      // Test that dates within range are not filtered
      const withinRange = DATE1.plus({ days: 3 });
      expect(el.filterDate!(withinRange)).toBe(false);

      // Test that dates outside range are filtered
      const outsideRange = DATE1.plus({ days: 10 });
      expect(el.filterDate!(outsideRange)).toBe(true);
    });

    test("should reset filter behavior when end date is selected", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="7"></md-date-range-picker>
      `);

      // Select start date
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      await el.updateComplete;

      expect(el.filterDate).toBeDefined();

      // Verify filter is active - dates outside range should be filtered
      const outsideRange = DATE1.plus({ days: 10 });
      expect(el.filterDate!(outsideRange)).toBe(true);

      // Select end date within range
      const endDate = DATE1.plus({ days: 3 });
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: endDate } }));
      await el.updateComplete;

      expect(el.startDate).toBe(DATE1.toSQLDate());
      expect(el.endDate).toBe(endDate.toSQLDate());

      // Filter should now return false for all dates (no longer restricting)
      expect(el.filterDate!(outsideRange)).toBe(false);
    });

    test("should re-apply filter when starting a new range selection", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="7"></md-date-range-picker>
      `);

      // Select first range
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      await el.updateComplete;
      const endDate = DATE1.plus({ days: 3 });
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: endDate } }));
      await el.updateComplete;

      // Verify range is complete and filter is not restricting
      expect(el.startDate).toBe(DATE1.toSQLDate());
      expect(el.endDate).toBe(endDate.toSQLDate());
      const farDate = DATE1.plus({ days: 20 });
      expect(el.filterDate!(farDate)).toBe(false);

      // Start new range selection
      const newStartDate = DateTime.fromObject({ year: 2025, month: 5, day: 10 });
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: newStartDate } }));
      await el.updateComplete;

      // Verify new range started and filter is active again
      expect(el.startDate).toBe(newStartDate.toSQLDate());
      expect(el.endDate).toBeUndefined();

      // Dates within 7 days of new start should not be filtered
      const withinNewRange = newStartDate.plus({ days: 5 });
      expect(el.filterDate!(withinNewRange)).toBe(false);

      // Dates outside 7 days of new start should be filtered
      const outsideNewRange = newStartDate.plus({ days: 10 });
      expect(el.filterDate!(outsideNewRange)).toBe(true);
    });

    test("should update filter to use current startDate when date selection changes", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="7"></md-date-range-picker>
      `);

      const firstStart = DateTime.fromObject({ year: 2025, month: 4, day: 10 });
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: firstStart } }));
      await el.updateComplete;

      // A date 10 days after first start should be filtered
      const testDate = firstStart.plus({ days: 10 });
      expect(el.filterDate!(testDate)).toBe(true);

      // Now select a new start date closer to testDate
      const secondStart = DateTime.fromObject({ year: 2025, month: 4, day: 15 });
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: secondStart } }));
      el.handleDateSelection(
        new CustomEvent("date-pre-selection-change", { detail: { data: secondStart.plus({ days: 1 }) } })
      );
      // Start a new range
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: secondStart } }));
      await el.updateComplete;

      // The same testDate should now NOT be filtered (it's within 7 days of secondStart)
      expect(el.filterDate!(testDate)).toBe(false);
    });

    test("should allow selecting dates before start date within range", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="7"></md-date-range-picker>
      `);

      // Select start date
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      await el.updateComplete;

      // Test that dates before start date within range are not filtered
      const beforeStartWithinRange = DATE1.minus({ days: 3 });
      expect(el.filterDate!(beforeStartWithinRange)).toBe(false);

      // Test that dates before start date outside range are filtered
      const beforeStartOutsideRange = DATE1.minus({ days: 10 });
      expect(el.filterDate!(beforeStartOutsideRange)).toBe(true);
    });

    test("should combine with original filterDate function", async () => {
      const originalFilter = (day: DateTime | string) => {
        const dayDateTime = typeof day === "string" ? DateTime.fromISO(day) : day;
        // Filter out Sundays
        return dayDateTime.weekday === 7;
      };

      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="7" .filterDate=${originalFilter}></md-date-range-picker>
      `);

      // Select start date (not a Sunday)
      const startDate = DateTime.fromObject({ year: 2025, month: 4, day: 14 }); // Monday
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: startDate } }));
      await el.updateComplete;

      // Test that a Sunday within range is still filtered
      const sunday = DateTime.fromObject({ year: 2025, month: 4, day: 20 }); // Sunday
      expect(el.filterDate!(sunday)).toBe(true);

      // Test that a non-Sunday within range is not filtered
      const monday = DateTime.fromObject({ year: 2025, month: 4, day: 15 }); // Tuesday
      expect(el.filterDate!(monday)).toBe(false);

      // Test that a non-Sunday outside range is filtered
      const outsideRange = DateTime.fromObject({ year: 2025, month: 4, day: 25 }); // Friday, 11 days away
      expect(el.filterDate!(outsideRange)).toBe(true);
    });

    test("should not apply range filter when maxRangeLength is not set", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html` <md-date-range-picker></md-date-range-picker> `);

      // Select start date
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      await el.updateComplete;

      expect(el.startDate).toBe(DATE1.toSQLDate());
      expect(el.endDate).toBeUndefined();

      // filterDate should be undefined when maxRangeLength is not set
      expect(el.filterDate).toBeUndefined();
    });

    test("should not apply range filter when maxRangeLength is 0", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="0"></md-date-range-picker>
      `);

      // Select start date
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      await el.updateComplete;

      expect(el.startDate).toBe(DATE1.toSQLDate());
      expect(el.endDate).toBeUndefined();

      // filterDate should be undefined when maxRangeLength is not set
      expect(el.filterDate).toBeUndefined();
    });

    test("should handle maxRangeLength of 1 (single day)", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="1"></md-date-range-picker>
      `);

      // Select start date
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE1 } }));
      await el.updateComplete;

      // Only the start date itself should be selectable
      expect(el.filterDate!(DATE1)).toBe(false);
      expect(el.filterDate!(DATE1.plus({ days: 1 }))).toBe(true);
      expect(el.filterDate!(DATE1.minus({ days: 1 }))).toBe(true);
    });

    test("should handle selecting end date before start date with maxRangeLength", async () => {
      const el: DateRangePicker.ELEMENT = await fixture(html`
        <md-date-range-picker max-range-length="7"></md-date-range-picker>
      `);

      // Select a date that will become the end date
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: DATE2 } }));
      await el.updateComplete;

      // Select an earlier date within range - this should become the start date
      const earlierDate = DATE2.minus({ days: 3 });
      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: earlierDate } }));
      await el.updateComplete;

      // The earlier date should be start, later date should be end
      expect(el.startDate).toBe(earlierDate.toSQLDate());
      expect(el.endDate).toBe(DATE2.toSQLDate());

      // Filter should no longer restrict since both dates are set
      const farDate = DATE2.plus({ days: 20 });
      expect(el.filterDate!(farDate)).toBe(false);
    });
  });
});
