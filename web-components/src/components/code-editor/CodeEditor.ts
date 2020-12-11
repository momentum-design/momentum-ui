import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/button/Button";

export const fileTypes = ["*/js"];

@customElement("md-code-editor")
export class CodeEditor extends LitElement {
  @property({ type: Object }) acceptTypes = "";

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <div class="md-code-editor">
        <div class="md-code-editor-header">
          <div class="md-code-editor-file">
            <label for="file-input" onclick="this.nextElementSibling.click()">
              <md-button variant="primary">
                Get
              </md-button>
            </label>
            <input type="file" class="md-code-editor-file-input" accept=${this.acceptTypes} />
          </div>
          <div class="md-code-editor-copy">
            <span class="md-code-editor-copy-btn">
              cURL
              <md-icon name="icon-copy_14"></md-icon>
            </span>
          </div>
        </div>
        <div class="md-code-editor-content">
          <pre>
            <code>

            </code>
          </pre>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-code-editor": CodeEditor;
  }
}
