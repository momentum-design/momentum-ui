/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { Theme } from "@/components/theme/Theme";
import { FocusTrapMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { closestElement } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { LitElement, PropertyValues, html, property, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export const coachmarkPlacement = ["auto", "left", "right", "top", "bottom"];

export namespace Coachmark {
  export type Place = (typeof coachmarkPlacement)[number];

  @customElementWithCheck("md-coachmark")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    @property({ type: String })
    message = "";

    @property({ type: String })
    actionname = "Next";

    @property({ type: Boolean })
    hidebutton = false;

    @property({ type: String })
    placement: Place = "auto";

    @property({ type: Boolean })
    show = false;

    //new properties
    @property({ type: String })
    iconName?: string = undefined;

    @property({ type: String })
    header?: string = undefined;

    @property({ type: Boolean, reflect: true, attribute: "hide-close-button" })
    hideCloseButton = true;

    @property({ type: Boolean, reflect: true, attribute: "new-momentum" })
    newMomentum = false;

    @property({ type: String })
    primaryButton?: string;

    @property()
    primaryButtonClickFunction?: () => void;

    @property({ type: String })
    secondaryButton?: string;

    @property()
    secondaryButtonClickFunction?: () => void;

    @property({ type: String })
    linkText?: string;

    @property({ type: String })
    href = "";

    @property()
    linkClickFunction?: () => void;

    //end new properties

    @property({ type: String })
    color = "default";

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
        [`md-coachmark__popper--${this.placement}`]: !!this.placement,
        [`md-coachmark__popper--${this.color}`]: !!this.color && !this.newMomentum,
        newMomentum: this.newMomentum
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
          <div class="md-coachmark__action">
            ${this.hidebutton
              ? html` <slot name="coachmark-action"></slot> `
              : html` <md-button variant="secondary" @button-click=${this.coachAction}>${this.actionname}</md-button> `}
          </div>
        </div>
      `;
    }

    wrappedCoachmarkContentTemplate() {
      const themeAncestor = closestElement("md-theme", this) as Theme.ELEMENT;

      if (themeAncestor?.theme === "momentumV2") {
        return html`
          <md-theme theme="momentumV2" ?darkTheme=${!themeAncestor.darkTheme}>
            ${this.coachmarkContentTemplate()}
          </md-theme>
        `;
      }
      return this.coachmarkContentTemplate();
    }

    render() {
      return this.newMomentum ? this.renderRefresh() : this.renderLegacy();
    }

    renderLegacy() {
      return html`
        <div class="md-coachmark ${classMap(this.coachWrapClassMap)}">
          <div class="md-coachmark__popper ${classMap(this.coachClassMap)}" tabindex="0">
            ${this.wrappedCoachmarkContentTemplate()}
            <div id="arrow" class="md-coachmark__arrow" data-popper-arrow></div>
          </div>
          <div class="md-coachmark__reference" @click=${() => this.notifyCoachCreate()} aria-describedby="coachmark">
            <slot></slot>
          </div>
        </div>
      `;
    }

    renderHeader() {
      return html`
        <div class="header-continaer">
          ${this.iconName ? html`<md-icon name=${this.iconName} size="16" iconSet="momentumDesign"></md-icon>` : ""}
          ${this.header ? html`<span class="header-title">${this.header}</span>` : ""}
          ${!this.hideCloseButton
            ? html`<md-button size="20" variant="ghost" circle @button-click=${() => (this.show = false)}>
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
            ? html`<md-button variant="inverted-primary" @button-click=${this.primaryButtonClickFunction}
                >${this.primaryButton}</md-button
              >`
            : ""}
          ${this.secondaryButton
            ? html`<md-button variant="inverted-secondary" @button-click=${this.secondaryButtonClickFunction}
                >${this.secondaryButton}</md-button
              >`
            : ""}
          ${this.linkText
            ? html`<a href=${this.href} @click=${this.linkClickFunction} target="_blank" rel="noreferrer"
                >${this.linkText}</a
              >`
            : ""}
        </div>
      `;
    }

    renderRefresh() {
      return html`
        <div class="md-coachmark ${classMap(this.coachWrapClassMap)}">
          <div class="md-coachmark__popper ${classMap(this.coachClassMap)}" tabindex="0">
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
    "md-coachmark": Coachmark.ELEMENT;
  }
}
