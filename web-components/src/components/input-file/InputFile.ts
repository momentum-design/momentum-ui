import "../button/Button";
import { customElementWithCheck } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import hljs from "highlight.js/lib/core";
import { html, LitElement, nothing, PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./scss/module.scss";

export namespace InputFile {
  @customElementWithCheck("md-input-file")
  export class ELEMENT extends LitElement {
    @property({ type: String, attribute: "accept-language" }) acceptLanguage = "javascript";
    @property({ type: String }) getLocalization = "Input File";

    @query("input[type='file']") input!: HTMLInputElement;

    @state() private acceptTypes = "";
    @state() private fileName = "";

    static get styles() {
      return [reset, styles];
    }

    triggerFileLoad(event: MouseEvent) {
      event.preventDefault();
      this.input.click();
    }

    async handleFile(event: Event) {
      event.preventDefault();

      const fileList = this.input.files;
      if (fileList && fileList.length !== 0)
        for (const file of fileList) {
          this.fileName = file.name;

          try {
            (await this.readFile(file)) as string;
          } catch (e) {
            console.error("Error reading file", e);
          }
        }
    }

    private readFile(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (res) => {
          resolve(res.target!.result);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsText(file);
      });
    }

    private async importLanguage(language: string) {
      try {
        const { default: importLanguage } = await import(
          /* webpackIgnore: true */ `highlight.js/lib/languages/${language}`
        );
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
        <div class="md-input-file">
          <label for="file-input">
            <md-button color="blue" class="md-input-file-btn" @click=${this.triggerFileLoad}>
              ${this.getLocalization.trim()}
            </md-button>
            ${this.fileName.length ? this.fileName : nothing}
          </label>
          <input
            type="file"
            id="file-input"
            name="file-input"
            accept=${ifDefined(this.acceptTypes || undefined)}
            @change=${(event: Event) => this.handleFile(event)}
          />
        </div>
      `;
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "md-input-file": InputFile.ELEMENT;
  }
}
