import "@/components/country-code-picker/CountryCodePicker";
import { Args } from "@storybook/web-components";
import { html } from "lit";

export default {
  title: "Components/Country Code Picker",
  component: "md-country-code-picker",
  argTypes: {
    pill: { control: "boolean", defaultValue: false },
    disabled: { control: "boolean", defaultValue: false },
    showFlags: { control: "boolean", defaultValue: false },
    codePlaceholder: { control: "text", defaultValue: "+1" },
    countryCallingCode: { control: "text", defaultValue: "Enter Country Calling Code" }
  },
  parameters: {
    a11y: {
      element: "md-country-code-picker"
    }
  }
};

export const CountryCodePicker = (args: Args) => {
  return html`
    <md-country-code-picker
      ?pill=${args.pill}
      ?disabled=${args.disabled}
      ?show-flags=${args.showFlags}
      codePlaceholder=${args.codePlaceholder}
      country-calling-code=${args.countryCallingCode}
    >
    </md-country-code-picker>
  `;
};
