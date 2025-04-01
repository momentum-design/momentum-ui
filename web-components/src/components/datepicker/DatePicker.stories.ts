import { now } from "@/utils/dateUtils";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { DatePicker as DP } from "./DatePicker"; // Keep type import as a relative path

export default {
  title: "Components/Date Picker",
  component: "md-datepicker",
  argTypes: {
    weekStart: { control: { type: "select" }, options: DP.weekStartDays },
    controlButtons: { control: "boolean" },
    locale: { control: { type: "text" } },
    disabled: { control: "boolean" },
    minDate: { control: { type: "text" } },
    maxDate: { control: { type: "text" } },
    value: { control: { type: "text" } },
    newMomentum: { control: { type: "select" }, options: [undefined, "true", "false"] },
    compactInput: { control: { type: "select" }, options: [undefined, "true", "false"] }
  },
  parameters: {
    a11y: {
      element: "md-datepicker"
    }
  }
};

export const DatePicker: StoryObj = {
  args: {
    locale: "en-US",
    minDate: now().minus({ day: 5 }).toISODate(),
    maxDate: now().plus({ day: 30 }).toISODate(),
    value: now().toISODate()
  },
  render: (args: Args) => {
    const controlButtons = args.controlButtons ? { apply: { value: "Apply" }, cancel: { value: "Cancel" } } : undefined;

    return html`
      <md-datepicker
        ?disabled=${args.disabled}
        ?should-close-on-select=${args.shouldCloseOnSelect}
        value=${args.value}
        weekStart=${args.weekStart}
        locale=${args.locale}
        .controlButtons=${controlButtons}
        minDate=${args.minDate}
        maxDate=${args.maxDate}
      >
      </md-datepicker>
    `;
  }
};
