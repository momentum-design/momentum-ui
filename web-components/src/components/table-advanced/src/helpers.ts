// DEBOUNCE
// --------------------------------------
export function debounce(ms = 250) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    let timeout: number;
    return decorateFunction({ target, key, descriptor }, function(funcOriginal: Function, args: any[]) {
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
  
    const funcOriginal: Function = p.descriptor.value;
    const className: string = p.target.constructor.name;
  
    p.descriptor.value = function wrap(this: any) {
      const args: any[] = [];
      for (let i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      return funcWrap.call(this, funcOriginal, args, className);
    };
  
    return p.descriptor;
  }
  
  type Payload = {
    target: any;
    key: string;
    descriptor: PropertyDescriptor;
  };
  
  type FuncWrap = (this: any, funcOriginal: Function, args: any[], className: string) => any;
  
  
// EVT
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
  constructor(private target: HTMLElement, private eventName: string) {}

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

