import "@/components/datepicker/datepicker-week/DatePickerWeek";
import {
  addWeeks,
  DatePickerProps,
  DayFilters,
  getMonth,
  getStartOfMonth,
  getStartOfWeek,
  isSameMonth,
  now
} from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import { DateTime } from "luxon";
import styles from "../scss/module.scss";

export namespace DatePickerMonth {}

@customElement("md-datepicker-month")
export class DatePickerMonth extends LitElement {
  @property({ attribute: false }) day: DateTime = now(); // provided from upper component scope
  @property({ attribute: false }) filterParams: DayFilters | undefined = undefined; // Needed at the day level to set styles correctly
  @property({ attribute: false }) datePickerProps: DatePickerProps | undefined = undefined; // Needed at the day level to set styles correctly

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
  }

  renderWeeks = () => {
    let startOfWeekDay = getStartOfWeek(getStartOfMonth(this.day));

    const weeks = [];
    const viewAnchorMonth = getMonth(this.day);

    do {
      weeks.push(
        html`
          <md-datepicker-week
            .viewAnchorMonth=${viewAnchorMonth}
            .startOfWeekDay=${startOfWeekDay}
            .filterParams=${this.filterParams}
            .datePickerProps=${this.datePickerProps}
          ></md-datepicker-week>
        `
      );
      startOfWeekDay = addWeeks(startOfWeekDay, 1);
    } while (isSameMonth(startOfWeekDay, this.day));

    return weeks;
  };

  static get styles() {
    return [reset, styles];
  }

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
