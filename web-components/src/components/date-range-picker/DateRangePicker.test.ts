import { now } from "@/utils/dateUtils";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime } from "luxon";
import "./DateRangePicker";
import { DateRangePicker } from "./DateRangePicker";

const keyNavEvent = (key: KeyboardEvent["code"], date: DateTime): CustomEvent => {
  return new CustomEvent("day-key-event", {
    detail: {
      date: date,
      sourceEvent: new KeyboardEvent("keydown", { code: key })
    }
  });
};

describe("DatePicker Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DateRangePicker.ELEMENT = await fixture(
      html`
        <md-date-range-picker></md-date-range-picker>
      `
    );
    expect(el).not.toBeNull();
  });
  test("should handle date selection update", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.plus({ days: 2 });
    const el: DateRangePicker.ELEMENT = await fixture(
      html`
        <md-date-range-picker .selectedDate=${firstDate}></md-date-range-picker>
      `
    );
    const event = new CustomEvent("day-select", {
      detail: {
        date: secondDate
      }
    });
    const selectFunc = jest.spyOn(el, "handleDateSelection");
    const updateFunc = jest.spyOn(el, "updateValue");
    el.handleSelect(event);
    expect(selectFunc).toHaveBeenCalled();
    expect(updateFunc).toHaveBeenCalled();
    expect(el.selectedDate).toEqual(secondDate);
  });

  test("should return a SQL formatted date string", async () => {
    const el: DateRangePicker.ELEMENT = await fixture(
      html`
        <md-date-range-picker></md-date-range-picker>
      `
    );
    const date = now();
    const formatted = date.toSQLDate();
    expect(el.dateToSqlTranslate(date)).toEqual(formatted);
  });
  test("should format a SQL date string with slashes instead of dashes", async () => {
    const el: DateRangePicker.ELEMENT = await fixture(
      html`
        <md-date-range-picker></md-date-range-picker>
      `
    );
    const date = "2021-12-12";
    const formatted = "2021/12/12";
    expect(el.sqlDateToSlashes(date)).toEqual(formatted);
  });
});
