import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DatePickerDay";
import { type DatePickerDay } from "./DatePickerDay";

describe("DatePickerDay Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });
  test("should apply a modifier, when the date does not belong to current month", async () => {
    const el: DatePickerDay.ELEMENT = await fixture(html` <md-datepicker-day></md-datepicker-day> `);
    expect(el).not.toBeNull();
  });
  test("should apply selected attribute class modifier", async () => {
    const el: DatePickerDay.ELEMENT = await fixture(html` <md-datepicker-day selected></md-datepicker-day> `);
    expect(el.selected).toBeTruthy;
  });
  test("should apply disabled attribute class modifier", async () => {
    const el: DatePickerDay.ELEMENT = await fixture(html` <md-datepicker-day disabled></md-datepicker-day> `);
    expect(el.disabled).toBeTruthy;
    expect(el.shadowRoot?.querySelector("md-button")?.classList.contains("--disabled")).toBeTruthy;
  });
  test("should apply focused attribute class modifier", async () => {
    const el: DatePickerDay.ELEMENT = await fixture(html` <md-datepicker-day focused></md-datepicker-day> `);
    expect(el.focused).toBeTruthy;
  });
  test("should apply a modifier when the date is today`s date", async () => {
    const el: DatePickerDay.ELEMENT = await fixture(html` <md-datepicker-day></md-datepicker-day> `);

    expect(el.shadowRoot?.querySelector("md-button")?.classList.contains("--today")).not.toBeNull();
  });

  test("onclick of Day should handle action", async () => {
    const el = await fixture<DatePickerDay.ELEMENT>(html` <md-datepicker-day></md-datepicker-day> `);
    const userEvent = jest.spyOn(el, "handleClick");
    const event = new MouseEvent("click");
    el.dispatchEvent(event);
    await el.updateComplete;
    expect(userEvent).toHaveBeenCalled;
  });
  test("onkeydown of Day should handle action", async () => {
    const el: DatePickerDay.ELEMENT = await fixture(html` <md-datepicker-day></md-datepicker-day> `);
    const userEvent = jest.spyOn(el, "handleKeyDown");
    const event = new KeyboardEvent("keydown", { code: "Space" });
    el.dispatchEvent(event);
    await el.updateComplete;
    expect(userEvent).toHaveBeenCalled;
  });
});
