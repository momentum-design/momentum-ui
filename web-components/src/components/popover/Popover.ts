/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusTrapMixin } from "@/mixins/FocusTrapMixin";
import { getDeepActiveElement, querySelectorDeep } from "@/utils/helpers";
import { arrow, autoUpdate, computePosition, flip, offset, shift, size } from "@floating-ui/dom";
import { html, LitElement, property, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { COLOR, DEFAULTS, POPOVER_PLACEMENT, TRIGGER } from "./Popover.constants";
import { PopoverEventManager } from "./Popover.events";
import { popoverStack } from "./Popover.stack";
import {
  IPopoverController,
  PopoverColor,
  PopoverPlacement,
  PopoverStrategy,
  PopoverTrigger,
  ValueOf
} from "./Popover.types";
import { PopoverUtils } from "./Popover.utils";
import styles from "./scss/module.scss";

export class PopoverController implements IPopoverController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  show(_useDelay?: boolean): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hide(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle(): void {}

  isVisible(): boolean {
    return false;
  }
}

/**
 * Popover component is a lightweight floating UI element that displays additional content when triggered.
 * It can be used for tooltips, dropdowns, or contextual menus.
 * The popover automatically positions itself based on available space and
 * supports dynamic height adjustments with scrollable content when needed。
 *
 * @dependency md-button
 * @dependency md-icon
 *
 * @tagname md-popover
 *
 * @event shown - This event is dispatched when the popover is shown
 * @event hidden - This event is dispatched when the popover is hidden
 * @event created - This event is dispatched when the popover is created (added to the DOM)
 * @event destroyed - This event is dispatched when the popover is destroyed (removed from the DOM)
 *
 * @cssproperty --md-popover-arrow-border-radius - radius of the arrow border
 * @cssproperty --md-popover-arrow-border - border of the arrow
 * @cssproperty --popover-bg-color - primary background color of the popover
 * @cssproperty --popover-border-color - border color of the popover
 * @cssproperty --popover-text-color - text color of the popover
 * @cssproperty --popover-inverted-bg-color - inverted background color of the popover
 * @cssproperty --popover-inverted-border-color - inverted border color of the popover
 * @cssproperty --popover-inverted-text-color - inverted text color of the popover
 * @cssproperty --md-popover-elevation-3 - elevation of the popover
 * @cssproperty --md-popover-max-width - max width of the popover
 * @cssproperty --md-popover-max-height - max height of the popover
 *
 * @slot - Default slot for the popover content
 *
 */
@customElementWithCheck("md-popover")
export class Popover extends FocusTrapMixin(LitElement) {
  /**
   * The unique ID of the popover.
   */
  @property({ type: String, reflect: true })
  override id: string = "";

  /**
   * The ID of the element that triggers the popover.
   * This attribute is required for the popover to work.
   */
  @property({ type: String, reflect: true })
  triggerID: string = "";

  /**
   * Determines the events that cause the Popover to show.
   * Multiple event names should be separated by spaces.
   * For example to allow both click and hover, use 'click mouseenter' as the trigger.
   * - **click**
   * - **mouseenter**
   * - **focusin**
   * - **manual**
   * @default click
   */
  @property({ type: String, reflect: true })
  trigger: PopoverTrigger = DEFAULTS.TRIGGER;

  /**
   * The placement of the popover.
   * - **top**
   * - **top-start**
   * - **top-end**
   * - **bottom**
   * - **bottom-start**
   * - **bottom-end**
   * - **left**
   * - **left-start**
   * - **left-end**
   * - **right**
   * - **right-start**
   * - **right-end**
   * @default bottom
   */
  @property({ type: String, reflect: true })
  placement: PopoverPlacement = DEFAULTS.PLACEMENT;

  /**
   * The positioning strategy for the popover.
   * - **absolute** - Position relative to closest positioned ancestor or the document body
   * - **fixed** - Position relative to the viewport
   * @default absolute
   */
  @property({ type: String, reflect: true })
  strategy: PopoverStrategy = DEFAULTS.STRATEGY;

  /**
   * Color of the popover
   * - **tonal**
   * - **contrast**
   * @default tonal
   */
  @property({ type: String, reflect: true })
  color: PopoverColor = DEFAULTS.COLOR;

  /**
   * The visibility of the popover.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  visible: boolean = DEFAULTS.VISIBLE;

  /**
   * The offset of the popover.
   * @default 4
   */
  @property({ type: Number, reflect: true })
  offset: number = DEFAULTS.OFFSET;

  /**
   * Determines whether the focus trap is enabled.
   * If true, focus will be restricted to the content within this component.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "focus-trap" })
  focusTrap: boolean = DEFAULTS.FOCUS_TRAP;

  /**
   * Prevent outside scrolling when popover show.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "prevent-scroll" })
  preventScroll: boolean = DEFAULTS.PREVENT_SCROLL;

  /**
   * The arrow visibility of the popover.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "show-arrow" })
  showArrow: boolean = DEFAULTS.ARROW;

  /**
   * The close button visibility of the popover.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "close-button" })
  closeButton: boolean = DEFAULTS.CLOSE_BUTTON;

  /**
   * Determines whether the popover is interactive。
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  interactive: boolean = DEFAULTS.INTERACTIVE;

  /**
   * The delay of the show/hide popover.
   * @default 0,0
   */
  @property({ type: String, reflect: true })
  delay: string = DEFAULTS.DELAY;

  /**
   * Hide popover on escape key press.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "hide-on-escape" })
  hideOnEscape: boolean = DEFAULTS.HIDE_ON_ESCAPE;

  /**
   * Hide popover on blur.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "hide-on-blur" })
  hideOnBlur: boolean = DEFAULTS.HIDE_ON_BLUR;

  /**
   * Hide popover on window blur.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "hide-on-window-blur" })
  hideOnWindowBlur: boolean = DEFAULTS.HIDE_ON_WINDOW_BLUR;

  /**
   * Hide on outside click of the popover.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "hide-on-outside-click" })
  hideOnOutsideClick: boolean = DEFAULTS.HIDE_ON_CLICK_OUTSIDE;

  /**
   * The focus back to trigger after the popover hide.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "focus-back-to-trigger" })
  focusBackToTrigger: boolean = DEFAULTS.FOCUS_BACK;

  /**
   * Determines whether the popover with backdrop.
   * Other than popover and trigger element, the rest of the screen will be covered with a backdrop.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  backdrop: boolean = DEFAULTS.BACKDROP;

  /**
   * Changes the placement of popover to keep it in view when scrolling.
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  flip: boolean = DEFAULTS.FLIP;

  /**
   * Changes the size of popover to keep it in view when scrolling.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  size: boolean = DEFAULTS.SIZE;

  /**
   * The z-index of the popover.
   * @default 1000
   */
  @property({ type: Number, reflect: true, attribute: "z-index" })
  zIndex: number = DEFAULTS.Z_INDEX;

  /**
   * Element ID that the popover append to.
   * @default ''
   */
  @property({ type: String, reflect: true, attribute: "append-to" })
  appendTo: string = "";

  /**
   * aria-label attribute to be set for close button accessibility.
   * @default null
   */
  @property({ type: String, attribute: "close-button-aria-label", reflect: true })
  closeButtonAriaLabel: string | null = null;

  /**
   * Role of the popover
   * @default dialog
   */
  @property({ type: String, reflect: true })
  override role: HTMLElement["role"] = DEFAULTS.ROLE;

  /**
   * aria-labelledby for an interactive popover only, defaults to the trigger component id.
   * Used in nested cases where the triggerComponent isn't the actual button.
   */
  @property({ type: String, reflect: true, attribute: "aria-labelledby" })
  ariaLabelledby: string | null = null;

  /**
   * aria-describedby of the popover.
   */
  @property({ type: String, reflect: true, attribute: "aria-describedby" })
  ariaDescribedby: string | null = null;

  /**
   * Disable aria-expanded attribute on trigger element.
   * Make sure to set this to false when the popover is interactive.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "disable-aria-expanded" })
  disableAriaExpanded: boolean = DEFAULTS.DISABLE_ARIA_EXPANDED;

  /**
   * Controller object that provides methods to programmatically control the popover.
   * This is especially useful when the popover is appended to another part of the DOM.
   *
   * @example
   * ```js
   * const controller = {};
   * popover.controller = controller;
   * // Now you can use controller.show(), controller.hide(), controller.toggle()
   * ```
   */
  @property({ type: Object, attribute: false })
  set controller(value: PopoverController | null | undefined) {
    if (!value) {
      this._controller = null;
      return;
    }

    // Assign the controller methods
    value.show = (useDelay = false) => this.showPopover(useDelay);
    value.hide = () => this.hidePopover();
    value.toggle = () => this.togglePopoverVisible();
    value.isVisible = () => this.visible;

    this._controller = value;
  }

  get controller(): PopoverController | null {
    return this._controller;
  }

  private _controller: PopoverController | null = null;

  public arrowElement: HTMLElement | null = null;

  public triggerElement: HTMLElement | null = null;

  /** @internal */
  private hoverTimer: number | null = null;

  /** @internal */
  private isTriggerClicked: boolean = false;

  /** @internal */
  private openDelay: number = 0;

  /** @internal */
  private closeDelay: number = 0;

  /** @internal */
  private readonly utils: PopoverUtils;

  /** @internal */
  public backdropElement: HTMLElement | null = null;

  useLegacyFindFocusable: () => boolean = () => false;

  /** @internal */
  private cleanupAutoUpdate: (() => void) | null = null;

  /** @internal */
  private previousActiveElement: HTMLElement | null = null;

  constructor() {
    super();
    this.utils = new PopoverUtils(this);
    this.preventClickOutside = true;
  }

  protected override async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    [this.openDelay, this.closeDelay] = this.utils.setupDelay();
    this.utils.setupAccessibility();
    this.style.zIndex = `${this.zIndex}`;
    PopoverEventManager.onCreatedPopover(this);

    if (this.visible) {
      this.utils.handleAppendTo(true);
      this.positionPopover();
      await this.handleCreatePopoverFirstUpdate();
    }
  }

  override async disconnectedCallback() {
    super.disconnectedCallback();

    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = null;
    }

    this._controller = null;
    this.previousActiveElement = null;
    this.removeEventListeners();
    PopoverEventManager.onDestroyedPopover(this);
    popoverStack.remove(this);
  }

  /**
   * Sets up the trigger event listeners based on the trigger type.
   */
  public setupTriggerListener() {
    if (!this.triggerID) return;

    const rootNode = this.getRootNode() as Document | ShadowRoot;
    this.triggerElement = querySelectorDeep(`[id="${this.triggerID}"]`, rootNode) as HTMLElement;

    if (!this.triggerElement) {
      const parentHost = (rootNode as ShadowRoot)?.host;
      if (parentHost) {
        const slottedTrigger = parentHost.querySelector("[slot]");
        if (slottedTrigger?.id === this.triggerID) {
          this.triggerElement = slottedTrigger as HTMLElement;
        }
      }
    }

    if (!this.triggerElement) return;

    if (this.trigger === "mouseenter") {
      if (this.interactive) {
        // if the popover is interactive, there is interactive content inside the popover
        // so we can't use the focusin trigger, since after closing with escape key, the
        // popover keeps opening. So we need to use the click trigger instead.
        this.trigger = "mouseenter click";
      } else {
        // non-interactive popovers with trigger mouseenter (like a tooltip) should also open
        // when focusing to the trigger element
        this.trigger = "mouseenter focusin";
      }
    }

    if (this.trigger.includes("click")) {
      this.triggerElement.addEventListener("click", this.onTriggerClick);
    }
    if (this.trigger.includes("mouseenter")) {
      const hoverBridge = this.renderRoot.querySelector(".popover-hover-bridge");
      this.triggerElement.addEventListener("mouseenter", this.onMouseEnterTrigger);
      this.triggerElement.addEventListener("mouseleave", this.startCloseDelay);
      this.addEventListener("mouseenter", this.cancelCloseDelay);
      this.addEventListener("mouseleave", this.startCloseDelay);
      hoverBridge?.addEventListener("mouseenter", this.cancelCloseDelay);
    }
    if (this.trigger.includes("focusin")) {
      this.triggerElement.addEventListener("focusin", this.onFocusInTrigger);
      if (!this.interactive) {
        this.triggerElement.addEventListener("focusout", this.hidePopover);
      }
    }
    this.addEventListener("focus-trap-exit", this.hidePopover);
  }

  /**
   * Removes the trigger event listeners.
   */
  public removeEventListeners() {
    if (!this.triggerElement) return;
    const hoverBridge = this.renderRoot.querySelector(".popover-hover-bridge");
    this.triggerElement.removeEventListener("click", this.onTriggerClick);
    this.triggerElement.removeEventListener("mouseenter", this.onMouseEnterTrigger);
    this.triggerElement.removeEventListener("mouseleave", this.hidePopover);
    this.removeEventListener("mouseenter", this.cancelCloseDelay);
    this.removeEventListener("mouseleave", this.startCloseDelay);
    this.triggerElement.removeEventListener("focusin", this.onFocusInTrigger);
    this.triggerElement.removeEventListener("focusout", this.hidePopover);
    hoverBridge?.removeEventListener("mouseenter", this.cancelCloseDelay);

    this.removeEventListener("focus-trap-exit", this.hidePopover);
  }

  protected override async updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has("visible")) {
      const oldValue = (changedProperties.get("visible") as boolean | undefined) || false;
      await this.isOpenUpdated(oldValue, this.visible);
      this.utils.updateAriaExpandedAttribute();
    }
    if (changedProperties.has("placement")) {
      this.setAttribute(
        "placement",
        Object.values(POPOVER_PLACEMENT).includes(this.placement) ? this.placement : DEFAULTS.PLACEMENT
      );
    }

    if (changedProperties.has("delay")) {
      [this.openDelay, this.closeDelay] = this.utils.setupDelay();
    }
    if (changedProperties.has("trigger")) {
      const triggers = this.trigger.split(" ");
      const validTriggers = triggers.filter((trigger) =>
        Object.values(TRIGGER).includes(trigger as ValueOf<typeof TRIGGER>)
      );

      this.setAttribute("trigger", validTriggers.length > 0 ? this.trigger : DEFAULTS.TRIGGER);
      this.removeEventListeners();
      this.setupTriggerListener();
    }
    if (changedProperties.has("triggerID")) {
      this.removeEventListeners();
      this.setupTriggerListener();
      this.utils.setupAccessibility();
    }
    if (changedProperties.has("color")) {
      this.setAttribute("color", Object.values(COLOR).includes(this.color) ? this.color : DEFAULTS.COLOR);
    }
    if (changedProperties.has("zIndex")) {
      this.setAttribute("z-index", `${this.zIndex}`);
    }
    if (
      changedProperties.has("interactive") ||
      changedProperties.has("aria-label") ||
      changedProperties.has("aria-labelledby")
    ) {
      this.utils.setupAccessibility();
    }
    if (changedProperties.has("disableAriaExpanded")) {
      this.utils.updateAriaExpandedAttribute();
    }
    if (changedProperties.has("interactive")) {
      this.utils.updateAriaHasPopupAttribute();
    }
  }

  /**
   * Handles the outside click event to close the popover.
   * Uses event.composedPath() to handle clicks across Shadow DOM boundaries.
   *
   * @param event - The mouse event.
   */
  private readonly onOutsidePopoverClick = (event: MouseEvent) => {
    const path = event.composedPath() as HTMLElement[];

    // First check if the click is on the trigger element
    if (this.triggerElement && path.includes(this.triggerElement)) {
      return;
    }

    // Simple check if the popover itself is in the event path
    const insidePopoverClick = path.includes(this);

    if (insidePopoverClick) {
      return;
    }

    if (popoverStack.shouldDeferToTopForOutsideClick(this)) {
      // This popover is part of a nested structure and is not the topmost one.
      // It should not close based on this outside click.
      return;
    }

    // If we reach here, the click was truly outside the popover
    this.hideThisPopover();
  };

  private readonly hideThisPopover = () => {
    setTimeout(() => {
      this.visible = false;
      this.isTriggerClicked = false;
      this.utils.handleAppendTo(false);
    }, this.closeDelay);
  };

  /**
   * Handles the escape keydown event to close the popover.
   *
   * @param event - The keyboard event.
   */
  private readonly onEscapeKeydown = (event: KeyboardEvent) => {
    if (!this.visible || event.code !== "Escape") {
      return;
    }

    event.preventDefault();
    this.hidePopover();
  };

  /**
   * Handles the popover focus out event.
   *
   * @param event - The focus event.
   */
  private readonly onPopoverFocusOut = (event: FocusEvent) => {
    if (!this.contains(event.relatedTarget as Node)) {
      this.hidePopover();
    }
  };

  private readonly handleWindowBlurEvent = () => {
    if (this.visible) {
      this.hidePopover();
    }
  };

  /**
   * Handles the popover visibility change and position the popover.
   * Handles the exit event to close the popover.
   *
   * @param oldValue - The old value of the visible property.
   * @param newValue - The new value of the visible property.
   */
  private async isOpenUpdated(oldValue: boolean, newValue: boolean) {
    if (oldValue === newValue || !this.triggerElement) {
      return;
    }

    if (newValue) {
      if (popoverStack.peek() !== this) {
        popoverStack.push(this);
      }

      super.preventScroll = this.preventScroll;

      if (this.focusTrap) {
        this.activateFocusTrap?.();
      }

      if (this.backdrop) {
        this.utils.createBackdrop();
        this.triggerElement.style.zIndex = `${this.zIndex}`;
      }

      this.positionPopover();
      await this.handleCreatePopoverFirstUpdate();

      if (this.hideOnBlur) {
        this.addEventListener("focusout", this.onPopoverFocusOut);
        if (this.trigger === "click") {
          this.triggerElement.style.pointerEvents = "none";
        }
      }
      if (this.hideOnWindowBlur) {
        window.addEventListener("blur", this.handleWindowBlurEvent);
      }
      if (this.hideOnOutsideClick) {
        document.addEventListener("click", this.onOutsidePopoverClick);
      }
      if (this.hideOnEscape) {
        document.addEventListener("keydown", this.onEscapeKeydown);
      }
      PopoverEventManager.onShowPopover(this);
    } else {
      if (this.cleanupAutoUpdate) {
        this.cleanupAutoUpdate();
        this.cleanupAutoUpdate = null;
      }

      popoverStack.removeItem(this);

      if (this.backdropElement) {
        this.backdropElement?.remove();
        this.backdropElement = null;
      }
      if (this.hideOnBlur) {
        this.removeEventListener("focusout", this.onPopoverFocusOut);
        if (this.trigger === "click") {
          this.triggerElement.style.pointerEvents = "";
        }
      }
      if (this.hideOnWindowBlur) {
        window.removeEventListener("blur", this.handleWindowBlurEvent);
      }
      if (this.hideOnOutsideClick) {
        document.removeEventListener("click", this.onOutsidePopoverClick);
      }
      if (this.hideOnEscape) {
        document.removeEventListener("keydown", this.onEscapeKeydown);
      }

      this.deactivateFocusTrap?.();
      if (!this.disableAriaExpanded) {
        this.triggerElement.removeAttribute("aria-expanded");
      }
      if (this.interactive) {
        const triggerElementRole = this.triggerElement.getAttribute("aria-haspopup");
        if (triggerElementRole === "dialog" || triggerElementRole === "alertdialog") {
          this.triggerElement.removeAttribute("aria-haspopup");
        }
      }
      if (this.focusBackToTrigger) {
        if (this.previousActiveElement instanceof HTMLElement) {
          this.previousActiveElement.focus();
        } else {
          this.setFocusOnDeepestNestedElement?.(this.triggerElement);
        }
      }
      this.previousActiveElement = null;
      PopoverEventManager.onHidePopover(this);
    }
  }

  /**
   * Starts the close delay timer.
   * If the popover is not interactive, it will close the popover after the delay.
   */
  private readonly startCloseDelay = () => {
    if (!this.interactive) {
      this.hidePopover();
    } else {
      if (this.isTriggerClicked) return;
      this.hoverTimer = window.setTimeout(() => {
        this.visible = false;
      }, this.closeDelay);
    }
  };

  /**
   * Cancels the close delay timer.
   */
  public readonly cancelCloseDelay = () => {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  };

  /**
   * Shows the popover.
   * By default (`useOpenDelay = false`), or if `openDelay` is 0 or less, the popover opens immediately.
   * If `useOpenDelay` is true and `openDelay` is greater than 0, the `openDelay` will be applied before showing the popover.
   * This allows programmatic calls (e.g., for `trigger="manual"`) to optionally use the `openDelay`.
   * @param {boolean} [useOpenDelay=false] - Indicates if the `openDelay` should be applied.
   */
  public showPopover = (useOpenDelay: boolean = false) => {
    this.cancelCloseDelay();

    if (useOpenDelay && this.openDelay > 0) {
      setTimeout(() => {
        this.utils.handleAppendTo(true);
        this.visible = true;
      }, this.openDelay);
    } else {
      // Open immediately
      this.utils.handleAppendTo(true);
      this.visible = true;
    }
  };

  /**
   * Hides the popover.
   */
  public hidePopover = () => {
    if (popoverStack.peek() === this) {
      setTimeout(() => {
        this.visible = false;
        this.isTriggerClicked = false;
        this.utils.handleAppendTo(false);
      }, this.closeDelay);
    }
  };

  /**
   * Toggles the popover visibility.
   */
  public togglePopoverVisible = () => {
    if (this.isTriggerClicked) {
      this.hidePopover();
    } else {
      this.showPopover();
      this.isTriggerClicked = true;
    }
  };

  private readonly onMouseEnterTrigger = () => {
    if (this.trigger.includes("mouseenter")) {
      if (!this.visible) {
        this.previousActiveElement = getDeepActiveElement();
      }

      //Open with delay
      this.showPopover(true);
    }
  };

  private readonly onFocusInTrigger = () => {
    if (this.trigger.includes("focusin")) {
      this.showPopover(false);
    }
  };

  private readonly onTriggerClick = (event: Event) => {
    if (this.trigger.includes("mouseenter") && this.isMouseOverTrigger(event)) {
      // If the trigger is mouseenter and the mouse is over the trigger, do not toggle
      return;
    }

    this.togglePopoverVisible();
  };

  private isRectOverTrigger(x: number, y: number): boolean {
    if (this.triggerElement && typeof window !== "undefined" && typeof document !== "undefined") {
      const rect = this.triggerElement.getBoundingClientRect();
      const isOverTrigger = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      return isOverTrigger;
    }
    return false;
  }

  private isMouseOverTrigger(event: Event): boolean {
    const { clientX, clientY } = event instanceof MouseEvent ? event : { clientX: 0, clientY: 0 };
    return this.isRectOverTrigger(clientX, clientY);
  }

  /**
   * Sets the focusable elements inside the popover.
   */
  private async handleCreatePopoverFirstUpdate() {
    if (this.visible && this.interactive) {
      this.setFocusableElements?.();
      await this.updateComplete;
      this.setInitialFocus?.();
    }
  }

  /**
   * Positions the popover based on the trigger element.
   * It also handles the flip, size and arrow placement.
   * It uses the floating-ui/dom library to calculate the position.
   */
  private positionPopover() {
    if (!this.triggerElement) return;

    // Clean up any existing autoUpdate before starting a new one
    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = null;
    }

    const middleware = [shift()];
    let popoverOffset = this.offset;

    if (this.flip) {
      middleware.push(flip());
    }

    if (this.size) {
      const popoverContent = this.renderRoot.querySelector('[part="popover-content"]') as HTMLElement;
      middleware.push(
        size({
          apply({ availableHeight }) {
            if (!popoverContent) return;
            Object.assign(popoverContent.style, {
              maxHeight: `${availableHeight}px`,
              overflowY: "auto"
            });
          },
          padding: 50
        })
      );
    }

    if (this.showArrow) {
      this.arrowElement = this.renderRoot.querySelector(".popover-arrow");
      if (this.arrowElement) {
        const arrowLen = this.arrowElement.offsetHeight;
        const arrowOffset = Math.sqrt(2 * arrowLen ** 2) / 2;
        popoverOffset = arrowOffset + this.offset;
        middleware.push(arrow({ element: this.arrowElement, padding: 12 }));
      }
    }

    middleware.push(offset(popoverOffset));

    this.cleanupAutoUpdate = autoUpdate(this.triggerElement, this, async () => {
      if (!this.triggerElement) return;

      const { x, y, middlewareData, placement } = await computePosition(this.triggerElement, this, {
        placement: this.placement,
        middleware,
        strategy: this.strategy
      });

      this.utils.updatePopoverStyle(x, y);
      if (middlewareData.arrow && this.arrowElement) {
        this.utils.updateArrowStyle(middlewareData.arrow, placement);
      }
      if (this.trigger.includes("mouseenter")) {
        this.utils.setupHoverBridge(placement);
      }
    });
  }

  public override render() {
    return html`
      <div class="popover-hover-bridge"></div>
      ${this.closeButton
        ? html` <md-button
            class="popover-close"
            hasRemoveStyle
            size="20"
            circle
            ariaLabel=${ifDefined(this.closeButtonAriaLabel) || ""}
            @button-click="${this.hidePopover}"
          >
            <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
          </md-button>`
        : nothing}
      ${this.showArrow ? html`<div class="popover-arrow"></div>` : nothing}
      <div part="popover-content">
        <slot></slot>
      </div>
    `;
  }

  static get styles() {
    return [styles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-popover": Popover;
  }
}
