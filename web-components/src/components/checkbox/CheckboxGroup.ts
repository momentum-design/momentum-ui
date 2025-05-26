/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { RovingTabIndexMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import styles from "./scss/module.scss";

export namespace CheckboxGroup {
  @customElementWithCheck("md-checkboxgroup")
  export class ELEMENT extends RovingTabIndexMixin(LitElement) {
    @property({ type: String, attribute: "group-label" }) label = "group";
    @property({ type: String, reflect: true }) alignment: "horizontal" | "vertical" = "vertical";

    @query("slot[name='checkbox']") checkboxSlot?: HTMLSlotElement;

    static get styles() {
      return [reset, styles];
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this.handleKeyDown);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this.handleKeyDown);
    }

    private switchCheckboxOnArrowPress(startIndex: number, increment = 1) {
      const newIndex = super.getAvailableSelectedIndex!(startIndex, increment);
      if (newIndex !== -1) {
        this.selected = newIndex;
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      const { code } = event;
      switch (code) {
        case Key.ArrowUp:
        case Key.ArrowLeft:
          {
            event.stopPropagation();
            if (this.selected === 0) {
              this.switchCheckboxOnArrowPress(this.slotted.length - 1, -1);
            } else {
              this.switchCheckboxOnArrowPress(this.selected - 1, -1);
            }
          }
          break;
        case Key.ArrowDown:
        case Key.ArrowRight:
          {
            event.stopPropagation();
            if (this.selected === this.slotted.length - 1) {
              this.switchCheckboxOnArrowPress(0);
            } else {
              this.switchCheckboxOnArrowPress(this.selected + 1);
            }
          }
          break;
        default:
          break;
      }
    }

    get slotElement() {
      return this.checkboxSlot;
    }

    render() {
      return html`
        <div role="group" aria-labelledby="id-group-label">
          <slot name="checkbox"></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-checkboxgroup": CheckboxGroup.ELEMENT;
  }
}
