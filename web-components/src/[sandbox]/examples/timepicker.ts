import "@/index";
import { html } from "lit-element";
import "../../components/timepicker/TimePicker";

export const timePickerTemplate = html`
  <h2 class="sandbox-header">md-timepicker</h2>
  <h3>timepicker</h3>
  <md-timepicker></md-timepicker>

  <h3>timepicker 24-hour format</h3>
  <md-timepicker twentyFourHourFormat></md-timepicker>

  <h3>timepicker editableHourOnly</h3>
  <md-timepicker editableHourOnly></md-timepicker>
`;
