import { withA11y } from "@storybook/addon-a11y";
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { html } from "lit";
import "./CodeEditor";

export default {
  title: "Components/Code Editor",
  component: "md-code-editor",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-code-editor"
    }
  }
};

export const CodeEditor = () => {
  const url = text("Url", "v1/contactCenter/agents/statistics");
  const method = text("Method", "post");
  const code = object(
    "Code",
    'module.exports = { presets: [["@babel/preset-env", { targets: { node: "current" } }]] };'
  );
  return html`
    <md-code-editor>
      <span slot="method">${method}</span>
      <span slot="code-url">${url}</span>
      <code class="javascript" slot="code-block">
        ${code}
    </md-code-editor>
  `;
};
