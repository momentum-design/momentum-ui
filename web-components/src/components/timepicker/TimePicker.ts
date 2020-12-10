import { customElement, html, LitElement, property, internalProperty, PropertyValues } from "lit-element";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import "@/components/input/Input";
import { ValidationRegex } from "@/utils/validations.ts";
import { Input } from "@/components/input/Input";
import { TIME_UNIT, Key } from "@/constants";
import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";
import { DateTime } from "luxon";
import { now } from "@/utils/dateUtils";

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
  @property({ type: Boolean }) twoDigitAutoTab = false;
  @property({ type: Boolean }) twentyFourHourFormat = false;
  @property({ type: String }) timeSpecificity: TimePicker.TimeSpecificity = TIME_UNIT.SECOND;
  @property({ type: String }) locale = "en-US";
  @property({ type: String, reflect: true }) value = "12:00:00 AM";

  @internalProperty() private dateTimeObject: DateTime | undefined = undefined;
  @internalProperty() private tabNext = false;
  @internalProperty() private timeValue = {
    [TIME_UNIT.HOUR]: "12",
    [TIME_UNIT.MINUTE]: "00",
    [TIME_UNIT.SECOND]: "00",
    [TIME_UNIT.AM_PM]: "AM"
  }

  @internalProperty() private timeValidity = {
    [TIME_UNIT.HOUR]: true,
    [TIME_UNIT.MINUTE]: true,
    [TIME_UNIT.SECOND]: true,
    [TIME_UNIT.AM_PM]: true
  }

  parseTimeValue = () => {
    const times = this.value.split(":");
    this.timeValue[TIME_UNIT.HOUR] = times.shift() || "12";
    this.timeValue[TIME_UNIT.MINUTE] = times.shift() || "00";

    const remainder = times.shift()?.split(" ");
    this.timeValue[TIME_UNIT.SECOND] = remainder?.shift() || "00";
    this.timeValue[TIME_UNIT.AM_PM] = remainder?.shift() || "AM";
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has("value")) {
      this.parseTimeValue();
      let today = now();

      this.dateTimeObject = today.set({
        hour: Number(this.timeValue[TIME_UNIT.HOUR]),
        minute: Number(this.timeValue[TIME_UNIT.MINUTE]),
        second: Number(this.timeValue[TIME_UNIT.SECOND]),
        millisecond: 0});
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

      if (unit !== TIME_UNIT.AM_PM) {
        this.dateTimeObject = this.dateTimeObject?.set({ [unit]: this.timeValue[unit] });
      } else {
        const twentyFourHour = this.convertToTwentyFourHour(this.timeValue[TIME_UNIT.AM_PM], this.timeValue[TIME_UNIT.HOUR]);
        this.dateTimeObject = this.dateTimeObject?.set({ hour: Number(twentyFourHour) });
      }

      this.dispatchEvent(
        new CustomEvent(`time-selection-change`, {
          bubbles: true,
          composed: true,
          detail: {
            time: this.value,
            timeObject: this.dateTimeObject,
            timeValues: this.timeValue
          }
        })
      );
    }
  }

  handleTimeChange(event: CustomEvent, unit: TimePicker.TimeUnit) {
    this.timeValue[unit] = event?.detail?.value;
    this.requestUpdate();

    this.formatTimeUnit(this.timeValue[unit], unit);

    const unitValue = this.timeValue[unit];
    if (this.twoDigitAutoTab && this.tabNext && ((unit !== TIME_UNIT.AM_PM && unitValue.length === 2 && unitValue[0] !== '0') || unitValue === '00')) {
      event.preventDefault();
      const currentNode = event?.target as Node;
      const allInputs = this.shadowRoot?.querySelectorAll('md-input, md-combobox');

      if (allInputs) {
        const currentIndex = Array.prototype.findIndex.call(allInputs, el => currentNode?.isEqualNode(el));
        const targetIndex = (currentIndex + 1) % allInputs.length;

        if (currentIndex < allInputs.length -1) {
          const targetInput = allInputs[targetIndex].shadowRoot?.querySelector('input') as HTMLInputElement;
          targetInput?.focus();
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

    if(this.timeValue[unit] === '0') {
      this.timeValue[unit] = '00';
    }

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

  formatTimeUnit = (timeValue: string, unit: TimePicker.TimeUnit, onBlur: boolean = false) => {
    if(this.timeValue[unit].length === 1) {
      if (this.timeValue[unit] !== '0') {
        this.timeValue[unit] = '0' + this.timeValue[unit];
      }
    } else if(this.timeValue[unit].length > 2 && this.timeValue[unit][0] === '0') {
      const newValue = this.timeValue[unit].substring(1);
      const regexNoPreZeros = RegExp(ValidationRegex.noPrecedingZerosString);
      const noPrecedingZeros = regexNoPreZeros.test(newValue);
      if (noPrecedingZeros) {
        this.timeValue[unit] = newValue;
      }
    }
    this.requestUpdate();
  }

  convertToTwentyFourHour = (amPm: string, hour: string) => {
    if (amPm === 'PM') {
      hour = (12 + (Number(hour) % 12)).toString();
    } else {
      hour = (Number(hour) % 12).toString();
    }

    if (hour.length === 1) {
      hour = `0${hour}`;
    }
    return hour;
  }

  getTimeString = () => {
    let hr = this.timeValidity[TIME_UNIT.HOUR] ? this.timeValue[TIME_UNIT.HOUR] || "12" : "12";
    const min = this.timeValidity[TIME_UNIT.MINUTE] ? this.timeValue[TIME_UNIT.MINUTE] || "00" : "00";
    const sec = this.timeValidity[TIME_UNIT.SECOND] ? this.timeValue[TIME_UNIT.SECOND] || "00" : "00";
    const amPm = this.timeValidity[TIME_UNIT.AM_PM] ? this.timeValue[TIME_UNIT.AM_PM] || "AM": "AM";

    hr = this.convertToTwentyFourHour(amPm, hr);

    let timeString = `${hr}:${min}:${sec}`;
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
        selectWhenInFocus
        class="${`time-input-box ${unit}`}"
        id="time-${timeUnits.findIndex((aUnit) => aUnit === unit) + 1}"
        value="${this.timeValue[unit]}"
        type="${unitProperties.type}"
        min=${ifDefined(unitProperties.min)}
        max=${ifDefined(unitProperties.max)}
        maxLength=${2}
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
        selectWhenInFocus
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
