import { type Popover } from "./Popover";

/**
 * Manages a stack of popovers to control their order and lifecycle.
 * This class allows adding, removing, and retrieving popovers
 * while maintaining their stacking behavior.
 *
 */
class PopoverStack {
  /**
   * Stack to maintain the order of popovers
   * @internal
   */
  private stack: Popover[] = [];

  /**
   * Adds a popover to the stack
   *
   * @param popover - Popover instance
   */
  push(popover: Popover) {
    this.stack.push(popover);
  }

  /**
   * Removes the last popover from the stack
   *
   * @returns The last popover in the stack
   */
  pop(): Popover | undefined {
    return this.stack.pop();
  }

  removeItem(popover: Popover) {
    this.stack = this.stack.filter((item) => item !== popover);
  }

  /**
   * Returns the last popover in the stack
   * without removing it
   *
   * @returns The last popover in the stack
   */
  peek(): Popover | undefined {
    return this.stack[this.stack.length - 1];
  }

  /**
   * Removes a popover from the stack
   *
   * @param popover - Popover instance
   */
  remove(popover: Popover) {
    this.stack = this.stack.filter((item) => item !== popover);
  }

  /**
   * Clears the stack
   */
  clear() {
    this.stack = [];
  }

  /**
   * Determines if the currentPopover should defer closing to the topmost popover
   * in the case of an outside click, based on nesting.
   *
   * @param currentPopover - The popover instance being checked.
   * @returns True if the currentPopover is nested with the top popover and is not the top itself,
   *          meaning it should defer closing. False otherwise.
   */
  shouldDeferToTopForOutsideClick(currentPopover: Popover): boolean {
    const topPopover = this.peek();

    if (!topPopover || topPopover === currentPopover) {
      // No top popover, or the current popover is already the top one.
      // No deferral needed.
      return false;
    }

    // Check for direct parent/child relationship between currentPopover and topPopover
    if (
      (topPopover.triggerElement && currentPopover.contains(topPopover.triggerElement)) ||
      (currentPopover.triggerElement && topPopover.contains(currentPopover.triggerElement))
    ) {
      return true;
    }

    // If they are nested and currentPopover is not the top one, it should defer.
    return false;
  }
}

export const popoverStack = new PopoverStack();
