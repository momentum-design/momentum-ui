/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**  This mixin check thay each other mixins in the prototype chain are not applied more than once to the final component class.
 * Example:
 * import { DedupeMixin, wasApplied } from "./DedupeMixin";
 * 
 * const Mixin = (superclass) => {
 *  if (wasApplied(Mixin, superclass)) { <---- Check that mixin already applied to superclass.
      return superclass;
    }
    class MixinClass extends superclass {
      // MixinClass implementation
    }

    DedupeMixin(Mixin, MixinClass); <---- If mixin not applied to superclass, save it in WeakMap to check prototype chain next time.

    return MixinClass;
 * } 
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction<A = any> = (...input: any[]) => A;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = HTMLElement> = new (...input: any[]) => A;

const appliedMixins = new WeakMap();

export const wasApplied = (mixin: AnyFunction, superClass: AnyConstructor) => {
  const entries = appliedMixins.get(mixin);
  let proto = superClass;
  const chain = [];

  while (proto) {
    chain.push(proto);
    proto = Object.getPrototypeOf(proto);
  }

  return entries ? chain.reduce((res: boolean, protoClass) => res || entries.has(protoClass), false) : false;
};

export const DedupeMixin = (mixin: AnyFunction, superClass: AnyConstructor) => {
  let entries = appliedMixins.get(mixin);
  if (!entries) {
    entries = new WeakSet();
    appliedMixins.set(mixin, entries);
  }
  entries.add(superClass);
};
