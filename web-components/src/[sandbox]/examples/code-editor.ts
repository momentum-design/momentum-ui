import "@/components/code-editor/CodeEditor";
import { html } from "lit";

export const codeEditorTemplate = html`
  <h3>Code Editor</h3>
  <md-code-editor>
    <span slot="method">post</span>
    <span slot="code-url">v1/contactCenter/agents/statistics</span>
    <code class="javascript" slot="code-block">
      module.exports = { presets: [["@babel/preset-env", { targets: { node: "current" } }]] };
    </code>
  </md-code-editor>
`;
