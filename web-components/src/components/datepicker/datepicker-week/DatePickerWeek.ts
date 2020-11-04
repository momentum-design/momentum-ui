import "@/components/datepicker/datepicker-day/DatePickerDay";
import { customElement, html, LitElement } from "lit-element";

export namespace DatePickerWeek {}

@customElement("md-datepicker-week")
export class DatePickerWeek extends LitElement {
  render() {
    return html`
      <md-datepicker-day></md-datepicker-day>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-week": DatePickerWeek;
  }
}
