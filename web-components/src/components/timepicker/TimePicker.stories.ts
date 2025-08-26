import { TIME_UNIT } from "@/constants";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { timeSpecificity } from "./TimePicker"; // Keep type import as a relative path

const render = (args: Args) => html`
  <md-timepicker
    .twoDigitAutoTab=${args.twoDigitAutoTab}
    .twentyFourHourFormat=${args.twentyFourHourFormat}
    .showDefaultNowTime=${args.showDefaultNowTime}
    timeSpecificity=${args.theTimeSpecificity}
    locale=${args.locale}
    value=${args.value}
  >
  </md-timepicker>
`;

export const TimePicker: StoryObj = {
  args: {
    theTimeSpecificity: TIME_UNIT.SECOND,
    locale: "en-US",
    value: "00:00:00-08:00",
    showDefaultNowTime: true
  },
  render: render
};

export const TimePickerWithoutDefaultTime: StoryObj = {
  args: {
    theTimeSpecificity: TIME_UNIT.SECOND,
    locale: "en-US",
    showDefaultNowTime: false
    // No value passed - this will show empty placeholders
  },
  render: render
};

const meta: Meta = {
  title: "Components/Time Picker",
  component: "md-timepicker",
  argTypes: {
    theTimeSpecificity: { control: { type: "select" }, options: timeSpecificity }
  },
  parameters: {
    a11y: {
      element: "md-timepicker"
    }
  }
};

export default meta;
