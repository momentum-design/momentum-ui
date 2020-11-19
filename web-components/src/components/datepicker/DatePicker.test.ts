import { now } from "@/utils/dateUtils";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime } from "luxon";
import "./DatePicker";
import { DatePicker } from "./DatePicker";

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
