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
      this.addEventListener("date-selection-change", e => {
        return this.handleDateSelection(e as CustomEvent);
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.removeEventListener("date-selection-change", () => {});
    }

    // TO DO : Need to force a re-render on the first date selection so that the DatePickerDay component renders the class md-datepicker__day--start-date and has filled-in black style

    // TODO: Find out why Key nav freezes
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

    handleDateSelection = (e: CustomEvent) => {
      // check if one date already selected
      if (this.startDate) {
        // then mark this selection as second date
        const selection = e.detail.data;
        const existing = DateTime.fromSQL(this.startDate);
        // compare to firstSelected for before/after chronological
        // set as startDate of endDate accordingly, correcting the other if need be.
        if (selection > existing) {
          this.endDate = this.dateToSqlTranslate(selection);
        } else {
          this.endDate = this.startDate;
          this.startDate = this.dateToSqlTranslate(selection);
          // TO DO: determing how this pivots or fills in based on existing selections
        }
      } else {
        this.startDate = this.dateToSqlTranslate(e.detail.data);
      }
      // check if earlier or later date
      this.updateValue();
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-date-range-picker": DateRangePicker.ELEMENT;
  }
}
