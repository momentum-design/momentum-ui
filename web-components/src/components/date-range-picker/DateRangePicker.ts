/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { getLocaleDateFormat } from "@/utils/dateUtils";
import { property } from "lit/decorators.js";
import { DateTime } from "luxon";
import { DatePicker } from "@/components/datepicker/DatePicker";

const DATE_RANGE_SEPARATOR = " - ";
const DEFAULT_ARIA_LABEL = "Choose Date Range";
const DEFAULT_ARIA_LABEL_RANGE_SELECTED = "Choose Date Range, currently selected range is ";

export namespace DateRangePicker {
  @customElementWithCheck("md-date-range-picker")
  export class ELEMENT extends DatePicker.ELEMENT {
    @property({ type: String, attribute: "start-date", reflect: true })
    startDate: string | undefined | null = undefined;

    @property({ type: String, attribute: "end-date", reflect: true })
    endDate: string | undefined | null = undefined;

    @property({ type: Number, attribute: "max-range-length" })
    maxRangeLength: number | undefined = undefined;

    private originalFilterDate: Function | undefined = undefined;

    connectedCallback() {
      super.connectedCallback();
      super.render();
      this.addEventListener("date-pre-selection-change", this.handleDateSelection);
      this.updateValue();

      if (this.maxRangeLength) {
        this.originalFilterDate = this.filterDate;
        this.updateFilterDate();
      }
    }

    private updateFilterDate(): void {
      if (!this.maxRangeLength) {
        return;
      }
      this.filterDate = this.createCombinedFilter();
    }

    private createCombinedFilter(): (day: DateTime) => boolean {
      return (day: DateTime) => {
        if (this.originalFilterDate && this.originalFilterDate(day)) {
          return true;
        }

        const dayDateTime = typeof day === "string" ? DateTime.fromISO(day) : day;

        if (!this.maxRangeLength || !this.startDate || this.endDate) {
          return false;
        }

        const startDateTime = DateTime.fromISO(this.startDate);
        const maxEndDate = startDateTime.plus({ days: this.maxRangeLength - 1 }).startOf("day");
        const minStartDate = startDateTime.minus({ days: this.maxRangeLength - 1 }).startOf("day");
        const dayStart = dayDateTime.startOf("day");

        return dayStart > maxEndDate || dayStart < minStartDate;
      };
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("date-pre-selection-change", this.handleDateSelection);
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
      super.updated(changedProperties);

      if (
        (changedProperties.has("startDate") || changedProperties.has("endDate")) &&
        !changedProperties.has("focusedDate")
      ) {
        this.updateValue();
      }
    }

    updateValue = () => {
      if (this.startDate && this.endDate) {
        const formatDate = (dateString: string) =>
          this.useISOFormat
            ? dateString
            : DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_SHORT, { locale: this.locale });

        const startDateString = formatDate(this.startDate);
        const endDateString = formatDate(this.endDate);

        this.value = `${startDateString}${DATE_RANGE_SEPARATOR}${endDateString}`;
      }
    };

    // overload
    protected getPlaceHolderString(): string {
      if (this.placeholder) {
        return this.placeholder;
      }
      if (this.useISOFormat) {
        return `YYYY-MM-DD${DATE_RANGE_SEPARATOR}YYYY-MM-DD`;
      }
      const placeholder = getLocaleDateFormat(this.locale).toUpperCase();
      return `${placeholder}${DATE_RANGE_SEPARATOR}${placeholder}`;
    }

    // overload
    isValueValid = (): boolean => {
      if (!this.validateDate) {
        return true;
      }
      const split = this.value?.split(DATE_RANGE_SEPARATOR) ?? [];
      return split.length === 2 && this.validateDateString(split[0]) && this.validateDateString(split[1]);
    };

    // empty overload to stop prevent super's value change
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelected() {}

    dateToSqlTranslate(date: DateTime) {
      return date.toSQLDate();
    }

    // overload
    onApplyClick() {
      this.emitDateRange();
      this.updateValue();

      if (this.shouldCloseOnSelect) {
        this.setOpen(false);
      }
    }

    // overload
    protected getDefaultAriaLabel = (): string => {
      if (this.startDate && this.endDate) {
        const startDateISO = DateTime.fromISO(this.startDate);
        const endDateISO = DateTime.fromISO(this.endDate);
        if (startDateISO.isValid && endDateISO.isValid) {
          return `${DEFAULT_ARIA_LABEL_RANGE_SELECTED}${startDateISO.toLocaleString(DateTime.DATE_FULL)} to ${endDateISO.toLocaleString(DateTime.DATE_FULL)}`; // TODO is the "to" alright here? ort should we havbe a template for the default range
        }
      }
      return DEFAULT_ARIA_LABEL;
    };

    handleDateSelection(e: any): void {
      const selection: DateTime = e.detail.data;
      if (!selection) {
        return;
      }

      this.selectedDate = selection;
      this.focusedDate = selection;

      if (!this.startDate) {
        this.startDate = this.dateToSqlTranslate(selection);
      } else if (!this.endDate) {
        if (selection < DateTime.fromISO(this.startDate)) {
          this.endDate = this.startDate;
          this.startDate = this.dateToSqlTranslate(selection);
        } else {
          this.endDate = this.dateToSqlTranslate(selection);
        }
      } else {
        this.startDate = this.dateToSqlTranslate(selection);
        this.endDate = undefined;
      }

      this.updateFilterDate();

      if (this.controlButtons?.apply) {
        return;
      }

      this.emitDateRange();
      this.updateValue();
    }

    emitDateRange() {
      if (!this.startDate || !this.endDate) {
        return;
      }

      const event = new CustomEvent("date-range-change", {
        detail: {
          startDate: this.startDate,
          endDate: this.endDate
        }
      });
      this.dispatchEvent(event);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-date-range-picker": DateRangePicker.ELEMENT;
  }
}
