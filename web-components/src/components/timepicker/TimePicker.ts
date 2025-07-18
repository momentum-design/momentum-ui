import "@/components/combobox/ComboBox";
import "@/components/input/Input";
import { Input } from "@/components/input/Input";
import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { now } from "@/utils/dateUtils";
import { ValidationRegex } from "@/utils/validations";
import reset from "@/wc_scss/reset.scss";
import { LitElement, PropertyValues, html, internalProperty, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { TIME_UNIT } from "../../constants";
import styles from "./scss/module.scss";

export const timeUnits = [TIME_UNIT.HOUR, TIME_UNIT.MINUTE, TIME_UNIT.SECOND, TIME_UNIT.AM_PM] as const;
export const timeSpecificity = [TIME_UNIT.HOUR, TIME_UNIT.MINUTE, TIME_UNIT.SECOND];

const timePlaceholders = {
  [TIME_UNIT.HOUR]: "HH",
  [TIME_UNIT.MINUTE]: "MM",
  [TIME_UNIT.SECOND]: "SS",
  [TIME_UNIT.AM_PM]: "AM"
};

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
  };
};

export namespace TimePicker {
  export type TimeUnit = (typeof timeUnits)[number];
  export type TimeSpecificity = (typeof timeSpecificity)[number];

