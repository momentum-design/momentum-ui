/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import styles from "./scss/module.scss";
import { FocusMixin, SlottedMixin } from "@/mixins";
import { Key } from "@/constants";

type CustomHTMLButtonElement = HTMLButtonElement & { selected: boolean };

@customElement("md-button-group")
export class ButtonGroup extends SlottedMixin(FocusMixin(LitElement)) {
  @property({ type: Number, reflect: true }) active = 0;

  @query("slot[name='button']") buttonSlot?: HTMLSlotElement;

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

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("slotted")) {
      this.setFirstActive();
    }
  }

  get selectedBtnValue() {
    return (this.slotted[this.active] as CustomHTMLButtonElement).value;
  }

  private notifySelectedChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
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
      (this.slotted[oldIndex] as CustomHTMLButtonElement).toggleAttribute("selected", false);
    }

    (this.slotted[newIndex] as CustomHTMLButtonElement).toggleAttribute("selected", true);
  }

  private setFirstActive() {
    const oldIndex = this.findSelectedBtnIndex();
    if (oldIndex === -1) {
      this.setSelected(this.active);
    }
  }

  private findBtnIndex(event: MouseEvent | KeyboardEvent) {
    const eventPath = event.composedPath();
    return this.slotted.findIndex(slotElement => eventPath.includes(slotElement));
  }

  private findSelectedBtnIndex() {
    return this.slotted.findIndex(slotElement => (slotElement as CustomHTMLButtonElement).hasAttribute("selected"));
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
    // const newIndex = super.getAvailableSelectedIndex!(startIndex, increment);
    // if (newIndex !== -1) {
    //   this.selected = newIndex;
    //   this.setSelected(newIndex);
    //   this.notifySelectedChange();
    // }
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
      case Key.ArrowUp:
      case Key.ArrowLeft:
        {
          if (this.active === 0) {
            this.switchBtnOnArrowPress(this.slotted.length - 1, -1);
          } else {
            this.switchBtnOnArrowPress(this.active - 1, -1);
          }
        }
        break;
      case Key.ArrowDown:
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

declare global {
  interface HTMLElementTagNameMap {
    "md-button-group": ButtonGroup;
  }
}
