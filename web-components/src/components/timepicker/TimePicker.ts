// import { addDays, addWeeks, DayFilters, isDayDisabled, now, subtractDays, subtractWeeks } from "@/utils/dateUtils";
import { customElement, html, LitElement, property, PropertyValues, query, internalProperty } from "lit-element";
import { DateTime } from "luxon";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import "@/components/input/Input";
// import { Input } from "@/components/input/Input";
import { ValidationRegex } from "@/utils/validations.ts";

export const timeUnits = [
  "hour",
  "minute",
  "second",
  "amPm",
] as const;

export namespace TimePicker {
  export type TimeUnit = typeof timeUnits[number];
}

@customElement("md-timepicker")
export class TimePicker extends LitElement {

  // @internalProperty() private hourValue = "";
  @internalProperty() private TimeValue = {
    "hour": "",
    "minute": "",
    "second": "",
    "amPm": ""
  }
  @internalProperty() private isValid = true;

  checkValidity = (input: string, unit: TimePicker.TimeUnit): boolean => {
    let result = true;
    const regexTester = (regex: RegExp): void => {
      if (input.match(regex) === null) {
        result = false;
      }
    };

    let regex;
    switch(unit) {
      case "hour":
        regexTester(new RegExp(ValidationRegex.hourString));
      break;
      case "minute":
        regexTester(new RegExp(ValidationRegex.minuteSecondString));
      break;
      case "second":
        regexTester(new RegExp(ValidationRegex.minuteSecondString));
      break;
      case "amPm":
        regexTester(new RegExp(ValidationRegex.amPmString));
      break;
      default:
        break;
    }

    return result;
  };

  handleChange(event: CustomEvent, unit: TimePicker.TimeUnit) {
    console.log('[log]: handleHourChange', event.detail.value);
    this.TimeValue[unit] = event.detail.value;

    // this.validateInput(this.value);
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("hour-change", {
        bubbles: true,
        composed: true,
        detail: {
          srcEvent: event,
          value: `${this.TimeValue.hour }`,
          // isValid: this.isValid
        }
      })
    );
  }

  handleKeydown(event: CustomEvent, unit: TimePicker.TimeUnit) {
    const key = event?.detail?.srcEvent?.key;
    const text = this.TimeValue[unit] + key;

    console.log('[log] unit / key / text / match? ', unit, key, text, this.checkValidity(text, unit));
    if ( !this.checkValidity(text, 'hour') ) {
      return false;
    }

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("phoneinput-keydown", {
        bubbles: true,
        composed: true,
        detail: {
          srcEvent: event,
          value: `${this.TimeValue.hour}`
        }
      })
    );
  }

  handleBlur(event: Event) {
    // console.log('[log]: handleBlur');
    // this.isValid = this.value ? isValidNumberForRegion(this.value, this.countryCode) : true;
    this.isValid = false;
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("hour-blur", {
        bubbles: true,
        composed: true,
        detail: {
          srcEvent: event,
          value: `${this.TimeValue.hour}`,
          // isValid: this.isValid
        }
      })
    );
  }

  static get styles() {
    return [reset, styles];
  }

  getTimeString = () => {
    let timeString = "";
    if (this.TimeValue.hour) {
      const min = this.TimeValue.minute || "00";
      const sec = this.TimeValue.second || "00";
      const amPm = this.TimeValue.amPm || "AM";
  
      timeString = min + ":" + min + ":" + sec + amPm;
    }
    return timeString;
  }

  render() {
    return html`
    <div class="md-timepicker">
        <!-- <h2>Time: ${this.getTimeString()}</h2> -->
        <md-input
          showNumberInputArrows
          ref="hourInputRef"
          class="time-input-box hour"
          @input-change="${(e: CustomEvent) => this.handleChange(e, "hour")}"
          @input-blur="${(e: Event) => this.handleBlur(e)}"
          @input-keydown="${(e: CustomEvent) => this.handleKeydown(e, "hour")}"
          type="number"
          min="1"
          max="12"
          value="${this.TimeValue.hour}"></md-input>
        <span class="colon-separator">:</span>
        <md-input class="time-input-box minute"
        @input-change="${(e: CustomEvent) => this.handleChange(e, "minute")}"
        @input-keydown="${(e: CustomEvent) => this.handleKeydown(e, "minute")}" type="number" min="1" max="59" value="${this.TimeValue.minute}"></md-input>
        <span class="colon-separator">:</span>
        <md-input class="time-input-box second"
        @input-change="${(e: CustomEvent) => this.handleChange(e, "second")}"
        @input-keydown="${(e: CustomEvent) => this.handleKeydown(e, "second")}" type="number" min="1" max="59" value="${this.TimeValue.second}"></md-input>
        <md-input class="time-input-box am-pm"
        @input-change="${(e: CustomEvent) => this.handleChange(e, "amPm")}"
        @input-keydown="${(e: CustomEvent) => this.handleKeydown(e, "amPm")}" value="${this.TimeValue.amPm}"></md-input>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-timepicker": TimePicker;
  }
}
