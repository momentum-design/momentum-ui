import { fixture, fixtureCleanup, html, elementUpdated, oneEvent } from "@open-wc/testing-helpers";
import "./TimePicker";
import { TimePicker } from "./TimePicker";
import { Input } from "../input/Input";
import { Key } from "@/constants";
import { ComboBox } from "../combobox/ComboBox";

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
    expect(input?.max).toEqual("23");

    const text = "12";
    hourInput.dispatchEvent(new CustomEvent("input-change", { detail: { value: text }}));
    await elementUpdated(element);

    const val = hourInput?.value;
    expect(val).toEqual(text);

    expect(element).not.toBeNull();
  });

  test("should render time specificity: hour", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker timeSpecificity="hour"></md-timepicker>
      `
    );

    const hourInput = element.shadowRoot?.querySelector('.time-input-box.hour') as Input;
    const minuteInput = element.shadowRoot?.querySelector('.time-input-box.minute') as Input;
    const secondInput = element.shadowRoot?.querySelector('.time-input-box.second') as Input;

    expect(hourInput).toBeDefined();
    expect(minuteInput).toBeNull();
    expect(secondInput).toBeNull();
  });

  test("should render time specificity: minute", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker timeSpecificity="minute"></md-timepicker>
      `
    );

    const hourInput = element.shadowRoot?.querySelector('.time-input-box.hour') as Input;
    const minuteInput = element.shadowRoot?.querySelector('.time-input-box.minute') as Input;
    const secondInput = element.shadowRoot?.querySelector('.time-input-box.second') as Input;

    expect(hourInput).toBeDefined();
    expect(minuteInput).toBeDefined();
    expect(secondInput).toBeNull();
  });

  test("should render time specificity: second", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker timeSpecificity="second"></md-timepicker>
      `
    );

    const hourInput = element.shadowRoot?.querySelector('.time-input-box.hour') as Input;
    const minuteInput = element.shadowRoot?.querySelector('.time-input-box.minute') as Input;
    const secondInput = element.shadowRoot?.querySelector('.time-input-box.second') as Input;

    expect(hourInput).toBeDefined();
    expect(minuteInput).toBeDefined();
    expect(secondInput).toBeDefined();
  });

  test("should just focus after two digits are entered", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker twentyFourHourFormat></md-timepicker>
      `
    );


    const timeChangeSpy = jest.spyOn(element, "handleTimeChange");
    const hourInput = element.shadowRoot?.querySelector('.time-input-box.hour') as Input;
    const minuteInput = element.shadowRoot?.querySelector('.time-input-box.minute') as Input;

    expect(minuteInput.hasAttribute('focus-visible')).toBeFalsy();

    const keyDownEvent: CustomEvent = new CustomEvent("input-keydown", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: {
          key: Key.Digit1
        }
      }
    })
    hourInput?.dispatchEvent(keyDownEvent);
    await elementUpdated(element);

    const event: CustomEvent = new CustomEvent("input-change", {
      bubbles: true,
      composed: true,
      detail: {
        value: "12"
      }
    });
    hourInput?.dispatchEvent(event);
    await elementUpdated(element);

    expect(timeChangeSpy).toHaveBeenCalled();
    expect(hourInput.value).toEqual("12");
    expect(minuteInput.hasAttribute('focus-visible')).toBeTruthy();
  });

  test("should render invalid input with aria-invalid onBlur when time value is invalid", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker></md-timepicker>
      `
    );

    const minuteInput = element.shadowRoot?.querySelector('.time-input-box.minute') as Input;
    const input = minuteInput?.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input?.type).toEqual('number');
    expect(input?.min).toEqual("0");
    expect(input?.max).toEqual("59");

    const invalidMinuteText = "70";
    minuteInput.dispatchEvent(new CustomEvent("input-change", { detail: { value: invalidMinuteText }}));
    await elementUpdated(element);

    const blurEvent: CustomEvent = new CustomEvent("input-blur", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: 'genericEvent'
      }
    });
    minuteInput?.dispatchEvent(blurEvent);
    await elementUpdated(element);

    expect(minuteInput?.value).toEqual(invalidMinuteText);
    expect(minuteInput.ariaInvalid).toBeTruthy();
    expect(minuteInput.value).toEqual(invalidMinuteText);
    expect(minuteInput.messageArr).toEqual([{"message": "", "type": "error"}]);
  });

  test("should render the passed in default time correctly", async () => {
    const element: TimePicker = await fixture<TimePicker>(
      html`
        <md-timepicker defaultTime="02:16:30 PM"></md-timepicker>
      `
    );

    await elementUpdated(element);
    const hourInput = element.shadowRoot?.querySelector('.time-input-box.hour') as Input;
    const minuteInput = element.shadowRoot?.querySelector('.time-input-box.minute') as Input;
    const secondInput = element.shadowRoot?.querySelector('.time-input-box.second') as Input;
    const amPmComboBox = element.shadowRoot?.querySelector('.amPm-combo-box') as ComboBox;

    await elementUpdated(element);
    expect(hourInput.value).toEqual('02');
    expect(minuteInput.value).toEqual('16');
    expect(secondInput.value).toEqual('30');
    expect(amPmComboBox.value).toEqual('PM');
  });
});
