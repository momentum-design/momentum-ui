/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Placement as PopoverPlacement, StrategyType } from "@/components/popover/Popover.types";
import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusTrapMixin } from "@/mixins/FocusTrapMixin";
import { debounce } from "@/utils/helpers";
import { Placement } from "@popperjs/core/lib";
import arrow from "@popperjs/core/lib/modifiers/arrow";
import flip from "@popperjs/core/lib/modifiers/flip";
import offset from "@popperjs/core/lib/modifiers/offset";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import { createPopper, defaultModifiers, Instance, Rect } from "@popperjs/core/lib/popper-lite";
import { html, LitElement, PropertyValues } from "lit";
import { property, query, queryAssignedNodes } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./scss/module.scss";

export enum OverlaySizes {
  small = "260px",
  large = "370px"
}

type OffsetsFunction = ({
  popper,
  reference,
  placement
}: {
  popper: Rect;
  reference: Rect;
  placement: Placement;
}) => [number, number];

export const menuOverlaySize = ["small", "large"] as const;
export const menuOverlayPlacement = PopoverPlacement;
export const menuOverlayRole = ["menu", "dialog"] as const;

export namespace MenuOverlay {
  export type Size = (typeof menuOverlaySize)[number];
  export type Placement = (typeof menuOverlayPlacement)[number];
  export type Role = (typeof menuOverlayRole)[number];

  @customElementWithCheck("md-menu-overlay")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    private _isOpen = false;
    private static readonly activeOverlay: ELEMENT[] = [];
    @property({ type: Boolean, attribute: "is-open", reflect: true })
    get isOpen() {
      return this._isOpen;
    }
    set isOpen(newValue: boolean) {
      const oldValue = this._isOpen;
      this._isOpen = newValue;
      this.handleInstance(newValue);
      if (this.overlayContainer) {
        this.overlayContainer.toggleAttribute("data-show", newValue);
      }
      this.requestUpdate("isOpen", oldValue);
    }

