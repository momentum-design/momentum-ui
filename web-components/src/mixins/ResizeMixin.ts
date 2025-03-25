/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/** This mixin provides a performant mechanism by which component can monitor changes to its size.
 * For performance purpose, resizeObserver instance is static mixin property, and its shared across
 * all components that applied ResizeMixin. (The `observe` method, which adds element as a new target to the list of observed elements,
 * can pass either one element or multiple, so this mixin can manage mutliple elements that need's to be observed).
 * When observed element's size changed, mixin dispatch `resize` event to handle it outside component tree.
 *
 * Example:
 * @customElements("custom-element")
 * class CustomElement extends ResizeMixin(LitElement) {
 *    protected handleResize(contentRect: DOMRect) { <---- You override this with corresponding name in component directly.
        // super.handleResize && super.handleResize(event); <---- Check to see whether the superclass defines a method of the same name, and if so, invoke that method.
        // Do your listener work here.
      }
 * }
 */

import { LitElement } from "lit";
import { DedupeMixin, wasApplied } from "./DedupeMixin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...input: any[]) => A;

export abstract class ResizeClass extends LitElement {
  protected handleResize?(contentRect: DOMRect): void;
  protected unobserveAll?(): void;
}

type ResizeObserverBoxOptions = "border-box" | "content-box" | "device-pixel-content-box";

export interface ResizeObserverOptions {
  box?: ResizeObserverBoxOptions;
}

export declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe: (target: Element, options?: ResizeObserverOptions) => void;
  unobserve: (target: Element) => void;
  disconnect: () => void;
}

export type ResizeObserverCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;

export interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: ResizeObserverSize[];
  readonly contentBoxSize: ResizeObserverSize[];
  readonly devicePixelContentBoxSize: ResizeObserverSize[];
}

interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

export const ResizeMixin = <T extends AnyConstructor<ResizeClass>>(base: T): T & AnyConstructor<ResizeClass> => {
  if (wasApplied(ResizeMixin, base)) {
    return base as ReturnType<() => T & AnyConstructor<ResizeClass>>;
  }
  class Resize extends base {
    protected static _resizeObserver?: ResizeObserver;
    protected static _animationFrameID?: number;

    private _initResizeObserver() {
      const observer = Resize._resizeObserver;
      if (observer == null) {
        Resize._resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
          Resize._animationFrameID = requestAnimationFrame(() => {
            if (Array.isArray(entries) && entries.length) {
              entries.forEach((entry) => {
                const { target, contentRect } = entry;
                (target as Resize).handleResize(contentRect as DOMRect);
              });
            }
          });
        });
      }
    }

    protected handleResize(contentRect: DOMRect) {
      if (super.handleResize) {
        super.handleResize(contentRect);
      }
      this.dispatchEvent(
        new CustomEvent("resize", {
          detail: {
            contentRect
          },
          bubbles: true,
          composed: true
        })
      );
    }

    protected unobserveAll() {
      if (super.unobserveAll) {
        super.unobserveAll();
      }
      const observer = Resize._resizeObserver;
      if (observer) {
        observer.disconnect();
      }
    }

    connectedCallback() {
      super.connectedCallback();

      this._initResizeObserver();
      const observer = Resize._resizeObserver;

      if (observer && this.isConnected) {
        observer.observe(this);
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      const observer = Resize._resizeObserver;
      const timerId = Resize._animationFrameID;

      if (observer) {
        observer.unobserve(this);
      }

      if (timerId) {
        cancelAnimationFrame(timerId);
      }
    }
  }

  DedupeMixin(ResizeMixin, Resize);

  return Resize;
};
