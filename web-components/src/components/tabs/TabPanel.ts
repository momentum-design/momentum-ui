/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, property, PropertyValues } from "lit-element";
import styles from "./scss/module.scss";

export namespace TabPanel {
  @customElementWithCheck("md-tab-panel")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Boolean, reflect: true }) selected = false;

    static get styles() {
      return [reset, styles];
    }

    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("role", "tabpanel");
      this.setAttribute("tabindex", "0");
    }

    render() {
      return html`
        <slot></slot>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tab-panel": TabPanel.ELEMENT;
  }
}
