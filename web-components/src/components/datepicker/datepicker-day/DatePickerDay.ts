import "@/components/button/Button";
import { getMonth, isDayDisabled, isSameDay, now } from "@/utils/dateUtils";
import { customElement, html, LitElement, property } from "lit-element";

export namespace DatePickerDay {}

@customElement("md-datepicker-day")
export class DatePickerDay extends LitElement {
  @property() day: undefined; // meant to be a moment instance reflecting a day
  @property() month: undefined; // meant to be a moment instance reflecting a month
  @property() selected: undefined; // not sure, seems moment related?
  //   @property() focus = false; replace this, otherwise it expects dom native focus()
  @property() handleDayClick: (e, day) => {}; // a passed function from the main picker context

  handleClick(e) {
    const { handleDayClick, day } = this;
    return handleDayClick && handleDayClick(e, day);
  }

  render() {
    const { selected, focus, day, month } = this;

    const isOutsideMonth = month !== getMonth(day);
    const isSelected = isSameDay(day, selected);
    const isToday = isSameDay(day, now());
    const disabled = isDayDisabled(day, this);
    const hasFocus = isSameDay(day, focus);

    return html`
      <md-button
        circle
        size=${28}
        ?disabled=${disabled}
        className=${"md-datepicker__day" +
          `${(isSelected && ` md-datepicker__day--selected`) || ""}` +
          `${(hasFocus && ` md-datepicker__day--focus`) || ""}` +
          `${(isToday && ` md-datepicker__day--today`) || ""}` +
          `${(isOutsideMonth && ` md-datepicker__day--outside-month`) || ""}`}
        @click=${this.handleClick}
        aria-label=${`${day.format("D, dddd MMMM YYYY")}`}
        aria-selected=${isSelected}
        tab-index=${-1}
      >
        10
      </md-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-day": DatePickerDay;
  }
}
