import "@/components/datepicker/DatePicker";
import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/datepicker/datepicker-day/DatePickerDay";
import "@/components/datepicker/datepicker-month/DatePickerMonth";
import "@/components/datepicker/datepicker-week/DatePickerWeek";
import { now } from "@/utils/dateUtils";
import { html } from "lit-element";

const minDate = now()
  .minus({ day: 5 })
  .toISODate();

const maxDate = now()
  .plus({ day: 5 })
  .toISODate();

export const datePickerTemplate = html`
  <h2 class="sandbox-header">md-datepicker</h2>
  <h3>datepicker with custom trigger</h3>
  <md-datepicker custom-trigger>
    <md-button slot="date-trigger" variant="primary">Date Trigger</md-button>
  </md-datepicker>
  <h3>datepicker with different locale</h3>
  <md-datepicker locale="ru"></md-datepicker>
  <h3>datepicker with min / max filters</h3>
  <md-datepicker minDate=${minDate} maxDate=${maxDate}></md-datepicker>
  <h3>datepicker with Monday start week start</h3>
  <md-datepicker weekStart="Monday"></md-datepicker>
  <h3>datepicker with initial value</h3>
  <md-datepicker weekStart="Monday" value="2021-01-31"></md-datepicker>
  <h3>disabled datepicker</h3>
  <md-datepicker weekStart="Monday" value="2021-01-31" disabled></md-datepicker>
  <h3>Call Date</h3>
  <md-datepicker ariaLabel="Call Date" weekStart="Monday" value="2021-01-31"></md-datepicker>
`;
