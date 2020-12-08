import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { now } from "@/utils/dateUtils";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { DateTime } from "luxon";
import { ifDefined } from "lit-html/directives/if-defined";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { DatePicker } from "../datepicker/DatePicker";
import { TimePicker } from "../timepicker/TimePicker";
import { TIME_UNIT } from "@/constants";

export namespace DateTimePicker {}
export const weekStartDays = ["Sunday", "Monday"];
@customElement("md-date-time-picker")

export class DateTimePicker extends LitElement {
  @property({ type: String }) maxDate: string | undefined = undefined;
  @property({ type: String }) minDate: string | undefined = undefined;
  @property({ type: String, reflect: true }) value: string | undefined = undefined;
  // @property({ type: String }) weekStart: typeof weekStartDays[number] = "Sunday";
  @property({ type: String }) locale: string | undefined = undefined;

  @property({ type: Boolean }) twentyFourHourFormat = true;

  @internalProperty() selectedDate: DateTime = now();
  @internalProperty() focusedDate: DateTime = now();
  @internalProperty() filterDate: Function | undefined = undefined;
  @internalProperty() maxDateData: DateTime | undefined = undefined;
  @internalProperty() minDateData: DateTime | undefined = undefined;

  @internalProperty() fullDateTime: DateTime | null = null;
  @internalProperty() dateData: DateTime | null = null;
  @internalProperty() private timeValues = {
    [TIME_UNIT.HOUR]: "12",
    [TIME_UNIT.MINUTE]: "00",
    [TIME_UNIT.SECOND]: "00",
    [TIME_UNIT.AM_PM]: "AM"
  }

  @internalProperty() timeStringValue = "";
  @internalProperty() dateStringValue = "";

  @query("md-datepicker") datePicker!: DatePicker;
  @query("md-timepicker") timePicker!: TimePicker;

  handleDateChange = (event: any) => {
    const dateData = event?.detail?.data as DateTime;
    console.log('[log][dateTime]: handleDateChange', dateData.toSQLDate());

    this.dateData = dateData;
    this.dateStringValue = dateData.toSQLDate();
  }

  handleTimeChange = (event: any) => {
    console.log('[log][dateTime]: handleTimeChange', event?.detail?.time, event?.detail?.timeValues);
    this.timeStringValue = event?.detail?.time;
    this.timeValues = event?.detail?.timeValues;
    this.requestUpdate();
  }

  protected async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    await new Promise(resolve => setTimeout(resolve, 0));

    if (this.datePicker) {
      this.datePicker.addEventListener("date-selection-change", this.handleDateChange);
    }
    if (this.timePicker) {
      this.timePicker.addEventListener("time-selection-change", this.handleTimeChange);
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (this.dateStringValue && this.timeStringValue && (changedProperties.has('timeStringValue') || changedProperties.has('dateStringValue'))) {
      this.value = `${this.dateStringValue} ${this.timeStringValue}`;
      this.fullDateTime = DateTime.fromSQL(this.value);
      console.log('[log][dateTime]: fullDateTime', this.value, this.fullDateTime);

      this.dispatchEvent(
        new CustomEvent(`date-time-change`, {
          bubbles: true,
          composed: true,
          detail: {
            dateTimeString: this.value,
            dateTime: this.fullDateTime,
            twentyFourHourFormat: this.twentyFourHourFormat
          }
        })
      );
    }
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
        <md-datepicker minDate=${ifDefined(this.minDate)} maxDate=${ifDefined(this.maxDate)}>
          <div slot="time-picker" class="included-timepicker-wrapper">
            <md-timepicker ?twentyfourhourformat=${this.twentyFourHourFormat}></md-timepicker>
          </div>
        </md-datepicker>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-date-time-picker": DateTimePicker;
  }
}
