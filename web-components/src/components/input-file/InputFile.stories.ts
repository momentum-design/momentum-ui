import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import "./InputFile";

export default {
  title: "Components/Input File",
  component: "md-input-file",
  argTypes: {
    acceptLanguage: { control: "text", defaultValue: "JavaScript", description: "Enter Accept Language" },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-input-file"
    }
  }
};

export const InputFile = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="input-file" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-input-file accept-language=${args.language}></md-input-file>
    </md-theme>
  `;
};
