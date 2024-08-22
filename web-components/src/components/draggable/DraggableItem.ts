/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export namespace DraggableItem {
  @customElementWithCheck("md-draggable-item")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) extended = false;
    @property({ type: Boolean, reflect: true }) editable = false;

    static get styles() {
      return [reset, styles];
    }

    get draggableItemClassMap() {
      return {
        extended: this.extended,
        default: !this.extended,
        disabled: this.disabled
      };
    }

    render() {
      return html`
        <div
          class="md-draggable-item ${classMap(this.draggableItemClassMap)}"
          part="draggable-item"
          aria-disabled=${this.disabled}
        >
          ${this.extended && this.editable
            ? html` <md-icon name="dragger-vertical-bold" size="16" iconSet="momentumDesign"></md-icon> `
            : nothing}
          <slot></slot>
          ${this.extended ? html` <slot name="extended"></slot> ` : nothing}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-item": DraggableItem.ELEMENT;
  }
}
