import "@/components/phone-input/PhoneInput";
import { ThemeNameValues } from "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "../theme/Theme";

export default {
  title: "Components/Phone Input",
  component: "md-phone-input",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-phone-input"
    }
  }
};

export const PhoneInput = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const pill = boolean("pill", false);
  const disabled = boolean("disabled", false);
  const showFlags = boolean("showFlags", false);

  const codePlaceholder = text("codePlaceholder", "+1");
  const numberPlaceholder = text("numberPlaceholder", "Enter Phone Number");
  const countryCallingCode = text("country-calling-code", "Enter Phone Number");
  const value = text("value", "");
  const errorMessage = text("errorMessage", "");

  return html`
    <md-theme class="theme-toggle" id="datetimepicker" ?darkTheme=${darkTheme} theme=${theme}>
      <md-phone-input
        ?pill=${pill}
        ?disabled=${disabled}
        ?show-flags=${showFlags}
        value=${value}
        codePlaceholder=${codePlaceholder}
        numberPlaceholder=${numberPlaceholder}
        country-calling-code=${countryCallingCode}
        errorMessage=${errorMessage}
      >
      </md-phone-input>
    </md-theme>
  `;
};
