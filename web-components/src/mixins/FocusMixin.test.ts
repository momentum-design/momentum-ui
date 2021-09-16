import { defineCE, fixture, fixtureCleanup, fixtureSync, nextFrame, oneEvent } from "@open-wc/testing-helpers";
import { customElement, html, LitElement, property, PropertyValues } from "lit";
import { AnyConstructor, FocusClass, FocusMixin } from "./FocusMixin";

describe("Focus Mixin", () => {
  afterEach(fixtureCleanup);

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

  test("should autofocus component with appropriate property", async () => {
    @customElement("focusable-child")
    class FocusableChild extends FocusMixin(LitElement) {
      @property({ type: Boolean, reflect: true }) autofocus = true;

      protected async firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);
        this.setAttribute("tabindex", "0");
      }

      render() {
        return html`
          <input type="text" ?autofocus=${this.autofocus} />
        `;
      }
    }

    const element = await fixture<FocusableChild>(`<focusable-child></focusable-child>`);

    await nextFrame();

    expect(document.activeElement).toEqual(element);
    expect(element["getActiveElement"]!()).toEqual(element);
  });

  test("should find active deep element", async () => {
    @customElement("deep-focusable-child")
    class DeepFocusableChild extends FocusMixin(LitElement) {
      render() {
        return html`
          <input type="text" />
        `;
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
    setTimeout(() => (el as FocusClass)["handleFocusIn"]!(focusEvent));

    const { detail: focusDetail } = await oneEvent(el, "focus-visible");

    expect(focusDetail).toBeDefined();
    expect(focusDetail.sourceEvent).toEqual(focusEvent);

    const blurEvent = new Event("blur");
    setTimeout(() => (el as FocusClass)["handleFocusOut"]!(blurEvent));

    const { detail: blurDetail } = await oneEvent(el, "focus-not-visible");

    expect(blurDetail).toBeDefined();
    expect(blurDetail.sourceEvent).toEqual(blurEvent);
  });
});
