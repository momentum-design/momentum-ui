/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusTrapMixin } from "@/mixins/FocusTrapMixin";
import { isActionKey } from "@/utils/keyboard";
import { arrow, createPopper, flip, Instance, offset, Placement, preventOverflow, Rect } from "@popperjs/core";
import { html, LitElement, property, PropertyValues, query } from "lit-element";
import { nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ARROW_HEIGHT, PlacementType, PopoverRoleType } from "./Popover.types";
import styles from "./scss/module.scss";

type OffsetsFunction = ({
  popper,
  reference,
  placement
}: {
  popper: Rect;
  reference: Rect;
  placement: Placement;
}) => [number, number];

export namespace Popover {
  /**
   * @fires popover-open-changed - Fired when the popover is opened or closed.
   */
  @customElementWithCheck("md-popover")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    /**
     *
     *
     */
    @property({ type: String })
    placement: PlacementType = "bottom";

    /**
     *
     *
     *
     */
    @property({ type: Boolean, attribute: "is-open" })
    isOpen = false;

    /**
     *
     *
     */
    @property({ type: Boolean, attribute: "show-arrow" })
    showArrow = true;

    @property({ type: Boolean })
    interactive = false;

    //Override FocusTrap Mixin property
    shouldWrapFocus = () => true;

    /**
     *
     *
     */
    @property({ type: String, attribute: "role" })
    role: PopoverRoleType = "dialog";

    /**
     *
     *
     */
    @property({ type: String, attribute: "aria-label" })
    ariaLabel: string | null = null;

    /**
     *
     * The offset distance (in px) from the trigger element.
     */
    @property({ type: Number, attribute: "offset-distance" })
    offsetDistance = 5;

    @query('slot[name="triggerElement"]')
    triggerSlot!: HTMLSlotElement;

    @query(".popover-container")
    popoverContainer!: HTMLDivElement;

    @query(".popover-arrow")
    popoverArrow!: HTMLDivElement;

    @property({ type: String })
    trigger?: string = "click";

    private triggerElement: HTMLElement | null = null;

    private popperInstance: Instance | null = null;

    static get styles() {
      return [styles];
    }

