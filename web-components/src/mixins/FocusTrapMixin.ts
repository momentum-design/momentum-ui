/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/** This mixin help create a focus trap ensures that tab and shift + tab keys will cycle through the focus trap's tabbable elements but not leave the focus trap
 * (https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element). To enable/disable focus-trap mixin, component need to call
 * ativateFocusTrap/deactivateFocusTrap methods accordingly.
 * Example:
 *
 * @customElements("focus-trap")
 * class FocusTrap extends FocusTrapMixin(LitElement) {
 *  protected deactivateFocusTrap() { <---- You override this with corresponding name in component directly.
      super.deactivateFocusTrap && super.deactivateFocusTrap(); <---- Check to see whether the superclass defines a method of the same name, and if so, invoke that method.
        // Do your method work here.
      }
 *  protected ativateFocusTrap() { <---- You override this with corresponding name in component directly.
      super.ativateFocusTrap && super.ativateFocusTrap(); <---- Check to see whether the superclass defines a method of the same name, and if so, invoke that method.
      // Do your method work here.
      }
 * }
 */
import { Key } from "@/constants";
import { internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { DedupeMixin, wasApplied } from "./DedupeMixin";
import { FocusClass, FocusEventDetail, FocusMixin } from "./FocusMixin";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...args: any[]) => A;

