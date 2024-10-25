/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { Key } from "@/constants";
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
     * The placement of the popover relative to the trigger element.
     *
     * This property specifies where the popover should appear in relation to the trigger element.
     * The default placement is "bottom", but it can be customized to other positions such as "top", "left", or "right".
     *
     * @type {PlacementType}
     */
    @property({ type: String })
    placement: PlacementType = "bottom";

    /**
     * Indicates whether the popover is open.
     *
     * This property controls the visibility of the popover. When set to true, the popover is displayed.
     * When set to false, the popover is hidden.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, attribute: "is-open" })
    isOpen = false;

    /**
     * Indicates whether the arrow should be shown on the popover.
     *
     * This property controls the visibility of the arrow on the popover. When set to true, the arrow is displayed.
     * When set to false, the arrow is hidden.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, attribute: "show-arrow" })
    showArrow = true;

    /**
     * Indicates whether the close button should be shown on the popover.
     *
     * This property controls the visibility of the close button on the popover. When set to true, the close button is displayed.
     * When set to false, the close button is hidden.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, attribute: "show-close" })
    showClose? = false;

    /**
     * Indicates whether the popover is interactive.
     *
     * When set to true, the popover will allow user interactions within it.
     * This property is used to determine if the popover should trap focus.
     *
     * @type {boolean}
     */
    @property({ type: Boolean })
    interactive = false;

    //Override FocusTrap Mixin property
    shouldWrapFocus = () => this.interactive;

    /**
     * The role attribute for the popover.
     *
     * This property specifies the `role` attribute for the popover, which defines its role in the accessibility tree.
     * The default role is "dialog", but it can be customized to "dialog", "menu" or "tooltip.
     *
     * @type {PopoverRoleType}
     */
    @property({ type: String, attribute: "role" })
    role: PopoverRoleType = "dialog";

    /**
     * The accessible label for the popover.
     *
     * This property specifies the `aria-label` attribute for the popover, which provides an accessible name for the popover element.
     * It is used by screen readers to announce the purpose of the popover to users with visual impairments.
     *
     * @type {string | null}
     */
    @property({ type: String, attribute: "aria-label" })
    ariaLabel: string | null = null;

    /**
     * The offset distance (in pixels) from the trigger element.
     *
     * This property specifies the distance between the trigger element and the popover.
     * It is used to control the spacing between the trigger element and the popover when the popover is displayed.
     *
     * @type {number}
     */
    @property({ type: Number, attribute: "offset-distance" })
    offsetDistance = 5;

    /**
     * The slot element that contains the trigger element for the popover.
     *
     * This property is used to query the slot with the name "triggerElement" and store a reference to it.
     * The trigger element is the element that, when interacted with, will open or close the popover.
     *
     * @type {HTMLSlotElement}
     */
    @query('slot[name="triggerElement"]')
    triggerSlot!: HTMLSlotElement;

    /**
     *
     * The offset distance (in px) from the trigger element.
     */
    @query(".popover-container")
    popoverContainer!: HTMLDivElement;

    /**
     *
     * The offset distance (in px) from the trigger element.
     */
    @query(".popover-arrow")
    popoverArrow!: HTMLDivElement;

    /**
     *
     * The offset distance (in px) from the trigger element.
     */
    @property({ type: String })
    trigger?: string = "click";

    /**
     *
     * The offset distance (in px) from the trigger element.
     */
    private triggerElement: HTMLElement | null = null;

    /**
     * The Popper.js instance used to manage the positioning of the popover.
     *
     * This instance is created when the popover is opened and destroyed when the popover is closed.
     * It is used to handle the positioning and alignment of the popover relative to the trigger element.
     */
    private popperInstance: Instance | null = null;

    static get styles() {
      return [styles];
    }

    override connectedCallback(): void {
      super.connectedCallback();
    }

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      window.removeEventListener("blur", this.onWindowBlurEvent);
      document.removeEventListener("click", this.onOutsideOverlayClick);
      document.removeEventListener("keydown", this.onOutsideOverlayKeydown);

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

        if (this.trigger?.includes("focus")) {
          //remove foucusin listener
        }
      }
    }

    private setupTriggerEvents() {
      //Show the popover when the trigger lement is activated through click or keydown
      if (this.triggerElement) {
        if (this.trigger?.includes("click")) {
          this.triggerElement.addEventListener("click", this.onTriggerElementClicked.bind(this));
          this.triggerElement.addEventListener("keydown", this.onTriggerElementKeydown.bind(this));
        }

        //Show popover on mouse enter and hide on mouse exit
        if (this.trigger?.includes("mouseenter")) {
          this.triggerElement.addEventListener("mouseenter", this.onMouseEnterdTriggerOrPopup);
          this.triggerElement.addEventListener("mouseleave", this.onMouseLeaveTriggerOrPopup);
          this.popoverContainer?.addEventListener("mouseenter", this.onMouseEnterdTriggerOrPopup);
          this.popoverContainer?.addEventListener("mouseleave", this.onMouseLeaveTriggerOrPopup);
        }

        //Show popover when the trigger element gets keyboard focus
        if (this.trigger?.includes("focus")) {
          //add foucusin listener
        }
      }
    }

    onOutsideOverlayClick = (event: MouseEvent) => {
      //Should there be an extra prop to not close on outside clicks
      if (this.trigger?.includes("manual")) {
        //Consumer controls closing of popover
        //so do not close on outside clicks
        return;
      }

      let insideMenuClick = false;
      const path = event.composedPath();
      if (path.length) {
        insideMenuClick = !!path.find((element) => element === this);
        if (!insideMenuClick) {
          this.isOpen = false;
        }
      }
    };

    onWindowBlurEvent = () => {
      if (this.isOpen) {
        this.isOpen = false;
      }
    };

    async onOutsideOverlayKeydown(event: KeyboardEvent) {
      if (this.trigger?.includes("manual")) {
        return;
      }

      if (!this.isOpen || event.code !== Key.Escape) {
        return;
      }

      event.preventDefault();
      this.isOpen = false;
      await this.updateComplete;
      this.focusOnTrigger();
    }

    private handleTriggerElementSlotChange() {
      const assignedElements = this.triggerSlot.assignedElements({ flatten: true });
      this.triggerElement = assignedElements.length > 0 ? (assignedElements[0] as HTMLElement) : null;
    }

    private onContentSlotChanged() {
      //popover container slot changed
    }

    onTriggerElementClicked = () => {
      this.toggleOverlay();
    };

    onTriggerElementKeydown = async (event: KeyboardEvent) => {
      if (isActionKey(event.code)) {
        event.preventDefault();
        this.toggleOverlay();
      }

      if (event.code === Key.Escape) {
        if (this.isOpen) {
          this.isOpen = false;
          await this.updateComplete;
          this.focusOnTrigger();
        }
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
          this.setInitialFocus?.(1);
        } else if (this.focusableElements.length) {
          this.setInitialFocus?.();
        }
      }
    }

    private async focusOnTrigger() {
      requestAnimationFrame(() => {
        if (this.focusableElements?.length) {
          this.focusableElements[0].focus();
        }
      });
    }

    private toggleOverlay(): void {
      if (this.triggerElement?.hasAttribute("disabled")) {
        return;
      }

      this.isOpen = !this.isOpen;
    }

    private async handleCreatePopperFirstUpdate() {
      if (this.isOpen && this.interactive) {
        this.setFocusableElements?.();
        await this.updateComplete;
        this.focusInsideOverlay();
      }
    }

    private createInstance() {
      if (!this.triggerElement) {
        console.warn("No trigger element not creating popper instance");
        return;
      }

      this.popperInstance = createPopper(this.triggerElement, this.popoverContainer, {
        onFirstUpdate: () => {
          // We need to find all focusable elements, after Popper finish its positioning calculation
          if (this.isOpen) {
            this.handleCreatePopperFirstUpdate();
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
                if (placement === "left" || placement === "right") {
                  return [reference.height + reference.y + this.offsetDistance, ARROW_HEIGHT];
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

      if (newValue) {
        this.createInstance();

        this.dispatchPopoverIsOpenChanged(newValue);

        //When the overlay is open listen to blur, click, and keydown events to close
        //if needed when the window loses focus
        window.addEventListener("blur", this.onWindowBlurEvent);
        document.addEventListener("click", this.onOutsideOverlayClick);
        document.addEventListener("keydown", this.onOutsideOverlayKeydown);

        this.activateFocusTrap?.();
        this.triggerElement?.setAttribute("aria-expanded", "true");
        this.popoverContainer?.setAttribute("data-show", "");
      } else {
        this.destroyInstance();

        window.removeEventListener("blur", this.onWindowBlurEvent);
        document.removeEventListener("click", this.onOutsideOverlayClick);
        document.removeEventListener("keydown", this.onOutsideOverlayKeydown);

        this.dispatchPopoverIsOpenChanged(newValue);

        this.deactivateFocusTrap?.();
        this.triggerElement?.removeAttribute("aria-expanded");
        this.popoverContainer?.removeAttribute("data-show");
      }
    }

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
            aria-label=${ifDefined(this.ariaLabel ?? undefined)}
          >
            ${this.showClose
              ? html`<md-button
                  class="cancel-icon-button"
                  size="24"
                  hasRemoveStyle
                  circle
                  @button-click=${() => (this.isOpen = false)}
                >
                  <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
                </md-button>`
              : nothing}
            ${this.showArrow ? html`<div id="arrow" class="popover-arrow"></div>` : nothing}
            <div class="popover-content" part="popover-content">
              <slot @slotchange=${this.onContentSlotChanged}></slot>
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
