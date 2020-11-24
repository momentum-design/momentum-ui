import { now } from "@/utils/dateUtils";
import { withA11y } from "@storybook/addon-a11y";
import { text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./DatePicker";

export default {
  title: "Date Picker",
  component: "md-datepicker",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-datepicker"
    }
  }
};

export const Default = () => {
  return html`
    <md-datepicker></md-datepicker>
  `;
};

export const Filters = () => {
  const minDate = text(
    "minimum date",
    now()
      .minus({ day: 5 })
      .toSQLDate()
  );
  const maxDate = text(
    "maximum date",
    now()
      .plus({ day: 5 })
      .toSQLDate()
  );

  return html`
    <md-datepicker minDate=${minDate} maxDate=${maxDate}></md-datepicker>
  `;
};
