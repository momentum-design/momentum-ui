import "@/components/date-time-picker/DateTimePicker";
import { DatePicker } from "../datepicker/DatePicker"; // Keep type import as a relative path
import { timeSpecificity } from "../timepicker/TimePicker"; // Keep type import as a relative path
import { TIME_UNIT } from "@/constants";
import { now } from "@/utils/dateUtils";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Date Time Picker",
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
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const weekStart = select("weekStart", DatePicker.weekStartDays, "");
  const twoDigitAutoTab = boolean("twoDigitAutoTab", false);
  const twentyFourHourFormat = boolean("twentyFourHourFormat", false);
  const theTimeSpecificity = select("timeSpecificity", timeSpecificity, TIME_UNIT.SECOND);
  const locale = text("locale", "en-US");
  const disabled = boolean("disabled", false);

  const value = text(
    "value",
    now()
      .set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      })
      .toISO({ suppressMilliseconds: true })
  );

  const minDate = text(
    "minimum date",
    now()
      .minus({ day: 5 })
      .toISODate()
  );

  const maxDate = text(
    "maximum date",
    now()
      .plus({ day: 30 })
      .toISODate()
  );

  return html`
    <md-theme class="theme-toggle" id="datetimepicker" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-date-time-picker
        ?disabled=${disabled}
        value=${value}
        minDate=${minDate}
        maxDate=${maxDate}
        locale=${locale}
        weekStart=${weekStart}
        ?two-digit-auto-tab=${twoDigitAutoTab}
        ?twenty-four-hour-format=${twentyFourHourFormat}
        timeSpecificity=${theTimeSpecificity}
      >
      </md-date-time-picker>
    </md-theme>
  `;
};
