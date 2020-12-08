import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { timeSpecificity } from "@/components/timepicker/TimePicker";
import { TIME_UNIT } from "@/constants";
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
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const twentyFourHourFormat = boolean("twentyFourHourFormat", false);
  const value = text("value", "12:00:00 AM");
  const theTimeSpecificity = select("timeSpecificity", timeSpecificity, TIME_UNIT.SECOND);

  return html`
    <md-theme class="theme-toggle" id="timepicker" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-timepicker ?twentyfourhourformat=${twentyFourHourFormat} value=${value} timeSpecificity=${theTimeSpecificity}></md-timepicker>
    </md-theme>
  `;
};
