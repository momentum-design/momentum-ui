import { fixture, fixtureCleanup, html, elementUpdated } from "@open-wc/testing-helpers";
import "./TimePicker";
import { TimePicker } from "./TimePicker";
import { Input } from "../input/Input";

describe("TimePicker Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: TimePicker = await fixture(
      html`
        <md-timepicker></md-timepicker>
      `
    );
    expect(el).not.toBeNull();
  });

  test("should render 24 hour", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker twentyFourHourFormat></md-timepicker>
      `
    );

    const hourInput = element.shadowRoot?.querySelector('.time-input-box.hour') as Input;
    const input = hourInput?.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input?.type).toEqual('number');
    expect(input?.min).toEqual("1");
    expect(input?.max).toEqual("24");

    const text = "12";
    hourInput.dispatchEvent(new CustomEvent("input-change", { detail: { value: text }}));
    // hourInput!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Digit5 }));
    await elementUpdated(element);

    const val = hourInput?.value;
    expect(val).toEqual(text);

    expect(element).not.toBeNull();
  });

  test("should just focus after two digits are entered", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker twentyFourHourFormat></md-timepicker>
      `
    );

    const hourInput = element.shadowRoot?.querySelector('.time-input-box.hour') as Input;
    const minuteInput = element.shadowRoot?.querySelector('.time-input-box.minute') as Input;

    hourInput.dispatchEvent(new CustomEvent("input-change", { detail: { value: "1" }}));
    await elementUpdated(element);
    expect(minuteInput.hasAttribute('focus-visible')).toBeFalsy();

    hourInput.dispatchEvent(new CustomEvent("input-change", { detail: { value: "12" }}));
    await elementUpdated(element);
    expect(minuteInput.hasAttribute('focus-visible')).toBeTruthy();

    const val = hourInput?.value;
    expect(val).toEqual("12");
  });
});
