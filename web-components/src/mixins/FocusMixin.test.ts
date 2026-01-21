import { defineCE, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AnyConstructor, FocusClass, FocusMixin } from "./FocusMixin";

describe("Focus Mixin", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  @customElement("custom-element")
  class CustomElement extends LitElement {
    @property({ type: Boolean, reflect: true }) autofocus = false;

    render() {
      return html`
        <slot name="input"></slot>
        <input type="text" ?autofocus=${this.autofocus} />
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
    expect(mockEventListener).toHaveBeenCalledTimes(2);
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

  test("should autofocus component with appropriate property", async () => {
    @customElement("focusable-child")
    class FocusableChild extends FocusMixin(LitElement) {
      @property({ type: Boolean, reflect: true }) autofocus = true;

      protected firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);
        this.setAttribute("tabindex", "0");
      }

      render() {
        return html` <input type="text" ?autofocus=${this.autofocus} /> `;
      }
    }

    const element = await fixture<FocusableChild>(`<focusable-child></focusable-child>`);

    jest.runAllTimers();

    expect(document.activeElement).toEqual(element);
    expect(element["getActiveElement"]!()).toEqual(element);
  });

  test("should find active deep element", async () => {
    @customElement("deep-focusable-child")
    class DeepFocusableChild extends FocusMixin(LitElement) {
      render() {
        return html` <input type="text" /> `;
      }
    }

    const element = await fixture<DeepFocusableChild>(`<deep-focusable-child></deep-focusable-child>`);
    const input = element.shadowRoot!.querySelector("input");

    input!.focus();

    expect(element["getDeepActiveElement"]!()).toEqual(input);
    expect(element["isElementFocused"]!(input!)).toBeFalsy();
  });

  test("should dispatch event in focus/blur case", async () => {
    const tag = defineCE(class extends FocusMixin(CustomElement) {});
    const el = await fixture<CustomElement>(`<${tag}></${tag}>`);

    const focusEvent = new Event("focus");
    const focusVisiblePromise = oneEvent(el, "focus-visible");
    (el as FocusClass)["handleFocusIn"]!(focusEvent);

    const { detail: focusDetail } = await focusVisiblePromise;

    expect(focusDetail).toBeDefined();
    expect(focusDetail.sourceEvent).toEqual(focusEvent);

    const blurEvent = new Event("blur");
    const focusNotVisiblePromoise = oneEvent(el, "focus-not-visible");
    (el as FocusClass)["handleFocusOut"]!(blurEvent);

    const { detail: blurDetail } = await focusNotVisiblePromoise;

    expect(blurDetail).toBeDefined();
    expect(blurDetail.sourceEvent).toEqual(blurEvent);
  });
});
