/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/datepicker/datepicker-day/DatePickerDay";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { addDays, now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { DateTime } from "luxon";
import { DatePickerProps, DayFilters } from "@/utils/dateUtils";
import styles from "../scss/module.scss";

export namespace DatePickerWeek {
  @customElementWithCheck("md-datepicker-week")
  export class ELEMENT extends LitElement {
    @property({ attribute: false }) startOfWeekDay: DateTime = now();
    @property({ attribute: false }) viewAnchorMonth: number = now().month;
    @property({ attribute: false }) filterParams: DayFilters | undefined = undefined;
    @property({ attribute: false }) datePickerProps: DatePickerProps | undefined = undefined;

    renderDays = () => {
      const days = [0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const offsetDay = addDays(this.startOfWeekDay, offset);
        return html`
          <md-datepicker-day
            .viewAnchorMonth=${this.viewAnchorMonth}
            .day=${offsetDay}
            .filterParams=${this.filterParams}
            .datePickerProps=${this.datePickerProps}
          ></md-datepicker-day>
        `;
      });

      return days;
    };

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html` <div class="md-datepicker__week">${this.renderDays()}</div> `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker-week": DatePickerWeek.ELEMENT;
  }
}
