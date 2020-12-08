import { customElement, html, LitElement, property, internalProperty, PropertyValues } from "lit-element";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import "@/components/input/Input";
import { ValidationRegex } from "@/utils/validations.ts";
import { Input } from "@/components/input/Input";
import { TIME_UNIT, Key } from "@/constants";
import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";

export const timeUnits = [
  TIME_UNIT.HOUR,
  TIME_UNIT.MINUTE,
  TIME_UNIT.SECOND,
  TIME_UNIT.AM_PM,
] as const;

export const timeSpecificity = [
  TIME_UNIT.HOUR,
  TIME_UNIT.MINUTE,
  TIME_UNIT.SECOND
]

const timePlaceholders = {
  [TIME_UNIT.HOUR]: "HH",
  [TIME_UNIT.MINUTE]: "MM",
  [TIME_UNIT.SECOND]: "SS",
  [TIME_UNIT.AM_PM]: "AM"
}

const timeUnitProps = (isTwentyFourHour: boolean) => {
  return {
    [TIME_UNIT.HOUR]: {
      type: "number" as Input.Type,
      min: isTwentyFourHour ? 0 : 1,
      max: isTwentyFourHour ? 23 : 12
    },
    [TIME_UNIT.MINUTE]: {
      type: "number" as Input.Type,
      min: 0,
      max: 59
    },
    [TIME_UNIT.SECOND]: {
      type: "number" as Input.Type,
      min: 0,
      max: 59
    },
    [TIME_UNIT.AM_PM]: {
      type: "text" as Input.Type,
      min: undefined,
      max: undefined
    }
  }
}

export namespace TimePicker {
  export type TimeUnit = typeof timeUnits[number];
  export type TimeSpecificity = typeof timeSpecificity[number];
}

@customElement("md-timepicker")
export class TimePicker extends LitElement {
  @property({ type: Boolean }) twentyFourHourFormat = false;
  @property({ type: String }) timeSpecificity: TimePicker.TimeSpecificity = TIME_UNIT.SECOND;
  @property({ type: String, reflect: true }) value = "12:00:00 AM";

  @internalProperty() private timeValue = {
    [TIME_UNIT.HOUR]: "12",
    [TIME_UNIT.MINUTE]: "00",
    [TIME_UNIT.SECOND]: "00",
    [TIME_UNIT.AM_PM]: "AM"
  }

  parseTimeValue = () => {
    const times = this.value.split(":");
    this.timeValue[TIME_UNIT.HOUR] = times.shift() || "12";
    this.timeValue[TIME_UNIT.MINUTE] = times.shift() || "00";

    const remainder = times.shift()?.split(" ");
    this.timeValue[TIME_UNIT.SECOND] = remainder?.shift() || "00";
    this.timeValue[TIME_UNIT.AM_PM] = remainder?.shift() || "AM";
  }

  @internalProperty() private timeValidity = {
    [TIME_UNIT.HOUR]: true,
    [TIME_UNIT.MINUTE]: true,
    [TIME_UNIT.SECOND]: true,
    [TIME_UNIT.AM_PM]: true
  }

  @internalProperty() private tabNext = false;
  @internalProperty () private time = "";

