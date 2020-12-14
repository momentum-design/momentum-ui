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

  @query("input[type='file']") input!: HTMLInputElement;
  @query(".md-code-editor-code-block") codeBlock!: HTMLPreElement;

  @internalProperty() private acceptTypes = "";
  @internalProperty() private fileName = "";

  @queryAssignedNodes("code-block") slotNodes!: Node[];

  static get styles() {
    return [reset, styles];
  }

  triggerFileLoad(event: MouseEvent) {
    event.preventDefault();

    this.input.click();
  }

  handleSlotChange() {
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
    this.clearSelection();
    this.selectTarget(this.codeBlock);
  }

  private copyText() {
    let succeeded;

    try {
      succeeded = document.execCommand("copy");
    } catch (err) {
      succeeded = false;
    } finally {
      this.clearSelection();
    }
    this.handleResult(succeeded);
  }

  private handleResult(succeeded: boolean) {
    if (!succeeded) {
      console.warn("Can't copy text");
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
              <md-button variant="primary" @click=${this.triggerFileLoad}></md-button>
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
            <span class="md-code-editor-copy-btn">
              <md-icon name="icon-copy_14" @click=${this.copyClipboard}></md-icon>
            </span>
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
