import { getElementByIdDeep } from "@/utils/helpers";
import { type Popover } from "./Popover";

export class PopoverUtils {
  /** @internal */
  private readonly popover: Popover;

  /** @internal */
  private arrowPixelChange: boolean = false;

  /** @internal */
  private originalParent: Node | null = null;

  /** @internal */
  private originalNextSibling: Node | null = null;

  constructor(popover: Popover) {
    this.popover = popover;
  }

  /**
   * Parses the delay string and sets the open and close delay values.
   * If the delay string is invalid, the delay is set to 0.
   * @returns An array containing the open and close delay values.
   * @throws An error if the delay value is invalid.
   */
  setupDelay() {
    try {
      const [openDelay, closeDelay] = this.popover.delay.split(",").map((delay) => {
        const parsed = parseInt(delay, 10);
        if (Number.isNaN(parsed) || parsed < 0) {
          throw new Error(`Invalid delay value: ${delay}`);
        }
        return parsed;
      });

      return [openDelay, closeDelay];
    } catch (_error) {
      this.popover.delay = "0,0";
      return [0, 0];
    }
  }

  /**
   * Sets up the hover bridge for the popover.
   * The hover bridge is used to prevent the popover from closing when the mouse is over the popover.
   *
   * @param placement - The placement of the popover.
   */
  setupHoverBridge(placement: string) {
    const hoverBridge = this.popover.renderRoot.querySelector(".popover-hover-bridge") as HTMLElement;
    Object.assign(hoverBridge.style, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const bridgeSize = `calc(${this.popover.showArrow ? "0.75rem + " : ""}${this.popover.offset}px)`;
    const popoverHeight = this.popover.offsetHeight || 0;
    const popoverWidth = this.popover.offsetWidth || 0;

    // If appendTo is used, we may need to adjust the hover bridge
    const isAppendedToAnotherContainer = !!this.popover.appendTo && this.originalParent;

    if (hoverBridge) {
      const side = placement.split("-")[0];

      // When using append-to, ensure the hover bridge event listener is attached
      if (isAppendedToAnotherContainer && this.popover.trigger.includes("mouseenter")) {
        hoverBridge.addEventListener("mouseenter", this.popover.cancelCloseDelay);
      }

      switch (side) {
        case "top":
          hoverBridge.style.height = bridgeSize;
          hoverBridge.style.bottom = `calc(-1 * (${bridgeSize}))`;
          hoverBridge.style.left = "50%";
          hoverBridge.style.width = `${popoverWidth}px`;
          break;
        case "left":
          hoverBridge.style.height = `${popoverHeight}px`;
          hoverBridge.style.width = bridgeSize;
          hoverBridge.style.right = `calc(-1.5 * (${bridgeSize}))`;
          break;
        case "right":
          hoverBridge.style.height = `${popoverHeight}px`;
          hoverBridge.style.width = bridgeSize;
          hoverBridge.style.left = `calc(-0.5 * (${bridgeSize}))`;
          break;
        case "bottom":
        default:
          hoverBridge.style.height = bridgeSize;
          hoverBridge.style.top = `calc(-1 * (${bridgeSize}))`;
          hoverBridge.style.left = "50%";
          hoverBridge.style.width = `${popoverWidth}px`;
          break;
      }
    }
  }

  /**
   * If the `appendTo` property is set, finds the corresponding
   * DOM element by its ID, and appends this popover as a child of that element when opened.
   * When closed, returns to original position.
   * @param isOpen Whether the popover is being opened (true) or closed (false)
   */
  handleAppendTo(isOpen: boolean) {
    if (!this.popover.appendTo) return;

    if (isOpen) {
      // Store original position before moving
      this.originalParent = this.popover.parentNode;
      this.originalNextSibling = this.popover.nextSibling;

      const appendToElement = getElementByIdDeep(this.popover.appendTo, document);
      if (appendToElement) {
        // Remove event listeners before moving the element
        this.popover.removeEventListeners();

        appendToElement.appendChild(this.popover);

        // Re-setup the trigger listeners after moving to new container
        this.popover.setupTriggerListener();

        // Re-attach focus/blur listeners for elements after DOM move
        this.reattachFocusListeners();

        // Re-establish event listeners or other DOM-dependent features
        if (this.popover.trigger.includes("mouseenter")) {
          const hoverBridge = this.popover.renderRoot.querySelector(".popover-hover-bridge");
          if (hoverBridge) {
            hoverBridge.addEventListener("mouseenter", this.popover.cancelCloseDelay);
          }
        }
      }
    } else if (this.originalParent) {
      // Remove event listeners before moving the element back
      this.popover.removeEventListeners();

      // Return to original position when closing
      if (this.originalNextSibling) {
        this.originalParent.insertBefore(this.popover, this.originalNextSibling);
      } else {
        this.originalParent.appendChild(this.popover);
      }

      // Re-setup the trigger listeners after returning to original position
      this.popover.setupTriggerListener();
    }
  }

  /**
   * Re-attaches focus/blur event listeners for any components with FocusMixin after DOM move.
   */
  private reattachFocusListeners() {
    // Find all elements within the popover that might have FocusMixin
    const allElements = this.popover.querySelectorAll("*");
    allElements.forEach((element) => {
      // Check if the element has FocusMixin methods
      const focusElement = element as any;
      if (focusElement.handleFocusIn && focusElement.handleFocusOut) {
        // Remove existing listeners to avoid duplicates
        focusElement.removeEventListener("focus", focusElement.handleFocusIn);
        focusElement.removeEventListener("blur", focusElement.handleFocusOut);

        // Re-add the listeners
        focusElement.addEventListener("focus", focusElement.handleFocusIn);
        focusElement.addEventListener("blur", focusElement.handleFocusOut);
      }
    });
  }

  /**
   * Sets up the accessibility attributes for the popover.
   */
  setupAccessibility() {
    if (this.popover.role === "dialog" || this.popover.role === "alertdialog") {
      this.popover.toggleAttribute("aria-modal", this.popover.interactive);
    }
    if (this.popover.interactive) {
      this.popover.setAttribute("aria-modal", "true");
      if (!this.popover.ariaLabel) {
        this.popover.ariaLabel =
          this.popover.triggerElement?.ariaLabel || this.popover.triggerElement?.textContent || "";
      }
      if (!this.popover.ariaLabelledby) {
        this.popover.ariaLabelledby = this.popover.triggerElement?.id || "";
      }
    } else {
      this.popover.removeAttribute("aria-modal");
    }
  }

  /**
   * Updates the aria-haspopup attribute on the trigger element.
   */
  updateAriaHasPopupAttribute() {
    if (this.popover.interactive) {
      this.popover.triggerElement?.setAttribute(
        "aria-haspopup",
        this.popover.triggerElement?.getAttribute("aria-haspopup") || "dialog"
      );
    } else {
      this.popover.triggerElement?.removeAttribute("aria-haspopup");
    }
  }

  /**
   * Updates the aria-expanded attribute on the trigger element.
   */
  updateAriaExpandedAttribute() {
    if (this.popover.disableAriaExpanded) {
      this.popover.triggerElement?.removeAttribute("aria-expanded");
    } else {
      this.popover.triggerElement?.setAttribute("aria-expanded", `${this.popover.visible}`);
    }
  }

  /**
   * Updates the arrow style based on the arrow data and placement.
   *
   * @param arrowData - The arrow data x and y.
   * @param placement - The placement of the popover.
   */
  updateArrowStyle(arrowData: { x?: number; y?: number }, placement: string): void {
    if (!this.popover.arrowElement) return;

    const side = placement.split("-")[0];
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[side] as "top" | "bottom" | "left" | "right";

    const { x: arrowX, y: arrowY } = arrowData;
    const rect = this.popover.arrowElement.getBoundingClientRect();
    const parent = this.popover.arrowElement.offsetParent?.getBoundingClientRect();

    if (!this.arrowPixelChange) {
      const pixelDiff = parent?.[staticSide] ? 12 - Math.abs(rect[staticSide] - parent[staticSide]) : 0;
      if (Math.round(pixelDiff) === 1) {
        this.arrowPixelChange = true;
      } else {
        this.arrowPixelChange = false;
      }
    }

    const arrowPixelDiff = this.arrowPixelChange ? 0.5 : 0;
    this.popover.arrowElement.setAttribute("data-side", side);

    Object.assign(this.popover.arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : "",
      top: arrowY != null ? `${arrowY}px` : "",
      [staticSide]: `${-this.popover.arrowElement.offsetHeight / 2 - arrowPixelDiff}px`
    });
  }

  /**
   * Updates the popover style based on the x and y position.
   *
   * @param x - The x position.
   * @param y - The y position.
   */
  updatePopoverStyle(x: number, y: number): void {
    Object.assign(this.popover.style, {
      left: `${x}px`,
      top: `${y}px`
    });
  }

  createBackdrop() {
    if (!this.popover.backdropElement) {
      const backdrop = document.createElement("div");
      backdrop.classList.add("popover-backdrop");
      this.popover.parentElement?.appendChild(backdrop);

      const styleElement = document.createElement("style");
      styleElement.textContent = `
        .popover-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: ${this.popover.zIndex - 1};
        }
      `;
      backdrop.appendChild(styleElement);
      this.popover.backdropElement = backdrop;
    }
  }
}