  firstUpdated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has("value")) {
      this.parseTimeValue();
    }
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
     return result;
  };

  updateTime = (unit: TIME_UNIT) => {
    if (this.timeValidity[unit]) {
      this.value = this.getTimeString();
    }

    this.dispatchEvent(
      new CustomEvent(`time-selection-change`, {
        bubbles: true,
        composed: true,
        detail: {
          time: this.value,
          timeValues: this.timeValue
        }
      })
    );
  }

  handleTimeChange(event: CustomEvent, unit: TimePicker.TimeUnit) {
    this.timeValue[unit] = event?.detail?.value;
    this.requestUpdate();

    if(this.timeValue[unit].length === 1) {
      this.timeValue[unit] = '0' + this.timeValue[unit];
    } else if(this.timeValue[unit][0] === '0') {
      this.timeValue[unit] = this.timeValue[unit].substring(1);
    }

    if (this.tabNext && unit !== TIME_UNIT.AM_PM && this.timeValue[unit].length === 2 && this.timeValue[unit][0] !== '0') {
      event.preventDefault();
      const currentNode = event?.target as Node;
      const allInputs = this.shadowRoot?.querySelectorAll('md-input, md-combobox');

      if (allInputs) {
        const currentIndex = Array.prototype.findIndex.call(allInputs, el => currentNode?.isEqualNode(el));
        const targetIndex = (currentIndex + 1) % allInputs.length;

        if (currentIndex < allInputs.length -1) {
          const targetInput = allInputs[targetIndex].shadowRoot?.querySelector('input');
          targetInput?.focus();
          targetInput?.select();
        }
      }
    } else if (unit === TIME_UNIT.AM_PM) {
      this.updateTime(unit);
    }

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
    const { key } = event?.detail?.srcEvent;

    if(key === Key.ArrowDown || key === Key.ArrowUp) {
      this.tabNext = false;

    } else {
      this.tabNext = true;
    }

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
    this.timeValidity[unit] = this.timeValue[unit] ? this.checkValidity(this.timeValue[unit], unit) : true;
    this.formatTimeUnit(this.timeValue[unit], unit);
    this.updateTime(unit);
    this.requestUpdate();

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent(`${unit}-blur`, {
        bubbles: true,
        composed: true,
        detail: {
          srcEvent: event,
          time: this.value,
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
    const hr = this.timeValidity[TIME_UNIT.HOUR] ? this.timeValue[TIME_UNIT.HOUR] || "12" : "12";
    const min = this.timeValidity[TIME_UNIT.MINUTE] ? this.timeValue[TIME_UNIT.MINUTE] || "00" : "00";
    const sec = this.timeValidity[TIME_UNIT.SECOND] ? this.timeValue[TIME_UNIT.SECOND] || "00" : "00";
    const amPm = this.timeValidity[TIME_UNIT.AM_PM] ? this.timeValue[TIME_UNIT.AM_PM] || "AM": "AM";

    let timeString = `${hr}:${min}:${sec}${this.twentyFourHourFormat ? "" : ` ${amPm}`}`
    return timeString;
  }

  messageType = (isValid: boolean) => {
    return isValid ? "" : "error";
  }

  generateTimeBox = (unit: TimePicker.TimeUnit) => {
    const unitProperties = timeUnitProps(this.twentyFourHourFormat)[unit];

    return html`
      ${unit === TIME_UNIT.MINUTE || unit === TIME_UNIT.SECOND ? html`<span class="colon-separator">:</span>` : nothing}
      <md-input
        compact
        class="${`time-input-box ${unit}`}"
        value="${this.timeValue[unit]}"
        type="${unitProperties.type}"
        min=${ifDefined(unitProperties.min)}
        max=${ifDefined(unitProperties.max)}
        placeholder="${timePlaceholders[unit]}"
        @input-change="${(e: CustomEvent) => this.handleTimeChange(e, unit)}"
        @input-keydown="${(e: CustomEvent) => this.handleTimeKeyDown(e, unit)}"
        @input-blur="${(e: CustomEvent) => this.handleTimeBlur(e, unit)}"
        .messageArr=${[{ message: "", type: this.messageType(this.timeValidity[unit]) } as Input.Message]}
        ariaLabel="${unit}-input"
        ariaInvalid="${!this.timeValidity[unit]}"
      ></md-input>
    `;
  }

  generateAmPmComboBox = () => {
    const options = ['AM', "PM"];
    return html `
      <md-combobox
        compact
        class="amPm-combo-box"
        .options=${options}
        .value=${[options[0]]}
        @change-selected="${(e: CustomEvent) => this.handleTimeChange(e, TIME_UNIT.AM_PM)}"
      ></md-combobox>
    `;
  }

  render() {
    return html`
    <div class="md-timepicker">
        <div class="time-inputs-wrapper">
          ${this.generateTimeBox(TIME_UNIT.HOUR)}
          ${this.timeSpecificity === TIME_UNIT.HOUR ? nothing : this.generateTimeBox(TIME_UNIT.MINUTE)}
          ${this.timeSpecificity === TIME_UNIT.MINUTE || this.timeSpecificity === TIME_UNIT.HOUR ? nothing : this.generateTimeBox(TIME_UNIT.SECOND)}
          ${this.twentyFourHourFormat ? nothing : this.generateAmPmComboBox()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-timepicker": TimePicker;
  }
}
