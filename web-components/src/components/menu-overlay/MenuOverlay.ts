/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusTrapMixin } from "@/mixins/FocusTrapMixin";
import { Placement } from "@popperjs/core/lib";
import arrow from "@popperjs/core/lib/modifiers/arrow";
import flip from "@popperjs/core/lib/modifiers/flip";
import offset from "@popperjs/core/lib/modifiers/offset";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import { createPopper, defaultModifiers, Instance, Rect } from "@popperjs/core/lib/popper-lite";
import { html, LitElement, property, PropertyValues, query, queryAssignedNodes } from "lit";
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
export const menuOverlayPlacement = [
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end"
] as const;

export namespace MenuOverlay {
  export type Size = typeof menuOverlaySize[number];
  export type Placement = typeof menuOverlayPlacement[number];

  @customElementWithCheck("md-menu-overlay")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    private _isOpen = false;
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

    @query(".overlay-container") overlayContainer!: HTMLDivElement;
    @query(".overlay-arrow") arrow!: HTMLDivElement;

    @queryAssignedNodes("menu-trigger", true) trigger?: NodeListOf<HTMLElement>;

    private popperInstance: Instance | null = null;
    private triggerElement: HTMLElement | null = null;

    private renderMaxHeight() {
      return this.maxHeight ? `max-height: ${this.maxHeight};` : `max-height: calc(100vh - 48px);`;
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
          }
        </style>
      `;
    }

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("click", this.handleOutsideOverlayClick);
      document.addEventListener("keydown", this.handleOutsideOverlayKeydown);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this.handleOutsideOverlayClick);
      document.removeEventListener("keydown", this.handleOutsideOverlayKeydown);

      if (this.triggerElement) {
        this.triggerElement.removeEventListener("click", this.handleTriggerClick);
        this.triggerElement.removeEventListener("keydown", this.handleTriggerKeyDown);
        this.triggerElement = null;
      }
    }

    protected async firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      await new Promise(resolve => setTimeout(resolve, 0));

      if (this.trigger) {
        this.triggerElement = this.trigger[0];
        this.triggerElement.addEventListener("click", this.handleTriggerClick);
        this.triggerElement.addEventListener("keydown", this.handleTriggerKeyDown);
        this.triggerElement.setAttribute("aria-haspopup", "true");
      }

      if (this.overlayContainer && this.isOpen) {
        this.handleInstance(true);
        this.overlayContainer.toggleAttribute("data-show", true);
      }

      if (this.arrow && this.showArrow) {
        this.arrow.toggleAttribute("data-show", true);
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
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("isOpen")) {
        if (this.isOpen) {
          this.dispatchMenuOpen();

          if (this.triggerElement) {
            this.triggerElement.setAttribute("aria-expanded", "true");
          }
        } else {
          this.dispatchMenuClose();
          if (this.triggerElement) {
            this.triggerElement.removeAttribute("aria-expanded");
          }
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
              this.setFocusableElements!();
              await this.updateComplete;

              this.focusInsideOverlay();
            }
          },
          placement: this.placement,
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
                    return [0, 15];
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

    private handleTriggerClick = (event: MouseEvent) => {
      this.toggleOverlay();
    };

    private toggleOverlay() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    }

    handleOutsideOverlayKeydown = async (event: KeyboardEvent) => {
      let insideMenuKeyDown = false;
      const path = event.composedPath();
      if (path.length) {
        insideMenuKeyDown = !!path.find(element => element === this);
        if (!insideMenuKeyDown) {
          return;
        }
      }

      if (!this.overlayContainer) {
        return;
      }

      if (event.code === Key.Escape) {
        event.preventDefault();
        if (this.isOpen) {
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
        if (this.focusableElements && this.focusableElements.length) {
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

    handleOutsideOverlayClick = (event: MouseEvent) => {
      let insideMenuClick = false;
      const path = event.composedPath();
      if (path.length) {
        insideMenuClick = !!path.find(element => element === this);
        if (!insideMenuClick && !this.preventClickOutside) {
          this.isOpen = false;
        }
      }
    };

    static get styles() {
      return [styles];
    }

    render() {
      return html`
        ${this.getStyles()}
        <div aria-expanded=${this.isOpen} class="md-menu-overlay">
          <slot name="menu-trigger"></slot>
          <div part="overlay" class="overlay-container" role="tooltip">
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
