/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import { Theme } from "@/components/theme/Theme";
import { FocusTrapMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { closestElement } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { LitElement, PropertyValues, html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./scss/module.scss";

export const coachmarkPlacement = ["auto", "left", "right", "top", "bottom"];

export namespace Coachmark {
  export type Place = (typeof coachmarkPlacement)[number];

  @customElementWithCheck("md-coachmark")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    @property({ type: String }) message = "";
    @property({ type: String }) actionname = "Next";
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
          if (this.focusableElements?.length) {
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-coachmark": Coachmark.ELEMENT;
  }
}
