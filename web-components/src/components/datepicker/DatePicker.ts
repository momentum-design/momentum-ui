import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import { customElement, html, LitElement } from "lit-element";

export namespace DatePicker {}

@customElement("md-datepicker")
export class DatePicker extends LitElement {
  render() {
    return html`
      <md-datepicker-calendar></md-datepicker-calendar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker": DatePicker;
  }
}
