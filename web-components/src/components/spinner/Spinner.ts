/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit";
import { styleMap } from "lit/directives/style-map";
import styles from "./scss/module.scss";

export namespace Spinner {
  @customElementWithCheck("md-spinner")
  export class ELEMENT extends LitElement {
    @property({ type: Number, reflect: true }) size = 56;
    static get styles() {
      return [reset, styles];
    }

    get spinnerStyleMap() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    }

    render() {
      return html`
        <i class="md-spinner" part="spinner" style=${styleMap(this.spinnerStyleMap)}></i>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-spinner": Spinner.ELEMENT;
  }
}
