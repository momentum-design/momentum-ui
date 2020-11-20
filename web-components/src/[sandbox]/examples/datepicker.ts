import "@/components/datepicker/DatePicker";
import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import "@/index";
import { html } from "lit-element";

export const datePickerTemplate = html`
  <h2 class="sandbox-header">md-datepicker</h2>
  <h3>datepicker</h3>
  <md-datepicker></md-datepicker>
  <h3>datepicker with min / max filters</h3>
  <md-datepicker minDate="2020-11-15" maxDate="2020-11-27"></md-datepicker>
`;
