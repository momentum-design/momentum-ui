import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./TimePicker";
import { timeSpecificity } from "./TimePicker";
import { TIME_UNIT } from "@/constants";

export default {
  title: "Time Picker",
  component: "md-timepicker",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-timepicker"
    }
  }
};

export const Default = () => {
  const twentyFourHourFormat = boolean("twentyFourHourFormat", false);
  const defaultTime = text("defaultTime", "12:00:00 AM");
  const theTimeSpecificity = select("timeSpecificity", timeSpecificity, TIME_UNIT.SECOND);

  return html`
    <md-timepicker ?twentyfourhourformat=${twentyFourHourFormat} defaultTime=${defaultTime} timeSpecificity=${theTimeSpecificity}></md-timepicker>
  `;
};
