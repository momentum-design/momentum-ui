/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { reformatDateString } from "@/utils/dateUtils";
import { property } from "lit-element";
import { DateTime } from "luxon";
import { DatePicker } from "../datepicker/DatePicker";

export namespace DateRangePicker {
  @customElementWithCheck("md-date-range-picker")
  export class ELEMENT extends DatePicker.ELEMENT {
    @property({ type: String, attribute: "start-date", reflect: true })
    startDate: string | undefined | null = undefined;

    @property({ type: String, attribute: "end-date", reflect: true })
    endDate: string | undefined | null = undefined;

    connectedCallback() {
      super.connectedCallback();
      super.render();
      this.addEventListener("date-pre-selection-change", this.handleDateSelection);
      this.updateValue();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("date-pre-selection-change", this.handleDateSelection);
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
      super.updated(changedProperties);
    
      if (changedProperties.has("startDate") || changedProperties.has("endDate")) {
        this.updateValue();
      }
    }

    updateValue = () => {
      if (this.startDate && this.endDate) {
        this.value = `${reformatDateString(this.startDate)} - ${reformatDateString(this.endDate)}`;
      }
    };

    setSelected() {
      // empty overload to stop prevent super's value change
    }

    dateToSqlTranslate(date: DateTime) {
      return date.toSQLDate();
    }

    onApplyClick() {
      this.emitDateRange();
      this.updateValue();

      if (this.shouldCloseOnSelect) {
        this.setOpen(false);
      }
    }

    handleDateSelection = (e: any) => {
      const selection: DateTime = e.detail.data;
      if (!selection) {
        return;
      }
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

      if (this.controlButtons?.apply) {
        return;
      }

      this.emitDateRange();
      this.updateValue();
    };

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
