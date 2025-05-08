/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Key } from "@/constants";
import { SlottedMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues, query } from "lit-element";
import { AccordionItem } from "./AccordionItem";
import styles from "./scss/module.scss";

export namespace Accordion {
  @customElementWithCheck("md-accordion")
  export class ELEMENT extends SlottedMixin(LitElement) {
    @property({ type: Boolean, reflect: true }) multiple = false;
    @property({ type: Boolean, reflect: true }) suppressFocusableContainer = false;

    @query('slot[name="accordion-item"]') accordionItemSlotElement!: HTMLSlotElement;

    get slotItem() {
      return this.accordionItemSlotElement;
    }

    filterSlotted() {
      return this.accordionItemSlotElement.assignedElements() as HTMLElement[];
    }

    private switchFocusedAccordionItem(direction: number) {
      const focusedAccordionItemIndex = this.slotted.findIndex((accordionItem) =>
        (accordionItem as AccordionItem.ELEMENT).hasAttribute("focus-visible")
      );

      const accordionItemsCount = this.slotted.length;
      let nextFocusedAccordionItemIndex = focusedAccordionItemIndex;

      nextFocusedAccordionItemIndex =
        (accordionItemsCount + nextFocusedAccordionItemIndex + direction) % accordionItemsCount;
      while ((this.slotted[nextFocusedAccordionItemIndex] as AccordionItem.ELEMENT).disabled) {
        nextFocusedAccordionItemIndex =
          (accordionItemsCount + nextFocusedAccordionItemIndex + direction) % accordionItemsCount;
      }
      this.focusAccordionItem(this.slotted[nextFocusedAccordionItemIndex] as AccordionItem.ELEMENT);
    }

    private focusAccordionItem(accordionItem: AccordionItem.ELEMENT) {
      if (!accordionItem.hasAttribute("focus-visible")) {
        requestAnimationFrame(() => accordionItem.header.focus());
      }
    }

    private setActiveAccordionItem(accordionItem: AccordionItem.ELEMENT) {
      if (!this.multiple) {
        this.slotted.forEach((item) => {
          const anotherAccordionItem = item as AccordionItem.ELEMENT;
          if (anotherAccordionItem.expanded && !item.isEqualNode(accordionItem)) {
            anotherAccordionItem.expanded = false;
          }
        });
        accordionItem.expanded = true;
      } else {
        accordionItem.expanded = !accordionItem.expanded;
      }
    }

    private setupExpandedAccordionItems() {
      if (!this.multiple) {
        this.slotted
          .filter((accordionItem) => (accordionItem as AccordionItem.ELEMENT).expanded)
          .forEach((accordionItem, index) => {
            const item = accordionItem as AccordionItem.ELEMENT;
            if (item.expanded && index > 0) {
              item.expanded = false;
            }
          });
      }
    }

    private readonly handleAccordionItemFocus = () => {
      this.toggleAttribute("focusable", true);
    };

    private readonly handleAccordionItemBlur = () => {
      this.toggleAttribute("focusable", false);
    };

    private setupFocusAccordionItems() {
      this.slotted.forEach((header) => {
        if (!this.suppressFocusableContainer) {
          header.addEventListener("focus", this.handleAccordionItemFocus);
          header.addEventListener("blur", this.handleAccordionItemBlur);
        }
      });
    }

    private removeFocusAccordionItems() {
      this.slotted.forEach((header) => {
        if (!this.suppressFocusableContainer) {
          header.removeEventListener("focus", this.handleAccordionItemFocus);
          header.removeEventListener("blur", this.handleAccordionItemBlur);
        }
      });
    }

    handleKeyDown(event: CustomEvent<AccordionItem.AccordionEvent>) {
      const { srcEvent } = event.detail;
      const { code } = srcEvent as KeyboardEvent;

      switch (code) {
        case Key.Space:
        case Key.Enter: {
          const { target } = event;
          if (target) {
            this.setActiveAccordionItem(target as AccordionItem.ELEMENT);
          }
          break;
        }
        case Key.ArrowDown: {
          this.switchFocusedAccordionItem(1);
          break;
        }
        case Key.ArrowUp: {
          this.switchFocusedAccordionItem(-1);
          break;
        }
        case Key.Home: {
          const firstAccordionItem = this.slotted[0] as AccordionItem.ELEMENT;
          this.focusAccordionItem(firstAccordionItem);
          break;
        }
        case Key.End: {
          const lastAccordionItem = this.slotted[this.slotted.length - 1] as AccordionItem.ELEMENT;
          this.focusAccordionItem(lastAccordionItem);
          break;
        }
        default:
          break;
      }
    }

    handleClick(event: CustomEvent<AccordionItem.AccordionEvent>) {
      const { target } = event;
      const accordionItem = this.slotted.find((item) =>
        (item as AccordionItem.ELEMENT).isSameNode(target as HTMLElement)
      );
      if (accordionItem) {
        this.setActiveAccordionItem(accordionItem as AccordionItem.ELEMENT);
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("slotted")) {
        this.setupExpandedAccordionItems();
        this.setupFocusAccordionItems();
      }
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("accordion-item-keydown", this.handleKeyDown as EventListener);
      this.addEventListener("accordion-item-click", this.handleClick as EventListener);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("accordion-item-keydown", this.handleKeyDown as EventListener);
      this.removeEventListener("accordion-item-click", this.handleClick as EventListener);
      this.removeFocusAccordionItems();
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-accordion" part="accordion">
          <slot name="accordion-item"></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-accordion": Accordion.ELEMENT;
  }
}
