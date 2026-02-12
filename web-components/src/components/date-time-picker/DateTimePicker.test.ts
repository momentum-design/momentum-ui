import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime, Settings } from "luxon";
import "../timepicker/TimePicker";

import "../datepicker/DatePicker";
import { DatePicker } from "@/components/datepicker/DatePicker";
import "./DateTimePicker";
import { DateTimePicker } from "./DateTimePicker";

describe("DateTimePicker Component", () => {
  beforeEach(() => {
    Settings.defaultLocale = "en-US";
    Settings.defaultZone = "America/Los_Angeles";
  });

  afterAll(() => {
    fixtureCleanup();
    jest.clearAllMocks();
  });

  test("should render", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker> `);

    expect(el).not.toBeNull();
  });

  test("should render with default date and time", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker> `);
    expect(el.value).not.toBeFalsy();

    const dateTime = DateTime.fromISO(el.value?.replace(/\//g, "-") ?? "");
    expect(dateTime.isValid).toBe(true);
    expect(dateTime.zoneName).toBe("America/Los_Angeles");
    expect(dateTime.locale).toBe("en-US");
  });

  test("should render correct aria label", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html`
      <md-date-time-picker ariaLabel="Date Time Picker"></md-date-time-picker>>
    `);
    expect(el?.getAttribute("ariaLabel")).toMatch("Date Time Picker");
  });

  test("should not set aria label when not passed", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker> `);
    expect(el?.getAttribute("ariaLabel")).toBeNull();
  });

  test("should fire date-time-change when a blank value is passed from date-input-change", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker> `);
    el.value = "2021-01-01T00:00:00-08:00";
    expect(el?.getAttribute("ariaLabel")).toBeNull();
    const eventSpy = jest.spyOn(el, "dispatchEvent");
    el.handleDateTimeInputChange(new CustomEvent("date-input-change", { detail: { value: "" } }));
    expect(el.value).toBe("");
    await elementUpdated(el);
    expect(eventSpy).toHaveBeenCalledWith(
      new CustomEvent(`date-time-change`, {
        bubbles: true,
        composed: true,
        detail: {
          dateTimeString: "",
          dateTime: null,
          locale: "en-US",
          twentyFourHourFormat: false
        }
      })
    );
  });

  function dateStringToDateTime(date: string | undefined): DateTime {
    return DateTime.fromISO(date?.replace(/\//g, "-") ?? "");
  }

  async function doesTimeRangeApply(el: DateTimePicker.ELEMENT, dateTime: DateTime): Promise<boolean> {
    el.handleTimeChange(
      new CustomEvent("time-selection-change", {
        detail: { data: dateTime }
      })
    );
    await elementUpdated(el);

    return dateTime.equals(dateStringToDateTime(el.value));
  }

  test.each([[false], [true]])(
    "should handle time selection and value update automatically unless Apply button present (%s)",
    async (includeApplyButton: boolean) => {
      let el: DateTimePicker.ELEMENT;

      if (includeApplyButton) {
        el = await fixture(html`
          <md-date-time-picker
            .controlButtons=${{ apply: { value: "Apply" }, cancel: { value: "Cancel" } }}
          ></md-date-time-picker>
        `);
      } else {
        el = await fixture(html` <md-date-time-picker></md-date-time-picker> `);
      }
      el.value = "2021-01-01T00:00:00-08:00";
      await elementUpdated(el);

      const dateString1 = "2021-01-01T12:00:00-08:00";
      const dateTime1 = DateTime.fromISO(dateString1);
      const dateString2 = "2021-01-01T12:15:47-08:00";
      const dateTime2 = DateTime.fromISO(dateString2);

      await expect(doesTimeRangeApply(el, dateTime1)).resolves.toBe(!includeApplyButton);
      await expect(doesTimeRangeApply(el, dateTime2)).resolves.toBe(!includeApplyButton);

      const datePicker = el.shadowRoot!.querySelector("md-datepicker") as DatePicker.ELEMENT;
      const applyButton = datePicker.shadowRoot?.querySelector("md-button.apply-button");

      if (includeApplyButton) {
        expect(applyButton).not.toBeNull();
        applyButton?.dispatchEvent(new MouseEvent("button-click"));
        await elementUpdated(el);
        expect(dateTime2.equals(dateStringToDateTime(el.value))).toBe(true);
      } else {
        expect(applyButton).toBeNull();
      }
    }
  );
});
