import "@/components/date-time-picker/DateTimePicker";
import { ThemeNameValues } from "@/components/theme/Theme";
import { TIME_UNIT } from "@/constants";
import { now } from "@/utils/dateUtils";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { DatePicker } from "../datepicker/DatePicker"; // Keep type import as a relative path
import { timeSpecificity } from "../timepicker/TimePicker"; // Keep type import as a relative path

export default {
  title: "Components/Date Time Picker",
  component: "md-date-time-picker",
  parameters: {
    a11y: {
      element: "md-date-time-picker"
    }
  }
};

export const DateTimePicker = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
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

  const minDate = text("minimum date", now().minus({ day: 5 }).toISODate());

  const maxDate = text("maximum date", now().plus({ day: 30 }).toISODate());

  return html`
    <md-theme class="theme-toggle" id="datetimepicker" ?darkTheme=${darkTheme} theme=${theme}>
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
