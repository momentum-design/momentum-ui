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
}

export const popoverStack = new PopoverStack();
