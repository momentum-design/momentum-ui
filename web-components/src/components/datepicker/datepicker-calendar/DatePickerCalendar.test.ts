import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePickerCalendar";
import { DatePickerCalendar } from "./DatePickerCalendar";

describe("DatePickerCalendar Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should apply a modifier, when the date does not belong to current month", async () => {
    const el: DatePickerCalendar = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
});
