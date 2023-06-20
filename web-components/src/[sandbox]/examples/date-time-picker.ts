import "@/components/date-time-picker/DateTimePicker";
import { now } from "@/utils/dateUtils";
import { html } from "lit-element";

const minDate = now()
  .minus({ day: 5 })
  .toISODate();

const maxDate = now()
  .plus({ day: 5 })
  .toISODate();

export const dateTimePickerTemplate = html`
  <h2 class="sandbox-header">md-date-time-picker</h2>
  <h3>date-time-picker</h3>
  <md-date-time-picker></md-date-time-picker>
  <h3>date-time-picker with ru locale</h3>
  <md-date-time-picker locale="ru"></md-date-time-picker>
  <h3>date-time-picker with minDate & maxDate</h3>
  <md-date-time-picker minDate=${minDate} maxDate=${maxDate}></md-date-time-picker>
  <h3>date-time-picker with dateValue & timeValue</h3>
  <md-date-time-picker date-value="2021-01-31" time-value="08:20:00-08:00"></md-date-time-picker>
  <h3>date-time-picker with value</h3>
  <md-date-time-picker
    value="2021-02-14T12:00:00-08:00"
  ></md-date-time-picker>
  <h3>disabled date-time-picker</h3>
  <md-date-time-picker value="2021-02-14T12:00:00-08:00" disabled></md-date-time-picker>
`;
