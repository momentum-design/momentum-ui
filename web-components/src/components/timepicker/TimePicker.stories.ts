import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { timeSpecificity } from "./TimePicker"; // Keep type import as a relative path
import { TIME_UNIT } from "@/constants";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Time Picker",
  component: "md-timepicker",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-timepicker"
    }
  }
};

export const TimePicker = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const twoDigitAutoTab = boolean("twoDigitAutoTab", false);
  const twentyFourHourFormat = boolean("twentyFourHourFormat", false);
  const theTimeSpecificity = select("timeSpecificity", timeSpecificity, TIME_UNIT.SECOND);
  const locale = text("locale", "en-US");
  const value = text("value", "00:00:00-08:00");

  return html`
    <md-theme class="theme-toggle" id="timepicker" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-timepicker
        ?two-digit-auto-tab=${twoDigitAutoTab}
        ?twenty-four-hour-format=${twentyFourHourFormat}
        timeSpecificity=${theTimeSpecificity}
        locale=${locale}
        value=${value}>
      </md-timepicker>
    </md-theme>
  `;
};
