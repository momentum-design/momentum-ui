import { defineCE, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { AnyConstructor, DedupeMixin, wasApplied } from "./DedupeMixin";

describe("Dedupe Mixin", () => {
  afterEach(fixtureCleanup);

  @customElement("custom-element")
  class CustomElement extends LitElement {
    getMixinName() {
      return "";
    }
  }

  const MixinA = (base: AnyConstructor<CustomElement>) => {
    if (wasApplied(MixinA, base)) {
      return base;
    }
    class MixinAClass extends base {
      getMixinName() {
        const superName = super.getMixinName();
        return `MixinA ${superName}`.trim();
      }
    }

    DedupeMixin(MixinA, MixinAClass);

    return MixinAClass;
  };

  const MixinB = (base: AnyConstructor<CustomElement>) => {
    if (wasApplied(MixinB, base)) {
      return base;
    }
    class MixinBClass extends base {
      getMixinName() {
        const superName = super.getMixinName();
        return `MixinB ${superName}`.trim();
      }
    }

    DedupeMixin(MixinB, MixinBClass);

    return MixinBClass;
  };

  const MixinC = (base: AnyConstructor<CustomElement>) => {
    class MixinCClass extends MixinB(MixinA(base)) {
      getMixinName() {
        const superName = super.getMixinName();
        return `MixinC ${superName}`.trim();
      }
    }

    return MixinCClass;
  };
  test("should applying to component", async () => {
    const tag = defineCE(class extends MixinA(CustomElement) {});
    const el = await fixture<CustomElement>(`<${tag}></${tag}>`);
    expect(el.getMixinName()).toEqual("MixinA");
  });

  test("should dedupes mixins only explicitly", async () => {
    const tag = defineCE(class extends MixinC(MixinC(MixinA(MixinA(CustomElement)))) {});
    const el = await fixture<CustomElement>(`<${tag}></${tag}>`);
    expect(el.getMixinName()).toEqual("MixinC MixinC MixinB MixinA");
  });

  test("should dedupes another mixins", async () => {
    const tag = defineCE(class extends MixinA(MixinB(MixinC(CustomElement))) {});
    const el = await fixture<CustomElement>(`<${tag}></${tag}>`);
    expect(el.getMixinName()).toEqual("MixinC MixinB MixinA");
  });

  test("should dedupes another mixins applied on inherited base classes", async () => {
    const BaseClass = class extends MixinB(MixinC(MixinA(CustomElement))) {};
    const tag = defineCE(class extends BaseClass {});
    const el = await fixture<CustomElement>(`<${tag}></${tag}>`);
    expect(el.getMixinName()).toEqual("MixinC MixinB MixinA");
  });
});
