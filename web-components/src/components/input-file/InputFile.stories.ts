import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit";
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
  const lumos = boolean("Lumos Theme", false);
  const language = text("Enter Accept Language", "JavaScript");

  return html`
    <md-theme class="theme-toggle" id="input-file" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-input-file .accept-language=${language}></md-input-file>
    </md-theme>
  `;
};
