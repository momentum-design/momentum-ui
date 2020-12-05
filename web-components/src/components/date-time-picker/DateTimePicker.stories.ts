import { now } from "@/utils/dateUtils";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./DateTimePicker";

export default {
  title: "Date Time Picker",
  component: "md-date-time-picker",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-date-time-picker"
    }
  }
};

export const DateTimePicker = () => {
  const darkTheme = boolean("darkMode", false);
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
    <md-theme ?darkTheme=${darkTheme}>
      <md-date-time-picker minDate=${minDate} maxDate=${maxDate}></md-date-time-picker>>
    </md-theme>
  `;
};
