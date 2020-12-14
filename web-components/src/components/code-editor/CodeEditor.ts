import reset from "@/wc_scss/reset.scss";
import {
  customElement,
  html,
  LitElement,
  query,
  property,
  PropertyValues,
  internalProperty,
  queryAssignedNodes
} from "lit-element";
import styles from "./scss/module.scss";
import hljs from "highlight.js/lib/core";
import "@/components/button/Button";

import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";
@customElement("md-code-editor")
export class CodeEditor extends LitElement {
  @property({ type: String, attribute: "accept-language" }) acceptLanguage = "javascript";
  @property({ type: String }) getLocalization = "Get";
  @property({ type: String }) copyLocalization = "Copy";
  @property({ type: String }) copiedLocalization = "Copied";

  @query("input[type='file']") input!: HTMLInputElement;
  @query(".md-code-editor-code-block") codeBlock!: HTMLPreElement;

  @internalProperty() private disableCopyButton = true;
  @internalProperty() private acceptTypes = "";
  @internalProperty() private fileName = "";
  @internalProperty() private copied = false;

  @queryAssignedNodes("code-block") slotNodes!: Node[];

  static get styles() {
    return [reset, styles];
  }

  triggerFileLoad(event: MouseEvent) {
    event.preventDefault();

    this.input.click();
  }

  handleSlotChange() {
    this.copied = false;
    if (this.slotNodes && this.slotNodes.length) {
      const codeBlock = this.slotNodes.find(node => (node as Element).tagName === "CODE");
      if (codeBlock) {
        const codeBlockText = codeBlock.textContent;
        if (codeBlockText) {
          this.highlightBlock(codeBlockText);
        }
      }
    }
  }

  async handleFile(event: Event) {
    event.preventDefault();

    this.disableCopyButton = true;
    this.copied = false;

    const fileList = this.input.files;
    if (fileList && fileList.length !== 0)
      for (const file of fileList) {
        let fileTextContent = "";
        this.fileName = file.name;

        try {
          fileTextContent = (await this.readFile(file)) as string;
        } catch (e) {
          fileTextContent = "";
        } finally {
          if (fileTextContent.length) {
            this.highlightBlock(fileTextContent);
          }
        }
      }
  }

  copyClipboard() {
    if (!this.disableCopyButton) {
      this.clearSelection();
      this.selectTarget(this.codeBlock);
    }
  }

  private copyText() {
    try {
      document.execCommand("copy");
      this.copied = true;
    } catch (err) {
      console.warn("Copy text failed");
      this.copied = false;
    } finally {
      this.clearSelection();
    }
  }

  private select(element: HTMLElement) {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(element);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  private selectTarget(target: HTMLElement) {
    this.select(target);
    this.copyText();
  }

  private clearSelection() {
    const selection = window.getSelection();
    if (selection) {
      selection.empty();
      selection.collapse(this.codeBlock, 0);
    }
  }

  private highlightBlock(text: string) {
    this.codeBlock.innerText = text;
    hljs.highlightBlock(this.codeBlock);
    this.disableCopyButton = false;
  }

  private readFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = res => {
        resolve(res.target!.result);
      };
      reader.onerror = err => reject(err);
      reader.readAsText(file);
    });
  }

  private async importLanguage(language: string) {
    try {
      const { default: importLanguage } = await import(`highlight.js/lib/languages/${language}`);
      hljs.registerLanguage(`${language}`, importLanguage);
      this.setAcceptTypes();
    } catch {
      console.warn("Please set correct language name");
    }
  }

  private getAllAcceptTypes() {
    const listLanguages = hljs.listLanguages();
    if (listLanguages.length) {
      return listLanguages
        .map((language: string) => hljs.getLanguage(`${language}`).aliases)
        .map((aliases: string[]) => aliases.map((alias: string) => `.${alias}`))
        .join(",");
    }
    return "";
  }

  private setAcceptTypes() {
    this.acceptTypes = this.getAllAcceptTypes();
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("acceptLanguage")) {
      this.importLanguage(this.acceptLanguage);
    }
  }

  render() {
    return html`
      <div class="md-code-editor" part="code-editor">
        <div class="md-code-editor-header">
          <div class="md-code-editor-file">
            <label for="file-input">
              <md-button color="blue" class="md-code-editor-file-btn" @click=${this.triggerFileLoad}>
                ${this.getLocalization.trim()}
              </md-button>
              ${this.fileName.length ? this.fileName : nothing}
            </label>
            <input
              type="file"
              id="file-input"
              name="file-input"
              accept=${ifDefined(this.acceptTypes || undefined)}
              @change=${this.handleFile}
            />
          </div>
          <div class="md-code-editor-copy">
            <span class="md-code-editor-copy-text"
              >${this.copied ? this.copiedLocalization.trim() : this.copyLocalization.trim()}</span
            >
            <md-button
              circle
              size="20"
              ?disabled=${this.disableCopyButton}
              @click=${this.copyClipboard}
              class="md-code-editor-copy-btn"
            >
              <md-icon slot="icon" name="icon-copy_16"></md-icon>
            </md-button>
          </div>
        </div>
        <div class="md-code-editor-content">
          <pre class="md-code-editor-code-block">
            <slot name="code-block" @slotchange=${this.handleSlotChange}>
              <code class=${this.acceptLanguage}>

              </code>
            </slot>
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
