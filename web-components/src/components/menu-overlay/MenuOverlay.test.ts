import "@/components/button/Button";
import "@/components/input/Input";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, oneEvent } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import { MenuOverlay, OverlaySizes } from "./MenuOverlay";

Object.defineProperties(Element.prototype, {
  getBoundingClientRect: {
    value: jest.fn().mockReturnValue({
      width: 10,
      height: 10,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    })
  },
  getClientRects: {
    value: jest.fn().mockReturnValue(["1", "2"])
  }
});

Object.defineProperties(HTMLElement.prototype, {
  offsetWidth: {
    value: jest.fn().mockReturnValue(10)
  },
  offsetHeight: {
    value: jest.fn().mockReturnValue(10)
  }
});

const fixtureFactory = async (
  isOpen: boolean,
  showArrow: boolean,
  placement: MenuOverlay.Placement,
  customWidth: string,
  maxHeight: string,
  size: MenuOverlay.Size,
  allowHoverToggle = false
): Promise<MenuOverlay.ELEMENT> => {
  const element = await fixture<MenuOverlay.ELEMENT>(html`
    <md-menu-overlay
      ?is-open=${isOpen}
      ?show-arrow=${showArrow}
      placement=${placement}
      custom-width=${customWidth}
      max-height=${maxHeight}
      size=${size}
      ?allow-hover-toggle=${allowHoverToggle}
    >
      <md-button slot="menu-trigger" class="menu-trigger" variant="primary">Open Menu Overlay</md-button>
      <div><h1>Menu Overlay Content</h1></div>
    </md-menu-overlay>
  `);
  jest.runAllTimers();
  return element;
};

const fixtureFactoryWithCustomAttr = async (
  isOpen: boolean,
  showArrow: boolean,
  placement: MenuOverlay.Placement,
  customWidth: string,
  maxHeight: string,
  size: MenuOverlay.Size,
  allowHoverToggle = false
): Promise<MenuOverlay.ELEMENT> => {
  const element = await fixture<MenuOverlay.ELEMENT>(html`
    <md-menu-overlay
      ?is-open=${isOpen}
      ?show-arrow=${showArrow}
      placement=${placement}
      custom-width=${customWidth}
      max-height=${maxHeight}
      size=${size}
      ?allow-hover-toggle=${allowHoverToggle}
    >
      <md-button slot="menu-trigger" ariaexpanded="false" class="menu-trigger" variant="primary"
        >Open Menu Overlay</md-button
      >
      <div><h1>Menu Overlay Content</h1></div>
    </md-menu-overlay>
  `);
  jest.runAllTimers();
  return element;
};

const fixtureFactoryForNestedOverlays = async (
  isOpen: boolean,
  showArrow: boolean,
  placement: MenuOverlay.Placement,
  customWidth: string,
  maxHeight: string,
  size: MenuOverlay.Size,
  allowHoverToggle = false,
  isNestedOpen = false
): Promise<MenuOverlay.ELEMENT> => {
  const element = await fixture<MenuOverlay.ELEMENT>(html`
    <md-menu-overlay
      ?is-open=${isOpen}
      ?show-arrow=${showArrow}
      placement=${placement}
      custom-width=${customWidth}
      max-height=${maxHeight}
      size=${size}
      id="parent-menu"
      ?allow-hover-toggle=${allowHoverToggle}
    >
      <md-button slot="menu-trigger" class="menu-trigger" variant="primary">Open Menu Overlay</md-button>
      <div>
        <h1>Parent Menu Overlay Content</h1>
        <md-menu-overlay
          placement=${placement}
          ?is-open=${isNestedOpen}
          show-arrow
          max-height=${maxHeight}
          custom-width=${customWidth}
          placement="bottom"
          id="outdial-overlay"
        >
          <md-button slot="menu-trigger" variant="primary">Open Nested Menu Overlay</md-button>
          <div><h1>Nested Child Menu Overlay Content</h1></div>
        </md-menu-overlay>
      </div>
    </md-menu-overlay>
  `);
  jest.runAllTimers();
  return element;
};

