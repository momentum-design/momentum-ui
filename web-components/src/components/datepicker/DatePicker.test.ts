import { now } from "@/utils/dateUtils";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePicker";
import { DatePicker } from "./DatePicker";

describe("DatePicker Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DatePicker = await fixture(
      html`
        <md-datepicker></md-datepicker>
      `
    );
    expect(el).not.toBeNull;
  });
  test("should handle date selection update", async () => {
    const firstDate = now();
    const secondDate = now().plus({ days: 2 });
    const el: DatePicker = await fixture(
      html`
        <md-datepicker .selectedDate=${firstDate}></md-datepicker>
      `
    );
    const event = new CustomEvent("day-select", {
      detail: {
        date: secondDate
      }
    });
    const selectFunc = jest.spyOn(el, "handleSelect");
    el.handleSelect(event);
    expect(selectFunc).toHaveBeenCalled();
    expect(el.selectedDate).toEqual(secondDate);
  });
});
