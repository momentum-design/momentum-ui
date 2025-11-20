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
    displayValue: { control: { type: "text" } },
    newMomentum: { control: { type: "select" }, options: [undefined, "true", "false"] },
    compactInput: { control: { type: "select" }, options: [undefined, "true", "false"] },
    positioningStrategy: {
      control: { type: "select" },
      options: [undefined, "absolute", "fixed"]
    },
    "is-date-picker-month-loading": { control: "boolean", defaultValue: false },
    "is-date-picker-month-error": { control: "boolean", defaultValue: false },
    errorMessages: { control: "object" },
    filterDate: {
      control: "object",
      description:
        "Function that takes a date string (YYYY-MM-DD) and returns boolean. Return true to disable the date.",
      table: {
        type: { summary: "(date: string) => boolean" }
      }
    },
    onRetry: {
      control: "object",
      description:
        "Callback function that gets triggered when the user clicks the retry button during error state in calendar",
      table: {
        type: { summary: "() => void" }
      }
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
        displayValue=${args.value}
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

export const campaignCallbackDatePicker: StoryObj = {
  name: "Campaign Callback Date Picker",
  args: {
    label: "Date",
    locale: "en-US",
    placeholder: "Select date",
    showDefaultNowDate: false,
    weekStart: "Monday",
    value: "",
    minDate: now().toISODate(),
    maxDate: now().plus({ days: 30 }).toISODate(),
    shouldCloseOnSelect: true,
    errorMessages: {
      HEADER: "Error",
      TEXT: "Trouble loading active window.",
      LOADING: "Loading...",
      RETRY: "Retry"
    },
    "is-date-picker-month-loading": false,
    "is-date-picker-month-error": false,
    filterDate: (date: string) => {
      const tomorrow = now().plus({ days: 1 }).toISODate();
      return date === tomorrow;
    },
    onRetry: () => {
      console.log("Retry button clicked - reloading calendar data");
    }
  },

  render: (args: Args) => {
    return html`
      <md-datepicker
        ?disabled=${args.disabled}
        ?should-close-on-select=${args.shouldCloseOnSelect}
        weekStart=${args.weekStart}
        locale=${args.locale}
        placeholder=${args.placeholder}
        .showDefaultNowDate=${args.showDefaultNowDate}
        .minDate=${args.minDate}
        .maxDate=${args.maxDate}
        .errorMessages=${args.errorMessages}
        .filterDate=${args.filterDate}
        .onRetry=${args.onRetry}
        ?is-date-picker-month-error=${args["is-date-picker-month-error"]}
        ?is-date-picker-month-loading=${args["is-date-picker-month-loading"]}
      >
      </md-datepicker>
    `;
  }
};
