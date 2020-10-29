import { defineCE, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { customElement, html, LitElement, PropertyValues } from "lit-element";
import { AnyConstructor, FocusMixin } from "./FocusMixin";

describe("Focus Mixin", () => {
  afterEach(fixtureCleanup);

  @customElement("custom-element")
  class CustomElement extends LitElement {
    render() {
      return html`
        <slot name="input"></slot>
      `;
    }
  }

  test("should applying to component", async () => {
    const tag = defineCE(class extends FocusMixin(FocusMixin(CustomElement)) {});
    const el = await fixture<CustomElement>(`<${tag}></${tag}>`);
    expect(el).toHaveProperty("handleFocusOut", expect.any(Function));
    expect(el).toHaveProperty("handleFocusIn", expect.any(Function));
  });

  test("should register event listeners when component updated first time", async () => {
    const mockEventListener = jest.fn();
    const ExtendFocusMixin = (base: AnyConstructor) =>
      class extends FocusMixin(base) {
        firstUpdated(changedProperties: PropertyValues) {
          this.addEventListener = mockEventListener;
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }
      };

    const tag = defineCE(class extends ExtendFocusMixin(CustomElement) {});
    const el = fixtureSync(`<${tag}></${tag}>`);
    const event = await oneEvent(el, "first-updated");
    expect(event).toBeTruthy();
    expect(mockEventListener).toBeCalledTimes(2);
  });
  test("should set/remove focus-visible attribute", async () => {
    const tag = defineCE(class extends FocusMixin(CustomElement) {});
    const el = await fixture<CustomElement>(`<${tag}></${tag}>`);

    el.dispatchEvent(new Event("focus"));
    el.focus();
    expect(el.hasAttribute("focus-visible")).toBeTruthy();

    el.dispatchEvent(new Event("blur"));
    el.blur();
    expect(el.hasAttribute("focus-visible")).toBeFalsy();
  });
});
