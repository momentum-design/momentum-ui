import "@/components/datepicker/datepicker-week/DatePickerWeek";
import { customElement, html, LitElement } from "lit-element";

export namespace DatePickerMonth {}

@customElement("md-datepicker-month")
export class DatePickerMonth extends LitElement {
  render() {
    return html`
      <md-datepicker-week></md-datepicker-week>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-month": DatePickerMonth;
  }
}
