import "@/components/datepicker/datepicker-day/DatePickerDay";
import { addDays, DayFilters, getStartOfWeek, now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import { DateTime } from "luxon";
import styles from "../scss/module.scss";
export namespace DatePickerWeek {}

@customElement("md-datepicker-week")
export class DatePickerWeek extends LitElement {
  @property({ attribute: false }) day: DateTime = now(); // provided from upper component scope
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

    const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const offsetDay = addDays(startOfWeek, offset);
      return html`
        <md-datepicker-day
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
