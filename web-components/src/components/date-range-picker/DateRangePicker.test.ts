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
        applyButton?.dispatchEvent(new MouseEvent("click"));
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
        <md-date-range-picker
          .startDate=${DATE1.toSQLDate()}
          .endDate=${DATE2.toSQLDate()}
        ></md-date-range-picker>
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

  describe("Localised + ISO format testing", () => {
    test.each([
        { useISOFormat: true},
        { useISOFormat: false }
      ])(
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
          }
          else {
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
        const el: DateRangePicker.ELEMENT = await fixture(
          html` <md-date-range-picker
                .useISOFormat=${useISOFormat}
                .placeholder=${placeholder}>
          </md-date-range-picker> `
        );
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.placeholder).toBe(expected);
      }
    );

    test.each([
        { locale: 'en-US', expected: '4/15/2025 - 4/25/2025' },
        { locale: 'fr-FR', expected: '15/04/2025 - 25/04/2025' },
        { locale: 'de-DE', expected: '15.4.2025 - 25.4.2025' },
      ])(
        "should use $locale date format when global locale is set to $locale",
        async ({ locale, expected }) => {
          Settings.defaultLocale = locale;
          const el: DateRangePicker.ELEMENT = await fixture(
            html` <md-date-range-picker
              .startDate=${DATE1.toSQLDate()}
              .endDate=${DATE2.toSQLDate()}
              .useISOFormat=${false}>
            </md-date-range-picker> `
          );
          expect(el.value).toBe(expected);
        }
      );

    test.each([
      { globalLocale: 'en-US', passedLocale: 'fr-FR', expected: '4/15/2025 - 4/25/2025' },
      { globalLocale: 'fr-FR', passedLocale: 'en-US', expected: '15/04/2025 - 25/04/2025' }
    ])(
      "should use locale date format when locale is explicitly passed in ($passedLocale)",
      async ({ globalLocale, passedLocale, expected }) => {
        Settings.defaultLocale = globalLocale;
        const el: DateRangePicker.ELEMENT = await fixture(
          html` <md-date-range-picker
            .startDate=${DATE1.toSQLDate()}
            .endDate=${DATE2.toSQLDate()}
            .useISOFormat=${false}>
            .locale=${passedLocale}>
          </md-date-range-picker> `
        );
        expect(el.value).toBe(expected);
      }
    );

    test("should use locale format when date range is changed and useISOFormat is set to false", async () => {
        Settings.defaultLocale = "fr-FR";
        const el: DateRangePicker.ELEMENT = await fixture(
          html` <md-date-range-picker
            .startDate=${DATE1.toSQLDate()}
            .endDate=${DATE2.toSQLDate()}
            .useISOFormat=${false}>
          </md-date-range-picker> `
        );
        el.handleDateSelection(
          new CustomEvent("date-pre-selection-change", { detail: { data: DATE3 } })
        );
        el.handleDateSelection(
          new CustomEvent("date-pre-selection-change", { detail: { data: DATE4 } })
        );
        expect(el.value).toBe("01/05/2025 - 31/05/2025");
      }
    );

    test.each([
      { value: '2025-04-10 - 2025-05-17', invalid: false },
      { value: '2025/04/10 - 2025/05/17', invalid: false },
      { value: '2025-04-10', invalid: true },
      { value: '2025/04/10', invalid: true },
      { value: '04/10/2025 - 05/17/2025', invalid: true },
      { value: '4/10/2025 - 5/17/2025', invalid: true },
      { value: 'FOOBAR', invalid: true }
    ])("input should be marked invalid if value is invalid (ISO Format; args: %s )", async ({ value, invalid }) => {           
        const el: DateRangePicker.ELEMENT = await fixture(
          html` <md-date-range-picker
            .value=${value}>
            </md-date-range-picker> `
        );
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );

    test.each([
      { value: '2025-04-10 - 2025-04-11', locale: 'en-US', invalid: true },
      { value: '4/10/2025 - 4/11/2025', locale: 'en-US', invalid: false },
      { value: '04/10/2025 - 04/11/2025', locale: 'en-US', invalid: false },
      { value: '2025-04-10 - 2025-04-11', locale: 'fr-FR', invalid: true },
      { value: '4/10/2025 - 4/11/2025', locale: 'fr-FR', invalid: true },
      { value: '10/04/2025 - 11/04/2025', locale: 'fr-FR', invalid: false }
    ])("input should be marked invalid if value is invalid (using SYSTEM locale; args: %s )", async ({ value, locale, invalid }) => {
        Settings.defaultLocale = locale;
        const el: DateRangePicker.ELEMENT = await fixture(
          html` <md-date-range-picker
                value=${value}
                .useISOFormat=${false}>
                </md-date-range-picker> `
        );
        expect(el).not.toBeNull();
        const input = el.shadowRoot?.querySelector("md-input");
        expect(input).not.toBeNull();
        expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
      }
    );

    test.each([
      { value: '2025-04-10 - 2025-04-11', locale: 'en-US', invalid: true },
      { value: '4/10/2025 - 4/11/2025', locale: 'en-US', invalid: false },
      { value: '04/10/2025 - 04/11/2025', locale: 'en-US', invalid: false },
      { value: '2025-04-10 - 2025-04-11', locale: 'fr-FR', invalid: true },
      { value: '4/10/2025 - 4/11/2025', locale: 'fr-FR', invalid: true },
      { value: '10/04/2025 - 11/04/2025', locale: 'fr-FR', invalid: false }
    ])("input should be marked invalid if value is invalid (using PASSED IN locale; args: %s )", async ({ value, locale, invalid }) => {
        Settings.defaultLocale = "jp-JP"; // diffferent format to above regions (yyyy/M/d)
        const el: DateRangePicker.ELEMENT = await fixture(
          html` <md-date-range-picker
                value=${value}
                .locale=${locale}
                .useISOFormat=${false}>
                </md-date-range-picker> `
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
      ])("validateDate should prevent validation of both localised and ISO dates. args: %s", async ({ useISOFormat, validateDate, invalid }) => {
          Settings.defaultLocale = "en-US";
          const el: DateRangePicker.ELEMENT = await fixture(
            html` <md-date-range-picker
                  .value=${"NOT A VALID DATE!"}
                  .useISOFormat=${useISOFormat}
                  .validateDate=${validateDate}>
                  </md-date-range-picker> `
          );
          expect(el).not.toBeNull();
          const input = el.shadowRoot?.querySelector("md-input");
          expect(input).not.toBeNull();
          expect(input?.ariaInvalid).toBe(invalid ? "true" : "false");
        }
    );
  });
});
