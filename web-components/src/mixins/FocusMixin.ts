/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/** This mixin provide a different way to show what element is focused.
 * (https://html.spec.whatwg.org/multipage/interaction.html#focus-management-apis)
 * By hiding the native browser outline from component style, we can manage alternative focusing style.
 * Using keyboard this mixin toggle `focus-visible` attribute on compoenent root to show focus ring.
 * This mixin handle `focusin` and `focusout` events because due to this specification
 * (https://w3c.github.io/uievents/#event-type-focusin) this events are composable
 * and they can be handled by one of the target’s ancestors, which can help us in Shadow DOM event propagation case.
 *
 * Example:
 *
 * @customElements("custom-element")
 * class CustomElement extends FocusMixin(LitElement) {
 *    protected handleFocusIn(event: Event) { <---- You override this with corresponding name in component directly.
        // super.handleFocusIn && super.handleFocusIn(event); <---- Check to see whether the superclass defines a method of the same name, and if so, invoke that method.
        // Do your method work here.
      }
 *    protected handleFocusOut(event: Event) { <---- You override this with corresponding name in component directly.
        // super.handleFocusIn && super.handleFocusIn(event); <---- Check to see whether the superclass defines a method of the same name, and if so, invoke that method.
        // Do your method work here.
      }
 * }
 * */

import { LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { DedupeMixin, wasApplied } from "./DedupeMixin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...args: any[]) => A;
export type FocusEventDetail = { sourceEvent: Event };

/**
 * Abstract class describing the methods added by FocusMixin.
 * Used as the constraint and return type for the mixin.
 */
export abstract class FocusClass extends LitElement {
  declare autofocus: boolean;
  protected setFocus?(force: boolean): void;
  protected handleFocusIn?(event: Event): void;
  protected handleFocusOut?(event: Event): void;
  protected getDeepActiveElement?(): Element;
  protected isElementFocused?(element: HTMLElement): boolean;
  protected manageAutoFocus?(element?: HTMLElement): void;
  protected getActiveElement?(): Element | null;
}

export const FocusMixin = <T extends AnyConstructor<LitElement>>(base: T): T & AnyConstructor<FocusClass> => {
  if (wasApplied(FocusMixin, base)) {
    return base as T & AnyConstructor<FocusClass>;
  }

  // Cast base to include FocusClass methods for super calls (they may or may not exist at runtime)
  class Focus extends (base as unknown as AnyConstructor<FocusClass>) {
    @property({ type: Boolean, reflect: true }) autofocus = false;

    protected setFocus(force: boolean) {
      this.toggleAttribute("focus-visible", force);
    }

    protected handleFocusIn(event: Event) {
      if (super.handleFocusIn) {
        super.handleFocusIn(event);
      }

      this.setFocus(true);

      this.dispatchEvent(
        new CustomEvent<FocusEventDetail>("focus-visible", {
          composed: true,
          bubbles: true,
          detail: {
            sourceEvent: event
          }
        })
      );
    }

    protected handleFocusOut(event: Event) {
      if (super.handleFocusOut) {
        super.handleFocusOut(event);
      }
      this.setFocus(false);

      this.dispatchEvent(
        new CustomEvent<FocusEventDetail>("focus-not-visible", {
          composed: true,
          bubbles: true,
          detail: {
            sourceEvent: event
          }
        })
      );
    }

    protected manageAutoFocus(element: HTMLElement = this) {
      element.focus();
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.addEventListener("focus", this.handleFocusIn);
      this.addEventListener("blur", this.handleFocusOut);

      if (this.autofocus) {
        requestAnimationFrame(() => {
          this.manageAutoFocus();
        });
      }
    }

    protected getActiveElement() {
      return (this.getRootNode() as Document).activeElement;
    }

    protected getDeepActiveElement() {
      let host = document.activeElement || document.body;
      while (host?.shadowRoot?.activeElement) {
        host = host.shadowRoot.activeElement;
      }
      return host;
    }

    protected isElementFocused(element: HTMLElement) {
      return this.getDeepActiveElement() !== element;
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.removeEventListener("focus", this.handleFocusIn);
      this.removeEventListener("blur", this.handleFocusOut);
    }
  }

  DedupeMixin(FocusMixin, Focus);

  return Focus as unknown as T & AnyConstructor<FocusClass>;
};
