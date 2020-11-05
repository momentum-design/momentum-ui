import "@/components/datepicker/datepicker-day/DatePickerDay";
import { addDays, getStartOfWeek } from "@/utils/dateUtils";
import { customElement, html, LitElement, property } from "lit-element";
import DateTime from "luxon/src/datetime.js";

export namespace DatePickerWeek {}

@customElement("md-datepicker-week")
export class DatePickerWeek extends LitElement {
  @property() day: DateTime | undefined = undefined; // provided from upper component scope

  // "otherprops" need to send to datepicker-day: { selected, focus, day, month }

  renderDays = () => {
    const startOfWeek = getStartOfWeek(this.day.clone());

    const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const offsetDay = addDays(startOfWeek.clone(), offset);
      return html`
        <md-datepicker-day day=${offsetDay}> </md-datepicker-day>
      `;
    });

    return days;
  };

  render() {
    return html`
      <div class="md-datepicker__week">
        ${this.renderDays()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-week": DatePickerWeek;
  }
}
