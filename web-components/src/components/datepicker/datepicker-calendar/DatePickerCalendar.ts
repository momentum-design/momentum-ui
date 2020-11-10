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
import { customElement, html, LitElement, property, PropertyValues, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import "../../icon/Icon";
import styles from "../scss/module.scss";

export namespace DatePickerCalendar {}

@customElement("md-datepicker-calendar")
export class DatePickerCalendar extends LitElement {
  @property({ attribute: false }) locale = "en";
  @property({ attribute: false }) monthFormat = "MMMM yyyy";
  @property({ attribute: false }) monthNavFocus = "prev";
  @property({ attribute: false }) nextArialLabel = undefined;
  @property({ attribute: false }) previousArialLabel = undefined;
  @property({ attribute: false }) date: DateTime = now();
  @property({ attribute: false }) focused: DateTime | undefined = undefined;
  @property({ attribute: false }) selected: DateTime | undefined = now().plus({ days: 2 });
  @property({ attribute: false }) minDate: DateTime | undefined = now().minus({ days: 10 });
  @property({ attribute: false }) maxDate: DateTime | undefined = now().plus({ days: 10 });
  @property({ attribute: false }) filterDate: Function | null = null;
  @property({ attribute: false }) handleMonthChange: Function | undefined = undefined;

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    // REFACTOR:  if the focused date changes, update the set date to the focused date
    // REACT VERSION:
    // const { focused, monthNavFocus } = changedProperties;
    // if (focus && !isSameDay(this.focused, focus)) {
    //   this.setDate(focus);
    // }

    // REFACTOR: Not clear, seems to set focus to the month nazv buttons based upon a property
    // if (monthNavFocus !== this.monthNavFocus) {
    //   this.monthNavFocus === "prev" && this.prevMonthRef.button.focus();
    //   this.monthNavFocus === "next" && this.nextMonthRef.button.focus();
    // }
  }

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
    const allPrevDaysDisabled = this.minDate && shouldPrevMonthDisable(this.date, this.minDate);
    return html`
      <md-button
        aria-label=${ifDefined(
          !this.previousArialLabel
            ? `previous month, ${subtractMonths(this.date, 1).toFormat("MMMM")}`
            : this.previousArialLabel
        )}
        ?disabled=${allPrevDaysDisabled}
        @click=${!allPrevDaysDisabled && this.decreaseMonth}
        tabindex="-1"
        hasRemoveStyle
      >
        <md-icon name="arrow-left_16"></md-icon>
      </md-button>
    `;
  };
  renderNextMonthButton = () => {
    const allNextDaysDisabled = this.maxDate && shouldNextMonthDisable(this.date, this.maxDate);
    return html`
      <md-button
        aria-label=${ifDefined(
          !this.nextArialLabel ? `next month, ${addMonths(this.date, 1).toFormat("MMMM")}` : this.nextArialLabel
        )}
        ?disabled=${allNextDaysDisabled}
        @click=${!allNextDaysDisabled && this.increaseMonth}
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
        <md-datepicker-month
          .day=${this.date}
          .filterParams=${{ minDate: this.minDate, maxDate: this.maxDate, filterDate: this.filterDate }}
          .datePickerProps=${{ selected: this.selected, focused: this.focused }}
        ></md-datepicker-month>
      </div>
    `;
  };

  static get styles() {
    return styles;
  }

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
