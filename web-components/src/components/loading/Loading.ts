/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";

type LoadingSize = "small" | "middle" | "large" | "";

@customElement("md-loading")
export class Loading extends LitElement {
  @property({ type: String }) size: LoadingSize = "";

  static get styles() {
    return [reset, styles];
  }

  get loadingClassMap() {
    return {
      [`md-loading--${this.size}`]: !!this.size
    };
  }

  render() {
    return html`
      <div class="md-loading ${classMap(this.loadingClassMap)}">
        <span class="md-loading__icon"></span>
        <span class="md-loading__icon"></span>
        <span class="md-loading__icon"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-loading": Loading;
  }
}
