import "./CodeEditor";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Code Editor",
  component: "md-code-editor",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-code-editor"
    }
  }
};

export const CodeEditor = () => {
  const acceptLanguage = text("acceptLanguage", "");
  return html`
    <md-code-editor .acceptLanguage=${acceptLanguage}></md-code-editor>
  `;
};
