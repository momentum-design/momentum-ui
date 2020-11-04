import "@/components/datepicker/datepicker-month/DatePickerMonth";
import { customElement, html, LitElement } from "lit-element";

export namespace DatePickerCalendar {}

@customElement("md-datepicker-calendar")
export class DatePickerCalendar extends LitElement {
  render() {
    return html`
      <md-datepicker-month></md-datepicker-month>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-calendar": DatePickerCalendar;
  }
}
