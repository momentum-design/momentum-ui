import "@/components/date-time-picker/DateTimePicker";
import "@/index";
import { now } from "@/utils/dateUtils";
import { html } from "lit-element";

const minDate = now()
  .minus({ day: 5 })
  .toSQLDate();

const maxDate = now()
  .plus({ day: 5 })
  .toSQLDate();

export const dateTimePickerTemplate = html`
  <h2 class="sandbox-header">md-date-time-picker</h2>
  <h3>date-time-picker</h3>
  <md-date-time-picker></md-date-time-picker>
`;
