import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { now, reformatISODateString } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { TIME_UNIT } from "../../constants"; // Keep type import as a relative path
import { DatePicker, type DatePickerControlButtons } from "../datepicker/DatePicker";
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
    @property({ type: String, attribute: "time-value" }) timeValue: string | null = "00:00:00-08:00"; // ISO FORMAT - TODO why?
    @property({ type: String, reflect: true }) value: string | undefined = undefined;

    @property({ type: String }) locale: string | undefined = undefined;
    @property({ type: Boolean }) useISOFormat = true;
    @property({ type: Boolean }) disabled = false;

    @property({ type: Object, attribute: false }) controlButtons?: DatePickerControlButtons = undefined;

    @internalProperty()
    private fullDateTime: DateTime | undefined = undefined;

    @internalProperty()
    private selectedTimeObject: DateTime | undefined = undefined;

    @internalProperty()
    private selectedDateObject: DateTime = now();

    firstCycle = true;

    @query("md-datepicker") datePicker!: DatePicker.ELEMENT;
    @query("md-timepicker") timePicker!: TimePicker.ELEMENT;

    protected async firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      if (!this.value) {
        const dateString = this.selectedDateObject?.toISODate();
        this.combineDateAndTimeValues(dateString, this.timeValue);
      }

      await this.updateComplete;
      this.addEventListeners();
    }

    private addEventListeners() {
      if (this.datePicker) {
        this.datePicker.addEventListener("date-selection-change", this.handleDateChange);
        this.datePicker.addEventListener("date-input-change", this.handleDateTimeInputChange as EventListener);
      }
      if (this.timePicker) {
        this.timePicker.addEventListener("time-selection-change", this.handleTimeChange);
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("value")) {
        if (this.value) {
          this.parseValueForVisuals(this.value);
        }
        if (!this.firstCycle) {
          this.updateDateTimeObject();
        } else {
          this.firstCycle = false;
        }
      }

      if (
        this.dateValue &&
        this.timeValue &&
        !this.controlButtons?.apply &&
        (changedProperties.has("timeValue") || changedProperties.has("dateValue"))
      ) {
        this.combineDateAndTimeValues(this.dateValue, this.timeValue);
      }

      if (this.value && changedProperties.has("locale")) {
        this.fullDateTime = DateTime.fromISO(this.value, { locale: this.locale });
      }
    }

    handleDateChange = (event: any) => {
      this.selectedDateObject = event?.detail?.data as DateTime;
      this.dateValue = this.selectedDateObject?.toISODate();
      this.combineDateAndTimeValues(this.dateValue, this.timeValue);
    };

    handleTimeChange = (event: any) => {
      this.selectedTimeObject = event?.detail?.data as DateTime;
      this.timeValue = this.selectedTimeObject?.startOf("second").toISOTime({ suppressMilliseconds: true });

      if (!this.controlButtons?.apply) {
        this.combineDateAndTimeValues(this.dateValue, this.timeValue);
      }
    };

    handleDateTimeInputChange = (event: CustomEvent) => {
      this.value = reformatISODateString(event?.detail?.value);
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
          this.value = reformatISODateString(`${dateString}T${timeString}`);
        } else {
          this.value = reformatISODateString(dateString);
        }
      }
    };

    disconnectedCallback(): void {
      if (this.datePicker) {
        this.datePicker.removeEventListener("date-selection-change", this.handleDateChange);
        this.datePicker.removeEventListener("date-input-change", this.handleDateTimeInputChange as EventListener);
      }
      if (this.timePicker) {
        this.timePicker.removeEventListener("time-selection-change", this.handleTimeChange);
      }
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <md-datepicker
          includes-time
          ?disabled=${this.disabled}
          ariaLabel=${ifDefined(this.ariaLabel || undefined)}
          minDate=${ifDefined(this.minDate)}
          maxDate=${ifDefined(this.maxDate)}
          value=${ifDefined(this.value)}
          weekStart=${this.weekStart}
          placeholder="YYYY-MM-DDTHH:MM:SS-HH:MM"
          locale=${ifDefined(this.locale)}
          .controlButtons=${this.controlButtons}
          .shouldCloseOnSelect=${this.shouldCloseOnSelect}>
          <div slot="time-picker" class="included-timepicker-wrapper">
            <div class="time-picker-separator"></div>
            <md-timepicker
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
