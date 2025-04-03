// DEBOUNCE decorator
// --------------------------------------

export function debounce(ms = 250) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    let timeout: number;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    return decorateFunction({ target, key, descriptor }, function (funcOriginal: Function, args: any[]) {
      clearTimeout(timeout);
      /* istanbul ignore next */
      timeout = window.setTimeout(() => {
        clearTimeout(timeout);
        funcOriginal.apply(this, args);
      }, ms);
    });
  };
}

function decorateFunction(p: Payload, funcWrap: FuncWrap): PropertyDescriptor {
  p.descriptor = p.descriptor || Object.getOwnPropertyDescriptor(p.target, p.key);

  if (typeof p.descriptor.value !== "function") {
    console.warn(p.key, "Decorator must be used on function");
    return p.descriptor;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const funcOriginal: Function = p.descriptor.value;
  const className: string = p.target.constructor.name;

  p.descriptor.value = function wrap(this: any, ...args: any[]) {
    return funcWrap.call(this, funcOriginal, args, className);
  };

  return p.descriptor;
}

type Payload = {
  target: any;
  key: string;
  descriptor: PropertyDescriptor;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type FuncWrap = (this: any, funcOriginal: Function, args: any[], className: string) => any;

// EVT decorator
// --------------------------------------

export function evt() {
  return (protoOrDescriptor: any, name: string): any => {
    const descriptor = {
      get(this: HTMLElement) {
        return new Evt(this, name !== undefined ? name : protoOrDescriptor.key);
      },
      enumerable: true,
      configurable: true
    };

    if (name !== undefined) {
      // legacy TS decorator
      return Object.defineProperty(protoOrDescriptor, name, descriptor);
    } else {
      // TC39 Decorators proposal
      return {
        kind: "method",
        placement: "prototype",
        key: protoOrDescriptor.key,
        descriptor
      };
    }
  };
}

type Detail<T> = { detail: T };

export class Evt<T extends Detail<V>, V = any> {
  constructor(
    private target: HTMLElement,
    private eventName: string
  ) {}

  emit(
    value: T extends Detail<infer U> ? U : never,
    options: { bubbles?: boolean; composed?: boolean; cancelable?: boolean } = {
      bubbles: true,
      composed: true,
      cancelable: false
    }
  ) {
    this.target.dispatchEvent(
      new CustomEvent<T extends Detail<infer U> ? U : never>(this.eventName, { detail: value, ...options })
    );
  }
}

// TEMPLATE decorator
// --------------------------------------

import { ChildPart, directive, Directive, PartInfo, PartType } from "lit/directive.js";

interface PreviousValue {
  readonly template: HTMLTemplateElement;
  readonly fragment: DocumentFragment;
}

const previousValues = new WeakMap<ChildPart, PreviousValue>();

export type TemplateInfo = {
  content: string;
  insertIndex: number;
  col: number;
  row: number;
};

type TCallback = TemplateInfo & {
  fragment: DocumentFragment;
};

type TPayload = TemplateInfo & {
  template: HTMLTemplateElement;
  cb: TemplateCallback;
};

export type TemplateCallback = (p: TCallback) => void;

class TemplateCallbackDirective extends Directive {
  private previousValue?: PreviousValue;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.CHILD) {
      throw new Error("templateCallback can only be used in text bindings");
    }
  }

  render(p: TPayload) {
    return p.template;
  }

  update(part: ChildPart, [p]: [TPayload]) {
    const previousValue = previousValues.get(part);

    if (previousValue !== undefined && p.template === previousValue.template) {
      return previousValue.fragment;
    }

    const fragment = document.importNode(p.template.content, true);

    p.cb({
      content: p.content,
      row: p.row,
      col: p.col,
      insertIndex: p.insertIndex,
      fragment
    });

    previousValues.set(part, { template: p.template, fragment });
    return fragment;
  }
}

export const templateCallback = directive(TemplateCallbackDirective);
