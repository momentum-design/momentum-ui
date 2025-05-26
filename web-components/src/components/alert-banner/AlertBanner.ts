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
import { CSSResultArray, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./scss/module.scss";

export const alertBannerType = ["default", "accent", "warning", "error", "success", "default-momentum", "promotional"];
export const alertBannerAlignment = ["center", "leading"];

export namespace AlertBanner {
  export type Type = (typeof alertBannerType)[number];
  export type Alignment = (typeof alertBannerAlignment)[number];

  @customElementWithCheck("md-alert-banner")
  export class ELEMENT extends LitElement {
    @property({ type: String }) type: AlertBanner.Type = "";
    @property({ type: String }) titleText = "";
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
          return "error-legacy-bold";
        case "warning":
          return "warning-bold";
        case "success":
          return "check-circle-bold";
        default:
          return "info-circle-bold";
      }
    }

    private get alertBannerClassMap() {
      return {
        "md-alert-banner": true,
        [`md-alert-banner--${this.type}`]: this.type,
        [`md-alert-banner--leading`]: this.isLeadingAlignment || this.titleText,
        closable: this.closable,
        "with-title": !!this.titleText
      };
    }

    private get alertBannerTextClassMap() {
      return {
        "md-alert-banner__text": true,
        "md-alert-banner__with-title": !!this.titleText,
        leading: this.isLeadingAlignment || this.titleText
      };
    }

    private get alertBannerRightClassMap() {
      return {
        trailing: this.isLeadingAlignment || this.titleText
      };
    }

    private get closeButtonTemplate() {
      const closeDivClass = this.titleText ? "close-div with-title" : "close-div";
      return html`
        <div class="${closeDivClass}">
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
        </div>
      `;
    }

    private get titleTemplate() {
      return this.titleText ? html`<div class="md-alert-banner__title">${this.titleText}</div>` : nothing;
    }

    render() {
      const closeBtn = this.closable ? html` ${this.closeButtonTemplate} ` : null;
      const textContentStyle = this.showBannerTypeIcon || this.titleText ? "with-icon" : "";
      const leftOfTextSlot = this.showBannerTypeIcon
        ? html`
            <md-icon
              class=${classMap({
                "md-alert-banner__icon": true,
                "with-title": !!this.titleText
              })}
              name="${this.getIconForType()}"
              iconSet="momentumDesign"
              size="20"
            >
            </md-icon>
          `
        : html`<slot name="left"></slot>`;

      const refreshButtonClass = this.titleText ? "refresh-button-with-title" : "refresh-button";
      const rightOfTextSlot = this.showRefreshButton
        ? html` <md-button
            class="${refreshButtonClass}"
            @click="${() => this.dispatchEvent(new CustomEvent("alertBanner-refresh-button-click"))}"
            variant="ghostInheritTextColor"
            circle
            size="20"
          >
            <md-icon name="refresh-bold" iconSet="momentumDesign" size="16"></md-icon>
          </md-button>`
        : nothing;

      if (this.titleText) {
        return html`
          ${this.show
            ? html`
                <div class="${classMap(this.alertBannerClassMap)}" role="alert">
                  <div class="${classMap(this.alertBannerTextClassMap)}">
                    <div class="md-alert-banner__text-content ${textContentStyle}">
                      ${leftOfTextSlot} ${this.titleTemplate}
                      <slot><span>${this.message}</span></slot>
                    </div>
                  </div>
                  <div class="md-alert-banner__top-right-centered">
                    <div class="md-alert-banner__top-right-centered-content">
                      ${rightOfTextSlot}
                      <div class="md-alert-banner__right ${classMap(this.alertBannerRightClassMap)}">
                        <slot name="right"></slot>
                      </div>
                      ${closeBtn}
                    </div>
                  </div>
                </div>
              `
            : null}
        `;
      } else {
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
                  ${closeBtn}
                </div>
              `
            : null}
        `;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-alert-banner": AlertBanner.ELEMENT;
  }
}
