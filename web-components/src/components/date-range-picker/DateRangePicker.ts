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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.removeEventListener("date-selection-change", this.handleDateSelection);
    }

    updateValue(){
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

    handleDateSelection(e: any){
      const selection: DateTime = e.detail.data;
      if (this.startDate && this.endDate) {
        const startObj = DateTime.fromSQL(this.startDate);
        const endObj = DateTime.fromSQL(this.endDate);
        if (selection < startObj || selection > endObj) {
          if (selection < startObj) {
            // scenario 1 : date is outside, before current start
            this.startDate = this.dateToSqlTranslate(selection);
          } else {
            // scenario 2 : date is outside, after current end
            this.endDate = this.dateToSqlTranslate(selection);
          }
        } else {
          // @ts-ignore DateTime allows this comparison operation
          if (Math.abs(selection - endObj) < Math.abs(selection - startObj)) {
            // scenario 3 : date is inside, closer to end
            this.endDate = this.dateToSqlTranslate(selection);
          } else {
            // scenario 4 : date is inside, closer to start
            this.startDate = this.dateToSqlTranslate(selection);
          }
        }
      } else if (this.startDate) {
        const existing = DateTime.fromSQL(this.startDate);
        if (selection > existing) {
          this.endDate = this.dateToSqlTranslate(selection);
        } else {
          this.endDate = this.startDate;
          this.startDate = this.dateToSqlTranslate(selection);
        }
      } else {
        this.startDate = this.dateToSqlTranslate(e.detail.data);
      }
      this.updateValue();
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-date-range-picker": DateRangePicker.ELEMENT;
  }
}
