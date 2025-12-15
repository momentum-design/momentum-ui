import { Input } from "@/components/input/Input";
import { TimePicker } from "@/components/timepicker/TimePicker";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./TimePicker";

describe("TimePicker Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: TimePicker.ELEMENT = await fixture(html` <md-timepicker></md-timepicker> `);
    expect(el).not.toBeNull();
  });

  test("should render 24 hour", async () => {
    const element: TimePicker.ELEMENT = await fixture<TimePicker.ELEMENT>(html`
      <md-timepicker twenty-four-hour-format></md-timepicker>
    `);

    const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
    const input = hourInput?.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(input?.type).toEqual("number");
    expect(input?.min).toEqual("0");
    expect(input?.max).toEqual("23");

    const text = "12";
    hourInput.dispatchEvent(new CustomEvent("input-change", { detail: { value: text } }));
    await elementUpdated(element);

    const val = hourInput?.value;
    expect(val).toEqual(text);

    expect(element).not.toBeNull();
  });

  test("should render time specificity: hour", async () => {
    const element: TimePicker.ELEMENT = await fixture<TimePicker.ELEMENT>(html`
      <md-timepicker timeSpecificity="hour"></md-timepicker>
    `);

    const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
    const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
    const secondInput = element.shadowRoot?.querySelector(".time-input-box.second") as Input.ELEMENT;

    expect(hourInput).toBeDefined();
    expect(minuteInput).toBeNull();
    expect(secondInput).toBeNull();
  });

  test("should render time specificity: minute", async () => {
    const element: TimePicker.ELEMENT = await fixture<TimePicker.ELEMENT>(html`
      <md-timepicker timeSpecificity="minute"></md-timepicker>
    `);

    const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
    const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
    const secondInput = element.shadowRoot?.querySelector(".time-input-box.second") as Input.ELEMENT;

    expect(hourInput).toBeDefined();
    expect(minuteInput).toBeDefined();
    expect(secondInput).toBeNull();
  });

  test("should render time specificity: second", async () => {
    const element: TimePicker.ELEMENT = await fixture<TimePicker.ELEMENT>(html`
      <md-timepicker timeSpecificity="second"></md-timepicker>
    `);

    const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
    const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
    const secondInput = element.shadowRoot?.querySelector(".time-input-box.second") as Input.ELEMENT;

    expect(hourInput).toBeDefined();
    expect(minuteInput).toBeDefined();
    expect(secondInput).toBeDefined();
  });

  test("should focus on next input after two digits are entered when twoDigitAutoTab is true", async () => {
    const element = await fixture<TimePicker.ELEMENT>(html`
      <md-timepicker twenty-four-hour-format two-digit-auto-tab></md-timepicker>
    `);

    const timeChangeSpy = jest.spyOn(element, "handleTimeChange");
    const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
    const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;

    expect(minuteInput.hasAttribute("focus-visible")).toBeFalsy();

    const keyDownEvent: CustomEvent = new CustomEvent("input-keydown", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: {
          key: Key.Digit1
        }
      }
    });
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

    expect(minuteInput.hasAttribute("focus-visible")).toBeTruthy();
  });

  test("should render invalid input with aria-invalid onBlur when time value is invalid", async () => {
    const element = await fixture<TimePicker.ELEMENT>(html` <md-timepicker></md-timepicker> `);

    const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
    const input = minuteInput?.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(input?.type).toEqual("number");
    expect(input?.min).toEqual("0");
    expect(input?.max).toEqual("59");

    const invalidMinuteText = "70";
    minuteInput.dispatchEvent(new CustomEvent("input-change", { detail: { value: invalidMinuteText } }));
    await elementUpdated(element);

    const blurEvent: CustomEvent = new CustomEvent("input-blur", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: "genericEvent"
      }
    });
    minuteInput?.dispatchEvent(blurEvent);
    await elementUpdated(element);

    expect(minuteInput?.value).toEqual(invalidMinuteText);
    expect(minuteInput.ariaInvalid).toBeTruthy();
    expect(minuteInput.value).toEqual(invalidMinuteText);
    expect(minuteInput.messageArr).toEqual([{ message: "", type: "error" }]);
  });

  describe("Placeholders and Default Values", () => {
    test("should show placeholders when showDefaultNowTime is false and no value is set", async () => {
      const element = await fixture<TimePicker.ELEMENT>(
        html`<md-timepicker .showDefaultNowTime=${false}></md-timepicker>`
      );

      const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
      const hourNativeInput = hourInput?.shadowRoot?.querySelector("input");
      expect(hourNativeInput?.placeholder).toBe("HH");
      expect(hourInput.value).toBe("");

      const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
      const minuteNativeInput = minuteInput?.shadowRoot?.querySelector("input");
      expect(minuteNativeInput?.placeholder).toBe("MM");
      expect(minuteInput.value).toBe("");

      const secondInput = element.shadowRoot?.querySelector(".time-input-box.second") as Input.ELEMENT;
      const secondNativeInput = secondInput?.shadowRoot?.querySelector("input");
      expect(secondNativeInput?.placeholder).toBe("SS");
      expect(secondInput.value).toBe("");

      const ampmCombo = element.shadowRoot?.querySelector(".amPm-combo-box");
      expect(ampmCombo).toBeDefined();
    });

    test("should show correct placeholders for timeSpecificity='hour'", async () => {
      const element = await fixture<TimePicker.ELEMENT>(
        html`<md-timepicker .showDefaultNowTime=${false} timeSpecificity="hour"></md-timepicker>`
      );

      const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
      const hourNativeInput = hourInput?.shadowRoot?.querySelector("input");
      expect(hourNativeInput?.placeholder).toBe("HH");
      expect(hourInput.value).toBe("");

      expect(element.shadowRoot?.querySelector(".time-input-box.minute")).toBeNull();
      expect(element.shadowRoot?.querySelector(".time-input-box.second")).toBeNull();
    });

    test("should show correct placeholders for timeSpecificity='minute'", async () => {
      const element = await fixture<TimePicker.ELEMENT>(
        html`<md-timepicker .showDefaultNowTime=${false} timeSpecificity="minute"></md-timepicker>`
      );

      const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
      const hourNativeInput = hourInput?.shadowRoot?.querySelector("input");
      expect(hourNativeInput?.placeholder).toBe("HH");
      expect(hourInput.value).toBe("");

      const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
      const minuteNativeInput = minuteInput?.shadowRoot?.querySelector("input");
      expect(minuteNativeInput?.placeholder).toBe("MM");
      expect(minuteInput.value).toBe("");

      expect(element.shadowRoot?.querySelector(".time-input-box.second")).toBeNull();
    });

    test("should show correct placeholders for timeSpecificity='second'", async () => {
      const element = await fixture<TimePicker.ELEMENT>(
        html`<md-timepicker .showDefaultNowTime=${false} timeSpecificity="second"></md-timepicker>`
      );

      const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
      const hourNativeInput = hourInput?.shadowRoot?.querySelector("input");
      expect(hourNativeInput?.placeholder).toBe("HH");
      expect(hourInput.value).toBe("");

      const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
      const minuteNativeInput = minuteInput?.shadowRoot?.querySelector("input");
      expect(minuteNativeInput?.placeholder).toBe("MM");
      expect(minuteInput.value).toBe("");

      const secondInput = element.shadowRoot?.querySelector(".time-input-box.second") as Input.ELEMENT;
      const secondNativeInput = secondInput?.shadowRoot?.querySelector("input");
      expect(secondNativeInput?.placeholder).toBe("SS");
      expect(secondInput.value).toBe("");
    });

    test("should not show placeholder if showDefaultNowTime is true", async () => {
      const element = await fixture<TimePicker.ELEMENT>(
        html`<md-timepicker .showDefaultNowTime=${true}></md-timepicker>`
      );

      const hourInput = element.shadowRoot?.querySelector(".time-input-box.hour") as Input.ELEMENT;
      expect(hourInput.value).not.toBe("");

      const minuteInput = element.shadowRoot?.querySelector(".time-input-box.minute") as Input.ELEMENT;
      expect(minuteInput.value).not.toBe("");

      const secondInput = element.shadowRoot?.querySelector(".time-input-box.second") as Input.ELEMENT;
      expect(secondInput.value).not.toBe("");
    });
  });
});