  @customElementWithCheck("md-timepicker")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean, attribute: "two-digit-auto-tab" }) twoDigitAutoTab = false;
    @property({ type: Boolean, attribute: "twenty-four-hour-format", reflect: true }) twentyFourHourFormat = false;
    @property({ type: String }) timeSpecificity: TimePicker.TimeSpecificity = TIME_UNIT.SECOND;
    @property({ type: String }) locale = "en-US";
    @property({ type: String, reflect: true }) value: string | null = null;
    @property({ type: Boolean, attribute: "show-default-now-time" }) showDefaultNowTime = true;

    @internalProperty() private finalTwentyFourFormat = false;
    @internalProperty() private timeObject: DateTime = now();
    @internalProperty() private tabNext = false;
    @internalProperty() private timeValue = {
      [TIME_UNIT.HOUR]: "12",
      [TIME_UNIT.MINUTE]: "00",
      [TIME_UNIT.SECOND]: "00",
      [TIME_UNIT.AM_PM]: "AM"
    };

    @internalProperty() private timeValidity = {
      [TIME_UNIT.HOUR]: true,
      [TIME_UNIT.MINUTE]: true,
      [TIME_UNIT.SECOND]: true,
      [TIME_UNIT.AM_PM]: true
    };

    get timePickerClassMap() {
      return {
        "twenty-four-hour-format": this.finalTwentyFourFormat
      };
    }

    connectedCallback() {
      super.connectedCallback();
      this.initializeTimeValues();
    }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    const triggers = [
      "value",
      "locale",
      "twentyFourHourFormat",
      "showDefaultNowTime",
      "timeSpecificity"
    ];

    if (triggers.some(prop => changedProperties.has(prop))) {
      this.initializeTimeValues();
    }
  }

    private initializeTimeValues() {
      if (!this.showDefaultNowTime && !this.value) {
        const tempTimeObject = DateTime.now().setLocale(this.locale);
        const localeTimeFormat = this.getLocaleTimeFormat(tempTimeObject);
        this.finalTwentyFourFormat = this.twentyFourHourFormat || localeTimeFormat;

        const shouldShowMinute = this.timeSpecificity === TIME_UNIT.MINUTE || this.timeSpecificity === TIME_UNIT.SECOND;
        const shouldShowSecond = this.timeSpecificity === TIME_UNIT.SECOND;

        this.timeValue = {
          [TIME_UNIT.HOUR]: "",
          [TIME_UNIT.MINUTE]: shouldShowMinute ? "" : "00",
          [TIME_UNIT.SECOND]: shouldShowSecond ? "" : "00",
          [TIME_UNIT.AM_PM]: "AM"
        };

      } else {
        const timeToUse = this.value || now().toISOTime({ suppressMilliseconds: true });
        if (timeToUse) {
          this.updateValue(timeToUse);
        }
      }
    }

    private updateValue(timeValue?: string) {
      const valueToUse = timeValue || this.value;
      if (!valueToUse) {
        return;
      }

      this.timeObject = DateTime.fromISO(valueToUse, { locale: this.locale });
      const localeTimeFormat = this.getLocaleTimeFormat(this.timeObject);
      this.finalTwentyFourFormat = this.twentyFourHourFormat || localeTimeFormat;
      this.value = this.timeObject.toISOTime({ suppressMilliseconds: true });
      this.updateTimeValues();
    }

    addLeadingZeros = (value: string | undefined) => {
      if (value) {
        if (value.length === 0) {
          return "00";
        } else if (value.length === 1) {
          return `0${value}`;
        }
      }
      return value;
    };

    formatAndValidate = (timeUnitString: string | undefined, unit: TIME_UNIT) => {
      if (timeUnitString) {
        this.updateValidity(timeUnitString, unit);
        if (this.timeValidity[unit]) {
          return this.addLeadingZeros(timeUnitString);
        }
      }
      return undefined;
    };

    getLocaleTimeFormat = (aTimeObject: DateTime) => {
      const stringDate = aTimeObject.toFormat("tt");
      const [, amPmValue] = stringDate.split(" ");

      const localeTwentyFourFormat = !amPmValue;
      return localeTwentyFourFormat;
    };

    updateTimeValues = () => {
      let stringDate;
      if (this.finalTwentyFourFormat) {
        stringDate = this.timeObject.toFormat("HH:mm:ss");
      } else {
        stringDate = this.timeObject.toFormat("hh:mm:ss a");
      }

      const [times, amPmValue] = stringDate.split(" ");
      const splitTimes = times.split(":");

      timeSpecificity.forEach((unit: TIME_UNIT) => {
        const formattedValue = this.formatAndValidate(splitTimes.shift(), unit);
        if (formattedValue) {
          if (unit === TIME_UNIT.HOUR && amPmValue) {
            this.timeValue[TIME_UNIT.AM_PM] = amPmValue;
          }
          this.timeValue[unit] = formattedValue;
        }
      });
    };

    updateValidity = (input: string, unit: TimePicker.TimeUnit) => {
      let result = true;
      if (!this.showDefaultNowTime && !this.value && !input) {
        this.timeValidity[unit] = true;
        return;
      }

      const regexTester = (regex: RegExp): void => {
        if (input.match(regex) === null) {
          result = false;
        }
      };

      switch (unit) {
        case TIME_UNIT.HOUR:
          if (this.finalTwentyFourFormat) {
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

      this.timeValidity[unit] = result;
    };

    to12HourFormat = (amPm: string, hour: string) => {
      if (!this.finalTwentyFourFormat && this.timeValidity[TIME_UNIT.HOUR] && this.timeValidity[TIME_UNIT.AM_PM]) {
        let hourValue = Number(hour);
        if (amPm === "PM") {
          hourValue = 12 + (hourValue % 12);
        } else {
          hourValue = hourValue % 12;
        }
        return hourValue;
      }
    };

    isEntireTimeValid = () => {
        const requiredUnits: TimePicker.TimeUnit[] = [TIME_UNIT.HOUR];
        if (this.timeSpecificity === TIME_UNIT.MINUTE || this.timeSpecificity === TIME_UNIT.SECOND) {
          requiredUnits.push(TIME_UNIT.MINUTE);
        }
        if (this.timeSpecificity === TIME_UNIT.SECOND) {
          requiredUnits.push(TIME_UNIT.SECOND);
        }
        if (!this.finalTwentyFourFormat) {
          requiredUnits.push(TIME_UNIT.AM_PM);
        }

        const internalValidity = requiredUnits.every((unit) => this.timeValidity[unit]);
        
        if (!this.showDefaultNowTime && !this.value) {
          const allFieldsFilled = requiredUnits.every((unit) => !!this.timeValue[unit]);
          return allFieldsFilled && internalValidity;
        }
        return internalValidity;
    };

    updateTimeUnit = (unit: TIME_UNIT) => {
      this.updateValidity(this.timeValue[unit], unit);

      if (!this.showDefaultNowTime && !this.value) {
        const hour = this.timeValue[TIME_UNIT.HOUR] || "00";
        const minute = this.timeValue[TIME_UNIT.MINUTE] || "00";
        const second = this.timeValue[TIME_UNIT.SECOND] || "00";
        try {
          let timeString = `${hour}:${minute}:${second}`;
          if (!this.finalTwentyFourFormat && this.timeValue[TIME_UNIT.AM_PM]) {
            timeString += ` ${this.timeValue[TIME_UNIT.AM_PM]}`;
          }
          this.timeObject = DateTime.fromFormat(timeString, this.finalTwentyFourFormat ? "HH:mm:ss" : "hh:mm:ss a");
          if (this.timeObject.isValid && this.isEntireTimeValid()) {
            this.value = this.timeObject.toISOTime({ suppressMilliseconds: true });
            this.dispatchTimeChangeEvent();
          }
        } catch (error) {
           console.warn('Failed to construct time object:');
        }
      } else if (this.timeObject && this.timeValidity[unit]) {
        if (unit !== TIME_UNIT.AM_PM) {
          this.timeObject = this.timeObject?.set({ [unit]: Number(this.timeValue[unit]) });
        } else {
          const hour24 = this.to12HourFormat(this.timeValue[TIME_UNIT.AM_PM], this.timeValue[TIME_UNIT.HOUR]);
          if (hour24 !== undefined) {
            this.timeObject = this.timeObject?.set({ hour: hour24 });
          }
        }

        if (this.isEntireTimeValid()) {
          this.value = this.timeObject.toISOTime({ suppressMilliseconds: true }) || this.value;
          this.dispatchTimeChangeEvent();
        }
      }
    };

    private dispatchTimeChangeEvent() {
      this.dispatchEvent(
        new CustomEvent(`time-selection-change`, {
          bubbles: true,
          composed: true,
          detail: {
            time: this.value,
            data: this.timeObject,
            isValid: this.isEntireTimeValid()
          }
        })
      );
    }

    handleTimeChange(event: CustomEvent, unit: TimePicker.TimeUnit) {
      this.timeValue[unit] = event?.detail?.value;
      this.requestUpdate();
      this.formatTimeUnit(unit);

      const unitValue = this.timeValue[unit];
      if (
        this.twoDigitAutoTab &&
        this.tabNext &&
        ((unit !== TIME_UNIT.AM_PM && unitValue.length === 2 && unitValue[0] !== "0") || unitValue === "00")
      ) {
        event.preventDefault();
        const currentNode = event?.target as Node;
        const allInputs = this.shadowRoot?.querySelectorAll("md-input, md-combobox");

        if (allInputs) {
          const currentIndex = Array.prototype.findIndex.call(allInputs, (el) => currentNode?.isEqualNode(el));
          const targetIndex = (currentIndex + 1) % allInputs.length;

          if (currentIndex < allInputs.length - 1) {
            const targetInput = allInputs[targetIndex].shadowRoot?.querySelector("input") as HTMLInputElement;
            targetInput?.focus();
          }
        }
      } else if (unit === TIME_UNIT.AM_PM) {
        this.updateTimeUnit(unit);
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
      const srcEvent = event?.detail?.srcEvent;

      if (!srcEvent) {
        console.warn("srcEvent is undefined");
        return;
      }

      const { key } = srcEvent;

      if (key === Key.ArrowDown || key === Key.ArrowUp) {
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
      if (this.timeValue[unit] === "0") {
        this.timeValue[unit] = "00";
      }

      this.updateTimeUnit(unit);
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

    formatTimeUnit = (unit: TimePicker.TimeUnit) => {
      if (this.timeValue[unit].length === 1) {
        if (this.timeValue[unit] !== "0") {
          this.timeValue[unit] = "0" + this.timeValue[unit];
        }
      } else if (this.timeValue[unit].length > 2 && this.timeValue[unit][0] === "0") {
        const newValue = this.timeValue[unit].substring(1);
        const regexNoPreZeros = RegExp(ValidationRegex.noPrecedingZerosString);
        const noPrecedingZeros = regexNoPreZeros.test(newValue);
        if (noPrecedingZeros) {
          this.timeValue[unit] = newValue;
        }
      }
      this.requestUpdate();
    };

    messageType = (isValid: boolean) => {
      return isValid ? "" : "error";
    };

    generateTimeBox = (unit: TimePicker.TimeUnit) => {
      const unitProperties = timeUnitProps(this.finalTwentyFourFormat)[unit];

      return html`
        ${unit === TIME_UNIT.MINUTE || unit === TIME_UNIT.SECOND
          ? html` <span class="colon-separator">:</span> `
          : nothing}
        <md-input
          newMomentum
          select-when-in-focus
          exportparts="input:timepicker-part-input"
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
          .ariaLabel="${unit}-input"
          ariaInvalid="${!this.timeValidity[unit]}"
        ></md-input>
      `;
    };

    generateAmPmComboBox = () => {
      const options = ["AM", "PM"];
      return html`
        <md-combobox
          newMomentum
          select-when-in-focus
          class="amPm-combo-box"
          .options=${options}
          .value=${[this.timeValue[TIME_UNIT.AM_PM]]}
          .preventFilter=${true}
          is-dropdown-arrow
          no-clear-icon
          .inputValue=${this.timeValue[TIME_UNIT.AM_PM]}
          .ariaLabel=${this.timeValue[TIME_UNIT.AM_PM]}
          @change-selected="${(e: CustomEvent) => this.handleTimeChange(e, TIME_UNIT.AM_PM)}"
        >
        </md-combobox>
      `;
    };

    render() {
      return html`
        <div class="md-timepicker ${classMap(this.timePickerClassMap)}">
          <div class="time-inputs-wrapper">
            ${this.generateTimeBox(TIME_UNIT.HOUR)}
            ${this.timeSpecificity === TIME_UNIT.HOUR ? nothing : this.generateTimeBox(TIME_UNIT.MINUTE)}
            ${this.timeSpecificity === TIME_UNIT.MINUTE || this.timeSpecificity === TIME_UNIT.HOUR
              ? nothing
              : this.generateTimeBox(TIME_UNIT.SECOND)}
            ${this.finalTwentyFourFormat ? nothing : this.generateAmPmComboBox()}
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-timepicker": TimePicker.ELEMENT;
  }
}
