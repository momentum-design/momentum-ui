/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**This mixin using roving tabindex strategy to manage focus in a composite UI component,
 * the element that is to be included in the tab sequence has tabindex of "0" and all other focusable elements contained in the composite have tabindex of "-1".
 * Benefit of using roving tabindex to manage focus is that the user agent will scroll the newly focused element into view.
 *
 * @property({ type: Number, reflect: true }) selected <--- index of focusable activeElement
 *
 * Example:
 *
 * @customElements("custom-element")
 * class CustomElement extends RovingTabIndexMixin(LitElement) {
      //custom element class implementation
 * }
 *  */

import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { DedupeMixin, wasApplied } from "./DedupeMixin";
import { SlotableClass, SlotableInterface, SlottedMixin } from "./SlottedMixin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...args: any[]) => A;

export abstract class RovingTabIndexClass extends LitElement {
  protected getAvailableSelectedIndex?(index: number, increment?: number): number;
}

export interface RovingTabIndexInterface {
  selected: number;
  selectedIndex: number;
  rovingPreventFocus: boolean;
}

export const RovingTabIndexMixin = <T extends AnyConstructor<SlotableClass & RovingTabIndexClass>>(
  base: T
): T & AnyConstructor<RovingTabIndexInterface & SlotableInterface & SlotableClass & RovingTabIndexClass> => {
  if (wasApplied(RovingTabIndexMixin, base)) {
    return base as ReturnType<
      () => T & AnyConstructor<RovingTabIndexInterface & SlotableInterface & SlotableClass & RovingTabIndexClass>
    >;
  }

  class RovingTabIndex extends SlottedMixin(base) {
    private _selected = 0;
    @property({ type: Boolean, reflect: true, attribute: "roving-prevent-focus" }) rovingPreventFocus = false;

    /**
     * @deprecated Use `selected-index` instead.
     * The index of the currently selected element.
     */
    @property({ type: Number, reflect: true })
    get selected() {
      return this._selected;
    }
    set selected(index: number) {
      this.updateSelectedIndex(index);
    }

    /**
     * The index of the currently selected element.
     */
    @property({ type: Number, reflect: true, attribute: "selected-index" })
    get selectedIndex() {
      return this._selected;
    }
    set selectedIndex(index: number) {
      this.updateSelectedIndex(index);
    }

    /**
     * Updates the selected index and manages the tabIndex of the slotted elements.
     *
     * @param index - The new selected index.
     */
    private updateSelectedIndex(index: number) {
      const oldIndex = this._selected;

      if (this.slotted[oldIndex]) {
        const oldSelected = this.slotted[this._selected];
        oldSelected.tabIndex = -1;
      }

      if (this.slotted[index]) {
        const newSelected = this.slotted[index];
        newSelected.tabIndex = 0;
        if (!this.rovingPreventFocus) {
          newSelected.focus();
        }
      }
      this._selected = index;
      this.requestUpdate("selected", oldIndex);
    }

    private isFocusable(slottedItem: Element) {
      return !slottedItem.hasAttribute("disabled") && !slottedItem.hasAttribute("hidden");
    }

    protected slottedChanged() {
      if (super.slottedChanged) {
        super.slottedChanged();
      }
      const newIndex = this.getAvailableSelectedIndex(this.selected ?? 0, 1);

      if (newIndex !== -1) {
        this.selected = newIndex;
      }
    }

    protected getAvailableSelectedIndex(index: number, increment = 1) {
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
  }

  DedupeMixin(RovingTabIndexMixin, RovingTabIndex);

  return RovingTabIndex;
};
