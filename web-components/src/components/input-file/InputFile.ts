/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, query, property, internalProperty } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/button/Button";

import { nothing } from "lit-html";
@customElement("md-input-file")
export class InputFile extends LitElement {
  @property({ type: String }) getLocalization = "Get";

  @query("input[type='file']") input!: HTMLInputElement;

  @internalProperty() private fileName = "";

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
      }
  }

  render() {
    return html`
      <div class="md-input-file" part="input-file">
        <label for="input-file">
          <md-button @click=${this.triggerFileLoad}>
            ${this.getLocalization.trim()}
          </md-button>
          ${this.fileName.length ? this.fileName : nothing}
        </label>
        <input type="file" id="input-file" name="input-file" @change=${(event: Event) => this.handleFile(event)} />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-input-file": InputFile;
  }
}
