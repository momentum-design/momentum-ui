/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { getDate, isDayDisabled, isSameDay, localizeDate, now } from "@/utils/dateUtils";
import { closestElement } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { DatePickerProps, DayFilters } from "../../../utils/dateUtils"; // Keep type import as a relative path
import { DateRangePicker } from "../../date-range-picker/DateRangePicker"; // Keep type import as a relative path
import styles from "../scss/module.scss";

export namespace DatePickerDay {
  @customElementWithCheck("md-datepicker-day")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean, reflect: true }) focused = false;
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ attribute: false }) day: DateTime = now();
    @property({ attribute: false }) viewAnchorMonth: number | undefined = undefined;
    @property({ attribute: false }) filterParams: DayFilters | undefined = undefined;
    @property({ attribute: false }) datePickerProps: DatePickerProps | undefined = undefined;

    @internalProperty() protected isOutsideMonth = false;
    @internalProperty() protected isToday = false;
    @internalProperty() protected parentRangePicker: DateRangePicker.ELEMENT | null = null;
    @internalProperty() protected dateIsInRange = false;

    @query("md-button") button!: HTMLButtonElement;

    connectedCallback() {
      super.connectedCallback();
      this.disabled = (this.filterParams && isDayDisabled(this.day, this.filterParams)) || false;
      this.isOutsideMonth = this.day.month !== this.viewAnchorMonth;
      this.isToday = isSameDay(this.day, now());
      this.selected = (this.datePickerProps && isSameDay(this.datePickerProps.selected, this.day)) || false;
      this.focused = (this.datePickerProps && isSameDay(this.datePickerProps.focused, this.day)) || false;
      this.parentRangePicker = closestElement("md-date-range-picker", this) as DateRangePicker.ELEMENT;
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      this.disabled = (this.filterParams && isDayDisabled(this.day, this.filterParams)) || false;
      this.isOutsideMonth = this.day.month !== this.viewAnchorMonth;
      this.isToday = isSameDay(this.day, now());
      this.selected = (this.datePickerProps && isSameDay(this.datePickerProps.selected, this.day)) || false;
      this.focused = (this.datePickerProps && isSameDay(this.datePickerProps.focused, this.day)) || false;
      this.focused && this.button && this.button.shadowRoot?.querySelector("button")?.focus();
      this.parentRangePicker && (this.dateIsInRange = this.isDateInRange());
    }

    handleClick = (e: MouseEvent) => {
      this.dispatchEvent(
        new CustomEvent("day-select", {
          bubbles: true,
          composed: true,
          detail: {
            date: this.day,
            sourceEvent: e
          }
        })
      );
    };

    isDateInRange = () => {
      const rangePicker = this.parentRangePicker;
      const startDate = rangePicker?.startDate;
      const endDate = rangePicker?.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      const daySQLDate = this.day?.isValid ? this.day.toSQLDate() : null;
      if (!daySQLDate) {
        return false;
      }

      const isBetweenDates = daySQLDate > startDate && daySQLDate < endDate;
      const isStartDate = daySQLDate === startDate;
      const isEndDate = daySQLDate === endDate;

      return !this.isPrimarySelection() && (isBetweenDates || isStartDate || isEndDate);
    };

    isPrimarySelection() {
      return this.parentRangePicker?.startDate && this.parentRangePicker.endDate === undefined;
    }

    isLeadingRangeEdge() {
      return this === this.parentNode?.firstElementChild;
    }
    isEndingRangeEdge() {
      return this === this.parentNode?.lastElementChild;
    }
    isStartDate() {
      return this.parentRangePicker?.startDate === this.day.toSQLDate() && !this.isPrimarySelection();
    }
    isEndDate() {
      return this.parentRangePicker?.endDate === this.day.toSQLDate();
    }

    handleKeyDown = (e: KeyboardEvent) => {
      this.dispatchEvent(
        new CustomEvent("day-key-event", {
          bubbles: true,
          composed: true,
          detail: {
            date: this.day,
            sourceEvent: e
          }
        })
      );
    };

    get getDayClassMap() {
      return {
        "md-datepicker__day--selected": this.selected,
        "md-datepicker__day--focus": this.focused,
        "md-datepicker__day--today": this.isToday,
        "md-datepicker__day--outside-month": this.isOutsideMonth,
        "md-datepicker__day--in-range": this.dateIsInRange,
        "md-datepicker__day--week-first": this.isLeadingRangeEdge(),
        "md-datepicker__day--week-last": this.isEndingRangeEdge(),
        "md-datepicker__day--start-date": this.isStartDate(),
        "md-datepicker__day--end-date": this.isEndDate()
      };
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      const localisedDateFormat = localizeDate(this.day, this.datePickerProps?.locale || "en").toFormat(
        "D, dd MMMM yyyy"
      );
      return html`
        <md-button
          circle
          size=${32}
          color=${"color-none"}
          ?disabled=${this.disabled}
          class="md-datepicker__day ${classMap(this.getDayClassMap)}"
          @click=${(e: MouseEvent) => {
            if (!this.disabled) {
              this.handleClick(e);
            }
          }}
          @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e)}
          ariaLabel=${`${localisedDateFormat}`}
          title=${`${localisedDateFormat}`}
          aria-selected=${ifDefined(this.selected)}
          tab-index=${this.focused ? "0" : "-1"}
        >
          ${this.day && getDate(this.day)}
        </md-button>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-day": DatePickerDay.ELEMENT;
  }
}
