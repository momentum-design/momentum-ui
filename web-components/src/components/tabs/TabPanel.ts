/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import styles from "./scss/module.scss";

export namespace TabPanel {
  @customElementWithCheck("md-tab-panel")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: String, attribute: "name" }) name = "";
    @property({ type: String, attribute: "focusable-panel" }) focusablePanel = "true";

    static get styles() {
      return [reset, styles];
    }

    connectedCallback(): void {
      super.connectedCallback();
      this.setAttribute("role", "tabpanel");
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      if (this.focusablePanel === "true") {
        this.setAttribute("tabindex", "0");
      }
    }

    render() {
      return html` <slot></slot> `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tab-panel": TabPanel.ELEMENT;
  }
}
