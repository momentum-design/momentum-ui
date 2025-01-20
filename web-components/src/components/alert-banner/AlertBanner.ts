/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { isActionKey } from "@/utils/keyboard";
import reset from "@/wc_scss/reset.scss";
import { CSSResultArray, html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";

export namespace AlertBanner {
  @customElementWithCheck("md-alert-banner")
  export class ELEMENT extends LitElement {
    @property({ type: String }) type = "";
    @property({ type: String }) message = "";
    @property({ type: Boolean }) closable = false;
    @property({ type: Boolean }) show = false;
    @property({ type: String, attribute: "close-aria-label" }) closeAriaLabel = "Close Banner";
    @property({ type: Boolean }) showBannerTypeIcon = false;
    @property({ type: Boolean }) showRefreshButton = false;

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

    getIconForType() {
      switch (this.type) {
        case "error":
          return "error-legacy-badge-filled";
        case "warning":
          return "warning-filled";
        case "success":
          return "check-circle-badge-filled";
        default:
          return "info-badge-filled";
      }
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
              <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
            </md-button>
          `
        : null;

      const leftOfTextSlot = this.showBannerTypeIcon
        ? html` <md-icon name="${this.getIconForType()}" iconSet="momentumDesign" size="16"> </md-icon> `
        : html`<slot name="left"></slot>`;

      const rightOfTextSlot = this.showRefreshButton
        ? html` <md-button
            @click="${() => this.dispatchEvent(new CustomEvent("alertBanner-refresh-button-click"))}"
            variant="ghostInheritTextColor"
            circle
            size="20"
          >
            <md-icon name="refresh-bold" iconSet="momentumDesign" size="16" style="line-height: 16px"></md-icon>
          </md-button>`
        : nothing;

      return html`
        ${this.show
          ? html`
              <div class="${classMap(classes)}" role="alert">
                <div class="md-alert-banner__text">
                  ${leftOfTextSlot}
                  <slot><span>${this.message}</span></slot>
                  ${rightOfTextSlot}
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
