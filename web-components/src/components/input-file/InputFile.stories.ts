import "./InputFile";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { ThemeNameValues } from "@/components/theme/Theme";

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
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const language = text("Enter Accept Language", "JavaScript");

  return html`
    <md-theme class="theme-toggle" id="input-file" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-input-file .accept-language=${language}></md-input-file>
    </md-theme>
  `;
};
