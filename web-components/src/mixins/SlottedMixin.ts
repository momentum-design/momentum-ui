/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/** This mixin help to manage slottable nodes (light DOM children) that become the contents of `<slot>` element.
 * 
 * @property({ type: Array, attribute: false }) slotted <--- when an element is inserted in a slot.
 * 
 * Example:
 * 
 * @customElements("custom-element")
 * class CustomElement extends SlottedMixin(LitElement) {
 *  @query('slot[name="custom"]') tabSlot?: HTMLSlotElement;
 *  get slotElement() { <--- You need to override this getter in parent component class to return specific slot (default or named) from your component’s render root.
      return this.tabSlot;
    }
    protected filterSlotted() { <--- You need to override this method in parent component class to return filtered elements from slotted. (See tab implementation for example)
      return Array.from(this.children) as HTMLElement[]; <--- By default this method return all children of custom component render root.
    }
    protected slottedChanged() { <--- You can override this method to handle when the node(s) contained in slotElement change.

    }
    render() {
      return html`
        <slot name="custom"></slot>
      `;
    }
 * }
 */

import { LitElement, property, PropertyValues, query } from "lit-element";
import { DedupeMixin, wasApplied } from "./DedupeMixin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...args: any[]) => A;

export interface SlotableInterface {
  slotted: HTMLElement[];
}

export abstract class SlotableClass extends LitElement {
  protected handleSlotted?(): void;
  protected slottedChanged?(): void;
  protected filterSlotted?(): HTMLElement[];
}

export const SlottedMixin = <T extends AnyConstructor<SlotableClass>>(
  base: T
): T & AnyConstructor<SlotableClass & SlotableInterface> => {
  if (wasApplied(SlottedMixin, base)) {
    return base as ReturnType<() => T & AnyConstructor<SlotableClass & SlotableInterface>>;
  }

  class Slotted extends base {
    private _slotted: HTMLElement[] = [];
    private _isSlotted = false;
    @property({ type: Array, attribute: false })
    get slotted() {
      return this._slotted;
    }
    set slotted(value) {
      if (this._isSlotted) {
        const oldValue = this._slotted;
        this._slotted = value;
        this._isSlotted = false;
        this.requestUpdate("slotted", oldValue);
      }
    }

    @query("slot") _slotElement?: HTMLSlotElement;

    get slotElement() {
      return this._slotElement;
    }

    private handleSlotChange = () => {
      this._isSlotted = true;
      this.slotted = this.filterSlotted();
    };

    protected filterSlotted() {
      return Array.from(this.children) as HTMLElement[];
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected slottedChanged() {}

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      if (this.slotElement) {
        this.slotElement.addEventListener("slotchange", this.handleSlotChange);
      }
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("slotted")) {
        this.slottedChanged();
      }
    }

    disconnectedCallback(): void {
      if (this.slotElement) {
        this.slotElement.removeEventListener("slotchange", this.handleSlotChange);
      }
    }
  }

  DedupeMixin(SlottedMixin, Slotted);

  return Slotted;
};
