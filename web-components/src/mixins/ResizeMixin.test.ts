import { defineCE, fixture, fixtureCleanup, oneEvent } from "@open-wc/testing-helpers";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { ResizeMixin, ResizeObserver } from "./ResizeMixin";

interface MyWindow extends Window {
  ResizeObserver: typeof ResizeObserver;
}

const disconnectMock = jest.fn();
const observeMock = jest.fn();
const unobserveMock = jest.fn();
const constructorMock = jest.fn();

class MockObserver {
  public observe = observeMock;
  public unobserve = unobserveMock;
  public disconnect = disconnectMock;
  constructor() {
    constructorMock();
  }
}

(window as MyWindow & typeof globalThis).ResizeObserver = jest.fn().mockImplementation(() => {
  return new MockObserver();
});

describe("Resize Mixin", () => {
  afterEach(fixtureCleanup);

  @customElement("custom-element")
  class CustomElement extends ResizeMixin(ResizeMixin(LitElement)) {
    connectedCallback() {
      super.connectedCallback();
      this.dispatchEvent(new CustomEvent("connected-callback"));
    }

    customUnobserveAll() {
      super.unobserveAll?.();
    }

    customResize() {
      const fakeDOMRect = this.getBoundingClientRect();
      super.handleResize?.(fakeDOMRect);
    }

    render() {
      return html` <div>Content</div> `;
    }
  }

  test("should create observer instance and start observe when element connected to dom", async () => {
    const tag = defineCE(class extends CustomElement {});
    const el = document.createElement(`${tag}`) as CustomElement;
    Object.defineProperty(el, "isConnected", {
      value: true
    });
    setTimeout(() => el.connectedCallback());
    const ev = await oneEvent(el, "connected-callback");
    expect(ev).toBeDefined();
    expect(observeMock).toHaveBeenCalled();
  });

  test("should unobserve when element disconnected to dom", async () => {
    const el = await fixture<CustomElement>(`<custom-element></custom-element>`);
    el.parentElement!.removeChild(el);
    expect(unobserveMock).toHaveBeenCalled();
  });

  test("should delete oserver instance and stop observe", async () => {
    const el = await fixture<CustomElement>(`<custom-element></custom-element>`);
    el.customUnobserveAll();
    expect(disconnectMock).toHaveBeenCalled();
  });

  test("should dispatch md-resize event", async () => {
    const el = await fixture<CustomElement>(`<custom-element></custom-element>`);
    setTimeout(() => el.customResize());
    const { detail } = await oneEvent(el, "md-resize");
    expect(detail).toBeDefined();

    const elDOMRect = el.getBoundingClientRect();
    expect(detail.contentRect).toStrictEqual(elDOMRect);
  });
});
