import "@/components/datepicker/DatePicker";
import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import "@/index";
import { now } from "@/utils/dateUtils";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { DateTime } from "luxon";

const minDate = now().minus({ day: 5 }).toISODate();
const maxDate = now().plus({ day: 5 }).toISODate();

export const DEFAULT_SEARCH_START_TIME = DateTime.local().minus({ days: 1 }).toMillis();
export const DEFAULT_SEARCH_END_TIME = DateTime.local().minus({ seconds: 1 }).toMillis();

@customElement("date-range-picker-example")
export class DateRangePickerExample extends LitElement {
  @property({ type: String }) startDate = DateTime.fromMillis(DEFAULT_SEARCH_START_TIME).toISODate() ?? "";
  @property({ type: String }) endDate = DateTime.fromMillis(DEFAULT_SEARCH_END_TIME).toISODate() ?? "";
  @property({ type: String }) datePickerValue = `${this.startDate} - ${this.endDate}`;

  private randomiseDates() {
    const randomDaysBack = Math.floor(Math.random() * 10) + 1; // Random 1-10 days back
    const randomDaysForward = Math.floor(Math.random() * 10) + 1; // Random 1-10 days forward

    const newStartDate = DateTime.local().minus({ days: randomDaysBack }).toISODate();
    const newEndDate = DateTime.local().plus({ days: randomDaysForward }).toISODate();

    this.startDate = newStartDate;
    this.endDate = newEndDate;
    this.datePickerValue = `${this.startDate} - ${this.endDate}`;
  }

  render() {
    return html`
      <h2 class="sandbox-header">md-date-range-picker</h2>
      <h3>date range picker with user's system locale</h3>
      <md-date-range-picker .useISOFormat=${false}></md-date-range-picker>
      <h3>date range picker with "ru" locale</h3>
      <md-date-range-picker locale="ru" .useISOFormat=${false}></md-date-range-picker>
      <h3>date range picker with "en-US" locale</h3>
      <md-date-range-picker locale="en-US" .useISOFormat=${false}></md-date-range-picker>
      <h3>date range picker with min / max filters</h3>
      <md-date-range-picker value=${this.datePickerValue} minDate=${minDate} maxDate=${maxDate}></md-date-range-picker>
      <h3>date range picker with Monday start week start</h3>
      <md-date-range-picker value=${this.datePickerValue} weekStart="Monday"></md-date-range-picker>
      <h3>date range picker with initial value</h3>
      <md-date-range-picker weekStart="Monday" value=${this.datePickerValue}></md-date-range-picker>
      <h3>disabled datepicker</h3>
      <md-date-range-picker weekStart="Monday" value=${this.datePickerValue} disabled></md-date-range-picker>
      <h3>error date picker</h3>
      <md-date-range-picker newMomentum></md-date-range-picker>
      <h3>date picker with custom ariaLabel</h3>
      <md-date-range-picker
        .ariaLabel=${`Custom aria label. Currently selected range is ${this.startDate} to ${this.endDate}`}
        .startDate=${this.startDate}
        .endDate=${this.endDate}>
      </md-date-range-picker>
      <h3>date range picker with accept and cancel buttons</h3>
      <md-date-range-picker
        .startDate=${this.startDate}
        .endDate=${this.endDate}
        .useISOFormat=${false}
        .controlButtons=${{ apply: { value: "Apply" }, cancel: { value: "Cancel" } }}
        .shouldCloseOnSelect=${true}
        newMomentum
      ></md-date-range-picker>
      <md-button variant="primary" @click=${this.randomiseDates}>Change Dates Randomly</md-button>
    `;
  }
}

export const dateRangePickerTemplate = html`<date-range-picker-example></date-range-picker-example>`;
