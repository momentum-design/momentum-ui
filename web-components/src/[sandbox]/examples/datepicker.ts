import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import "@/index";
import { html } from "lit-element";

export const datePickerTemplate = html`
  <h2 class="sandbox-header">md-datepicker</h2>
  <md-datepicker-calendar></md-datepicker-calendar>
  <md-datepicker-month></md-datepicker-month>
  <md-datepicker-week></md-datepicker-week>
  <md-datepicker-day>test</md-datepicker-day>
`;
