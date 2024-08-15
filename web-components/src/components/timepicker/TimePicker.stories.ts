import { ThemeNameValues } from "@/components/theme/Theme";
import { TIME_UNIT } from "@/constants";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { timeSpecificity } from "./TimePicker"; // Keep type import as a relative path

export default {
  title: "Components/Time Picker",
  component: "md-timepicker",
  parameters: {
    a11y: {
      element: "md-timepicker"
    }
  }
};

export const TimePicker = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const twoDigitAutoTab = boolean("twoDigitAutoTab", false);
  const twentyFourHourFormat = boolean("twentyFourHourFormat", false);
  const theTimeSpecificity = select("timeSpecificity", timeSpecificity, TIME_UNIT.SECOND);
  const locale = text("locale", "en-US");
  const value = text("value", "00:00:00-08:00");

  return html`
    <md-theme class="theme-toggle" id="timepicker" ?darkTheme=${darkTheme} theme=${theme}>
      <md-timepicker
        ?two-digit-auto-tab=${twoDigitAutoTab}
        ?twenty-four-hour-format=${twentyFourHourFormat}
        timeSpecificity=${theTimeSpecificity}
        locale=${locale}
        value=${value}
      >
      </md-timepicker>
    </md-theme>
  `;
};