export abstract class FocusTrapClass extends LitElement {
  protected deactivateFocusTrap?(): void;
  protected activateFocusTrap?(): void;
  protected focusableElements?: HTMLElement[];
  protected initialFocusComplete?: boolean;
  protected setFocusableElements?(): void;
  protected removeFocusableElements?(): void;
  protected setInitialFocus?(prefferableElement?: HTMLElement | number, ignoreAutoFocus?: boolean): void;
}
export interface FocusTrapInterface {
  activeFocusTrap: boolean;
  preventClickOutside: boolean;
  preventScroll: boolean;
  focusTrapIndex: number;
}
export const FocusTrapMixin = <T extends AnyConstructor<FocusClass & FocusTrapClass>>(
  base: T
): T & AnyConstructor<FocusTrapClass & FocusTrapInterface & FocusClass> => {
  if (wasApplied(FocusTrapMixin, base)) {
    return base as ReturnType<() => T & AnyConstructor<FocusTrapClass & FocusTrapInterface & FocusClass>>;
  }
  class FocusTrap extends FocusMixin(base) {
    @internalProperty() protected focusableElements: HTMLElement[] = [];
    @internalProperty() protected initialFocusComplete = false;

    @property({ type: Boolean, reflect: true, attribute: "active-focus-trap" }) activeFocusTrap = false;
    @property({ type: Boolean, reflect: true, attribute: "prevent-click-outside" }) preventClickOutside = false;
    @property({ type: Number, reflect: true, attribute: "focus-trap-index" }) focusTrapIndex = -1;
    @property({ type: Boolean, reflect: true, attribute: "prevent-scroll" }) preventScroll = false;

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("focusTrapIndex")) {
        const prevIndex = changedProperties.get("focusTrapIndex") as number;
        const prevElement = this.focusableElements[prevIndex];

        if (prevElement) {
          prevElement.blur();
          prevElement.toggleAttribute("focus-visible", false);
        }

        const newElement = this.focusableElements[this.focusTrapIndex];
        if (newElement) {
          this.tryFocus(newElement);
        }
      }
    }

    private tryFocus(focusableElement: HTMLElement) {
      requestAnimationFrame(async () => {
        if (this.isElementFocused!(focusableElement)) {
          focusableElement.focus({ preventScroll: this.preventScroll });
        }
        if (typeof (focusableElement as LitElement).updateComplete !== "undefined") {
          await (focusableElement as LitElement).updateComplete;
        }
        if (document.hasFocus() && this.isElementFocused!(focusableElement)) {
          focusableElement.focus({ preventScroll: this.preventScroll });
        }

        if (!this.initialFocusComplete) {
          this.initialFocusComplete = true;
        }
      });
    }

    private domRectCollection(element: HTMLElement) {
      return element.getClientRects().length === 0;
    }

    private viewportPosition(element: HTMLElement) {
      const { width, height } = element.getBoundingClientRect();
      const { offsetWidth, offsetHeight } = element;

      return offsetWidth + offsetHeight + height + width === 0;
    }

    private isNotVisible(element: HTMLElement) {
      if (element.tagName !== "SLOT") {
        return this.viewportPosition(element) || this.domRectCollection(element);
      }
      return false;
    }

    private isHidden(element: HTMLElement) {
      return (
        element.hasAttribute("hidden") ||
        (element.hasAttribute("aria-hidden") && element.getAttribute("aria-hidden") === "true") ||
        element.style.display === "none" ||
        element.style.opacity === "0" ||
        element.style.visibility === "hidden" ||
        element.style.visibility === "collapse" ||
        this.isNotVisible(element) ||
        getComputedStyle(element).visibility === "hidden" ||
        getComputedStyle(element).height === "0"
      );
    }

    private isDisabled(element: HTMLElement) {
      return element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
    }

    private isNotTabbable(element: HTMLElement) {
      return element.getAttribute("tabindex") === "-1";
    }

    private isInteractiveElement(element: HTMLElement) {
      if (
        element instanceof HTMLButtonElement ||
        element instanceof HTMLDetailsElement ||
        element instanceof HTMLEmbedElement ||
        element instanceof HTMLIFrameElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      ) {
        return true;
      }
      if (element instanceof HTMLAnchorElement && element.hasAttribute("href")) {
        return true;
      }
      if (element instanceof HTMLInputElement && element.type !== "hidden") {
        return true;
      }
      if (
        (element instanceof HTMLAudioElement || element instanceof HTMLVideoElement) &&
        element.hasAttribute("controls")
      ) {
        return true;
      }
      if (
        (element instanceof HTMLImageElement || element instanceof HTMLObjectElement) &&
        element.hasAttribute("usemap")
      ) {
        return true;
      }
      if (element.hasAttribute("tabindex") && element.tabIndex > -1) {
        return true;
      }
      return false;
    }

    private isFocusable(element: HTMLElement) {
      if (this.isDisabled(element) || this.isHidden(element) || this.isNotTabbable(element)) {
        return false;
      }
      if (this.isInteractiveElement(element)) {
        return true;
      }
      return false;
    }

    private shouldSkipFocus(element: HTMLElement) {
      // when combobox is having more than 100 items screen getting freezed
      if(element.id && element.id.split && element.id.split(" ").indexOf('md-combobox-listbox')>-1){
          return true; 
        }
      return false;
    }

    private findFocusable(root: ShadowRoot | HTMLElement, matches: Set<HTMLElement>): HTMLElement[] {
      const children = Array.from(root.children) as HTMLElement[];
      for (const child of children) {
        if (this.isHidden(child)) {
          continue;
        }

        if(this.shouldSkipFocus(child)){
          break;
        }

        if (this.isFocusable(child)) {
          matches.add(child);
        }

        if (child.shadowRoot) {
          this.findFocusable(child.shadowRoot, matches);
        } else if (child.tagName === "SLOT") {
          const childElements = (child as HTMLSlotElement)
            .assignedNodes()
            .filter(node => node.nodeType === node.ELEMENT_NODE);
          if (childElements.length) {
            const parent = childElements[0].parentElement;
            if (parent) {
              this.findFocusable(parent, matches);
            }
          }
        } else {
          this.findFocusable(child, matches);
        }
      }
      return [...matches];
    }

    private isEqualFocusNode(activeElement: HTMLElement, element: HTMLElement) {
      if (activeElement.nodeType >= 0) {
        return element.isEqualNode(activeElement) && element == activeElement;
      }
      return false;
    }

    private findElement(activeElement: HTMLElement) {
      return this.focusableElements.findIndex(element => this.isEqualFocusNode(activeElement, element));
    }

    private focusTrap(direction: boolean) {
      const activeElement = this.getDeepActiveElement!() as HTMLElement;
      const activeIndex = this.findElement(activeElement);
      if (direction) {
        if (activeIndex === -1 && this.focusTrapIndex - 1 > 0) {
          this.focusTrapIndex--;
        } else {
          this.focusTrapIndex = activeIndex > 0 ? activeIndex - 1 : this.focusableElements.length - 1;
        }
      } else {
        if (activeIndex === -1 && this.focusTrapIndex + 1 < this.focusableElements.length) {
          this.focusTrapIndex++;
        } 
        else if (activeIndex === this.focusableElements.length - 1 && this.focusTrapIndex === 0) {
          const nextEleToFocus = this.focusableElements[this.focusTrapIndex];
          if (nextEleToFocus) {
            this.tryFocus(nextEleToFocus);
          }
        } 
        else {
          this.focusTrapIndex = activeIndex + 1 < this.focusableElements.length ? activeIndex + 1 : 0;
        }
      }
    }

    private hasAutofocus(element: HTMLElement) {
      return element.hasAttribute("autofocus");
    }

    protected setInitialFocus(prefferableElement: HTMLElement | number = 0, ignoreAutoFocus = false) {
      let focusableIndex = -1;

      this.initialFocusComplete = false;

      if (this.focusableElements.length && !ignoreAutoFocus) {
        focusableIndex = this.focusableElements.findIndex(this.hasAutofocus);
      }

      if (this.focusableElements.length && focusableIndex === -1) {
        if (typeof prefferableElement === "object") {
          focusableIndex = this.findElement(prefferableElement);
        } else if (typeof prefferableElement === "number") {
          focusableIndex = prefferableElement;
        }
      }

      if (this.focusableElements[focusableIndex]) {
        this.focusTrapIndex = focusableIndex;
      }
    }

    protected setFocusableElements() {
      this.focusableElements = this.findFocusable(this.shadowRoot!, new Set());
    }

    protected removeFocusableElements() {
      this.focusableElements = [];
   }

    protected async firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      await new Promise(resolve => setTimeout(resolve, 0));
      this.setFocusableElements();
    }

    handleKeydownFocusTrap(event: KeyboardEvent) {
      if (event.code !== Key.Tab || (event.shiftKey && event.code !== Key.Tab)) {
        return;
      }

      if (!this.activeFocusTrap || !this.focusableElements.length) {
        return;
      }

      if (event.shiftKey) {
        event.preventDefault();
        this.focusTrap(true);
      } else {
        event.preventDefault();
        this.focusTrap(false);
      }
    }

    protected activateFocusTrap() {
      this.activeFocusTrap = true;
    }

    protected deactivateFocusTrap() {
      this.activeFocusTrap = false;
      this.focusTrapIndex = -1;
      this.removeAttribute("focus-trap-index");
      this.removeFocusableElements();
    }

    handleOutsideTrapClick = (event: MouseEvent) => {
      let insideTrapClick = false;
      const path = event.composedPath();
      if (path.length) {
        insideTrapClick = !!path.find(node => node === this);
        if (!insideTrapClick && !this.preventClickOutside && this.activeFocusTrap) {
          this.deactivateFocusTrap();
        } else if (insideTrapClick && this.activeFocusTrap && this.initialFocusComplete) {
          this.handleClickInsideTrap(event);
        }
      }
    };

    private handleClickInsideTrap(event: MouseEvent) {
      const path = event.composedPath();
      const pathIndex = path.findIndex(element => this.findElement(element as HTMLElement) !== -1);
      if (pathIndex !== -1) {
        const focusableElement = path[pathIndex] as HTMLElement;
        const focusableIndex = this.findElement(focusableElement);

        if (focusableIndex !== -1) {
          this.focusTrapIndex = focusableIndex;
        }
      }
    }

    private manageNewElement(newElement: HTMLElement) {
      requestAnimationFrame(() => {
        this.setFocusableElements();
        const focusableIndex = this.findElement(newElement);

        if (focusableIndex !== -1) {
          this.focusTrapIndex = focusableIndex;
        }
      });
    }

    handleFocusVisible(event: CustomEvent<FocusEventDetail>) {
      const originalEvent = event.detail ? event.detail.sourceEvent : event;
      const focusableElement = originalEvent.composedPath()[0];
      const focusableIndex = event.detail ? this.findElement(focusableElement as HTMLElement) : -1;

      if (focusableIndex === -1 && focusableElement !== this) {
        this.manageNewElement(focusableElement as HTMLElement);
      }
    }
    updateFocusableElements = () => {
      const focusableTimer = setTimeout(() => {
        this.setFocusableElements();
        clearTimeout(focusableTimer);
      }, 10);
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this.handleKeydownFocusTrap);
      this.addEventListener("focus-visible", this.handleFocusVisible as EventListener);
      document.addEventListener("click", this.handleOutsideTrapClick);
      document.addEventListener("on-widget-update", this.updateFocusableElements);

    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this.handleKeydownFocusTrap);
      this.removeEventListener("focus-visible", this.handleFocusVisible as EventListener);
      document.removeEventListener("click", this.handleOutsideTrapClick);
      document.removeEventListener("on-widget-update", this.updateFocusableElements);
      this.removeFocusableElements();
    }
  }

  DedupeMixin(FocusTrapMixin, FocusTrap);

  return FocusTrap;
};
