/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Key } from "@/constants";

type TooltipInteractionOptions = {
  reference: () => HTMLElement;
  isOpen: () => boolean;
  open: () => void;
  close: () => void;
};

/** Shared interaction handling for md-tooltip and custom tooltip-create callers. */
export class TooltipInteraction {
  private referenceHovered = false;
  private surfaceHovered = false;
  private referenceFocused = false;
  private referenceLeavePending = false;
  private awaitingPointerMoveAfterZoom = false;
  private surface: HTMLElement | null = null;
  private boundReference: HTMLElement | null = null;
  private referenceRoot: Node | null = null;
  private hideTimeout?: ReturnType<typeof setTimeout>;

  constructor(private readonly options: TooltipInteractionOptions) {}

  connect(reference?: HTMLElement) {
    document.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("wheel", this.handleWheel, { passive: true });
    window.addEventListener("gesturestart", this.handleZoom, { passive: true });
    window.visualViewport?.addEventListener("resize", this.handleZoom, { passive: true });
    if (reference) {
      this.boundReference = reference;
      this.referenceRoot = reference.getRootNode();
      this.referenceHovered = reference.matches(":hover");
      this.referenceFocused = reference.matches(":focus-within");
      // Capture before a custom caller's onmouseleave/onkeydown dispatches tooltip-destroy.
      reference.addEventListener("mouseenter", this.handleReferenceEnter, true);
      this.referenceRoot.addEventListener("mouseleave", this.handleAncestorLeave, true);
      reference.addEventListener("focusin", this.handleFocusIn, true);
      reference.addEventListener("focusout", this.handleFocusOut, true);
      reference.addEventListener("keydown", this.handleKeyDown, true);
    }
  }

  disconnect() {
    document.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("wheel", this.handleWheel);
    window.removeEventListener("gesturestart", this.handleZoom);
    window.visualViewport?.removeEventListener("resize", this.handleZoom);
    this.boundReference?.removeEventListener("mouseenter", this.handleReferenceEnter, true);
    this.referenceRoot?.removeEventListener("mouseleave", this.handleAncestorLeave, true);
    this.boundReference?.removeEventListener("focusin", this.handleFocusIn, true);
    this.boundReference?.removeEventListener("focusout", this.handleFocusOut, true);
    this.boundReference?.removeEventListener("keydown", this.handleKeyDown, true);
    this.boundReference = null;
    this.referenceRoot = null;
    this.reset();
  }

  setSurface(surface: HTMLElement | null) {
    this.surface?.removeEventListener("mouseenter", this.handleSurfaceEnter);
    this.surface?.removeEventListener("mouseleave", this.handleSurfaceLeave);
    this.surface = surface;
    this.surface?.addEventListener("mouseenter", this.handleSurfaceEnter);
    this.surface?.addEventListener("mouseleave", this.handleSurfaceLeave);
  }

  reset() {
    this.clearHideTimeout();
    this.referenceHovered = false;
    this.surfaceHovered = false;
    this.referenceFocused = false;
    this.referenceLeavePending = false;
    this.awaitingPointerMoveAfterZoom = false;
    this.setSurface(null);
    window.removeEventListener("mousemove", this.handlePointerAfterZoom, true);
  }

  /** A legacy destroy from mouseleave must allow the pointer to reach the portaled surface. */
  requestClose() {
    if (this.referenceLeavePending) {
      this.scheduleClose();
    } else {
      this.options.close();
    }
  }

  readonly handleReferenceEnter = () => {
    this.referenceHovered = true;
    this.referenceLeavePending = false;
    this.options.open();
  };

  readonly handleReferenceLeave = () => {
    this.referenceHovered = false;
    this.referenceLeavePending = true;
    this.scheduleClose();
  };

  private readonly handleAncestorLeave = (event: Event) => {
    // Legacy callers may bind mouseleave to a wrapper around a disabled reference.
    if (event.target instanceof Node && event.target.contains(this.options.reference())) {
      this.handleReferenceLeave();
    }
  };

  readonly handleFocusIn = () => {
    this.referenceFocused = true;
    this.options.open();
  };

  readonly handleFocusOut = (event: Event) => {
    const nextTarget = (event as FocusEvent).relatedTarget as Node | null;
    this.referenceFocused = !!nextTarget && this.options.reference().contains(nextTarget);
    if (!this.referenceFocused && !this.referenceHovered && !this.surfaceHovered) {
      this.options.close();
    }
  };

  readonly handleKeyDown = (event: KeyboardEvent) => {
    this.referenceLeavePending = false;
    if (this.options.isOpen() && event.code === Key.Escape) {
      this.options.close();
    }
  };

  private readonly handleSurfaceEnter = () => {
    this.surfaceHovered = true;
    this.referenceLeavePending = false;
  };

  private readonly handleSurfaceLeave = () => {
    this.surfaceHovered = false;
    this.scheduleClose();
  };

  private readonly handleWheel = (event: WheelEvent) => {
    if (!this.options.isOpen()) return;
    if (event.ctrlKey) {
      this.handleZoom();
    } else {
      this.options.close();
    }
  };

  private readonly handlePointerAfterZoom = (event: MouseEvent) => {
    const path = event.composedPath();
    this.referenceHovered = path.includes(this.options.reference());
    this.surfaceHovered = !!this.surface && path.includes(this.surface);
    this.awaitingPointerMoveAfterZoom = false;
    this.scheduleClose();
  };

  private readonly handleZoom = () => {
    if (this.options.isOpen() && this.shouldRemainOpen) {
      this.awaitingPointerMoveAfterZoom = true;
      window.addEventListener("mousemove", this.handlePointerAfterZoom, { passive: true, capture: true });
    }
  };

  private get shouldRemainOpen() {
    return this.referenceHovered || this.surfaceHovered || this.referenceFocused || this.awaitingPointerMoveAfterZoom;
  }

  private clearHideTimeout() {
    if (this.hideTimeout !== undefined) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  private scheduleClose() {
    this.clearHideTimeout();
    // Enter/leave events for the reference and the portaled surface complete before this task.
    this.hideTimeout = setTimeout(() => {
      this.hideTimeout = undefined;
      this.referenceLeavePending = false;
      if (!this.shouldRemainOpen) {
        this.options.close();
      }
    }, 0);
  }
}
