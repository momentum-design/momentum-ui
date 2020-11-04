import "@/components/button/Button";
import { customElement, html, LitElement } from "lit-element";

export namespace DatePickerDay {}

@customElement("md-datepicker-day")
export class DatePickerDay extends LitElement {
  render() {
    return html`
      <md-button>10</md-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-day": DatePickerDay;
  }
}
