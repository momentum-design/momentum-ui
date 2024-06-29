/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import { FocusTrapMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { LitElement, PropertyValues, html, property, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export const coachmarkPlacement = ["auto", "left", "right", "top", "bottom"]

export namespace Coachmark {
  export type Place = typeof coachmarkPlacement[number];

  @customElementWithCheck("md-coachmark")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    @property({ type: String }) message = "";
    @property({ type: String }) actionname = "Next"
    @property({ type: Boolean }) hidebutton = false;
    @property({ type: String }) placement: Place = "auto";
    @property({ type: Boolean }) show = false;
    @property({ type: String }) color = "default";

    @query(".md-coachmark__popper") popper!: HTMLDivElement;
    @query(".md-coachmark__reference") reference!: HTMLDivElement;

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
        [`md-coachmark__popper--${this.color}`]: !!this.color
      };
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-coachmark ${classMap(this.coachWrapClassMap)}">
          <div class="md-coachmark__popper ${classMap(this.coachClassMap)}" tabindex="0">
            <div class="md-coachmark__content" >
              ${this.message
                ? this.message
                : html`
                    <slot name="coachmark-content" @slotchange=${this.handleSlotChange}></slot>
                  `}
              <div class="md-coachmark__action">
                ${this.hidebutton 
                  ? html`<slot name="coachmark-action"></slot>` 
                  : html`<md-button @button-click=${this.coachAction}>${this.actionname}</md-button>`}
              </div>
            </div>
            <div id="arrow" class="md-coachmark__arrow" data-popper-arrow></div>
          </div>
          <div
            class="md-coachmark__reference"
            @click=${() => this.notifyCoachCreate()}
            aria-describedby="coachmark"
          >
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
