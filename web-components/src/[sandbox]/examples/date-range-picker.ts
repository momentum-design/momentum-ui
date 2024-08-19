import "@/components/datepicker/DatePicker";
import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import "@/index";
import { now } from "@/utils/dateUtils";
import { html } from "lit-element";

const minDate = now().minus({ day: 5 }).toISODate();

const maxDate = now().plus({ day: 5 }).toISODate();

export const dateRangePickerTemplate = html`
  <h2 class="sandbox-header">md-datepicker</h2>
  <h3>datepicker with different locale</h3>
  <md-date-range-picker locale="ru"></md-date-range-picker>
  <h3>datepicker with min / max filters</h3>
  <md-date-range-picker minDate=${minDate} maxDate=${maxDate}></md-date-range-picker>
  <h3>datepicker with Monday start week start</h3>
  <md-date-range-picker weekStart="Monday"></md-date-range-picker>
  <h3>datepicker with initial value</h3>
  <md-date-range-picker weekStart="Monday" value="2021-01-31"></md-date-range-picker>
  <h3>disabled datepicker</h3>
  <md-date-range-picker weekStart="Monday" value="2021-01-31" disabled></md-date-range-picker>
`;