    @property({ type: String }) size: MenuOverlay.Size = "large";
    @property({ type: String, attribute: "max-height" }) maxHeight = "";
    @property({ type: String, attribute: "custom-width" }) customWidth = "";
    @property({ type: Boolean, attribute: "show-arrow" }) showArrow = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) placement: MenuOverlay.Placement = "bottom";
    @property({ type: Boolean, attribute: "allow-hover-toggle" }) allowHoverToggle = false;
    @property({ type: String }) ariaRole: Role = "menu";
    @property({ type: String }) ariaLabel = "";
    @property({ type: Boolean, attribute: "is-date-picker" }) isDatePicker = false;
    @property({ type: Number, attribute: "overlay-offset" }) overlayOffset = 15;
    @property({ type: Boolean, attribute: "keep-open-on-window-blur" }) keepOpenOnWindowBlur = false;
    @query(".overlay-container") overlayContainer!: HTMLDivElement;
    @query(".overlay-arrow") arrow!: HTMLDivElement;
    @property({ type: String, attribute: "positioning-strategy" })
    positioningStrategy?: StrategyType = undefined;

    @queryAssignedNodes({ slot: "menu-trigger", flatten: true }) trigger?: NodeListOf<HTMLElement>;

    private popperInstance: Instance | null = null;
    private triggerElement: HTMLElement | null = null;

    private renderMaxHeight() {
      return this.maxHeight ? `max-height: ${this.maxHeight};` : `max-height: calc(100vh - 48px);`;
    }

    private renderOverflowY() {
      return this.isDatePicker ? `overflow-y: visible;` : `overflow-y: auto;`;
    }

    private renderWidth() {
      if (this.customWidth) {
        return `width: ${this.customWidth};`;
      } else if (this.size === "small") {
        return `width: ${OverlaySizes.small};`;
      } else {
        return `width: ${OverlaySizes.large};`;
      }
    }

    private getStyles() {
      return html`
        <style>
          :host .md-menu-overlay .overlay-content {
            ${this.renderMaxHeight()};
            ${this.renderWidth()};
            ${this.renderOverflowY()};
          }
        </style>
      `;
    }
    updateActiveMenuOverlayOpened = (event: Event) => {
      if (this === event.target) {
        MenuOverlay.ELEMENT.activeOverlay?.push(event.target as ELEMENT);
      }
    };
    updateActiveMenuOverlayClosed = (event: Event) => {
      const index = MenuOverlay.ELEMENT.activeOverlay.indexOf(event.target as ELEMENT);
      if (this === event.target && index !== -1) {
        MenuOverlay.ELEMENT.activeOverlay.splice(index, 1);
        if (MenuOverlay.ELEMENT.activeOverlay.length > 0) {
          MenuOverlay.ELEMENT.activeOverlay[MenuOverlay.ELEMENT.activeOverlay.length - 1]?.setFocusableElements!();
          MenuOverlay.ELEMENT.activeOverlay[MenuOverlay.ELEMENT.activeOverlay.length - 1]?.focusOnNestedTrigger(
            this.triggerElement as HTMLElement
          );
        } else {
          this.setFocusableElements!();
        }
      }
    };

    connectedCallback() {
      super.connectedCallback();
      this.handleWindowBlurEvent = this.handleWindowBlurEvent.bind(this);
      window.addEventListener("blur", this.handleWindowBlurEvent);
      document.addEventListener("keydown", this.handleOutsideOverlayKeydown);
      this.addEventListener("menu-overlay-open", this.updateActiveMenuOverlayOpened);
      this.addEventListener("menu-overlay-close", this.updateActiveMenuOverlayClosed);

      this.updateComplete.then(() => {
        this.handleTriggerSlotChange();
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this.handleOutsideOverlayClick);
      document.removeEventListener("keydown", this.handleOutsideOverlayKeydown);
      window.removeEventListener("blur", this.handleWindowBlurEvent);

      this.removeEventListener("menu-overlay-open", this.updateActiveMenuOverlayOpened);
      this.removeEventListener("menu-overlay-close", this.updateActiveMenuOverlayClosed);

      this.removeTriggerEventListeners();
    }

    checkIsInputField(element: HTMLElement) {
      if (element?.tagName?.toLowerCase() === "md-input") {
        return true;
      }
      return false;
    }

    private updateTriggerElementAriaExpanded() {
      if (this.triggerElement) {
        if (this.isOpen) {
          this.triggerElement.setAttribute("aria-expanded", "true");
          if (this.triggerElement.hasAttribute("ariaexpanded")) {
            this.triggerElement.setAttribute("ariaexpanded", "true");
          }
        } else {
          this.triggerElement.removeAttribute("aria-expanded");
          if (this.triggerElement.hasAttribute("ariaexpanded")) {
            this.triggerElement.setAttribute("ariaexpanded", "false");
          }
        }
      }
    }

    private handleTriggerSlotChange() {
      this.removeTriggerEventListeners();
      this.setupTriggerEventListeners();
      this.updateTriggerElementAriaExpanded();

      if (this.popperInstance) {
        this.destroy();
      }

      if (this.isOpen) {
        this.create();
        if (this.overlayContainer) {
          this.overlayContainer.toggleAttribute("data-show", this.isOpen);
        }
      }
    }

    private removeTriggerEventListeners() {
      if (this.triggerElement) {
        this.triggerElement.removeEventListener("click", this.handleTriggerClick);
        this.triggerElement.removeEventListener("keydown", this.handleTriggerKeyDown);
        if (this.allowHoverToggle) {
          this.triggerElement.removeEventListener("mouseenter", this.expandPopup);
          this.triggerElement.removeEventListener("mouseleave", this.collapsePopup);
          this.overlayContainer.removeEventListener("mouseenter", this.expandPopup);
          this.overlayContainer.removeEventListener("mouseleave", this.collapsePopup);
        }
        this.triggerElement = null;
      }
    }

    private setupTriggerEventListeners() {
      if (this.trigger) {
        this.triggerElement = this.trigger[0];
        if (!this.triggerElement) {
          return;
        }
        this.triggerElement.addEventListener("click", this.handleTriggerClick);

        if (this.allowHoverToggle) {
          this.triggerElement.addEventListener("mouseenter", this.expandPopup);
          this.triggerElement.addEventListener("mouseleave", this.collapsePopup);
          this.overlayContainer.addEventListener("mouseenter", this.expandPopup);
          this.overlayContainer.addEventListener("mouseleave", this.collapsePopup);
        }

        if (this.arrow && this.showArrow) {
          this.arrow.toggleAttribute("data-show", true);
        }

        if (!this.checkIsInputField(this.triggerElement)) {
          // Prevent adding keydown event, if the slot element type is md-input
          // This will allow users to use ENTER and SPACE key without issues.
          this.triggerElement.addEventListener("keydown", this.handleTriggerKeyDown);
        }
        this.triggerElement.setAttribute("aria-haspopup", "true");
      }
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("isOpen")) {
        if (this.isOpen) {
          this.activateFocusTrap!();
          document.addEventListener("menu-item-click", this.handleTriggerClick as EventListener);
        } else {
          this.deactivateFocusTrap!();
          document.removeEventListener("menu-item-click", this.handleTriggerClick as EventListener);
        }
      }

      if (changedProperties.has("showArrow")) {
        if (this.arrow) {
          this.arrow.toggleAttribute("data-show", this.showArrow);
        }
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("isOpen")) {
        if (this.isOpen) {
          this.dispatchMenuOpen();
          requestAnimationFrame(() => {
            document.addEventListener("click", this.handleOutsideOverlayClick);
          });

          this.updateTriggerElementAriaExpanded();
        } else {
          this.dispatchMenuClose();
          document.removeEventListener("click", this.handleOutsideOverlayClick);
          this.updateTriggerElementAriaExpanded();
        }
      }
    }

    private dispatchMenuOpen() {
      this.dispatchEvent(
        new CustomEvent("menu-overlay-open", {
          composed: true,
          bubbles: true
        })
      );
    }

    private dispatchMenuClose() {
      this.dispatchEvent(
        new CustomEvent("menu-overlay-close", {
          composed: true,
          bubbles: true
        })
      );
    }

    private handleInstance(createInstance: boolean) {
      if (createInstance) {
        this.create();
      } else {
        this.destroy();
      }
    }

    private create() {
      if (this.triggerElement) {
        this.popperInstance = createPopper(this.triggerElement, this.overlayContainer, {
          onFirstUpdate: async () => {
            // We need to find all focusable elements, after Popper finish its positioning calculation
            if (this.isOpen) {
              this.popperInstance?.update();
              this.setFocusableElements!();
              await this.updateComplete;
              this.focusInsideOverlay();
            }
          },
          placement: this.placement,
          strategy: this.positioningStrategy,
          modifiers: [
            ...defaultModifiers,
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
                    return [reference.height + reference.y + 3, 14];
                  } else {
                    return [0, this.overlayOffset];
                  }
                }) as OffsetsFunction
              }
            },
            {
              name: "arrow",
              options: {
                element: this.arrow,
                padding: 5
              }
            },
            {
              name: "computeStyles",
              options: {
                adaptive: false // this will recompute popper position
              }
            }
          ]
        });
      }
    }

    private destroy() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }

    private readonly handleTriggerClick = () => {
      this.toggleOverlay();
    };

    private toggleOverlay() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    }

    private readonly setOverlay = debounce((flag: boolean) => {
      if (!this.disabled) {
        this.isOpen = flag;
      }
    }, 100);

    private readonly expandPopup = () => {
      this.setOverlay(true);
    };

    private readonly collapsePopup = () => {
      this.setOverlay(false);
    };

    handleOutsideOverlayKeydown = async (event: KeyboardEvent) => {
      let insideMenuKeyDown = false;
      const path = event.composedPath();
      if (path.length) {
        insideMenuKeyDown = !!path.find((element) => element === this);
        if (!insideMenuKeyDown) {
          return;
        }
      }

      if (!this.overlayContainer) {
        return;
      }

      if (event.code === Key.Escape) {
        event.preventDefault();
        const lastOverlay =
          MenuOverlay.ELEMENT.activeOverlay.length > 0
            ? MenuOverlay.ELEMENT.activeOverlay[MenuOverlay.ELEMENT.activeOverlay.length - 1]
            : undefined;
        if (lastOverlay === this) {
          this.isOpen = false;
          await this.updateComplete;
          this.focusOnTrigger();
        }
      }
    };

    handleTriggerKeyDown = async (event: KeyboardEvent) => {
      switch (event.code) {
        case Key.Space:
        case Key.Enter:
          {
            event.preventDefault();
            this.toggleOverlay();

            if (!this.isOpen) {
              await this.updateComplete;
              this.focusOnTrigger();
            }
          }
          break;
        default: {
          break;
        }
      }
    };

    private focusOnTrigger() {
      requestAnimationFrame(() => {
        if (this.focusableElements?.length) {
          this.focusableElements[0].focus();
        }
      });
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

    private focusOnNestedTrigger(triggerElement?: HTMLElement) {
      this.setFocusOnTrigger?.(triggerElement);
    }

    handleOutsideOverlayClick = (event: MouseEvent) => {
      let insideMenuClick = false;
      const path = event.composedPath();
      if (path.length) {
        insideMenuClick = !!path.find((element) => element === this);
        if (!insideMenuClick && !this.preventClickOutside) {
          this.isOpen = false;
        }
      }
    };

    handleWindowBlurEvent() {
      if (this._isOpen && !this.keepOpenOnWindowBlur) {
        this.isOpen = false;
      }
    }

    static get styles() {
      return [styles];
    }

    render() {
      return html`
        ${this.getStyles()}
        <div class="md-menu-overlay">
          <slot @slotchange="${this.handleTriggerSlotChange}" name="menu-trigger"></slot>
          <div
            part="overlay"
            class="overlay-container"
            role=${this.ariaRole}
            aria-modal=${ifDefined(this.ariaRole === "dialog" ? "true" : undefined)}
            aria-label=${ifDefined(this.ariaLabel || undefined)}
          >
            <div id="arrow" class="overlay-arrow" data-popper-arrow></div>
            <div class="overlay-content" part="overlay-content">
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
    "md-menu-overlay": MenuOverlay.ELEMENT;
  }
}
