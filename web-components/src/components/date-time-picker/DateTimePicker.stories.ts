import "@/components/date-time-picker/DateTimePicker";
import { ThemeNameValues } from "@/components/theme/Theme";
import { TIME_UNIT } from "@/constants";
import { now } from "@/utils/dateUtils";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { DatePicker } from "../datepicker/DatePicker"; // Keep type import as a relative path
import { timeSpecificity } from "../timepicker/TimePicker"; // Keep type import as a relative path

export default {
  title: "Components/Date Time Picker",
  component: "md-date-time-picker",
  argTypes: {
    darkTheme: { control: "boolean", defaultValue: false },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    weekStart: { control: { type: "select", options: DatePicker.weekStartDays }, defaultValue: "" },
    locale: { control: "text", defaultValue: "en-US" },
    disabled: { control: "boolean" },
    minDate: { control: "text", defaultValue: now().minus({ day: 5 }).toISODate() },
    maxDate: { control: "text", defaultValue: now().plus({ day: 30 }).toISODate() },
    value: { control: "text", defaultValue: now().toISO({ suppressMilliseconds: true }) },
    twoDigitAutoTab: { control: "boolean" },
    twentyFourHourFormat: { control: "boolean" },
    timeSpecificity: { control: { type: "select", options: timeSpecificity }, defaultValue: TIME_UNIT.SECOND }
  },
  parameters: {
    a11y: {
      element: "md-date-time-picker"
    }
  }
};

export const DateTimePicker = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="datetimepicker" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-date-time-picker
        ?disabled=${args.disabled}
        value=${args.value}
        minDate=${args.minDate}
        maxDate=${args.maxDate}
        locale=${args.locale}
        weekStart=${args.weekStart}
        ?two-digit-auto-tab=${args.twoDigitAutoTab}
        ?twenty-four-hour-format=${args.twentyFourHourFormat}
        timeSpecificity=${args.theTimeSpecificity}
      >
      </md-date-time-picker>
    </md-theme>
  `;
};
