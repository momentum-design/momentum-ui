import "@/components/datepicker/datepicker-month/DatePickerMonth";
import {
  addDays,
  addMonths,
  getLocaleData,
  getStartOfWeek,
  getWeekdayNameInLocale,
  localizeDate,
  now,
  shouldNextMonthDisable,
  shouldPrevMonthDisable,
  subtractMonths
} from "@/utils/dateUtils";
import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import "../../icon/Icon";

export namespace DatePickerCalendar {}

@customElement("md-datepicker-calendar")
export class DatePickerCalendar extends LitElement {
  @property({ attribute: false }) locale = "en";
  @property({ attribute: false }) monthFormat = "MMMM YYYY";
  @property({ attribute: false }) monthNavFocus = "prev";
  @property({ attribute: false }) nextArialLabel = undefined;
  @property({ attribute: false }) previousArialLabel = undefined;
  @property({ attribute: false }) date: DateTime = now();
  @property({ attribute: false }) minDate: DateTime | undefined = undefined;
  @property({ attribute: false }) maxDate: DateTime | undefined = undefined;
  @property({ attribute: false }) handleMonthChange: Function | undefined = undefined;

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

  setDate = (date: DateTime, cb: Function) => {
    this.date = date;
    cb();
  };

  increaseMonth = (event: MouseEvent) => {
    const { handleMonthChange } = this;
    const { date } = this;
    this.setDate(addMonths(date, 1), () => handleMonthChange && handleMonthChange(event, this.date));
  };

  decreaseMonth = (event: MouseEvent) => {
    const { handleMonthChange } = this;
    const { date } = this;
    this.setDate(subtractMonths(date, 1), () => handleMonthChange && handleMonthChange(event, this.date));
  };

  renderMonthName = () => {
    return html`
      <div class="md-datepicker__navigation--current-month">
        ${localizeDate(this.date, this.locale).toFormat(this.monthFormat)}
      </div>
    `;
  };

  renderPreviousMonthButton = () => {
    const { minDate } = this;
    const allPrevDaysDisabled = this.minDate && shouldPrevMonthDisable(this.date, this.minDate);
    return html`
      <md-button
        aria-label=${ifDefined(
          !this.previousArialLabel
            ? `previous month, ${subtractMonths(this.date, 1).toFormat("MMMM")}`
            : this.previousArialLabel
        )}
        ?disabled=${allPrevDaysDisabled}
        onClick=${this.decreaseMonth}
        tabindex="-1"
        hasRemoveStyle
      >
        <md-icon name="arrow-left_16"></md-icon>
      </md-button>
    `;
  };
  renderNextMonthButton = () => {
    const { maxDate } = this;
    const allNextDaysDisabled = this.maxDate && shouldNextMonthDisable(this.date, this.maxDate);
    return html`
      <md-button
        aria-label=${ifDefined(
          !this.nextArialLabel ? `next month, ${addMonths(this.date, 1).toFormat("MMMM")}` : this.nextArialLabel
        )}
        ?disabled=${allNextDaysDisabled}
        onClick=${this.increaseMonth}
        tabindex="-1"
        hasRemoveStyle
        ><md-icon name="arrow-right_16"></md-icon>
      </md-button>
    `;
  };

  header = () => {
    const startOfWeek = getStartOfWeek(this.date);
    const dayNames: TemplateResult[] = [];
    return dayNames.concat(
      [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = addDays(localizeDate(startOfWeek, this.locale), offset);
        const localeData = getLocaleData(day);
        const weekDayName = getWeekdayNameInLocale(localeData, day);
        return html`
          <div class="md-datepicker__day--name">
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
        <md-datepicker-month .day=${this.date} .otherProps=${this.date}></md-datepicker-month>
      </div>
    `;
  };

  render() {
    return html`
      <div>
        ${this.date && this.renderMonth()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-calendar": DatePickerCalendar;
  }
}
