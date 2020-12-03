import "@/components/datepicker/DatePicker";
import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import "@/index";
import { now } from "@/utils/dateUtils";
import { html } from "lit-element";

const minDate = now()
  .minus({ day: 5 })
  .toSQLDate();

const maxDate = now()
  .plus({ day: 5 })
  .toSQLDate();

export const datePickerTemplate = html`
  <h2 class="sandbox-header">md-datepicker</h2>
  <h3>datepicker</h3>
  <md-datepicker></md-datepicker>
  <h3>datepicker with min / max filters</h3>
  <md-datepicker minDate=${minDate} maxDate=${maxDate}></md-datepicker>
  <h3>datepicker with Monday start week start</h3>
  <md-datepicker weekStart="Monday"></md-datepicker>
`;
