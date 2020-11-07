import "@/components/button/Button";
import { DayFilters, getDate, getMonth, isDayDisabled, isSameDay, now } from "@/utils/dateUtils";
import { customElement, html, LitElement, property } from "lit-element";
import { DateTime } from "luxon/index";

export namespace DatePickerDay {
  export type Attributes = {
    day?: DateTime;
    month?: number;
    selected?: DateTime;
    focused?: DateTime;
    filterParams?: DayFilters;
    handleDayClick?: Function;
  };
}

@customElement("md-datepicker-day")
export class DatePickerDay extends LitElement {
  @property({ attribute: false }) day: DateTime = now(); // meant to be a DateTime instance reflecting a day
  @property({ attribute: false }) month: number | undefined = now().month; // meant to be a DateTime instance reflecting a month
  @property({ attribute: false }) selected: DateTime = now(); // passed in current selection, a DateTime instance
  @property({ attribute: false }) focused: DateTime = now(); // passed in current selection, a DateTime instance
  @property({ attribute: false }) filterParams: DayFilters | null = null; // passed in current selection, a DateTime instance
  @property({ attribute: false }) handleDayClick: Function | undefined = undefined; // a passed function from the main picker context
  @property({ type: Boolean }) disabled = false;

  // constructor(props) {
  //   super(props);
  //   this.dayButton = React.createRef();
  // }

  // componentDidUpdate = () => {
  //   const { day, focus } = this.props;

  //   isSameDay(day, focus) && this.dayButton.current.button.focus();
  // }

  handleClick(e: MouseEvent) {
    const { handleDayClick, day } = this;
    handleDayClick && handleDayClick(e, day);

    this.dispatchEvent(
      new CustomEvent("day-select", {
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const { selected, focused, day, month } = this;

    const isOutsideMonth = month !== getMonth(day);
    const isSelected = isSameDay(day, selected);
    const isToday = isSameDay(day, now());
    const disabled = (this.filterParams && isDayDisabled(day, this.filterParams)) || false;
    const hasFocus = isSameDay(day, focused);

    return html`
      <h1>FART</h1>
      <md-button
        circle
        size=${28}
        ?disabled=${disabled}
        class=${"md-datepicker__day" +
          `${(isSelected && ` md-datepicker__day--selected`) || ""}` +
          `${(hasFocus && ` md-datepicker__day--focus`) || ""}` +
          `${(isToday && ` md-datepicker__day--today`) || ""}` +
          `${(isOutsideMonth && ` md-datepicker__day--outside-month`) || ""}`}
        @click=${this.handleClick}
        aria-label=${`${day?.toFormat("D, dddd MMMM YYYY")}`}
        aria-selected=${isSelected}
        tab-index=${-1}
      >
        ${getDate(day)}
      </md-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-day": DatePickerDay;
  }
}
