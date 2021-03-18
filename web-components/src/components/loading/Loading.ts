/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";

export namespace Loading {
  export type LoadingSize = "small" | "middle" | "large" | "";

  @customElementWithCheck("md-loading")
  export class ELEMENT extends LitElement {
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
}

declare global {
  interface HTMLElementTagNameMap {
    "md-loading": Loading.ELEMENT;
  }
}
