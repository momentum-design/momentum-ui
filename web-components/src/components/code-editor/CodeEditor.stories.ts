import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./CodeEditor";

export default {
  title: "Components/Code Editor",
  component: "md-code-editor",
  argTypes: {
    url: { control: "text" },
    method: { control: "text" },
    code: { control: "object" }
  },
  parameters: {
    a11y: {
      element: "md-code-editor"
    }
  }
};

const render = (args: Args) => {
  return html`
    <md-code-editor>
      <span slot="method">${args.method}</span>
      <span slot="code-url">${args.url}</span>
      <code class="javascript" slot="code-block"> ${args.code} </code>
    </md-code-editor>
  `;
};

export const CodeEditor: StoryObj = {
  args: {
    url: "v1/contactCenter/agents/statistics",
    method: "post",
    code: 'module.exports = { presets: [["@babel/preset-env", { targets: { node: "current" } }]] };'
  },
  render: render
};
