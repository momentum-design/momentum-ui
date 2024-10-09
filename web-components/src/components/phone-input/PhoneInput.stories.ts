import "@/components/phone-input/PhoneInput";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import "../theme/Theme";

export default {
  title: "Components/Phone Input",
  component: "md-phone-input",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    pill: { control: "boolean", defaultValue: false },
    disabled: { control: "boolean", defaultValue: false },
    showFlags: { control: "boolean", defaultValue: false },
    codePlaceholder: { control: "text", defaultValue: "+1" },
    numberPlaceholder: { control: "text", defaultValue: "Enter Phone Number" },
    countryCallingCode: { control: "text", defaultValue: "Enter Phone Number" },
    value: { control: "text", defaultValue: "" },
    errorMessage: { control: "text", defaultValue: "" }
  },
  parameters: {
    a11y: {
      element: "md-phone-input"
    }
  }
};

export const PhoneInput = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="datetimepicker" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-phone-input
        ?pill=${args.pill}
        ?disabled=${args.disabled}
        ?show-flags=${args.showFlags}
        value=${args.value}
        codePlaceholder=${args.codePlaceholder}
        numberPlaceholder=${args.numberPlaceholder}
        country-calling-code=${args.countryCallingCode}
        errorMessage=${args.errorMessage}
      >
      </md-phone-input>
    </md-theme>
  `;
};
