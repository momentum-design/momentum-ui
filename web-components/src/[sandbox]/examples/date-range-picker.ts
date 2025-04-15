import "@/components/datepicker/DatePicker";
import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import "@/index";
import { now } from "@/utils/dateUtils";
import { html } from "lit-element";
import { DateTime } from "luxon";

const minDate = now().minus({ day: 5 }).toISODate();

const maxDate = now().plus({ day: 5 }).toISODate();

export const DEFAULT_SEARCH_START_TIME = DateTime.local().minus({ days: 1 }).toMillis();
export const DEFAULT_SEARCH_END_TIME = DateTime.local().minus({ seconds: 1 }).toMillis();

const startDate = DateTime.fromMillis(DEFAULT_SEARCH_START_TIME).toISODate() ?? "";
const endDate = DateTime.fromMillis(DEFAULT_SEARCH_END_TIME).toISODate() ?? "";
const datePickerValue = `${startDate} - ${endDate}`;

export const dateRangePickerTemplate = html`
  <h2 class="sandbox-header">md-date-range-picker</h2>
  <h3>date range picker with user's system locale</h3>
  <md-date-range-picker .useISOFormat=${false}></md-date-range-picker>
  <h3>date range picker with "ru" locale</h3>
  <md-date-range-picker locale="ru" .useISOFormat=${false}></md-date-range-picker>
  <h3>date range picker with "en-US" locale</h3>
  <md-date-range-picker locale="en-US" .useISOFormat=${false}></md-date-range-picker>
  <h3>date range picker with min / max filters</h3>
  <md-date-range-picker value=${datePickerValue} minDate=${minDate} maxDate=${maxDate}></md-date-range-picker>
  <h3>date range picker with Monday start week start</h3>
  <md-date-range-picker value=${datePickerValue} weekStart="Monday"></md-date-range-picker>
  <h3>date range picker with initial value</h3>
  <md-date-range-picker weekStart="Monday" value=${datePickerValue}></md-date-range-picker>
  <h3>disabled datepicker</h3>
  <md-date-range-picker weekStart="Monday" value=${datePickerValue} disabled></md-date-range-picker>
  <h3>error date picker</h3>
  <md-date-range-picker newMomentum></md-date-range-picker>
  <h3>date range picker with accept and cancel buttons</h3>
  <md-date-range-picker
    .startDate=${"2025-04-10"}
    .endDate=${"2025-04-15"}
    .controlButtons=${{ apply: { value: "Apply" }, cancel: { value: "Cancel" } }}
    .shouldCloseOnSelect=${true}
    newMomentum
  ></md-date-range-picker>
`;
