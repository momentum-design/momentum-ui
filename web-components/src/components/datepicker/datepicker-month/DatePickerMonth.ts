/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "../../datepicker/datepicker-week/DatePickerWeek";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { addWeeks, getMonth, getStartOfMonth, getStartOfWeek, isSameMonth, now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { DateTime } from "luxon";
import { DatePickerProps, DayFilters } from "@/utils/dateUtils";
import styles from "../scss/module.scss";

export namespace DatePickerMonth {
  @customElementWithCheck("md-datepicker-month")
  export class ELEMENT extends LitElement {
    @property({ attribute: false }) day: DateTime = now();
    @property({ attribute: false }) filterParams: DayFilters | undefined = undefined;
    @property({ attribute: false }) datePickerProps: DatePickerProps | undefined = undefined;

    renderWeeks = () => {
      let startOfWeekDay = getStartOfWeek(getStartOfMonth(this.day), this.datePickerProps?.weekStart);

      const weeks = [];
      const viewAnchorMonth = getMonth(this.day);

      do {
        weeks.push(html`
          <md-datepicker-week
            .viewAnchorMonth=${viewAnchorMonth}
            .startOfWeekDay=${startOfWeekDay}
            .filterParams=${this.filterParams}
            .datePickerProps=${this.datePickerProps}
          ></md-datepicker-week>
        `);
        startOfWeekDay = addWeeks(startOfWeekDay, 1);
      } while (isSameMonth(startOfWeekDay, this.day) || weeks.length < 6);

      return weeks;
    };

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html` <div class="md-datepicker__month">${this.renderWeeks()}</div> `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-month": DatePickerMonth.ELEMENT;
  }
}
