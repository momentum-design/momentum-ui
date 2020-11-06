import "@/components/datepicker/datepicker-day/DatePickerDay";
import { addDays, getStartOfWeek, now } from "@/utils/dateUtils";
import { customElement, html, LitElement, property } from "lit-element";
import { DateTime } from "luxon";

export namespace DatePickerWeek {}

@customElement("md-datepicker-week")
export class DatePickerWeek extends LitElement {
  @property({ attribute: false }) day: DateTime = now(); // provided from upper component scope
  @property({ type: Number }) month: number = now().month; // provided from upper component scope
  @property({ type: Boolean }) selected = false; // not sure, seems moment related?
  // "otherprops" need to send to datepicker-day: { selected, focus, day, month }

  renderDays = () => {
    const startOfWeek = getStartOfWeek(this.day);

    const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const offsetDay = addDays(startOfWeek, offset);
      return html`
        <md-datepicker-day .day=${offsetDay}> </md-datepicker-day>
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
