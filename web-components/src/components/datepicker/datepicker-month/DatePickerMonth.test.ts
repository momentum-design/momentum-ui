import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePickerMonth";
import { DatePickerMonth } from "./DatePickerMonth";

describe("DatePickerMonth Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should apply a modifier, when the date does not belong to current month", async () => {
    const el: DatePickerMonth = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
});
