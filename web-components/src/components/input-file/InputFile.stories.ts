import { Args } from "@storybook/web-components";
import { html } from "lit-html";
import "./InputFile";

export default {
  title: "Components/Input File",
  component: "md-input-file",
  argTypes: {
    acceptLanguage: { control: "text", defaultValue: "JavaScript", description: "Enter Accept Language" }
  },
  parameters: {
    a11y: {
      element: "md-input-file"
    }
  }
};

export const InputFile = (args: Args) => {
  return html` <md-input-file accept-language=${args.language}></md-input-file> `;
};
