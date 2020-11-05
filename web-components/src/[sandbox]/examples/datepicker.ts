import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import { html } from "lit-element";

export const datePickerTemplate = html`
  <h2 class="sandbox-header">md-datepicker</h2>
  <md-datepicker-calendar></md-datepicker-calendar>
  <md-datepicker-month></md-datepicker-month>
  <md-datepicker-week></md-datepicker-week>
  <md-datepicker-day></md-datepicker-day>
`;
