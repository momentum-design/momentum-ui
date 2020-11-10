import "@/components/datepicker/datepicker-week/DatePickerWeek";
import { addWeeks, getMonth, getStartOfMonth, getStartOfWeek, isSameMonth, now } from "@/utils/dateUtils";
import { customElement, html, LitElement, property } from "lit-element";
import { DateTime } from "luxon";

export namespace DatePickerMonth {}

@customElement("md-datepicker-month")
export class DatePickerMonth extends LitElement {
  @property({ attribute: false }) day: DateTime = now(); // provided from upper component scope

  renderWeeks = () => {
    let currentWeekStart = getStartOfWeek(getStartOfMonth(this.day));

    const weeks = [];
    const month = getMonth(this.day);

    do {
      weeks.push(
        html`
          <md-datepicker-week .day=${currentWeekStart} month=${month}></md-datepicker-week>
        `
      );
      currentWeekStart = addWeeks(currentWeekStart, 1);
    } while (isSameMonth(currentWeekStart, this.day));

    return weeks;
  };

  render() {
    return html`
      <div class="md-datepicker__month">
        ${this.renderWeeks()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-month": DatePickerMonth;
  }
}
