import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { Settings } from "luxon";
import "./DateTimePicker";
import { DateTimePicker } from "./DateTimePicker";

describe("DateTimePicker Component", () => {
  beforeEach(() => {
    Settings.defaultLocale = "en-US";
  });

  afterEach(() => {
    fixtureCleanup();
  });

  test("should render", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker>> `);

    expect(el).not.toBeNull();
  });

  test("should render with default date and time", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker>> `);
    expect(el.value).not.toBeNull();
  });

  test("should render correct aria label", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html`
      <md-date-time-picker ariaLabel="Date Time Picker"></md-date-time-picker>>
    `);
    expect(el?.getAttribute("ariaLabel")).toMatch("Date Time Picker");
  });

  test("should not set aria label when not passed", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker>> `);
    expect(el?.getAttribute("ariaLabel")).toBeNull();
  });

  test("should fire date-time-change when a blank value is passed from date-input-change", async () => {
    const el: DateTimePicker.ELEMENT = await fixture(html` <md-date-time-picker></md-date-time-picker>> `);
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
});
