import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import "@/index";
import { html } from "lit-element";

export const datePickerTemplate = html`
  <h2 class="sandbox-header">md-datepicker</h2>
  <h3>calendar</h3>
  <md-datepicker-calendar></md-datepicker-calendar>
  <h3>month</h3>
  <md-datepicker-month></md-datepicker-month>
  <h3>week</h3>
  <md-datepicker-week></md-datepicker-week>
  <h3>day</h3>
  <md-datepicker-day></md-datepicker-day>
  <h3>disabled day</h3>
  <md-datepicker-day disabled></md-datepicker-day>
  <h3>selected day</h3>
  <md-datepicker-day selected></md-datepicker-day>
  <h3>focused day</h3>
  <md-datepicker-day focused></md-datepicker-day>
`;
