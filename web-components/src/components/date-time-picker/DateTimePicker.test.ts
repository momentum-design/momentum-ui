import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { Settings } from "luxon";
import { DateTimePicker } from "./DateTimePicker";
import { now } from "@/utils/dateUtils";
import "./DateTimePicker";

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

    let defaultToday = now();
    defaultToday = defaultToday.set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });

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
});
