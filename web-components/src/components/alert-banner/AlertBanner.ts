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

export const alertBannerAlignment = ["center", "leading"];

export namespace AlertBanner {
  export type Alignment = (typeof alertBannerAlignment)[number];

  @customElementWithCheck("md-alert-banner")
  export class ELEMENT extends LitElement {
    @property({ type: String }) type = "";
    @property({ type: String }) message = "";
    @property({ type: Boolean }) closable = false;
    @property({ type: Boolean }) show = false;
    @property({ type: String, attribute: "close-aria-label" }) closeAriaLabel = "Close Banner";
    @property({ type: Boolean }) showBannerTypeIcon = false;
    @property({ type: Boolean }) showRefreshButton = false;
    @property({ type: String }) alignment: AlertBanner.Alignment = "center";

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

    private get isLeadingAlignment() {
      return this.alignment === "leading";
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

    private get alertBannerClassMap() {
      return {
        "md-alert-banner": true,
        [`md-alert-banner--${this.type}`]: this.type,
        [`md-alert-banner--${this.alignment}`]: this.isLeadingAlignment,
        closable: this.closable
      };
    }

    private get alertBannerTextClassMap() {
      return {
        "md-alert-banner__text": true,
        leading: this.isLeadingAlignment
      };
    }

    private get alertBannerRightClassMap() {
      return {
        trailing: this.isLeadingAlignment
      };
    }

    render() {
      const closeBtn = this.closable
        ? html`
            <md-button
              class="md-alert-banner__close"
              hasRemoveStyle
              circle
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
            class="refresh-button"
            @click="${() => this.dispatchEvent(new CustomEvent("alertBanner-refresh-button-click"))}"
            variant="ghostInheritTextColor"
            circle
            size="20"
          >
            <md-icon name="refresh-bold" iconSet="momentumDesign" size="16"></md-icon>
          </md-button>`
        : nothing;

      return html`
        ${this.show
          ? html`
              <div class="${classMap(this.alertBannerClassMap)}" role="alert">
                <div class="${classMap(this.alertBannerTextClassMap)}">
                  ${leftOfTextSlot}
                  <slot><span>${this.message}</span></slot>
                  ${rightOfTextSlot}
                </div>
                <div class="md-alert-banner__right ${classMap(this.alertBannerRightClassMap)}">
                  <slot name="right"></slot>
                </div>
                <div class="close-div">${closeBtn}</div>
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
