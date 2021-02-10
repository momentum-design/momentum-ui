/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { html, LitElement, property } from "lit-element";
import { customElementWithCheck, FocusMixin } from "@/mixins";

export namespace DraggableRow {
  @customElementWithCheck("md-draggable-row")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Boolean, reflect: true }) disabled = false;

    render() {
      return html`
        <div class="md-draggable-row" part="draggable-row" aria-disabled=${this.disabled}>
          <slot></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-row": DraggableRow.ELEMENT;
  }
}
