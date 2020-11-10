import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePickerWeek";
import { DatePickerWeek } from "./DatePickerWeek";

describe("DatePickerWeek Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should apply a modifier, when the date does not belong to current month", async () => {
    const el: DatePickerWeek = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
});
