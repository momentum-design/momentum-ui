import "@/components/datepicker/datepicker-month/DatePickerMonth";
import {
  addDays,
  addMonths,
  getLocaleData,
  getStartOfWeek,
  getWeekdayNameInLocale,
  localizeDate,
  shouldNextMonthDisable,
  shouldPrevMonthDisable,
  subtractMonths
} from "@/utils/dateUtils";
import { date } from "@storybook/addon-knobs";
import { customElement, html, LitElement, property } from "lit-element";

export namespace DatePickerCalendar {}

@customElement("md-datepicker-calendar")
export class DatePickerCalendar extends LitElement {
  @property() locale = undefined;
  @property() monthFormat = undefined;
  @property() nextArialLabel = undefined;
  @property() previousArialLabel = undefined;
  @property() date = undefined;

  // Convert lifecycles:
  // componentDidMount () {
  //   const { focus, selected } = this.props;
  //   this.setDate(focus || selected || now());
  // }

  // componentDidUpdate (prevProps) {
  //   const { focus, monthNavFocus } = prevProps;
  //   if (
  //     focus &&
  //     !isSameDay(this.props.focus, focus)
  //   ) {
  //     this.setDate(focus);
  //   }
  //   if (monthNavFocus !== this.props.monthNavFocus) {
  //     this.props.monthNavFocus === 'prev' && this.prevMonthRef.button.focus();
  //     this.props.monthNavFocus === 'next' && this.nextMonthRef.button.focus();
  //   }
  // }

  setDate = (date, cb) => {
    this.date = date;
    cb();
  };

  increaseMonth = event => {
    const { handleMonthChange } = this.props;
    const { date } = this;
    this.setDate(addMonths(date.clone(), 1), () => handleMonthChange && handleMonthChange(event, this.date));
  };

  decreaseMonth = event => {
    const { handleMonthChange } = this.props;
    const { date } = this;
    this.setDate(subtractMonths(date.clone(), 1), () => handleMonthChange && handleMonthChange(event, this.date));
  };

  renderMonthName = () => {
    return html`
      <div class="md-datepicker__navigation--current-month">
        ${localizeDate(date, this.locale).format(this.monthFormat)}
      </div>
    `;
  };

  renderPreviousMonthButton = () => {
    const { minDate } = this.props;
    const allPrevDaysDisabled = shouldPrevMonthDisable(date, minDate);
    return html`
      <md-icon
        aria-label=${!this.previousArialLabel
          ? `previous month, ${subtractMonths(date.clone(), 1).format("MMMM")}`
          : this.previousArialLabel}
        ?disabled=${allPrevDaysDisabled}
        onClick=${this.decreaseMonth}
        name="arrow-left_16"
        buttonProps=${{ ref: ref => (this.prevMonthRef = ref) }}
        tabindex="-1"
      />
    `;
  };
  renderNextMonthButton = () => {
    const { maxDate } = this.props;
    const allNextDaysDisabled = shouldNextMonthDisable(date, maxDate);
    return html`
      <md-icon
        aria-label=${!this.nextArialLabel ? `next month, ${addMonths(date.clone(), 1).format("MMMM")}` : nextArialLabel}
        ?disabled=${allNextDaysDisabled}
        onClick=${this.increaseMonth}
        name="arrow-right_16"
        buttonProps=${{ ref: ref => (this.nextMonthRef = ref) }}
        tabindex="-1"
      />
    `;
  };

  header = () => {
    const startOfWeek = getStartOfWeek(date.clone());
    const dayNames = [];
    return dayNames.concat(
      [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = addDays(localizeDate(startOfWeek, this.locale), offset);
        const localeData = getLocaleData(day);
        const weekDayName = getWeekdayNameInLocale(localeData, day);
        return html`
          <div key="{offset}" class="md-datepicker__day--name">
            ${weekDayName}
          </div>
        `;
      })
    );
  };

  renderMonth = () => {
    return html`
      <div class="md-datepicker__month-container">
        <div class="md-datepicker__header">
          <div class="md-datepicker__navigation">
            ${this.renderMonthName()}
            <div class="md-datepicker__navigation--buttons">
              ${this.renderPreviousMonthButton()} ${this.renderNextMonthButton()}
            </div>
          </div>
          <div class="md-datepicker__day--names">
            ${this.header()}
          </div>
        </div>
        <md-datepicker-month day="{date}" {...otherProps}></md-datepicker-month>
      </div>
    `;
  };

  render() {
    return html`
      <div>
        ${date && this.renderMonth()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-calendar": DatePickerCalendar;
  }
}
