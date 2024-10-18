/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { FocusTrapMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { Popover } from "@/PopoverTypes";
import reset from "@/wc_scss/reset.scss";
import { LitElement, PropertyValues, html, property, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export const coachmarkPlacement = ["auto", "left", "right", "top", "bottom"];

export namespace CoachmarkPopover {
  @customElementWithCheck("md-coachmark-popover")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    @property({ type: String })
    placement: Popover.PlacementType = "auto";

    /**
     * The name of the icon to be displayed before the title in the header.
     * If set, the specified icon will be rendered before the title.
     * If not set, no icon will be rendered.
     *
     * @type {string | undefined}
     */
    @property({ type: String })
    headerIconName?: string = undefined;

    /**
     * The title to be displayed in the header
     * If both neither header nor headerIconName is set, no header will be rendered.
     *
     * * @type {string | undefined}
     */
    @property({ type: String })
    header?: string = undefined;

    /**
     *
     *
     */
    @property({ type: String })
    message = "";

    @property({ type: Boolean })
    show = false;

    @property({ type: Boolean, reflect: true, attribute: "hide-close-button" })
    hideCloseButton = false;

    @property({ type: String })
    primaryButton?: string;

    @property({ type: String })
    secondaryButton?: string;

    @property({ type: String })
    linkText?: string;

    @property({ type: String })
    href = "";

    @query(".md-coachmark__popper")
    popper!: HTMLDivElement;

    @query(".md-coachmark__reference")
    reference!: HTMLDivElement;

    private slotContent: Element[] | null = null;

    connectedCallback() {
      super.connectedCallback();
    }

    notifyCoachCreate() {
      this.dispatchEvent(
        new CustomEvent("coach-create", {
          bubbles: true,
          composed: true,
          detail: {
            placement: this.placement,
            reference: this.reference,
            popper: this.popper
          }
        })
      );
    }

    coachAction() {
      this.dispatchEvent(
        new CustomEvent("coach-action", {
          bubbles: true,
          composed: true,
          detail: {
            popper: this.popper
          }
        })
      );
    }

    notifySecondaryButtonAction() {
      this.dispatchEvent(
        new CustomEvent("secondary-button-action", {
          bubbles: true,
          composed: true,
          detail: {
            popper: this.popper
          }
        })
      );
    }

    notifyPrimaryButtonAction() {
      this.dispatchEvent(
        new CustomEvent("primary-button-action", {
          bubbles: true,
          composed: true,
          detail: {
            popper: this.popper
          }
        })
      );
    }

    notifyLinkAction() {
      this.dispatchEvent(
        new CustomEvent("link-action", {
          bubbles: true,
          composed: true,
          detail: {
            popper: this.popper
          }
        })
      );
    }

    handleSlotChange(event: Event) {
      const slot = event.target as HTMLSlotElement;
      if (slot) {
        const slotContent = slot.assignedElements({ flatten: true });
        if (slotContent.length) {
          this.slotContent = slotContent;
        }
      }
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("show")) {
        if (this.show) {
          this.setFocusableElements!();
          if (this.focusableElements && this.focusableElements.length) {
            this.focusableElements[0].focus();
          }
        }
      }
    }

    get coachWrapClassMap() {
      return {
        "md-coachmark--active": !!this.show
      };
    }

    get coachClassMap() {
      return {
        [`md-coachmark__popper--${this.placement}`]: !!this.placement
      };
    }

    static get styles() {
      return [reset, styles];
    }

    coachmarkContentTemplate() {
      return html`
        <div class="md-coachmark__content">
          ${this.message
            ? this.message
            : html` <slot name="coachmark-content" @slotchange=${this.handleSlotChange}></slot> `}
        </div>
      `;
    }

    renderHeader() {
      return html`
        <div class="header-continaer">
          ${this.headerIconName
            ? html`<md-icon name=${this.headerIconName} size="16" iconSet="momentumDesign"></md-icon>`
            : ""}
          ${this.header ? html`<span class="header-title">${this.header}</span>` : ""}
          ${!this.hideCloseButton
            ? html`<md-button
                class="cancel-icon-button"
                size="24"
                hasRemoveStyle
                circle
                @button-click=${() => (this.show = false)}
              >
                <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
              </md-button>`
            : ""}
        </div>
      `;
    }

    renderBody() {
      return html` <div class="body-container">${this.coachmarkContentTemplate()}</div> `;
    }

    renderFooter() {
      return html`
        <div class="footer-container">
          ${this.primaryButton
            ? html`<md-button variant="inverted-primary" @button-click=${() => this.notifyPrimaryButtonAction()}>
                ${this.primaryButton}</md-button
              >`
            : ""}
          ${this.secondaryButton
            ? html`<md-button variant="inverted-secondary" @button-click=${() => this.notifySecondaryButtonAction()}>
                ${this.secondaryButton}</md-button
              >`
            : ""}
          ${this.linkText
            ? html`<a href=${this.href} @click=${() => this.notifyLinkAction()} target="_blank" rel="noreferrer">
                ${this.linkText}</a
              >`
            : ""}
        </div>
      `;
    }

    render() {
      return html`
        <div class="md-coachmark ${classMap(this.coachWrapClassMap)}">
          <div class="md-coachmark__popper ${classMap(this.coachClassMap)}" tabindex="-1">
            ${this.renderHeader()} ${this.renderBody()} ${this.renderFooter()}
          </div>
          <div class="md-coachmark__reference" @click=${() => this.notifyCoachCreate()} aria-describedby="coachmark">
            <slot></slot>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-coachmark-popover": CoachmarkPopover.ELEMENT;
  }
}
