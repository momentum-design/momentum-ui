/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { FocusTrapMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export const modalType = ["default", "full", "large", "small", "dialog"] as const;

const minisculeLatency = 13;
/**
 * Increasing latency above 13 ms has an increasingly negative impact
 * on human performance for a given task. While imperceptible at first,
 * added latency continues to degrade a human’s processing ability until
 * approaching 75 to 100 ms.
 * MIT: http://news.mit.edu/2014/in-the-blink-of-an-eye-0116
 */

export namespace Modal {
  export type Type = typeof modalType[number];

  @customElementWithCheck("md-modal")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    @property({ type: Boolean }) show = false;
    @property({ type: String }) headerLabel = "";
    @property({ type: String }) headerMessage = "";
    @property({ type: String }) htmlId = "";
    @property({ type: String, attribute: "aria-label" }) ariaLabel = "modal";
    @property({ type: String, attribute: "aria-labelled-by" }) ariaLabelledBy = "";
    @property({ type: String }) ariaLabelClose = "Close Modal";
    @property({ type: String }) ariaLabelCancel = "Cancel Modal";
    @property({ type: String }) ariaLabelSubmit = "Submit Modal";
    @property({ type: String }) ariaDescription?: string;
    @property({ type: Boolean }) showCloseButton = false;
    @property({ type: Boolean }) backdropClickExit = false;
    @property({ type: Boolean }) noExitOnEsc = false;
    @property({ type: String }) size: Type = "default";
    @property({ type: String }) closeBtnName = "";
    @property({ type: Boolean }) hideFooter = false;
    @property({ type: Boolean }) hideHeader = false;
    @property({ type: Boolean }) disableInitialFocus = false;

    @internalProperty() private animating = false;

    @query(".md-modal__backdrop") backDrop!: HTMLElement;

    static get styles() {
      return [reset, styles];
    }

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("keydown", this.handleCloseOutside);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("keydown", this.handleCloseOutside);
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("show")) {
        if (this.show) {
          this.modalFadeIn();
        } else if (changedProperties.get("show") === true) {
          this.modalFadeOut();
        }
      }
    }

    private notifyModalClose() {
      this.dispatchEvent(
        new CustomEvent("close-modal", {
          composed: true,
          bubbles: true
        })
      );
    }

    private focusInsideModal() {
      if (this.focusableElements && this.focusableElements.length) {
        this.setInitialFocus!();
      }
    }

    handleCloseOutside = (event: KeyboardEvent) => {
      if (event.code === Key.Escape) {
        event.preventDefault();
        if (this.show && !this.noExitOnEsc) {
          this.show = false;
        }
      }
    };

    handleKeyDown(event: KeyboardEvent) {
      if (event.code === Key.Enter || event.code === Key.Space) {
        if (this.show) {
          this.show = true;
        }
      }
    }

    private transitionPromise(element: HTMLElement) {
      return new Promise<void>(resolve => {
        const onModalTransitionEnd = () => {
          element.removeEventListener("transitionend", onModalTransitionEnd);

          this.activateFocusTrap!();
          this.setFocusableElements!();

          requestAnimationFrame(() => {
            resolve();
          });
        };

        const onModalTransitionCancel = () => {
          element.removeEventListener("transitioncancel", onModalTransitionCancel);

          this.deactivateFocusTrap!();
          this.modalFadeOut();

          resolve();
        };

        element.addEventListener("transitionend", onModalTransitionEnd);
        element.addEventListener("transitioncancel", onModalTransitionCancel);

        setTimeout(() => {
          this.animating = true;
        }, minisculeLatency);
      });
    }

    private async modalFadeIn() {
      if (this.backDrop) {
        await this.transitionPromise(this.backDrop);
        if (!this.disableInitialFocus) {
          this.focusInsideModal();
        }
      }
    }

    private modalFadeOut() {
      this.animating = false;
      this.deactivateFocusTrap!();
      this.notifyModalClose();
    }

    handleCloseBackdrop() {
      if (this.backdropClickExit) {
        this.show = false;
      }
    }
    hideModal() {
      this.animating = false;
      this.show = false;
    }

    private topCloseBtnTemplate() {
      return html`
        ${this.showCloseButton
          ? html`
              <md-button
                hasRemoveStyle
                class="md-close md-modal__close"
                @click="${this.hideModal}"
                @keydown="${this.handleKeyDown}"
                ariaLabel=${this.ariaLabelClose}
              >
                <md-icon name="cancel_14"></md-icon>
              </md-button>
            `
          : nothing}
      `;
    }

    private handleFooterClick() {
      this.show = false;
    }

    private headerTemplate() {
      return this.hideHeader
        ? html`
            <div id="modal_header" part="modal-header" class="md-modal__header">
              <slot name="header"></slot>
              ${this.topCloseBtnTemplate()}
            </div>
          `
        : html`
            <div id="modal_header" part="modal-header" class="md-modal__header">
              <h2 class="md-modal__title">${this.headerLabel}</h2>
              ${this.headerMessage
                ? html`
                    <span class="md-modal__message">${this.headerMessage}</span>
                  `
                : nothing}
              ${this.topCloseBtnTemplate()}
            </div>
          `;
    }

    footerTemplate() {
      return this.hideFooter
        ? html`
            <div part="modal-footer" class="md-modal__footer">
              <slot name="footer"></slot>
            </div>
          `
        : html`
            <div part="modal-footer" class="md-modal__footer">
              <md-button
                aria-label=${this.ariaLabelCancel}
                @click="${this.handleFooterClick}"
                @keydown="${this.handleKeyDown}"
              >
                <span>Cancel</span>
              </md-button>
              <md-button
                type="submit"
                variant="primary"
                aria-label=${this.ariaLabelSubmit}
                @click="${this.handleFooterClick}"
                @keydown="${this.handleKeyDown}"
              >
                <span>${this.closeBtnName}</span>
              </md-button>
            </div>
          `;
    }

    get modalBackDropClassMap() {
      return {
        in: this.show && this.animating
      };
    }

    get modalContainerClassMap() {
      return {
        in: this.show,
        [`md-modal--${this.size}`]: !!this.size
      };
    }

    render() {
      return html`
        ${this.show
          ? html`
              <div part="modal-backdrop" class="md-modal__backdrop fade ${classMap(this.modalBackDropClassMap)}">
                ${this.backdropClickExit
                  ? html`
                      <div class="md-modal_overlay" @click="${this.handleCloseBackdrop}"></div>
                    `
                  : nothing}

                <div
                  part="modal-container"
                  role="dialog"
                  id="${this.htmlId}"
                  class="md-modal ${classMap(this.modalContainerClassMap)}"
                  aria-label="${this.ariaLabel}"
                  aria-labelledby="modal_header"
                  aria-describedby=${ifDefined(this.ariaDescription)}
                >
                  <div part="modal-content" class="md-modal__content">
                    <div class="md-modal__flex-container" part="modal-flex-container">
                      ${this.headerTemplate()}
                      <div id="modal-body" part="modal-body" class="md-modal__body">
                        <slot></slot>
                      </div>
                      ${this.footerTemplate()}
                    </div>
                  </div>
                </div>
              </div>
            `
          : nothing}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-modal": Modal.ELEMENT;
  }
}
