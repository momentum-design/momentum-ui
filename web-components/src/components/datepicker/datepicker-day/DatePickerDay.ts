import "@/components/button/Button";
import { DayFilters, getDate, now } from "@/utils/dateUtils";
import { customElement, html, internalProperty, LitElement, property } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
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
  @property({ attribute: false }) day: DateTime | undefined = undefined; // meant to be a DateTime instance reflecting a day
  @property({ attribute: false }) focused = false; // passed in current selection, a DateTime instance
  @property({ attribute: false }) handleDayClick: Function | undefined = undefined; // a passed function from the main picker context
  @property({ attribute: false }) month: number | undefined = undefined; // meant to be a DateTime instance reflecting a month
  @property({ attribute: false }) selected = false; // passed in current selection, a DateTime instance
  @property({ attribute: false }) filterParams: DayFilters | null = null; // passed in current selection, a DateTime instance
  @property({ type: Boolean }) disabled = false;

  @internalProperty() protected isOutsideMonth: boolean | undefined = undefined;
  @internalProperty() protected isSelected: boolean | undefined = undefined;
  @internalProperty() protected isToday: boolean | undefined = undefined;
  @internalProperty() protected hasFocus: boolean | undefined = undefined;

  // constructor(props) {
  //   super(props);
  //   this.dayButton = React.createRef();
  // }

  // componentDidUpdate = () => {
  //   const { day, focus } = this.props;

  //   isSameDay(day, focus) && this.dayButton.current.button.focus();
  // }

  connectedCallback() {
    super.connectedCallback();
    if (this.day === undefined) {
      this.day = now();
      console.log(this.day);
    }
  }

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
    return html`
      <span>day</span>
      <md-button
        circle
        size=${28}
        ?disabled=${this.disabled}
        class=${"md-datepicker__day" +
          `${(this.isSelected && ` md-datepicker__day--selected`) || ""}` +
          `${(this.hasFocus && ` md-datepicker__day--focus`) || ""}` +
          `${(this.isToday && ` md-datepicker__day--today`) || ""}` +
          `${(this.isOutsideMonth && ` md-datepicker__day--outside-month`) || ""}`}
        @click=${this.handleClick}
        aria-label=${`${this.day?.toFormat("D, dddd MMMM YYYY")}`}
        aria-selected=${ifDefined(this.isSelected)}
        tab-index=${-1}
      >
        ${this.day && getDate(this.day)}
      </md-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-day": DatePickerDay;
  }
}
