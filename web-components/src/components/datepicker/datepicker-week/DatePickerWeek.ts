import "@/components/datepicker/datepicker-day/DatePickerDay";
import { addDays, addMonths, DayFilters, getStartOfWeek, isSameMonth, now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import { DateTime } from "luxon";
import styles from "../scss/module.scss";
export namespace DatePickerWeek {}

@customElement("md-datepicker-week")
export class DatePickerWeek extends LitElement {
  @property({ attribute: false }) day: DateTime = now(); // provided from upper component scope
  @property({ attribute: false }) month: number = now().month; // provided from upper component scope
  @property({ attribute: false }) filterParams: DayFilters | null = null; // Needed at the day level to set styles correctly
  @property({ attribute: false }) datePickerProps: Record<string, any> | undefined = undefined; // Needed at the day level to set styles correctly

  // "otherprops" need to send to datepicker-day: { selected, focus, day, month }
  // selected flags if it is currently selected
  // focused flags if it is currently focused
  // day helps determine . . . what? the provided date?
  // Month is neeeded for changing styles of prev/next month dates: "--outside-month"

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
  }

  renderDays = () => {
    const startOfWeek = this.day && getStartOfWeek(this.day);
    const month = this.month;
    const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
      let offsetDay = addDays(startOfWeek, offset);
      if (!isSameMonth(startOfWeek, offsetDay)) {
        offsetDay = addMonths(offsetDay, 1);
      }
      console.log(month);
      return html`
        <md-datepicker-day
          .month=${month}
          .day=${offsetDay}
          .filterParams=${this.filterParams}
          .datePickerProps=${this.datePickerProps}
        ></md-datepicker-day>
      `;
    });

    return days;
  };

  static get styles() {
    return [reset, styles];
  }

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
