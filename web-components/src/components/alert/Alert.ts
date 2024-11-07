/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { buttonColor, buttonVariant } from "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/link/Link";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, query, TemplateResult } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export namespace Alert {
  export type buttonVariant = (typeof buttonVariant)[number];
  export type buttonColor = (typeof buttonColor)[number];

  @customElementWithCheck("md-alert")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean }) closable = false;
    @property({ type: String }) message = "";
    @property({ type: Boolean }) show = false;
    @property({ type: Boolean }) internalClose = true;
    @property({ type: String }) title = "";
    @property({ type: String }) btnlabel = "Close";
    @property({ type: String }) type = "default";
    @property({ type: Boolean }) inline = false;

    @property({ type: Boolean }) newMomentum = false;

    @property({ type: String }) primaryButton = "";
    @property({ type: String }) primaryButtonVariant: Alert.buttonVariant = "primary";
    @property({ type: String }) primaryButtonColor: Alert.buttonColor = "";
    @property() primaryButtonClickFunction?: () => void;
    @property({ type: String }) secondaryButton = "";
    @property() secondaryButtonClickFunction?: () => void;
    @property({ type: Boolean }) link = false;
    @property({ type: Boolean }) showMore = false;
    @property({ type: String }) href = "";

    @query('slot[name="alert-footer"]')
    private readonly alertFooterSlot!: HTMLSlotElement;

    @internalProperty()
    private hasFooterSlotContent = false;

    connectedCallback(): void {
      super.connectedCallback();
      this.updateFooterSlotInUse();
    }

    close() {
      this.dispatchEvent(
        new CustomEvent("alert-close", {
          composed: true,
          bubbles: true
        })
      );

      // By default closing internally, otherwise - controlling outer via .show
      if (this.internalClose) {
        this.show = false;
      }
    }

    static get styles() {
      return [reset, styles];
    }

    renderIconTemplate = () => {
      switch (this.type) {
        case "error":
          return html`
            <md-icon
              name="error-legacy-bold"
              size="${this.newMomentum ? 24 : 32}"
              iconSet="momentumDesign"
              color="var(--md-alert-error-text-color, red)"
            ></md-icon>
          `;
        case "info":
          return html`
            <md-icon
              name="info-circle-bold"
              size="${this.newMomentum ? 24 : 32}"
              iconSet="momentumDesign"
              color="var(--md-alert-info-text-color, blue)"
            ></md-icon>
          `;
        case "success":
          return html`
            <md-icon
              name="check-circle-bold"
              size="${this.newMomentum ? 24 : 32}"
              iconSet="momentumDesign"
              color="var(--md-alert-success-text-color, green)"
            ></md-icon>
          `;
        case "warn":
        case "warning":
          return html`
            <md-icon
              name="warning-bold"
              size="${this.newMomentum ? 24 : 32}"
              iconSet="momentumDesign"
              color="var(--md-alert-warning-text-color, orange)"
            ></md-icon>
          `;
        case "message":
          return html`
            <md-icon
              name="chat-bold"
              size="${this.newMomentum ? 24 : 32}"
              iconSet="momentumDesign"
              color="var(--alert-title-text-color)"
            ></md-icon>
          `;
        case "loading":
          return html`<md-spinner size="24"></md-spinner>`;
        default:
          return html` <slot name="alert-icon"></slot> `;
      }
    };

    get alertClassMap() {
      return {
        [`md-alert--${this.type}`]: !!this.type,
        "md-alert__inline": this.inline
      };
    }

    private get slottedFooterClassMap() {
      return {
        "is-empty": !this.hasFooterSlotContent
      };
    }

    legacyRender(): TemplateResult {
      return html`
        <div role="alert" aria-live="polite" part="alert" class="md-alert ${classMap(this.alertClassMap)}">
          <div class="md-alert__icon aria-hidden=true">${this.renderIconTemplate()}</div>
          <div part="content" class="md-alert__content">
            ${this.title && this.title !== ""
              ? html` <div class="md-alert__title" role="heading" aria-level="1">${this.title}</div> `
              : nothing}
            <div class="md-alert__message">
              ${this.message}
              <slot name="alert-body"></slot>
            </div>
          </div>
          ${this.closable
            ? html`
                <div class="md-alert__button">
                  <md-button
                    ariaLabel="${this.btnlabel}"
                    hasRemoveStyle
                    color="color-none"
                    circle
                    @click="${() => this.close()}"
                  >
                    <md-icon slot="icon" name="cancel-bold" size="18" iconSet="momentumDesign"></md-icon>
                  </md-button>
                </div>
              `
            : html`
                <div class="md-alert__footer">
                  <slot name="alert-footer"></slot>
                </div>
              `}
        </div>
      `;
    }

    renderNewAlertDefaultFooter(): TemplateResult {
      return html`
        <div class="md-new-alert__footer">
          ${this.link
            ? html`
                <md-link href="${this.href}">
                  <span class="md-new-alert__link"
                    >Link
                    <md-icon
                      name="pop-out-bold"
                      size="16"
                      iconSet="momentumDesign"
                      color="var(--md-alert-info-text-color, blue)"
                    >
                    </md-icon>
                  </span>
                </md-link>
              `
            : nothing}
          ${this.secondaryButton
            ? html` <md-button variant="secondary" .clickFunction="${this.secondaryButtonClickFunction}">
                ${this.secondaryButton}
              </md-button>`
            : nothing}
          ${this.primaryButton
            ? html`<md-button
                variant=${this.primaryButtonVariant}
                color=${this.primaryButtonColor}
                .clickFunction="${this.primaryButtonClickFunction}"
              >
                ${this.primaryButton}
              </md-button>`
            : nothing}
        </div>
      `;
    }

    handleSlotContentChange(_event: Event) {
      this.updateFooterSlotInUse();
    }

    private updateFooterSlotInUse() {
      this.hasFooterSlotContent = this.alertFooterSlot?.assignedNodes().length > 0;
    }

    renderSlottedFooter(): TemplateResult {
      return html` <div class="md-new-alert__footer ${classMap(this.slottedFooterClassMap)}">
        <slot name="alert-footer" @slotchange=${this.handleSlotContentChange}></slot>
      </div>`;
    }

    newRender(): TemplateResult {
      return html`
        <div role="alert" aria-live="polite" part="alert" class="md-new-alert ${classMap(this.alertClassMap)}">
          <div class="md-new-alert__body">
            <div class="md-new-alert__icon aria-hidden=true">${this.renderIconTemplate()}</div>
            <div part="content" class="md-new-alert__content">
              ${this.title && this.title !== ""
                ? html` <div class="md-new-alert__title" role="heading" aria-level="1">${this.title}</div> `
                : nothing}
              <div class="md-new-alert__message" title="${this.message}">
                ${this.message}
                <slot name="alert-body"></slot>
                ${this.showMore ? html`<md-link href=${this.href} inline>Show more...</md-link>` : nothing}
              </div>
            </div>
            ${this.closable
              ? html`
                  <div class="md-new-alert__button">
                    <md-button
                      ariaLabel="${this.btnlabel}"
                      hasRemoveStyle
                      color="color-none"
                      circle
                      @click="${() => this.close()}"
                    >
                      <md-icon slot="icon" name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
                    </md-button>
                  </div>
                `
              : nothing}
          </div>
          ${this.primaryButton || this.secondaryButton || this.link
            ? this.renderNewAlertDefaultFooter()
            : this.renderSlottedFooter()}
        </div>
      `;
    }

    get alertRender(): TemplateResult {
      return this.newMomentum ? this.newRender() : this.legacyRender();
    }

    render(): TemplateResult {
      return html` ${this.show ? this.alertRender : nothing} `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-alert": Alert.ELEMENT;
  }
}
