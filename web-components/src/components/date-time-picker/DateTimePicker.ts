import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { TIME_UNIT } from "@/constants";
import { now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { DatePicker } from "../datepicker/DatePicker";
import { TimePicker } from "../timepicker/TimePicker";
import styles from "./scss/module.scss";

export namespace DateTimePicker {
  export const weekStartDays = ["Sunday", "Monday"];

  @customElementWithCheck("md-date-time-picker")
  export class ELEMENT extends LitElement {
    @property({ type: String }) maxDate: string | undefined = undefined;
    @property({ type: String }) minDate: string | undefined = undefined;
    @property({ type: String }) weekStart: typeof weekStartDays[number] = "Sunday";
    @property({ type: String }) dateValue: string | undefined = undefined;

    @property({ type: Boolean, attribute: "two-digit-auto-tab" }) twoDigitAutoTab = false;
    @property({ type: Boolean, attribute: "twenty-four-hour-format" }) twentyFourHourFormat = false;
    @property({ type: String }) timeSpecificity: TimePicker.TimeSpecificity = TIME_UNIT.SECOND;
    @property({ type: String }) timeValue = "00:00:00.000-08:00"; // ISO FORMAT

    @property({ type: String, reflect: true }) value: string | undefined = undefined;
    @property({ type: String }) locale = "en-US";

    @internalProperty() fullDateTime: DateTime | null = null;
    @internalProperty() selectedTimeObject: DateTime | undefined = undefined;
    @internalProperty() selectedDateObject: DateTime = now();

    @query("md-datepicker") datePicker!: DatePicker.ELEMENT;
    @query("md-timepicker") timePicker!: TimePicker.ELEMENT;

    handleDateChange = (event: any) => {
      this.selectedDateObject = event?.detail?.data as DateTime;
      this.dateValue = this.selectedDateObject?.toISODate();
    };

    handleTimeChange = (event: any) => {
      this.selectedTimeObject = event?.detail?.data as DateTime;
      this.timeValue = this.selectedTimeObject?.toISOTime();
    };

    protected async firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.dateValue = this.selectedDateObject?.toISODate();
      this.selectedTimeObject = DateTime.fromISO(this.timeValue);
      this.timeValue = this.selectedTimeObject.toISOTime();

      await new Promise(resolve => setTimeout(resolve, 0));

      if (this.datePicker) {
        this.datePicker.addEventListener("date-selection-change", this.handleDateChange);
      }
      if (this.timePicker) {
        this.timePicker.addEventListener("time-selection-change", this.handleTimeChange);
      }
    }

    updateDateTime = () => {
      this.value = `${this.dateValue}T${this.timeValue}`;
      this.fullDateTime = DateTime.fromISO(this.value, { locale: this.locale });

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

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (
        this.dateValue &&
        this.timeValue &&
        (changedProperties.has("timeValue") || changedProperties.has("dateValue"))
      ) {
        this.updateDateTime();
      }

      if (this.value && changedProperties.has("value")) {
        this.dateValue = this.value.split("T")[0];
        this.timeValue = this.value.split("T")[1];
        this.updateDateTime();
      }

      if (this.value && changedProperties.has("locale")) {
        this.fullDateTime = DateTime.fromISO(this.value, { locale: this.locale });
      }
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <md-datepicker
          minDate=${ifDefined(this.minDate)}
          maxDate=${ifDefined(this.maxDate)}
          value=${ifDefined(this.dateValue)}
          placeholder=${ifDefined(this.fullDateTime?.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS))}
          weekStart=${this.weekStart}
          locale=${ifDefined(this.locale)}>
          <div slot="time-picker" class="included-timepicker-wrapper">
            <md-timepicker
              ?two-digit-auto-tab=${this.twoDigitAutoTab}
              ?twenty-four-hour-format=${this.twentyFourHourFormat}
              timeSpecificity=${this.timeSpecificity}
              locale=${this.locale}
              value=${this.timeValue}>
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
