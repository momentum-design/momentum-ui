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
    const el: DatePicker.ELEMENT = await fixture(
      html`
        <md-datepicker></md-datepicker>
      `
    );
    expect(el).not.toBeNull();
  });
  test("should handle date selection update", async () => {
    const firstDate = now();
    const secondDate = now().plus({ days: 2 });
    const el: DatePicker.ELEMENT = await fixture(
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

  test("should navigate focus with keydown events", async () => {
    const startDate = now();
    const el: DatePicker.ELEMENT = await fixture(
      html`
        <md-datepicker .focusedDate=${startDate}></md-datepicker>
      `
    );
    const selectionFunc = jest.spyOn(el, "handleSelect");
    const navLeft = keyNavEvent("ArrowLeft", startDate);
    el.handleKeyDown(navLeft);
    await el.updateComplete;
    expect(el.focusedDate.day).toEqual(startDate.day - 1);
    const navRight = keyNavEvent("ArrowRight", startDate);
    el.handleKeyDown(navRight);
    await el.updateComplete;
    expect(el.focusedDate.day).toEqual(startDate.day);
    const navUp = keyNavEvent("ArrowUp", startDate);
    el.handleKeyDown(navUp);
    await el.updateComplete;
    expect(el.focusedDate.day).toEqual(startDate.day - 7);
    const navDown = keyNavEvent("ArrowDown", startDate);
    el.handleKeyDown(navDown);
    await el.updateComplete;
    expect(el.focusedDate.day).toEqual(startDate.day);
  });
  test("should select date with keydown events", async () => {
    const startDate = DateTime.fromObject({ month: 11, day: 15 });
    const el: DatePicker.ELEMENT = await fixture(
      html`
        <md-datepicker .focusedDate=${startDate}></md-datepicker>
      `
    );
    const selectionFunc = jest.spyOn(el, "handleSelect");
    const enterSelect = keyNavEvent("Enter", startDate);
    el.handleKeyDown(enterSelect);
    await el.updateComplete;
    expect(selectionFunc).toHaveBeenCalled();
    const spaceSelect = keyNavEvent("Space", startDate);
    el.handleKeyDown(spaceSelect);
    await el.updateComplete;
    expect(selectionFunc).toHaveBeenCalled();
  });
});
