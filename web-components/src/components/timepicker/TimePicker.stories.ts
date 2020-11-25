import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./TimePicker";

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
  return html`
    <md-timepicker ?twentyfourhourformat=${twentyFourHourFormat}></md-timepicker>
  `;
};