const fixtureInputFactory = async (
  isOpen: boolean,
  showArrow: boolean,
  placement: MenuOverlay.Placement,
  customWidth: string,
  maxHeight: string,
  size: MenuOverlay.Size
): Promise<MenuOverlay.ELEMENT> => {
  const element = await fixture<MenuOverlay.ELEMENT>(html`
    <md-menu-overlay
      ?is-open=${isOpen}
      ?show-arrow=${showArrow}
      placement=${placement}
      custom-width=${customWidth}
      max-height=${maxHeight}
      size=${size}
    >
      <md-input placeholder="Search field with tabs" shape="pill" slot="menu-trigger" clear autoFocus></md-input>
      <div><h1>Menu Overlay Content</h1></div>
    </md-menu-overlay>
  `);
  jest.runAllTimers();
  return element;
};

describe("MenuOverlay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    fixtureCleanup();
  });

  test("menu-overlay component is not null", async () => {
    const element = await fixtureFactory(true, false, "bottom", "", "", "large");
    expect(element.isOpen).toBeTruthy();

    expect(element).not.toBeNull();
    element.isOpen = false;
  });

  test("should open overlay if trigger element is clicked", async () => {
    const element = await fixtureFactory(false, false, "bottom", "", "", "large");
    const triggerSlot = element.renderRoot.querySelector('slot[name="menu-trigger"]') as HTMLSlotElement;
    const triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;

    const clickPromise = oneEvent(triggerElement, "click");

    expect(triggerElement.getAttribute("aria-expanded")).toBeFalsy();
    triggerElement.dispatchEvent(new MouseEvent("click"));

    await clickPromise;
    jest.advanceTimersByTime(100);

    expect(triggerElement.getAttribute("aria-expanded")).toBeTruthy();
    expect(element.isOpen).toBeTruthy();
  });

  test("should prevent the keydown event if trigger element is md-input", async () => {
    const element = await fixtureInputFactory(false, false, "bottom", "", "", "large");
    const triggerSlot = element.renderRoot.querySelector('slot[name="menu-trigger"]') as HTMLSlotElement;
    const triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;

    jest.advanceTimersByTime(100);

    triggerElement.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();
    element.isOpen = false;
  });

  test("should open overlay if trigger element is invoked by keyboard", async () => {
    const element = await fixtureFactory(false, false, "bottom", "", "", "large");

    const triggerSlot = element.renderRoot.querySelector('slot[name="menu-trigger"]') as HTMLSlotElement;
    const triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;

    jest.advanceTimersByTime(100);

    triggerElement.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Enter
      })
    );

    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeTruthy();

    triggerElement.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Space
      })
    );

    expect(element.isOpen).toBeFalsy();

    triggerElement.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: "KeyA"
      })
    );

    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeFalsy();
    element.isOpen = false;
  });

  test("should open overlay if trigger element is clicked and closed when clicked again", async () => {
    const element = await fixtureFactory(false, false, "bottom", "", "", "large");
    expect(element.isOpen).toBeFalsy();

    const triggerSlot = element.renderRoot.querySelector('slot[name="menu-trigger"]') as HTMLSlotElement;
    const triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;

    jest.advanceTimersByTime(100);

    const event = new MouseEvent("click");
    jest.advanceTimersByTime(100);

    triggerElement.dispatchEvent(event);
    jest.advanceTimersByTime(1000);

    expect(element.isOpen).toBeTruthy();

    triggerElement.dispatchEvent(event);
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();

    document.dispatchEvent(event);
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();
    element.isOpen = false;
  });

  test("triggerElement should have the correct aria labels", async () => {
    const element = await fixtureFactory(false, false, "bottom", "", "", "large");

    const triggerSlot = element.renderRoot.querySelector('slot[name="menu-trigger"]') as HTMLSlotElement;
    const triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;

    expect(triggerElement.getAttribute("aria-haspopup")).toBeTruthy();
    expect(triggerElement.getAttribute("aria-expanded")).toBeFalsy();

    const clickPromise = oneEvent(triggerElement, "click");
    triggerElement.dispatchEvent(new MouseEvent("click"));
    await clickPromise;

    expect(element.isOpen).toBeTruthy();
    expect(triggerElement.getAttribute("aria-expanded")).toBeTruthy();
    element.isOpen = false;
  });

  test("triggerElement should have the correct aria labels", async () => {
    const element = await fixtureFactoryWithCustomAttr(false, false, "bottom", "", "", "large");

    const triggerSlot = element.renderRoot.querySelector('slot[name="menu-trigger"]') as HTMLSlotElement;
    const triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;

    expect(triggerElement.getAttribute("aria-haspopup")).toBeTruthy();
    expect(triggerElement.getAttribute("aria-expanded")).toBeFalsy();

    const clickPromise = oneEvent(triggerElement, "click");
    triggerElement.dispatchEvent(new MouseEvent("click"));
    await clickPromise;

    expect(element.isOpen).toBeTruthy();
    expect(triggerElement.getAttribute("ariaexpanded")).toBeTruthy();
    element.isOpen = false;
  });

  test("should toggle overlay if trigger element is hovered", async () => {
    const element = await fixtureFactory(false, false, "bottom", "", "", "large", true);

    const triggerSlot = element.renderRoot.querySelector('slot[name="menu-trigger"]') as HTMLSlotElement;
    const triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;

    const mouseEnterPromise = oneEvent(triggerElement, "mouseenter");

    triggerElement.dispatchEvent(new MouseEvent("mouseenter"));
    await mouseEnterPromise;
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeTruthy();

    const mouseLeaveEvent = oneEvent(triggerElement, "mouseleave");
    triggerElement.dispatchEvent(new MouseEvent("mouseleave"));
    await mouseLeaveEvent;
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();
  });

  test("should execute handleOutsideClick", async () => {
    const element = await fixtureFactory(true, false, "bottom", "", "", "large");
    const mockhandleOutsideClick = jest.spyOn(element, "handleOutsideOverlayClick");
    const event = new MouseEvent("click");

    element.handleOutsideOverlayClick(event);
    await elementUpdated(element);

    expect(mockhandleOutsideClick).toHaveBeenCalled();

    mockhandleOutsideClick.mockRestore();
    element.isOpen = false;
  });

  test("should test showArrow property", async () => {
    const element = await fixtureFactory(true, true, "bottom", "", "", "large");

    const event = new MouseEvent("click");
    element.handleOutsideOverlayClick(event);
    jest.advanceTimersByTime(100);
    await elementUpdated(element);
    expect(element.arrow).not.toBeNull();
    element.isOpen = false;
  });

  test("should test customWidth property", async () => {
    const customWidth = "800px";
    const element = await fixtureFactory(true, true, "bottom", customWidth, "", "large");
    const styles = element["getStyles"]();
    const hasStyle = styles.values.includes(`width: ${customWidth};`);
    expect(hasStyle).toBeTruthy();
    element.isOpen = false;
  });

  test("should test default maxHeight", async () => {
    const maxHeight = `max-height: calc(100vh - 48px);`;
    const element = await fixtureFactory(true, true, "bottom", "", "", "large");
    const styles = element["getStyles"]().values;
    const hasStyle = styles.includes(maxHeight);
    expect(hasStyle).toBeTruthy();
    element.isOpen = false;
  });

  test("should test maxHeight property", async () => {
    const maxHeight = "calc(100vh - 200px)";
    const element = await fixtureFactory(true, true, "bottom", "", maxHeight, "large");
    const styles = element["getStyles"]().values;
    const hasStyle = styles.includes(`max-height: ${maxHeight};`);
    expect(hasStyle).toBeTruthy();
    element.isOpen = false;
  });

  test("should test default size property", async () => {
    const defaultSize = `width: ${OverlaySizes.large};`;
    const element = await fixtureFactory(true, true, "bottom", "", "", "large");
    const styles = element["getStyles"]().values;
    const hasStyle = styles.includes(defaultSize);
    expect(hasStyle).toBeTruthy();
    element.isOpen = false;
  });

  test("should test small size property", async () => {
    const smallSize = `width: ${OverlaySizes.small};`;
    const element = await fixtureFactory(true, true, "bottom", "", "", "small");
    const styles = element["getStyles"]().values;
    const hasStyle = styles.includes(smallSize);
    expect(hasStyle).toBeTruthy();
    element.isOpen = false;
  });

  test("should focus on trigger when press escape to close modal", async () => {
    const element = await fixtureFactory(true, true, "bottom", "", "", "large");

    const trigger = element["triggerElement"]!;
    const button = element.querySelector("md-button");

    const keydownPromise1 = oneEvent(trigger, "keydown");

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Space
      })
    );

    await keydownPromise1;
    jest.advanceTimersByTime(100);

    const keydownPromise2 = oneEvent(trigger, "keydown");

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Escape
      })
    );

    await keydownPromise2;
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();
    expect(document.activeElement).toEqual(button);
  });

  test("should focus on trigger when press escape outside close modal", async () => {
    const element = await fixtureFactory(true, true, "bottom", "", "", "large");
    await elementUpdated(element);

    const trigger = element["triggerElement"]!;
    const button = element.querySelector("md-button");

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Space
      })
    );

    await elementUpdated(element);

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Escape
      })
    );

    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeFalsy();
    expect(document.activeElement).toEqual(button);
    element.isOpen = false;
  });

  test("shouldn't focus on trigger when clicked outside to close modal", async () => {
    jest.useFakeTimers();
    const element = await fixtureFactory(true, true, "bottom", "", "", "large");
    jest.runAllTimers();
    await elementUpdated(element);

    const trigger = element["triggerElement"]!;

    trigger.dispatchEvent(new MouseEvent("click"));

    await elementUpdated(element);

    document.dispatchEvent(new MouseEvent("click"));

    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeFalsy();
    expect(document.activeElement).toBe(null);
  });

  test("shouldn't focus on trigger when press any button except escape to close modal", async () => {
    const element = await fixtureFactory(true, true, "bottom", "", "", "large");
    element.isOpen = true;
    await elementUpdated(element);

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Space
      })
    );

    const button = element.querySelector("md-button");

    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeTruthy();
    expect(document.activeElement).not.toEqual(button);
    element.isOpen = false;
  });

  test("should have an aria-label attribute when ariaLabel is set", async () => {
    const component: MenuOverlay.ELEMENT = await fixture(
      `<md-menu-overlay ariaLabel="Menu Overlay"></md-menu-overlay>`
    );
    const overlayPart = component.shadowRoot?.querySelector('div[part="overlay"]');
    expect(overlayPart?.getAttribute("aria-label")).toEqual("Menu Overlay");
    component.isOpen = false;
  });

  test("should not have an aria-label attribute when ariaLabel is not set", async () => {
    const component: MenuOverlay.ELEMENT = await fixture(`<md-menu-overlay ></md-menu-overlay>`);
    const overlayPart = component.shadowRoot?.querySelector('div[part="overlay"]');
    expect(overlayPart?.hasAttribute("aria-label")).toBe(false);
    component.isOpen = false;
  });

  test("should have a role when we set ariaRole", async () => {
    const component: MenuOverlay.ELEMENT = await fixture(`<md-menu-overlay ariaRole="dialog" ></md-menu-overlay>`);
    const overlayPart = component.shadowRoot?.querySelector('div[part="overlay"]');
    expect(overlayPart?.getAttribute("role")).toEqual("dialog");
    // when the role is dialog, aria-modal should be true
    expect(overlayPart?.getAttribute("aria-modal")).toEqual("true");
    component.isOpen = false;
  });

  test("should have a role as menu when we are not passing", async () => {
    const component: MenuOverlay.ELEMENT = await fixture(`<md-menu-overlay ></md-menu-overlay>`);
    const overlayPart = component.shadowRoot?.querySelector('div[part="overlay"]');
    expect(overlayPart?.getAttribute("role")).toEqual("menu");
    // when the role is other than dialog, aria-modal should be false
    expect(overlayPart?.hasAttribute("aria-modal")).toBe(false);
    component.isOpen = false;
  });

  test("should focus on trigger when press escape outside close modal", async () => {
    const element = await fixtureFactoryForNestedOverlays(true, true, "bottom", "200px", "100px", "large", false, true);

    // Add this line to clear the activeOverlay array

    const nestedMenuOverlay = element.querySelector("#outdial-overlay") as MenuOverlay.ELEMENT;

    const composedPathMockForNested = jest.fn(() => [nestedMenuOverlay]);
    const originalComposedPath = Event.prototype.composedPath;
    Event.prototype.composedPath = composedPathMockForNested;

    // Dispatch escape key press event on nested menu overlay
    const keydownPromise1 = oneEvent(document, "keydown");
    document.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Escape }));
    await keydownPromise1;
    jest.advanceTimersByTime(100);
    // Verify that the nested menu overlay is closed and the parent menu overlay is still open

    expect(nestedMenuOverlay.isOpen).toBeFalsy();
    expect(element.isOpen).toBeTruthy();
    Event.prototype.composedPath = originalComposedPath;

    // Dispatch escape key press event on parent menu overlay
    const composedPathMockForParent = jest.fn(() => [element]);
    const originalComposedPath1 = Event.prototype.composedPath;
    Event.prototype.composedPath = composedPathMockForParent;

    const keydownPromise2 = oneEvent(document, "keydown");
    document.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Escape }));
    await keydownPromise2;
    jest.advanceTimersByTime(100);

    //Verify that both the nested menu overlay and the parent menu overlay are closed
    expect(nestedMenuOverlay.isOpen).toBeFalsy();
    expect(element.isOpen).toBeFalsy();

    Event.prototype.composedPath = originalComposedPath1;
  });

  test("should close the menu when window loses focus, such as iframe click, and the menu is open", async () => {
    const element = await fixtureFactory(true, false, "bottom", "", "", "large");
    element.isOpen = true;
    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeTruthy();

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.focus();
    element.handleWindowBlurEvent();
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();
    document.body.removeChild(iframe);
  });

  test("should not try to close the menu when window loses focus, such as iframe click, and the menu is closed", async () => {
    const element = await fixtureFactory(true, false, "bottom", "", "", "large");
    element.isOpen = false;
    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeFalsy();

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.focus();
    element.handleWindowBlurEvent();
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();
    document.body.removeChild(iframe);
  });

  test("should not close the menu when window loses focus and keepOpenOnWindowBlur is true", async () => {
    const element = await fixtureFactory(true, false, "bottom", "", "", "large");
    element.keepOpenOnWindowBlur = true;
    element.isOpen = true;
    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeTruthy();

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.focus();
    element.handleWindowBlurEvent();
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeTruthy();
    document.body.removeChild(iframe);
  });

  test("should close the menu when window loses focus and keepOpenOnWindowBlur is false", async () => {
    const element = await fixtureFactory(true, false, "bottom", "", "", "large");
    element.keepOpenOnWindowBlur = false;
    element.isOpen = true;
    jest.advanceTimersByTime(100);
    expect(element.isOpen).toBeTruthy();

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.focus();
    element.handleWindowBlurEvent();
    jest.advanceTimersByTime(100);

    expect(element.isOpen).toBeFalsy();
    document.body.removeChild(iframe);
  });
});
