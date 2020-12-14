import "@/components/code-editor/CodeEditor";
import { html } from "lit-element";

export const codeEditorTemplate = html`
  <h3>Default</h3>
  <md-code-editor></md-code-editor>
  <h3>Slotted Code</h3>
  <md-code-editor>
    <code class="javascript" slot="code-block">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </code>
  </md-code-editor>
`;
