import { ThemeNameValues } from "@/components/theme/Theme";
import { TIME_UNIT } from "@/constants";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";
import { timeSpecificity } from "./TimePicker"; // Keep type import as a relative path

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="timepicker" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-timepicker
      ?two-digit-auto-tab=${args.twoDigitAutoTab}
      ?twenty-four-hour-format=${args.twentyFourHourFormat}
      timeSpecificity=${args.theTimeSpecificity}
      locale=${args.locale}
      value=${args.value}
    >
    </md-timepicker>
  </md-theme>
`;

export const TimePicker: StoryObj = {
  args: {
    theTimeSpecificity: TIME_UNIT.SECOND,
    locale: "en-US",
    value: "00:00:00-08:00"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Time Picker",
  component: "md-timepicker",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    theTimeSpecificity: { control: { type: "select", options: timeSpecificity } }
  },
  parameters: {
    a11y: {
      element: "md-timepicker"
    }
  }
};

export default meta;
