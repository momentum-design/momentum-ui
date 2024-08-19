import { object, text } from '@storybook/addon-knobs';
import { html } from "lit-element";
import "./CodeEditor";

export default {
  title: "Components/Code Editor",
  component: "md-code-editor",
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
