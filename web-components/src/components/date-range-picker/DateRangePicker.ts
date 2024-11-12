/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { property } from "lit-element";
import { DateTime } from "luxon";
import "../datepicker/DatePicker";
import { DatePicker } from "../datepicker/DatePicker";

export namespace DateRangePicker {
  @customElementWithCheck("md-date-range-picker")
  export class ELEMENT extends DatePicker.ELEMENT {
    @property({ type: String, attribute: "start-date", reflect: true }) startDate: string | undefined = undefined;
    @property({ type: String, attribute: "end-date", reflect: true }) endDate: string | undefined = undefined;

    connectedCallback() {
      super.connectedCallback();
      super.render();
      this.addEventListener("date-selection-change", this.handleDateSelection);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("date-selection-change", this.handleDateSelection);
    }

    updateValue = () => {
      if (this.startDate && this.endDate) {
        this.value = `${this.sqlDateToSlashes(this.startDate)} - ${this.sqlDateToSlashes(this.endDate)}`;
      }
    };

    dateToSqlTranslate(date: DateTime) {
      return date.toSQLDate();
    }

    sqlDateToSlashes(date: string) {
      return date.replace(/-+/g, "/");
    }

    handleDateSelection = (e: any) => {
      const selection: DateTime = e.detail.data;
      if (!this.startDate) {
        this.startDate = this.dateToSqlTranslate(selection);
      }
      else if (!this.endDate) {
        if (selection < DateTime.fromISO(this.startDate)) {
          this.endDate = this.startDate;
          this.startDate = this.dateToSqlTranslate(selection);
        }
        else {
          this.endDate = this.dateToSqlTranslate(selection);
        }
      }
      else {
        this.startDate = this.dateToSqlTranslate(selection);
        this.endDate = undefined;
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
          endDate: this.endDate,
        },
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
