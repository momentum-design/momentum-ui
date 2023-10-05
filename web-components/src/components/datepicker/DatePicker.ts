/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { addDays, addWeeks, DayFilters, isDayDisabled, now, subtractDays, subtractWeeks } from "@/utils/dateUtils";
import { closestElement } from "@/utils/helpers";
import { ValidationRegex } from "@/utils/validations";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { DateRangePicker } from "../date-range-picker/DateRangePicker";
import { Input } from "../input/Input"; // Keep type import as a relative path
import { MenuOverlay } from "../menu-overlay/MenuOverlay"; // Keep type import as a relative path

export namespace DatePicker {
  export const weekStartDays = ["Sunday", "Monday"];
  const EMPTY_STRING = "";

  @customElementWithCheck("md-datepicker")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean, attribute: "should-close-on-select" }) shouldCloseOnSelect = false;
    @property({ type: String }) maxDate: string | undefined = undefined;
    @property({ type: String }) minDate: string | undefined = undefined;
    @property({ type: String, reflect: true }) value: string | undefined = undefined;
    @property({ type: String }) weekStart: typeof weekStartDays[number] = "Sunday";
    @property({ type: String, reflect: true }) placeholder: string | undefined = undefined;
    @property({ type: String }) locale = "en-US";
    @property({ type: Boolean, reflect: true, attribute: "includes-time" }) includesTime = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) htmlId = "";
    @property({ type: String }) label = "";
    @property({ type: String }) ariaLabel = "Choose Date";
    @property({ type: Boolean }) required = false;
    @property({ type: String, reflect: true }) errorMessage = "";
    @property({ type: Boolean, attribute: "custom-trigger" }) customTrigger = false;

    @internalProperty() selectedDate: DateTime = now();
    @internalProperty() focusedDate: DateTime = now();
    @internalProperty() filterDate: Function | undefined = undefined;
    @internalProperty() maxDateData: DateTime | undefined = undefined;
    @internalProperty() minDateData: DateTime | undefined = undefined;

    @query("md-menu-overlay") menuOverlay!: MenuOverlay.ELEMENT;

    connectedCallback() {
      super.connectedCallback();
      if (this.minDate) {
        this.minDateData = DateTime.fromISO(this.minDate, { locale: this.locale });
      }
      if (this.maxDate) {
        this.maxDateData = DateTime.fromISO(this.maxDate, { locale: this.locale });
      }
    }

    async firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      if (this.value === EMPTY_STRING) {
        this.value = this.includesTime
          ? this.selectedDate?.startOf("second").toISO({ suppressMilliseconds: true })
          : this.selectedDate?.toISODate();
      }
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (this.value && changedProperties.has("value")) {
        if (closestElement("md-date-range-picker", this)) {
          return;
        }
        this.selectedDate = DateTime.fromISO(this.value, { locale: this.locale });
        this.setPreSelection(this.selectedDate);
      }
      if (changedProperties.has("locale")) {
        this.render();
      }
      if (this.minDate && changedProperties.has("minDate")) {
        this.minDateData = DateTime.fromISO(this.minDate, { locale: this.locale });
      }
      if (this.maxDate && changedProperties.has("maxDate")) {
        this.maxDateData = DateTime.fromISO(this.maxDate, { locale: this.locale });
      }
    }

    handleDateInputChange = (event: CustomEvent) => {
      if (event?.detail?.value) {
        this.value = event?.detail?.value;
      }

      this.dispatchEvent(
        new CustomEvent("date-input-change", {
          bubbles: true,
          composed: true,
          detail: {
            sourceEvent: event,
            value: this.value
          }
        })
      );
    };

    setOpen = (open: boolean) => {
      this.menuOverlay.isOpen = open;
    };

    handleSelect = (e: CustomEvent) => {
      const date = e.detail.date;
      const event = e.detail.sourceEvent;
      this.setPreSelection(date);
      this.setSelected(date, event);
      this.shouldCloseOnSelect && this.setOpen(false);
    };

    setSelected = (date: DateTime, event: Event) => {
      const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
      if (!isDayDisabled(date, filters)) {
        const dateString = this.includesTime
          ? date.startOf("second").toISO({ suppressMilliseconds: true })
          : date.toISODate();
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

    setPreSelection = (date: DateTime) => {
      const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
      if (!isDayDisabled(date, filters)) {
        this.focusedDate = date;
      }
    };

    handleInputKeyDown = (event: KeyboardEvent) => {
      if (event.code === Key.ArrowDown) {
        this.setOpen(true);
      }
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
          this.setPreSelection(subtractWeeks(copy, 1));
          flag = true;
          break;
        case "ArrowLeft":
          this.setPreSelection(subtractDays(copy, 1));
          flag = true;
          break;

        case "ArrowRight":
          this.setPreSelection(addDays(copy, 1));
          flag = true;
          break;

        case "ArrowDown":
          this.setPreSelection(addWeeks(copy, 1));
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
        : undefined;
    };

    isValueValid = () => {
      if (!this.value && this.value !== EMPTY_STRING) return true;
      const dateRangePicker = closestElement("md-date-range-picker", this) as DateRangePicker.ELEMENT;
      const regexString =
        dateRangePicker && dateRangePicker.startDate && dateRangePicker.endDate
          ? ValidationRegex.dateRangeString
          : this.includesTime
          ? ValidationRegex.ISOString
          : ValidationRegex.ISODateString;
      const regex = RegExp(regexString);

      const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
      const isValid =
        this.value &&
        regex.test(this.value) &&
        !isDayDisabled(DateTime.fromISO(this.value, { locale: this.locale }), filters);

      return isValid;
    };

    render() {
      return html`
        <md-menu-overlay custom-width="248px" ?disabled=${this.disabled}>
          ${this.customTrigger
            ? html`
                <span slot="menu-trigger">
                  <slot name="date-trigger"></slot>
                </span>
              `
            : html`
                <md-input
                  class="date-input"
                  slot="menu-trigger"
                  placeholder=${this.placeholder ? this.placeholder : "YYYY-MM-DD"}
                  value=${ifDefined(this.value)}
                  htmlId=${this.htmlId}
                  label=${this.label}
                  aria-label=${this.ariaLabel + this.chosenDateLabel()}
                  auxiliaryContentPosition="before"
                  required=${this.required}
                  @keydown=${(event: KeyboardEvent) => this.handleInputKeyDown(event)}
                  @input-change="${(e: CustomEvent) => this.handleDateInputChange(e)}"
                  ?disabled=${this.disabled}
                  hide-message=${!this.errorMessage && this.isValueValid()}
                  ariaInvalid=${!!this.errorMessage || !this.isValueValid()}
                  .messageArr=${this.errorMessage
                    ? [{ message: this.errorMessage, type: "error" }]
                    : [{ message: "", type: this.isValueValid() ? "" : "error" } as Input.Message]}
                >
                  <md-icon slot="input-section" name="calendar-month_16"></md-icon>
                </md-input>
              `}

          <div class="date-overlay-content">
            <md-datepicker-calendar
              @day-select=${(e: CustomEvent) => this.handleSelect(e)}
              @day-key-event=${(e: CustomEvent) => this.handleKeyDown(e)}
              .datePickerProps=${{
                locale: this.locale,
                selected: this.selectedDate,
                focused: this.focusedDate,
                weekStart: this.weekStart
              }}
              .filterParams=${{ minDate: this.minDateData, maxDate: this.maxDateData, filterDate: this.filterDate }}
            ></md-datepicker-calendar>
            <slot name="time-picker"></slot>
          </div>
        </md-menu-overlay>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker": DatePicker.ELEMENT;
  }
}
