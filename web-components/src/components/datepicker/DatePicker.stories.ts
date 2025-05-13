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
    useISOFormat: { control: "boolean", defaultValue: true },
    validateDate: { control: "boolean", defaultValue: true },
    disabled: { control: "boolean" },
    minDate: { control: { type: "text" } },
    maxDate: { control: { type: "text" } },
    showDefaultNowDate: { control: "boolean", defaultValue: true },
    value: { control: { type: "text" } },
    newMomentum: { control: { type: "select" }, options: [undefined, "true", "false"] },
    compactInput: { control: { type: "select" }, options: [undefined, "true", "false"] },
    positioningStrategy: {
      control: { type: "select" },
      options: [undefined, "absolute", "fixed"]
    }
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
    minDate: now().minus({ days: 5 }).toISODate(),
    maxDate: now().plus({ days: 30 }).toISODate(),
    value: now().toISODate(),
    positioningStrategy: undefined
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
        placeholder=${args.placeholder}
        .showDefaultNowDate=${args.showDefaultNowDate}
        .useISOFormat=${args.useISOFormat}
        .validateDate=${args.validateDate}
        .controlButtons=${controlButtons}
        minDate=${args.minDate}
        maxDate=${args.maxDate}
        positioning-strategy=${args.positioningStrategy}
      >
      </md-datepicker>
    `;
  }
};


// Sub-story focusing on placeholder behavior
export const Placeholder: StoryObj = {
  name: "With Placeholder",
  args: {
    locale: "en-US",
    placeholder: "Select date",
    showDefaultNowDate: false,
    useISOFormat: true,
    disabled: false,
    controlButtons: false,
    weekStart: "Sunday",
    value: "",
    minDate: "",
    maxDate: "",
    positioningStrategy: undefined
  },
  
  render: (args: Args) => {
    return html`
      <md-datepicker
        ?disabled=${args.disabled}
        ?should-close-on-select=${args.shouldCloseOnSelect}
        weekStart=${args.weekStart}
        locale=${args.locale}
        placeholder=${args.placeholder}
        .useISOFormat=${args.useISOFormat}
        .showDefaultNowDate=${args.showDefaultNowDate}
        minDate=${args.minDate}
        maxDate=${args.maxDate}
        positioning-strategy=${args.positioningStrategy}
      >
      </md-datepicker>
    `;
  }
};
