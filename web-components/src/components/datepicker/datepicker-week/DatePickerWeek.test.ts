import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePickerWeek";
import { DatePickerWeek } from "./DatePickerWeek";

describe("DatePickerWeek Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DatePickerWeek.ELEMENT = await fixture(html` <md-datepicker-week></md-datepicker-week> `);
    expect(el).not.toBeNull();
  });
});
