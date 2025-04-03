import "@/components/badge/Badge";
import "@/components/button/Button";
import { customElementWithCheck } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import hljs from "highlight.js/lib/core";
import { html, LitElement, PropertyValues } from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import styles from "./scss/module.scss";

export type Method = "get" | "post";

export namespace CodeEditor {
  @customElementWithCheck("md-code-editor")
  export class ELEMENT extends LitElement {
    @property({ type: String }) copyLocalization = "cURL";
    @property({ type: String }) copiedLocalization = "Copied";
    @property({ type: String }) method: Method = "get";
    @property({ type: String, attribute: "accept-language" }) acceptLanguage = "javascript";
    @property({ type: String }) url = "javascript";

    @query("input[type='file']") input!: HTMLInputElement;
    @query(".md-code-editor-code-block") codeBlock!: HTMLPreElement;
    @query(".md-code-editor-url") codeUrl!: HTMLSpanElement;

    @state() private disableCopyButton = true;
    @state() private acceptTypes = "";
    @state() private copied = false;

    @queryAssignedNodes({ slot: "code-block" }) slotNodes!: Node[];
    @queryAssignedNodes({ slot: "code-url" }) slotUrl!: Node[];

    static get styles() {
      return [reset, styles];
    }

    handleSlotChange() {
      if (this.slotNodes && this.slotNodes.length) {
        const codeBlock = this.slotNodes.find((node) => (node as Element).tagName === "CODE");
        if (codeBlock) {
          const codeBlockText = codeBlock.textContent;
          if (codeBlockText) {
            this.highlightBlock(codeBlockText);
          }
        }
      }
    }

    handleUrlSlotChange() {
      this.copied = false;
      if (this.slotUrl && this.slotUrl.length) {
        const codeUrl = this.slotUrl.find((node) => node as HTMLSpanElement);
        if (codeUrl) {
          const codeUrlText = codeUrl.textContent;
          if (codeUrlText) {
            this.copyUrl(codeUrlText);
          }
        }
      }
    }

    private highlightBlock(text?: string) {
      if (text) {
        this.codeBlock.innerText = text;
      }
      hljs.highlightElement(this.codeBlock);
    }

    private copyUrl(copyUrl: string) {
      this.codeUrl.innerText = copyUrl;
      this.disableCopyButton = false;
    }

    copyClipboard() {
      if (!this.disableCopyButton) {
        this.selectTarget(this.codeUrl);
      }
    }

    private copyText() {
      try {
        document.execCommand("copy");
        this.copied = true;
      } catch (_err) {
        console.warn("Copy text failed");
        this.copied = false;
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
      if (changedProperties.has("acceptTypes")) {
        this.highlightBlock();
      }
    }

    render() {
      return html`
        <div class="md-code-editor" part="code-editor">
          <div class="md-code-editor-header">
            <div class="md-code-editor-name">
              <md-badge color="blue">
                <slot name="method" method=${this.method}></slot>
              </md-badge>
              <span class="md-code-editor-url">
                <slot name="code-url" @slotchange=${this.handleUrlSlotChange}>${this.url}</slot>
              </span>
            </div>
            <div class="md-code-editor-copy">
              <span>${this.copied ? this.copiedLocalization.trim() : this.copyLocalization.trim()}</span>
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
}
declare global {
  interface HTMLElementTagNameMap {
    "md-code-editor": CodeEditor.ELEMENT;
  }
}
