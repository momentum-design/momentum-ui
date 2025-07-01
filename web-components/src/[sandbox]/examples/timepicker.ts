import "@/components/timepicker/TimePicker";
import "@/index";
import { html } from "lit-element";
import { DateTime } from "luxon";

export const timePickerTemplate = html`
  <h3>Default</h3>
  <md-timepicker></md-timepicker>

  <h3>Locate</h3>
  <md-timepicker locale="ru"></md-timepicker>

  <h3>24-Hour Format</h3>
  <md-timepicker twenty-four-hour-format></md-timepicker>

  <h3>Time Specificity Hour</h3>
  <md-timepicker timeSpecificity="hour"></md-timepicker>

  <h3>Time Specificity Minute</h3>
  <md-timepicker timeSpecificity="minute"></md-timepicker>

  <h3>Time Specificity Second</h3>
  <md-timepicker timeSpecificity="second"></md-timepicker>

  <h3>Default Value</h3>
  <md-timepicker value="02:16:00.000-08:00"></md-timepicker>

  <h3>Default Value PM value</h3>
  <md-timepicker value=${`23:59:59${DateTime.local().toFormat("ZZ")}`}></md-timepicker>
`;
