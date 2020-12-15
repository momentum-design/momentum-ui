import "@/index";
import { html } from "lit-element";
import "@/components/timepicker/TimePicker"

export const timePickerTemplate = html`
  <h2 class="sandbox-header">md-timepicker</h2>
  <h3>timepicker</h3>
  <md-timepicker></md-timepicker>

  <h3>timepicker 24-hour format</h3>
  <md-timepicker twenty-four-hour-format></md-timepicker>

  <h3>timepicker timeSpecificity: hour</h3>
  <md-timepicker timeSpecificity="hour"></md-timepicker>

  <h3>timepicker timeSpecificity: minute</h3>
  <md-timepicker timeSpecificity="minute"></md-timepicker>

  <h3>timepicker timeSpecificity: second</h3>
  <md-timepicker timeSpecificity="second"></md-timepicker>

  <h3>timepicker default value</h3>
  <md-timepicker value="02:16:00.000-08:00"></md-timepicker>
`;
