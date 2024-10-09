import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import "./CodeEditor";

export default {
  title: "Components/Code Editor",
  component: "md-code-editor",
  argTypes: {
    url: { control: "text", defaultValue: "v1/contactCenter/agents/statistics" },
    method: { control: "text", defaultValue: "post" },
    code: {
      control: "object",
      defaultValue: 'module.exports = { presets: [["@babel/preset-env", { targets: { node: "current" } }]] };'
    }
  },
  parameters: {
    a11y: {
      element: "md-code-editor"
    }
  }
};

export const CodeEditor = (args: Args) => {
  return html`
    <md-code-editor>
      <span slot="method">${args.method}</span>
      <span slot="code-url">${args.url}</span>
      <code class="javascript" slot="code-block"> ${args.code} </code>
    </md-code-editor>
  `;
};
