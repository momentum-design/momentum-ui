/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isActionKey } from "@/utils/keyboard";
import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { CSSResultArray, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import "@/components/button/Button";
import "@/components/icon/Icon";
import styles from "./scss/module.scss";

export namespace AlertBanner {
  @customElementWithCheck("md-alert-banner")
  export class ELEMENT extends LitElement {
    @property({ type: String }) type = "";
    @property({ type: String }) message = "";
    @property({ type: Boolean }) closable = false;
    @property({ type: Boolean }) show = false;
    @property({ type: String, attribute: "close-aria-label" }) closeAriaLabel = "Close Banner";

    connectedCallback() {
      super.connectedCallback();
      this.requestUpdate("show");
    }

    onHide() {
      this.show = !this.show;
      this.dispatchEvent(new CustomEvent("alertBanner-hide"));
      this.requestUpdate("show");
    }

    handleKeyDown(event: KeyboardEvent) {
      const { code } = event;
      if (isActionKey(code)) {
        this.onHide();
      }
    }

    static get styles(): CSSResultArray {
      return [reset, styles];
    }

    render() {
      const classes = {
        "md-alert-banner": true,
        [`md-alert-banner--${this.type}`]: this.type
      };

      const closeBtn = this.closable
        ? html`
            <md-button
              class="md-alert-banner__close"
              hasRemoveStyle
              ariaLabel=${this.closeAriaLabel}
              @click="${this.onHide}"
              @keydown="${this.handleKeyDown}"
            >
              <md-icon name="icon-cancel_16"></md-icon>
            </md-button>
          `
        : null;

      return html`
        ${this.show
          ? html`
              <div class="${classMap(classes)}" role="alert">
                <div class="md-alert-banner__text">
                  <slot><span>${this.message}</span></slot>
                </div>
                ${closeBtn}
              </div>
            `
          : null}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-alert-banner": AlertBanner.ELEMENT;
  }
}
