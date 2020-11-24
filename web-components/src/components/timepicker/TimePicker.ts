// import { addDays, addWeeks, DayFilters, isDayDisabled, now, subtractDays, subtractWeeks } from "@/utils/dateUtils";
import { customElement, html, LitElement, property, internalProperty } from "lit-element";
import { DateTime } from "luxon";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import "@/components/input/Input";
import { ValidationRegex } from "@/utils/validations.ts";
import { Input } from "@/components/input/Input";
import { TIME_UNIT } from "@/constants";

export const timeUnits = [
  TIME_UNIT.HOUR,
  TIME_UNIT.MINUTE,
  TIME_UNIT.SECOND,
  TIME_UNIT.AM_PM,
] as const;

export namespace TimePicker {
  export type TimeUnit = typeof timeUnits[number];
}

@customElement("md-timepicker")
export class TimePicker extends LitElement {
  @property({ type: Boolean }) twentyFourHourFormat = false;

  @internalProperty() private timeValue = {
    [TIME_UNIT.HOUR]: "",
    [TIME_UNIT.MINUTE]: "",
    [TIME_UNIT.SECOND]: "",
    [TIME_UNIT.AM_PM]: ""
  }

  @internalProperty() private timeValidity = {
    [TIME_UNIT.HOUR]: true,
    [TIME_UNIT.MINUTE]: true,
    [TIME_UNIT.SECOND]: true,
    [TIME_UNIT.AM_PM]: true
  }

  checkValidity = (input: string, unit: TimePicker.TimeUnit): boolean => {
    let result = true;
    const regexTester = (regex: RegExp): void => {
      if (input.match(regex) === null) {
        result = false;
      }
    };

    switch(unit) {
      case TIME_UNIT.HOUR:
        if (this.twentyFourHourFormat) {
          regexTester(new RegExp(ValidationRegex.twentyFourHourString));
        } else {
          regexTester(new RegExp(ValidationRegex.hourString));
        }
      break;
      case TIME_UNIT.MINUTE:
        regexTester(new RegExp(ValidationRegex.minuteSecondString));
      break;
      case TIME_UNIT.SECOND:
        regexTester(new RegExp(ValidationRegex.minuteSecondString));
      break;
      case TIME_UNIT.AM_PM:
        regexTester(new RegExp(ValidationRegex.amPmString));
      break;
      default:
        break;
    }
    console.log('[log][timePicker]: checkValidity', input, unit, result);
    return result;
  };

