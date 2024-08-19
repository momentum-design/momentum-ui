import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePickerMonth";
import { DatePickerMonth } from "./DatePickerMonth";

describe("DatePickerMonth Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DatePickerMonth.ELEMENT = await fixture(html` <md-datepicker-month></md-datepicker-month> `);
    expect(el).not.toBeNull();
  });
});
