import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { MenuOverlay } from "@/components/menu-overlay/MenuOverlay";
import { addDays, addWeeks, DayFilters, isDayDisabled, now, subtractDays, subtractWeeks } from "@/utils/dateUtils";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { DateTime } from "luxon";
import { ifDefined } from "lit-html/directives/if-defined";

export namespace DateTimePicker {}
export const weekStartDays = ["Sunday", "Monday"];
@customElement("md-datepicker")
export class DateTimePicker extends LitElement {
  @property({ type: Boolean }) shouldCloseOnSelect = true;
  @property({ type: String }) maxDate: string | undefined = undefined;
  @property({ type: String }) minDate: string | undefined = undefined;
  @property({ type: String, reflect: true }) value: string | undefined = undefined;
  @property({ type: String }) weekStart: typeof weekStartDays[number] = "Sunday";
  @property({ type: String }) locale: string | undefined = undefined;

  @internalProperty() selectedDate: DateTime = now();
  @internalProperty() focusedDate: DateTime = now();
  @internalProperty() filterDate: Function | undefined = undefined;
  @internalProperty() maxDateData: DateTime | undefined = undefined;
  @internalProperty() minDateData: DateTime | undefined = undefined;

  @query("md-menu-overlay") menuOverlay!: MenuOverlay;

  connectedCallback() {
    super.connectedCallback();
    this.minDate !== undefined ? (this.minDateData = DateTime.fromSQL(this.minDate)) : null;
    this.maxDate !== undefined ? (this.maxDateData = DateTime.fromSQL(this.maxDate)) : null;
  }

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);
  }

  setOpen = (open: boolean) => {
    this.menuOverlay.isOpen = open;
  };

  handleSelect = (e: CustomEvent) => {
    const date = e.detail.date;
    const event = e.detail.sourceEvent;
    this.setPreSelection(date, event);
    this.setSelected(date, event);
    this.shouldCloseOnSelect && this.setOpen(false);
  };

  setSelected = (date: DateTime, event: Event) => {
    const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
    if (!isDayDisabled(date, filters)) {
      const dateString = `${date.year}-${date.month}-${date.day}`;
      this.selectedDate = date;
      this.value = dateString;
    }
    this.dispatchEvent(
      new CustomEvent("date-selection-change", {
        bubbles: true,
        composed: true,
        detail: {
          sourceEvent: event,
          data: date
        }
      })
    );
  };

  setPreSelection = (date: DateTime, event: KeyboardEvent) => {
    const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
    !isDayDisabled(date, filters) ? (this.focusedDate = date) : null;
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

  chosenDateLabel = () => {
    return this.selectedDate
      ? `, Selected date is ${this.selectedDate.weekdayLong} ${this.selectedDate.monthLong} ${this.selectedDate.day}, ${this.selectedDate.year}`
      : null;
  };

  render() {
    return html`
      <md-datepicker minDate=${ifDefined(this.minDate)} maxDate=${ifDefined(this.maxDate)}>
        <div slot="time-picker" class="included-timepicker-wrapper">
          <md-timepicker></md-timepicker>
        </div>
      </md-datepicker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-date-time-picker": DateTimePicker;
  }
}
