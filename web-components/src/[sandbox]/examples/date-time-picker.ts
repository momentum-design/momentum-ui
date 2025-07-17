import "@/components/date-time-picker/DateTimePicker";
import { now } from "@/utils/dateUtils";
import { css, customElement, html, LitElement } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";

const minDate = now().minus({ day: 5 }).toISODate();

const maxDate = now().plus({ day: 5 }).toISODate();

@customElement("date-time-picker-sandbox")
class DateTimePickerSandbox extends LitElement {
  static get styles() {
    return [
      css`
        h3 {
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
        }
      `
    ];
  }

  render() {
    return html`
      <h2 class="sandbox-header">md-date-time-picker</h2>
      <h3>date-time-picker</h3>
      <md-date-time-picker></md-date-time-picker>
      <h3>date-time-picker with user's system locale</h3>
      <md-date-time-picker .useISOFormat=${false}></md-date-time-picker>
      <h3>date-time-picker with "ru" locale</h3>
      <md-date-time-picker locale="ru" .useISOFormat=${false}></md-date-time-picker>
      <h3>date-time-picker with "en-US" locale</h3>
      <md-date-time-picker locale="en-US" .useISOFormat=${false}></md-date-time-picker>
      <h3>date-time-picker with minDate & maxDate</h3>
      <md-date-time-picker
        minDate=${ifDefined(minDate ?? undefined)}
        maxDate=${ifDefined(maxDate ?? undefined)}
      ></md-date-time-picker>
      <h3>date-time-picker with dateValue & timeValue</h3>
      <md-date-time-picker date-value="2021-01-31" time-value="08:20:00-08:00"></md-date-time-picker>
      <h3>date-time-picker with value</h3>
      <md-date-time-picker value="2021-02-14T12:00:00-08:00"></md-date-time-picker>
      <h3>disabled date-time-picker</h3>
      <md-date-time-picker value="2021-02-14T12:00:00-08:00" disabled></md-date-time-picker>
      <h3>Call Date</h3>
      <md-date-time-picker value="2021-02-14T12:00:00-08:00" ariaLabel="Call Date"></md-date-time-picker>
      <h3>date time picker with accept and cancel buttons</h3>
      <md-date-time-picker
        .controlButtons=${{ apply: { value: "Apply" }, cancel: { value: "Cancel" } }}
        .shouldCloseOnSelect=${true}
        value="2021-01-31"
      ></md-date-time-picker>
      <md-date-time-picker
        .controlButtons=${{ apply: { value: "Apply" }, cancel: { value: "Cancel" } }}
        .shouldCloseOnSelect=${true}
        .showDefaultNowDate=${false}
      ></md-date-time-picker>

      <h3>date time picker with custom placeholder</h3>
      <md-date-time-picker
        placeholder=${"Select date and time"}
        .showDefaultNowDate=${false}
        .useISOFormat=${false}
        .disableDateValidation=${true}
        .controlButtons=${{ apply: { value: "Apply" }, cancel: { value: "Cancel" } }}
        .shouldCloseOnSelect=${true}
      ></md-date-time-picker>
    `;
  }
}

export const dateTimePickerTemplate = html` <date-time-picker-sandbox></date-time-picker-sandbox> `;
