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
  <h3>datepicker with different locale</h3>
  <md-date-range-picker locale="ru"></md-date-range-picker>
  <h3>datepicker with min / max filters</h3>
  <md-date-range-picker value=${datePickerValue} minDate=${minDate} maxDate=${maxDate}></md-date-range-picker>
  <h3>datepicker with Monday start week start</h3>
  <md-date-range-picker value=${datePickerValue} weekStart="Monday"></md-date-range-picker>
  <h3>datepicker with initial value</h3>
  <md-date-range-picker weekStart="Monday" value=${datePickerValue}></md-date-range-picker>
  <h3>disabled datepicker</h3>
  <md-date-range-picker weekStart="Monday" value=${datePickerValue} disabled></md-date-range-picker>
  <h3>error date picker</h3>
  <md-date-range-picker newMomentum></md-date-range-picker>
  <h3>date range picker with accept and cancel buttons</h3>
  <md-date-range-picker
    .controlButtons=${{ accept: { value: "Accept" }, cancel: { value: "Cancel" } }}
    .shouldCloseOnSelect=${true}
    value=${datePickerValue}
    newMomentum
  ></md-date-range-picker>
`;