  handleTimeChange(event: CustomEvent, unit: TimePicker.TimeUnit) {
    console.log('[log][timePicker]: handleTimeChange', unit, event.detail.value);
    this.timeValue[unit] = event?.detail?.value;
    this.requestUpdate();

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent(`${unit}-change`, {
        bubbles: true,
        composed: true,
        detail: {
          srcEvent: event,
          value: `${this.timeValue[unit]}`,
          isValid: this.timeValidity[unit]
        }
      })
    );
  }

  handleTimeKeyDown(event: CustomEvent, unit: TimePicker.TimeUnit) {
    console.log('[log][timePicker]: handleTimeKeyDown', unit, event.detail.srcEvent.key);
    this.timeValidity[unit] = true;
    this.requestUpdate();

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent(`${unit}-keydown`, {
        bubbles: true,
        composed: true,
        detail: {
          srcEvent: event,
          value: `${this.timeValue[unit]}`
        }
      })
    );
  }

  handleTimeBlur(event: CustomEvent, unit: TimePicker.TimeUnit) {
    console.log('[log][timePicker]: handleTimeBlur', unit, this.timeValue[unit], this.timeValidity[unit]);
    this.timeValidity[unit] = this.timeValue[unit] ? this.checkValidity(this.timeValue[unit], unit) : true;
    this.formatTimeUnit(this.timeValue[unit], unit);
    this.requestUpdate();

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent(`${unit}-blur`, {
        bubbles: true,
        composed: true,
        detail: {
          srcEvent: event,
          value: `${this.timeValue[unit]}`,
          isValid: this.timeValidity[unit]
        }
      })
    );
  }

  static get styles() {
    return [reset, styles];
  }

  formatTimeUnit = (timeValue: string, unit: TimePicker.TimeUnit) => {
    if (unit === TIME_UNIT.AM_PM) {
      this.timeValue[unit] = this.timeValue[unit].toUpperCase();
    } else if (timeValue.length === 1) {
      this.timeValue[unit] = "0" + timeValue;
    } else {
      this.timeValue[unit] = timeValue;
    }
  }

  getTimeString = () => {
    // DateTime.fromSQL('2017-05-15 09:12:34.342')
    let timeString = "";
      const hr = this.timeValue.hour || "00";
      const min = this.timeValue.minute || "00";
      const sec = this.timeValue.second || "00";
      const amPm = this.timeValue.am_pm || "AM";
  
      timeString = hr + ":" + min + ":" + sec + " " + amPm;
    return timeString;
  }

  messageType = (isValid: boolean) => {
    return isValid ? "" : "error";
  }

  render() {
    return html`
    <div class="md-timepicker">
        <!-- <h2>Time: ${this.getTimeString()}</h2> -->
        <md-input
          class="time-input-box hour"
          value="${this.timeValue.hour}"
          type="number"
          min="1"
          max="${this.twentyFourHourFormat ? 24 : 12}"
          @input-change="${(e: CustomEvent) => this.handleTimeChange(e, TIME_UNIT.HOUR)}"
          @input-keydown="${(e: CustomEvent) => this.handleTimeKeyDown(e, TIME_UNIT.HOUR)}"
          @input-blur="${(e: CustomEvent) => this.handleTimeBlur(e, TIME_UNIT.HOUR)}"
          .messageArr=${[{ message: "", type: this.messageType(this.timeValidity.hour) } as Input.Message]}
          aria-invalid="${!this.timeValidity.hour}"
        ></md-input>
        <span class="colon-separator">:</span>
        <md-input
          class="time-input-box minute"
          value="${this.timeValue.minute}"
          type="number"
          min="1"
          max="59"
          @input-change="${(e: CustomEvent) => this.handleTimeChange(e, TIME_UNIT.MINUTE)}"
          @input-keydown="${(e: CustomEvent) => this.handleTimeKeyDown(e, TIME_UNIT.MINUTE)}"
          @input-blur="${(e: CustomEvent) => this.handleTimeBlur(e, TIME_UNIT.MINUTE)}"
          .messageArr=${[{ message: "", type: this.messageType(this.timeValidity.minute) } as Input.Message]}
          aria-invalid="${!this.timeValidity.minute}"
        ></md-input>
        <span class="colon-separator">:</span>
        <md-input
          class="time-input-box second"
          value="${this.timeValue.second}"
          type="number"
          min="1"
          max="59"
          @input-change="${(e: CustomEvent) => this.handleTimeChange(e, TIME_UNIT.SECOND)}"
          @input-keydown="${(e: CustomEvent) => this.handleTimeKeyDown(e, TIME_UNIT.SECOND)}"
          @input-blur="${(e: CustomEvent) => this.handleTimeBlur(e, TIME_UNIT.SECOND)}"
          .messageArr=${[{ message: "", type: this.messageType(this.timeValidity.second) } as Input.Message]}
          aria-invalid="${!this.timeValidity.second}"
        ></md-input>
        <md-input
          class="time-input-box am-pm"
          value="${this.timeValue.am_pm}"
          type="text"
          @input-change="${(e: CustomEvent) => this.handleTimeChange(e, TIME_UNIT.AM_PM)}"
          @input-keydown="${(e: CustomEvent) => this.handleTimeKeyDown(e, TIME_UNIT.AM_PM)}"
          @input-blur="${(e: CustomEvent) => this.handleTimeBlur(e, TIME_UNIT.AM_PM)}"
          .messageArr=${[{ message: "", type: this.messageType(this.timeValidity.am_pm) } as Input.Message]}
          aria-invalid="${!this.timeValidity.am_pm}"
        ></md-input>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-timepicker": TimePicker;
  }
}
