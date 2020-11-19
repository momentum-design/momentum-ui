import "@/components/datepicker/datepicker-day/DatePickerDay";
import { addDays, DatePickerProps, DayFilters, now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import { DateTime } from "luxon";
import styles from "../scss/module.scss";
export namespace DatePickerWeek {}

@customElement("md-datepicker-week")
export class DatePickerWeek extends LitElement {
  @property({ attribute: false }) startOfWeekDay: DateTime = now();
  @property({ attribute: false }) viewAnchorMonth: number = now().month;
  @property({ attribute: false }) filterParams: DayFilters | undefined = undefined;
  @property({ attribute: false }) datePickerProps: DatePickerProps | undefined = undefined;

  renderDays = () => {
    const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const offsetDay = addDays(this.startOfWeekDay, offset);
      return html`
        <md-datepicker-day
          .viewAnchorMonth=${this.viewAnchorMonth}
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
