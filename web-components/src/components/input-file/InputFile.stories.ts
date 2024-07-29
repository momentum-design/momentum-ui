import { ThemeNameValues } from "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./InputFile";

export default {
  title: "Components/Input File",
  component: "md-input-file",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-input-file"
    }
  }
};

export const InputFile = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const language = text("Enter Accept Language", "JavaScript");

  return html`
    <md-theme class="theme-toggle" id="input-file" ?darkTheme=${darkTheme} theme=${theme}>
      <md-input-file .accept-language=${language}></md-input-file>
    </md-theme>
  `;
};