    override connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener("popover-open", this.updateActivePopoverOpened);
      this.addEventListener("popover-close", this.updateActivePopoverClosed);
    }

    override disconnectedCallback(): void {
      super.disconnectedCallback();
      this.removeEventListener("popover-open", this.updateActivePopoverOpened);
      this.removeEventListener("popover-close", this.updateActivePopoverClosed);

      if (this.triggerElement) {
        if (this.trigger?.includes("click")) {
          this.triggerElement.removeEventListener("click", this.onTriggerElementClicked);
          this.triggerElement.removeEventListener("keydown", this.onTriggerElementKeydown);
        }

        if (this.trigger?.includes("mouseenter")) {
          this.triggerElement.removeEventListener("mouseenter", this.onMouseEnterdTriggerOrPopup);
          this.triggerElement.removeEventListener("mouseleave", this.onMouseLeaveTriggerOrPopup);
          this.popoverContainer?.removeEventListener("mouseenter", this.onMouseEnterdTriggerOrPopup);
          this.popoverContainer?.removeEventListener("mouseleave", this.onMouseLeaveTriggerOrPopup);
        }
      }
    }

    private handleTriggerElementSlotChange() {
      const assignedElements = this.triggerSlot.assignedElements({ flatten: true });
      this.triggerElement = assignedElements.length > 0 ? (assignedElements[0] as HTMLElement) : null;
    }

    private setupTriggerEvents() {
      if (this.triggerElement) {
        if (this.trigger?.includes("click")) {
          this.triggerElement.addEventListener("click", this.onTriggerElementClicked.bind(this));
          this.triggerElement.addEventListener("keydown", this.onTriggerElementKeydown.bind(this));
        }

        if (this.trigger?.includes("mouseenter")) {
          this.triggerElement.addEventListener("mouseenter", this.onMouseEnterdTriggerOrPopup);
          this.triggerElement.addEventListener("mouseleave", this.onMouseLeaveTriggerOrPopup);
          this.popoverContainer?.addEventListener("mouseenter", this.onMouseEnterdTriggerOrPopup);
          this.popoverContainer?.addEventListener("mouseleave", this.onMouseLeaveTriggerOrPopup);
        }
      }
    }

    onTriggerElementClicked = () => {
      this.toggleOverlay();
    };

    onTriggerElementKeydown = (event: KeyboardEvent) => {
      if (isActionKey(event.code)) {
        event.preventDefault();
        this.toggleOverlay();
      }
    };

    onMouseEnterdTriggerOrPopup = (_event: MouseEvent) => {
      //Handle show on mouse enter
    };

    onMouseLeaveTriggerOrPopup = (_event: MouseEvent) => {
      //Handle close on mouse leave
    };

    protected override firstUpdated(changedProperties: PropertyValues): void {
      super.firstUpdated(changedProperties);

      //Setup the trigger element from the trigger slot
      //await this.updateComplete;
      this.handleTriggerElementSlotChange();

      this.setupTriggerEvents();

      if (this.popoverContainer && this.isOpen) {
        //Create instance on first updated
        this.createInstance();
        this.popoverContainer?.setAttribute("data-show", "");
      }
    }

    private focusInsideOverlay() {
      if (this.focusableElements) {
        if (this.focusableElements.length > 1) {
          this.setInitialFocus!(1);
        } else if (this.focusableElements.length) {
          this.setInitialFocus!();
        }
      }
    }

    private toggleOverlay(): void {
      if (this.triggerElement?.hasAttribute("disabled")) {
        return;
      }

      this.isOpen = !this.isOpen;
    }

    private createInstance() {
      if (!this.triggerElement) {
        console.warn("No trigger element not creating popper instance");
        return;
      }

      this.popperInstance = createPopper(this.triggerElement, this.popoverContainer, {
        onFirstUpdate: async () => {
          // We need to find all focusable elements, after Popper finish its positioning calculation
          if (this.isOpen) {
            this.setFocusableElements!();
            await this.updateComplete;
            this.focusInsideOverlay();
          }
        },
        placement: this.placement,
        modifiers: [
          flip,
          offset,
          preventOverflow,
          arrow,
          {
            name: "preventOverflow",
            options: {
              padding: 16
            }
          },
          {
            name: "offset",
            options: {
              offset: (({ placement, reference }) => {
                if (placement === "left-end" || placement === "right-end") {
                  return [reference.height + reference.y + this.offsetDistance, 14];
                } else {
                  return [0, this.showArrow ? ARROW_HEIGHT + this.offsetDistance : this.offsetDistance];
                }
              }) as OffsetsFunction
            }
          },
          {
            name: "arrow",
            options: {
              element: this.popoverArrow,
              padding: ARROW_HEIGHT
            }
          },
          {
            name: "computeStyles",
            options: {
              adaptive: true // this will recompute popper position
            }
          }
        ]
      });
    }

    private destroyInstance() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }

    private createOrDestoryInstance(open: boolean) {
      if (open) {
        this.createInstance();
      } else {
        this.destroyInstance();
      }
    }

    //       if (this.trigger) {
    //         this.triggerElement = this.trigger[0];
    //         this.triggerElement.addEventListener("click", this.handleTriggerClick);

    //         if (this.allowHoverToggle) {
    //           this.triggerElement.addEventListener("mouseenter", this.expandPopup);
    //           this.triggerElement.addEventListener("mouseleave", this.collapsePopup);
    //           this.overlayContainer.addEventListener("mouseenter", this.expandPopup);
    //           this.overlayContainer.addEventListener("mouseleave", this.collapsePopup);
    //         }

    //         if (!this.checkIsInputField(this.triggerElement)) {
    //           // Prevent adding keydown event, if the slot element type is md-input
    //           // This will allow users to use ENTER and SPACE key without issues.
    //           this.triggerElement.addEventListener("keydown", this.handleTriggerKeyDown);
    //         }
    //         this.triggerElement.setAttribute("aria-haspopup", "true");
    //       }

    //       if (this.overlayContainer && this.isOpen) {
    //         this.handleInstance(true);
    //         this.overlayContainer.toggleAttribute("data-show", true);
    //       }

    //       if (this.arrow && this.showArrow) {
    //         this.arrow.toggleAttribute("data-show", true);
    //       }
    //     }

    protected override updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);

      if (changedProperties.has("isOpen")) {
        const oldValue = changedProperties.get("isOpen") as boolean;
        this.isOpenUpdated(oldValue, this.isOpen);
      }
    }

    private isOpenUpdated(oldValue: boolean, newValue: boolean) {
      //Value has not changed noop
      if (oldValue === newValue) {
        return;
      }

      console.log("is updated changed value:", newValue);

      this.createOrDestoryInstance(newValue);
      this.dispatchPopoverIsOpenChanged(newValue);

      if (newValue) {
        this.activateFocusTrap?.();
        this.triggerElement?.setAttribute("aria-expanded", "true");
        this.popoverContainer?.setAttribute("data-show", "");
      } else {
        this.deactivateFocusTrap?.();
        this.triggerElement?.removeAttribute("aria-expanded");
        this.popoverContainer?.removeAttribute("data-show");
      }
    }

    private updateActivePopoverOpened = (event: Event) => {
      if (this === event.target) {
        //MenuOverlay.ELEMENT.activeOverlay?.push(event.target as ELEMENT);
      }
    };

    private updateActivePopoverClosed = (_event: Event) => {
      // const index = MenuOverlay.ELEMENT.activeOverlay.indexOf(event.target as ELEMENT);
      // if (this === event.target && index !== -1) {
      //   MenuOverlay.ELEMENT.activeOverlay.splice(index, 1);
      //   if (MenuOverlay.ELEMENT.activeOverlay.length > 0) {
      //     MenuOverlay.ELEMENT.activeOverlay[MenuOverlay.ELEMENT.activeOverlay.length - 1]?.setFocusableElements!();
      //     MenuOverlay.ELEMENT.activeOverlay[MenuOverlay.ELEMENT.activeOverlay.length - 1]?.focusOnNestedTrigger(
      //       this.triggerElement as HTMLElement
      //     );
      //   } else {
      //     this.setFocusableElements!();
      //   }
      // }
    };

    private dispatchPopoverIsOpenChanged(isOpen: boolean) {
      this.dispatchEvent(
        new CustomEvent("popover-open-changed", {
          detail: { isOpen },
          composed: true,
          bubbles: true
        })
      );
    }

    render() {
      return html`
        <div class="md-popover">
          <slot name="triggerElement" aria-expanded=${this.isOpen}></slot>
          <div
            part="popover"
            class="popover-container"
            role=${this.role}
            aria-modal=${ifDefined(this.interactive ? "true" : undefined)}
            aria-label=${ifDefined(this.ariaLabel || undefined)}
          >
            ${this.showArrow ? html`<div id="arrow" class="popover-arrow"></div>` : nothing}
            <div class="popover-content" part="popover-content">
              <slot></slot>
            </div>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-popover": Popover.ELEMENT;
  }
}
