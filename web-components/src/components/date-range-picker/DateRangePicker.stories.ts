import "@/components/date-range-picker/DateRangePicker";
import { now } from "@/utils/dateUtils";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { DatePicker as DP } from "../datepicker/DatePicker"; // Keep type import as a relative path
import "../theme/Theme";

const meta: Meta = {
  title: "Components/Date Range Picker",
  component: "md-date-range-picker",
  argTypes: {
    weekStart: { control: { type: "select" }, options: DP.weekStartDays },
    locale: { control: "text" },
    controlButtons: { control: "boolean" },
    disabled: { control: "boolean" },
    minDate: { control: "text", defaultValue: now().minus({ day: 5 }).toISODate() },
    maxDate: { control: "text", defaultValue: now().plus({ day: 30 }).toISODate() },
    value: { control: "text", defaultValue: `${now().minus({ day: 2 }).toISODate()} - ${now().toISODate()}` },
    startDate: { control: "text", defaultValue: now().minus({ day: 2 }).toISODate() },
    endDate: { control: "text", defaultValue: now().toISODate() }
  },
  parameters: { a11y: { element: "md-date-range-picker" } }
};

export default meta;

const render = (args: Args) => {
  const controlButtons = args.controlButtons ? { apply: { value: "Apply" }, cancel: { value: "Cancel" } } : undefined;

  return html`
    <md-date-range-picker
      ?disabled=${args.disabled}
      ?should-close-on-select=${args.shouldCloseOnSelect}
      value=${args.value}
      weekStart=${args.weekStart}
      locale=${args.locale}
      minDate=${args.minDate}
      maxDate=${args.maxDate}
      start-date=${args.startDate}
      .controlButtons=${controlButtons}
      end-date=${args.endDate}
    >
    </md-date-range-picker>
  `;
};

export const DateRangePicker: StoryObj = {
  args: { disabled: false, shouldCloseOnSelect: false, locale: "en-US" },
  render: render
};
