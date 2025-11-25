/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { customElementWithCheck, FocusMixin, SlottedMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import styles from "./scss/module.scss";

type CustomHTMLButtonElement = HTMLButtonElement & { selected: boolean };

export namespace ButtonGroup {
  @customElementWithCheck("md-button-group")
  export class ELEMENT extends SlottedMixin(FocusMixin(LitElement)) {
    @property({ type: Number, reflect: true }) active = 0;
    @property({ type: Number, reflect: true }) tabIndex = 0;
    @property({ type: Boolean, reflect: true }) newMomentum = false;
    @query("slot[name='button']") buttonSlot?: HTMLSlotElement;

    private _disabled = false;
    @property({ type: Boolean, reflect: true })
    get disabled() {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      this.setAttribute("aria-disabled", `${value}`);
      if (value) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = 0;
      }
      this.requestUpdate("disabled", oldValue);
    }

    get slotElement() {
      return this.buttonSlot;
    }

    static get styles() {
      return [reset, styles];
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this.setAttribute("role", "group");
    }

    private setButtonTabIndex() {
      this.slotted.forEach((button) => ((button as CustomHTMLButtonElement).tabIndex = -1));
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("slotted")) {
        this.setButtonTabIndex();
        this.setFirstActive();
      }
    }

    get selectedBtnValue() {
      return (this.slotted[this.active] as CustomHTMLButtonElement).value;
    }

    private notifySelectedChange() {
      this.dispatchEvent(
        new CustomEvent("button-group-change", {
          detail: {
            selected: this.selectedBtnValue
          },
          bubbles: true,
          composed: true
        })
      );
      this.dispatchEvent(
        new CustomEvent("focus-visible", {
          composed: true,
          bubbles: true
        })
      );
    }

    private setSelected(newIndex: number) {
      const oldIndex = this.findSelectedBtnIndex();
      if (oldIndex !== -1 && oldIndex !== newIndex) {
        (this.slotted[oldIndex] as CustomHTMLButtonElement)?.toggleAttribute("selected", false);
      }

      (this.slotted[newIndex] as CustomHTMLButtonElement)?.toggleAttribute("selected", true);
    }

    private setFirstActive() {
      const oldIndex = this.findSelectedBtnIndex();
      if (oldIndex === -1) {
        this.setSelected(this.active);
      }
    }

    private findBtnIndex(event: MouseEvent | KeyboardEvent) {
      const eventPath = event.composedPath();
      return this.slotted.findIndex((slotElement) => eventPath.includes(slotElement));
    }

    private findSelectedBtnIndex() {
      return this.slotted.findIndex((slotElement) => (slotElement as CustomHTMLButtonElement).hasAttribute("selected"));
    }

    private isBtnDisabled(index: number) {
      return (this.slotted[index] as CustomHTMLButtonElement).disabled;
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this.handleKeyDown);
      this.removeEventListener("click", this.handleClick);
    }

    private switchBtnOnArrowPress(startIndex: number, increment = 1) {
      const newIndex = this.getAvailableSelectedIndex!(startIndex, increment);
      if (newIndex !== -1) {
        this.active = newIndex;
        this.setSelected(newIndex);
        this.notifySelectedChange();
      }
    }

    private getAvailableSelectedIndex(index: number, increment = 1) {
      const slottedLength = this.slotted.length;

      for (let i = 0, j = index; i < slottedLength; i += 1, j += increment) {
        if (j < 0) {
          j = slottedLength - 1;
        } else if (j >= slottedLength) {
          j = 0;
        }
        const slotted = this.slotted[j];
        if (this.isFocusable(slotted)) {
          return j;
        }
      }
      return -1;
    }

    private isFocusable(slottedItem: Element) {
      return !slottedItem.hasAttribute("disabled") && !slottedItem.hasAttribute("hidden");
    }

    handleClick(event: MouseEvent) {
      const newIndex = this.findBtnIndex(event);
      if (newIndex !== -1) {
        if (!this.isBtnDisabled(newIndex)) {
          this.active = newIndex;
          this.setSelected(newIndex);
          this.notifySelectedChange();
        }
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      const { code } = event;
      switch (code) {
        case Key.Enter:
        case Key.Space:
          {
            if (!this.isBtnDisabled(this.active)) {
              this.setSelected(this.active);
              this.notifySelectedChange();
            }
          }
          break;
        case Key.ArrowLeft:
          {
            if (this.active === 0) {
              this.switchBtnOnArrowPress(this.slotted.length - 1, -1);
            } else {
              this.switchBtnOnArrowPress(this.active - 1, -1);
            }
          }
          break;
        case Key.ArrowRight:
          {
            if (this.active === this.slotted.length - 1) {
              this.switchBtnOnArrowPress(0);
            } else {
              this.switchBtnOnArrowPress(this.active + 1);
            }
          }
          break;
        default:
          break;
      }
    }

    render() {
      return html`
        <div role="group" class="md-button-group" part="button-group">
          <slot name="button"></slot>
        </div>
      `;
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "md-button-group": ButtonGroup.ELEMENT;
  }
}
