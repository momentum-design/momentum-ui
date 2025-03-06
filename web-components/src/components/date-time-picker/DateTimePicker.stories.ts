import "@/components/date-time-picker/DateTimePicker";
import { TIME_UNIT } from "@/constants";
import { now } from "@/utils/dateUtils";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { DatePicker } from "../datepicker/DatePicker"; // Keep type import as a relative path
import { timeSpecificity } from "../timepicker/TimePicker"; // Keep type import as a relative path

export default {
  title: "Components/Date Time Picker",
  component: "md-date-time-picker",
  argTypes: {
    weekStart: { control: { type: "select" }, options: DatePicker.weekStartDays },
    locale: { control: "text", defaultValue: "en-US" },
    disabled: { control: "boolean" },
    minDate: { control: { type: "text" } },
    maxDate: { control: { type: "text" } },
    value: { control: { type: "text" } },
    twoDigitAutoTab: { control: "boolean" },
    twentyFourHourFormat: { control: "boolean" },
    timeSpecificity: { control: { type: "select" }, options: timeSpecificity, defaultValue: TIME_UNIT.SECOND }
  },
  parameters: {
    a11y: {
      element: "md-date-time-picker"
    }
  }
};

export const DateTimePicker: StoryObj = {
  args: {
    locale: "en-US",
    minDate: now().minus({ day: 5 }).toISODate(),
    maxDate: now().plus({ day: 30 }).toISODate(),
    value: now().toISO({ suppressMilliseconds: true }),
    timeSpecificity: TIME_UNIT.SECOND
  },
  render: (args: Args) => {
    return html`
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
    `;
  }
};
