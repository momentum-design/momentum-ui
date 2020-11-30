/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import { nothing } from "lit-html";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { customElement, html, LitElement, property, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

export type coachmarkPlacement = "auto" | "left" | "right" | "top" | "bottom";

@customElement("md-coachmark")
export class Coachmark extends FocusMixin(LitElement) {
  @property({ type: String }) message = "";
  @property({ type: String }) placement: coachmarkPlacement = "auto";
  @property({ type: Boolean }) show = false;
  @property({ type: String }) color = "default";

  @query(".md-coachmark__popper") popper!: HTMLDivElement;
  @query(".md-coachmark__reference") reference!: HTMLDivElement;

  private slotContent: Element[] | null = null;

  protected handleFocusIn(event: Event) {
    if (super.handleFocusIn) {
      super.handleFocusIn(event);
    }
    this.notifyCoachCreate();
  }

  protected handleFocusOut(event: Event) {
    if (super.handleFocusOut) {
      super.handleFocusOut(event);
    }
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

  handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if (slot) {
      const slotContent = slot.assignedElements({ flatten: true });
      if (slotContent.length) {
        this.slotContent = slotContent;
      }
    }
  }

  get coachClassMap() {
    return {
      [`md-coachmark__popper--${this.placement}`]: this.placement,
      [`md-coachmark__popper--${this.color}`]: this.color
    };
  }

  render() {
    return html`
      <div class="md-coachmark ${this.show ? 'md-coachmark--active' : ''}">
        <div class="md-coachmark__popper ${classMap(this.coachClassMap)}">
          <div class="md-coachmark__content">
            ${this.message
              ? this.message
              : html`
                  <slot name="coachmark-content" @slotchange=${this.handleSlotChange}></slot>
                `}
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

  static get styles() {
    return [reset, styles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-coachmark": Coachmark;
  }
}
