/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Radio } from "./Radio";
import { Key } from "@/constants";
import { RovingTabIndexMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, property, PropertyValues, query } from "lit-element";
import styles from "./scss/module.scss";

export namespace RadioGroup {
  @customElementWithCheck("md-radiogroup")
  export class ELEMENT extends RovingTabIndexMixin(LitElement) {
    @property({ type: String, attribute: "group-label" }) label = "group";
    @property({ type: Number, reflect: true }) checked = -1;
    @property({ type: String, reflect: true }) alignment: "horizontal" | "vertical" = "vertical";

    @query("slot[name='radio']") radioSlot?: HTMLSlotElement;

    private _disabled = false;
    @property({ type: Boolean, reflect: true })
    get disabled() {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      this.requestUpdate("disabled", oldValue);
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this.setAttribute("role", "radiogroup");
      this.setAttribute("aria-label", this.label);
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("slotted") || changedProperties.has("checked")) {
        this.setFirstChecked();
      }
    }

    get selectedRadioValue() {
      return (this.slotted[this.selected] as Radio.ELEMENT).value;
    }

    private notifySelectedChange() {
      this.dispatchEvent(
        new CustomEvent("radio-change", {
          detail: {
            selected: this.selectedRadioValue
          },
          bubbles: true,
          composed: true
        })
      );
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

    private setFirstChecked() {
      if (this.checked !== -1) {
        this.selected = this.checked;
        this.setChecked(this.checked);
      }
    }

    private findRadioIndex(event: MouseEvent | KeyboardEvent) {
      const eventPath = event.composedPath();
      return this.slotted.findIndex(radio => eventPath.includes(radio));
    }

    private findCheckedRadioIndex() {
      return this.slotted.findIndex(radio => (radio as Radio.ELEMENT).checked);
    }

    private setChecked(newIndex: number) {
      const oldIndex = this.findCheckedRadioIndex();
     
      if (oldIndex !== -1 && oldIndex !== newIndex && this.slotted[oldIndex]) {
        (this.slotted[oldIndex] as Radio.ELEMENT).checked = false;
      }
      if(this.slotted[newIndex])
      {
      (this.slotted[newIndex] as Radio.ELEMENT).checked = true;
      }
    }

    private switchRadioOnArrowPress(startIndex: number, increment = 1) {
      const newIndex = super.getAvailableSelectedIndex!(startIndex, increment);
      if (newIndex !== -1) {
        this.selected = newIndex;
        this.setChecked(newIndex);
        this.notifySelectedChange();
      }
    }

    private isRadioDisabled(index: number) {
      return (this.slotted[index] as Radio.ELEMENT).disabled;
    }

    handleClick(event: MouseEvent) {
      if(this.disabled) {
        return false;
      }
      const newIndex = this.findRadioIndex(event);
      if (newIndex !== -1) {
        if (!this.isRadioDisabled(newIndex)) {
          this.selected = newIndex;
          this.setChecked(newIndex);
          this.notifySelectedChange();
        }
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      if(this.disabled) {
        return false;
      }
      const { code } = event;
      switch (code) {
        case Key.Enter:
        case Key.Space:
          {
            if (!this.isRadioDisabled(this.selected)) {
              this.setChecked(this.selected);
              this.notifySelectedChange();
            }
          }
          break;
        case Key.ArrowUp:
        case Key.ArrowLeft:
          {
            if (this.selected === 0) {
              this.switchRadioOnArrowPress(this.slotted.length - 1, -1);
            } else {
              this.switchRadioOnArrowPress(this.selected - 1, -1);
            }
          }
          break;
        case Key.ArrowDown:
        case Key.ArrowRight:
          {
            if (this.selected === this.slotted.length - 1) {
              this.switchRadioOnArrowPress(0);
            } else {
              this.switchRadioOnArrowPress(this.selected + 1);
            }
          }
          break;
        default:
          break;
      }
    }

    get slotElement() {
      return this.radioSlot;
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="radio-group-container" part="radio-group-container">
          <slot name="radio"></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-radiogroup": RadioGroup.ELEMENT;
  }
}
