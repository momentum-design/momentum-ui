import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { TIME_UNIT } from "../../constants"; // Keep type import as a relative path
import { DatePicker, type DatePickerControlButtons } from "../datepicker/DatePicker";
import { StrategyType } from "../popover/Popover.types";
import { TimePicker } from "../timepicker/TimePicker";
import styles from "./scss/module.scss";

export namespace DateTimePicker {
  export const weekStartDays = ["Sunday", "Monday"];

  @customElementWithCheck("md-date-time-picker")
  export class ELEMENT extends LitElement {
    @property({ type: String }) maxDate: string | undefined = undefined;
    @property({ type: String }) minDate: string | undefined = undefined;
    @property({ type: String }) weekStart: (typeof weekStartDays)[number] = "Sunday";
    @property({ type: String }) ariaLabel = "";

    @property({ type: Boolean, attribute: "two-digit-auto-tab" }) twoDigitAutoTab = false;
    @property({ type: Boolean, attribute: "should-close-on-select" }) shouldCloseOnSelect = false;
    @property({ type: Boolean, attribute: "twenty-four-hour-format" }) twentyFourHourFormat = false;
    @property({ type: String }) timeSpecificity: TimePicker.TimeSpecificity = TIME_UNIT.SECOND;

    @property({ type: String, attribute: "date-value" }) dateValue: string | undefined | null = undefined;
    @property({ type: String, attribute: "time-value" }) timeValue: string | null = "00:00:00-08:00"; // ISO FORMAT
    @property({ type: String, reflect: true }) value: string | undefined = undefined;
    @property({ type: Boolean, attribute: "disable-date-validation" }) disableDateValidation = false;

    @property({ type: String })
    locale: string | undefined = undefined;

    @property({ type: String, attribute: "placeholder" })
    placeholder: string | undefined = undefined;

    @property({ type: Boolean })
    useISOFormat = true;

    @property({ type: Boolean })
    disabled = false;

    @property({ type: String, attribute: "positioning-strategy" })
    positioningStrategy?: StrategyType = undefined;

    @property({ type: Boolean, attribute: "show-default-now-date" })
    showDefaultNowDate = true;

    @property({ type: Boolean, attribute: "compact-input" })
    compactInput?: boolean = undefined;

    @property({ type: Object, attribute: false }) controlButtons?: DatePickerControlButtons = undefined;

    @internalProperty()
    private fullDateTime: DateTime | undefined = undefined;

    @internalProperty()
    private selectedTimeObject: DateTime | undefined = undefined;

    @internalProperty()
    private selectedDateObject: DateTime = now();

    @query("md-datepicker") datePicker!: DatePicker.ELEMENT;
    @query("md-timepicker") timePicker!: TimePicker.ELEMENT;

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      if (!this.value && this.showDefaultNowDate) {
        const dateString = this.selectedDateObject?.toISODate();
        this.combineDateAndTimeValues(dateString, this.timeValue);
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("value")) {
        if (this.value) {
          this.parseValueForVisuals(this.value);
        }
        this.updateDateTimeObject();
      }

      if (
        this.dateValue &&
        this.timeValue &&
        !this.controlButtons?.apply &&
        (changedProperties.has("dateValue") || changedProperties.has("timeValue"))
      ) {
        this.combineDateAndTimeValues(this.dateValue, this.timeValue);
      }

      if (this.value && changedProperties.has("locale")) {
        this.fullDateTime = DateTime.fromISO(this.value, { locale: this.locale });
      }
    }

    handleDateChange = (event: CustomEvent) => {
      this.selectedDateObject = event?.detail?.data as DateTime;
      this.dateValue = this.selectedDateObject?.toISODate();
      this.combineDateAndTimeValues(this.dateValue, this.timeValue);
    };

    handleTimeChange = (event: CustomEvent) => {
      this.selectedTimeObject = event?.detail?.data as DateTime;
      this.timeValue = this.selectedTimeObject?.startOf("second").toISOTime({ suppressMilliseconds: true });

      if (!this.controlButtons?.apply) {
        this.combineDateAndTimeValues(this.dateValue, this.timeValue);
      }
    };

    handleDateTimeInputChange = (event: CustomEvent) => {
      this.value = event?.detail?.value;
    };

    parseValueForVisuals = (value: string) => {
      if (value) {
        this.dateValue = value.split("T")[0];
        this.timeValue = value.split("T")[1];
      }
    };

    updateDateTimeObject = () => {
      if (this.value) {
        this.fullDateTime = DateTime.fromISO(this.value, { locale: this.locale });
      } else {
        this.fullDateTime = DateTime.fromISO("", { locale: this.locale });
      }

      this.dispatchEvent(
        new CustomEvent(`date-time-change`, {
          bubbles: true,
          composed: true,
          detail: {
            dateTimeString: this.value,
            dateTime: this.fullDateTime,
            locale: this.locale,
            twentyFourHourFormat: this.twentyFourHourFormat
          }
        })
      );
    };

    combineDateAndTimeValues = (dateString: string | undefined | null, timeString: string | null) => {
      if (dateString) {
        if (timeString) {
          this.value = `${dateString}T${timeString}`;
        } else {
          this.value = dateString;
        }
      }
    };

    private get placeholderValue() {
      if (this.placeholder) {
        return this.placeholder;
      }

      //ISO format placeholder
      return "YYYY-MM-DDTHH:MM:SS-HH:MM";
    }

    static get styles() {
      return [reset, styles];
    }

    private get displayValue(): string | undefined {
      if (!this.useISOFormat && this.fullDateTime) {
        return this.fullDateTime.toLocaleString(DateTime.DATETIME_MED, { locale: this.locale });
      }
      return undefined;
    }

    render() {
      return html`
        <md-datepicker
          includes-time
          ?disabled=${this.disabled}
          ariaLabel=${ifDefined(this.ariaLabel || undefined)}
          .positioningStrategy=${this.positioningStrategy}
          minDate=${ifDefined(this.minDate)}
          maxDate=${ifDefined(this.maxDate)}
          value=${ifDefined(this.value)}
          displayValue=${ifDefined(this.displayValue)}
          .allowUserTextInput=${!this.useISOFormat}
          .showDefaultNowDate=${this.showDefaultNowDate}
          weekStart=${this.weekStart}
          placeholder=${this.placeholderValue}
          locale=${ifDefined(this.locale)}
          .controlButtons=${this.controlButtons}
          .shouldCloseOnSelect=${this.shouldCloseOnSelect}
          @date-selection-change=${this.handleDateChange}
          @date-input-change=${this.handleDateTimeInputChange as EventListener}
          .validateDate=${!this.disableDateValidation && !this.useISOFormat}
          ?compact-input=${this.compactInput}
          >
          <div slot="time-picker" class="included-timepicker-wrapper">
            <div class="time-picker-separator"></div>
            <md-timepicker
              @time-selection-change=${this.handleTimeChange}
              ?two-digit-auto-tab=${this.twoDigitAutoTab}
              ?twenty-four-hour-format=${this.twentyFourHourFormat}
              timeSpecificity=${this.timeSpecificity}
              locale=${ifDefined(this.locale)}
              value=${ifDefined(this.timeValue ?? undefined)}>
            </md-timepicker>
          </div>
        </md-datepicker>
      </div>
    `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-date-time-picker": DateTimePicker.ELEMENT;
  }
}
