import { ThemeNameValues } from "@/components/theme/Theme";
import { now } from "@/utils/dateUtils";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { DatePicker as DP } from "./DatePicker"; // Keep type import as a relative path

export default {
  title: "Components/Date Picker",
  component: "md-datepicker",
  argTypes: {
    darkTheme: { control: "boolean", defaultValue: false },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    weekStart: { control: { type: "select", options: DP.weekStartDays }, defaultValue: "" },
    locale: { control: "text", defaultValue: "en-US" },
    disabled: { control: "boolean" },
    minDate: { control: "text", defaultValue: now().minus({ day: 5 }).toISODate() },
    maxDate: { control: "text", defaultValue: now().plus({ day: 30 }).toISODate() },
    value: { control: "text", defaultValue: now().toISODate() }
  },
  parameters: {
    a11y: {
      element: "md-datepicker"
    }
  }
};

export const DatePicker = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="datepicker" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-datepicker
        ?disabled=${args.disabled}
        ?should-close-on-select=${args.shouldCloseOnSelect}
        value=${args.value}
        weekStart=${args.weekStart}
        locale=${args.locale}
        minDate=${args.minDate}
        maxDate=${args.maxDate}
      >
      </md-datepicker>
    </md-theme>
  `;
};
