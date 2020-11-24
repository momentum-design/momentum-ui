import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { MenuOverlay } from "@/components/menu-overlay/MenuOverlay";
import { addDays, addWeeks, DayFilters, isDayDisabled, now, subtractDays, subtractWeeks } from "@/utils/dateUtils";
import { customElement, html, internalProperty, LitElement, property, query } from "lit-element";
import { DateTime } from "luxon";
import { nothing } from "lit-html";

export namespace DatePicker {}

@customElement("md-datepicker")
export class DatePicker extends LitElement {
  @property({ type: Boolean }) shouldCloseOnSelect = true;
  @property({ type: String }) maxDate: string | undefined = undefined;
  @property({ type: String }) minDate: string | undefined = undefined;
  @property({ type: String, reflect: true }) value: string | undefined = undefined;
  @property({ type: Boolean }) includeTime = false;

  @internalProperty() monthFormat = undefined;
  @internalProperty() locale: string = now().locale;
  @internalProperty() focusedDate: DateTime = now();
  @internalProperty() filterDate: Function | undefined = undefined;
  @internalProperty() onChange: Function | undefined = undefined;
  @internalProperty() selectedDate: DateTime = now();
  @internalProperty() onMonthChange: Function | undefined = undefined;
  @internalProperty() onSelect: Function | undefined = undefined;
  @internalProperty() maxDateData: DateTime | undefined = undefined;
  @internalProperty() minDateData: DateTime | undefined = undefined;

  @query("md-menu-overlay") menuOverlay!: MenuOverlay;

  connectedCallback() {
    super.connectedCallback();
    this.minDate !== undefined ? (this.minDateData = DateTime.fromSQL(this.minDate)) : null;
    this.maxDate !== undefined ? (this.maxDateData = DateTime.fromSQL(this.maxDate)) : null;
  }

  setOpen = (open: boolean): void => {
    this.menuOverlay.isOpen = open;
  };

  handleSelect = (e: CustomEvent): void => {
    const date = e.detail.date;
    const event = e.detail.sourceEvent;
    this.setPreSelection(date, event);
    this.setSelected(date, event);
    this.shouldCloseOnSelect && this.setOpen(false);
  };

  setSelected = (date: DateTime, event: Event): void => {
    const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
    if (!isDayDisabled(date, filters)) {
      const dateString = `${date.year}-${date.month}-${date.day}`;
      this.selectedDate = date;
      this.value = dateString;
    }
    this.onSelect && this.onSelect(event, date);
  };

  setPreSelection = (date: DateTime, event: KeyboardEvent): void => {
    const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
    !isDayDisabled(date, filters) ? (this.focusedDate = date) : null;
    this.onChange && this.onChange(event, date);
  };

  handleKeyDown = (e: CustomEvent) => {
    const event = e.detail.sourceEvent;
    let flag = false;
    const copy = this.focusedDate;

    switch (!event.shiftKey && event.code) {
      case "Space":
      case "Enter":
        this.handleSelect(e);
        flag = true;
        break;

      case "Escape":
        this.setOpen(false);
        break;
      case "ArrowUp":
        this.setPreSelection(subtractWeeks(copy, 1), event);
        flag = true;
        break;
      case "ArrowLeft":
        this.setPreSelection(subtractDays(copy, 1), event);
        flag = true;
        break;

      case "ArrowRight":
        this.setPreSelection(addDays(copy, 1), event);
        flag = true;
        break;

      case "ArrowDown":
        this.setPreSelection(addWeeks(copy, 1), event);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  render() {
    const renderTimePicker = () => {
      return html`
      <div class="included-timepicker-wrapper">
        <hr class="date-time-divider">
        <md-timepicker></md-timepicker>
      </div>
      `;
    };

    return html`
      <md-menu-overlay custom-width="248px">
        <md-input slot="menu-trigger" placeholder=${this.selectedDate.toLocaleString()}></md-input>
        <div class="date-overlay-content">
          <md-datepicker-calendar
            @day-select=${(e: CustomEvent) => this.handleSelect(e)}
            @day-key-event=${(e: CustomEvent) => this.handleKeyDown(e)}
            .datePickerProps=${{ selected: this.selectedDate, focused: this.focusedDate }}
            .filterParams=${{ minDate: this.minDate, maxDate: this.maxDate, filterDate: this.filterDate }}
          ></md-datepicker-calendar>
          ${this.includeTime ? renderTimePicker() : nothing}
        </div>
      </md-menu-overlay>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker": DatePicker;
  }
}
