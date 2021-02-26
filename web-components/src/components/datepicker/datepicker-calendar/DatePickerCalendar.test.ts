import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePickerCalendar";
import { DatePickerCalendar } from "./DatePickerCalendar";

describe("DatePickerCalendar Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(
      html`
        <md-datepicker-calendar></md-datepicker-calendar>
      `
    );
    expect(el).not.toBeNull();
  });
  // test("should handle date selection update", async () => {
  //   const firstDate = now();
  //   const secondDate = now().plus({ days: 2 });
  //   const el: DatePickerCalendar = await fixture(
  //     html`
  //       <md-datepicker-calendar .selected=${firstDate}></md-datepicker-calendar>
  //     `
  //   );
  //   const event = new CustomEvent("day-select", {
  //     detail: {
  //       date: secondDate
  //     }
  //   });
  //   const selectFunc = jest.spyOn(el, "handleDaySelect");
  //   el.handleDaySelect(event);
  //   expect(selectFunc).toHaveBeenCalled();
  //   expect(el.selected).toEqual(secondDate);
  // });
  test("should update view anchor date when changing months", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(
      html`
        <md-datepicker-calendar></md-datepicker-calendar>
      `
    );
    const event = new MouseEvent("click");
    const setDateFunc = jest.spyOn(el, "setDate");

    const nextMonthButton = el.shadowRoot?.querySelector("[aria-label^='next month']");
    const prevMonthButton = el.shadowRoot?.querySelector("[aria-label^='previous month']");
    nextMonthButton?.dispatchEvent(event);
    prevMonthButton?.dispatchEvent(event);

    expect(setDateFunc).toHaveBeenCalledTimes(2);
  });
});
