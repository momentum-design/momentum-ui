import { now } from "@/utils/dateUtils";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs, select } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { weekStartDays } from "@/components/datepicker/DatePicker";
import { timeSpecificity } from "@/components/timepicker/TimePicker";
import { TIME_UNIT } from "@/constants";
import "@/components/date-time-picker/DateTimePicker";

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
  const lumos = boolean("Lumos Theme", false);
  const weekStart = select("weekStart", weekStartDays, "");
  const twoDigitAutoTab = boolean("twoDigitAutoTab", false);
  const twentyFourHourFormat = boolean("twentyFourHourFormat", false);
  const theTimeSpecificity = select("timeSpecificity", timeSpecificity, TIME_UNIT.SECOND);
  const locale = text("locale", "en-US");

  const value = text(
    "value",
    now().set({
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0
    }).toSQL()
  );

  const minDate = text(
    "minimum date",
    now()
      .minus({ day: 5 })
      .toSQLDate()
  );
  const maxDate = text(
    "maximum date",
    now()
      .plus({ day: 30 })
      .toSQLDate()
  );

  return html`
    <md-theme class="theme-toggle" id="datetimepicker" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-date-time-picker
        value=${value}
        minDate=${minDate}
        maxDate=${maxDate}
        locale=${locale}
        weekStart=${weekStart}
        ?two-digit-auto-tab=${twoDigitAutoTab}
        ?twenty-four-hour-format=${twentyFourHourFormat}
        timeSpecificity=${theTimeSpecificity}>
      </md-date-time-picker>
    </md-theme>
  `;
};
