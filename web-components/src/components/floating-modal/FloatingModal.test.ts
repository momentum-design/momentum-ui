import { Button } from "@/components/button/Button";
import { Key } from "@/constants";
import interact from "@interactjs/interact/index";
import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import "./FloatingModal";
import { type FloatingModal } from "./FloatingModal";

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
  }
});

describe("Floating Modal Component", () => {
  let element: FloatingModal.ELEMENT;

  beforeEach(async () => {
    jest.useFakeTimers();
    element = await fixture<FloatingModal.ELEMENT>(html` <md-floating-modal></md-floating-modal> `);
    jest.runAllTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should show modal", async () => {
    element.show = true;
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    expect(element.show).toBeTruthy();
  });

  test("should set label is value provided", async () => {
    element.show = true;
    element.label = "Floating Modal";
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    expect(element.container!.getAttribute("aria-label")).toEqual("Floating Modal");
  });

  test("should close modal with button click", async () => {
    element.show = true;
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const mdButton = element.shadowRoot!.querySelector(".md-floating__close") as Button.ELEMENT;
    const button = mdButton.shadowRoot!.querySelector("button");
    button!.click();

    await elementUpdated(element);
    expect(element.show).toBeFalsy();
  });

  test("should dispatch event when modal close", async () => {
    element.show = true;
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const clickEvent = new MouseEvent("click");
    const modalClosePromise = oneEvent(element, "floating-modal-close");
    element.handleClose(clickEvent);

    const { detail } = await modalClosePromise;

    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(clickEvent);
  });

  test("should resize modal when resize button click", async () => {
    element.show = true;
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const mdButton = element.shadowRoot!.querySelector(".md-floating__resize") as Button.ELEMENT;
    const button = mdButton.shadowRoot!.querySelector("button");
    button!.click();

    await elementUpdated(element);
    expect(element.show).toBeTruthy();
    expect(element.full).toBeTruthy();
  });

  test("should show minimize option", async () => {
    element.show = true;
    element.minimizable = true;
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const mdButton = element.shadowRoot!.querySelector(".md-floating__minimize") as Button.ELEMENT;
    const button = mdButton.shadowRoot!.querySelector("button");
    button!.click();

    await elementUpdated(element);
    expect(element.show).toBeTruthy();
    expect(element.minimizable).toBeTruthy();
  });

  test("should resize", async () => {
    element.show = true;
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    // Change the viewport to 500px.
    global.innerWidth = 500;

    // Trigger the window resize event.
    global.dispatchEvent(new Event("resize"));

    await elementUpdated(element);
    expect(element.show).toBeTruthy();
  });

  test("maximize/restore button should be hidden when maximizable is false", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .maximizable=${false}></md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const maximizeButton = element.shadowRoot!.querySelector(".md-floating__resize") as Button.ELEMENT;
    expect(maximizeButton).toBeNull();
  });

  test("maximize/restore button should be shown when maximizable is true", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .maximizable=${true}></md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const maximizeButton = element.shadowRoot!.querySelector(".md-floating__resize") as Button.ELEMENT;
    expect(maximizeButton).not.toBeNull();
  });

  test("move button should be shown by default", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html` <md-floating-modal .show=${true}></md-floating-modal> `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const moveButton = element.shadowRoot!.querySelector(".md-floating__move") as Button.ELEMENT;
    expect(moveButton).not.toBeNull();
  });

  test("move button should be hidden when hideMoveButton is true", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .hideMoveButton=${true}></md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const moveButton = element.shadowRoot!.querySelector(".md-floating__move") as Button.ELEMENT;
    expect(moveButton).toBeNull();
  });

  test("header control buttons should render tooltips", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .minimizable=${true}></md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    expect(
      element.shadowRoot!.querySelector(".md-floating__move")?.closest("md-tooltip")?.getAttribute("message")
    ).toEqual("Move Modal");
    expect(
      element.shadowRoot!.querySelector(".md-floating__minimize")?.closest("md-tooltip")?.getAttribute("message")
    ).toEqual("Minimize Modal");
    expect(
      element.shadowRoot!.querySelector(".md-floating__resize")?.closest("md-tooltip")?.getAttribute("message")
    ).toEqual("Maximize Modal");
    expect(
      element.shadowRoot!.querySelector(".md-floating__close")?.closest("md-tooltip")?.getAttribute("message")
    ).toEqual("Close Modal");
  });

  test("should keep keyboard movement when move button is hidden", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .hideMoveButton=${true}></md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const header = element.shadowRoot!.querySelector(".md-floating__header") as HTMLElement;
    const container = element.shadowRoot!.querySelector(".md-floating") as HTMLElement;

    expect(header.getAttribute("tabindex")).toEqual("0");
    expect(header.getAttribute("role")).toEqual("group");
    expect(header.getAttribute("aria-label")).toEqual("Move Modal");
    expect(element.shadowRoot!.activeElement).not.toBe(header);

    const movePromise = oneEvent(element, "floating-modal-location");
    header.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowRight", bubbles: true, composed: true }));
    const { detail } = await movePromise;

    expect(container.getAttribute("data-x")).toEqual("10");
    expect(container.getAttribute("data-y")).toEqual("0");
    expect(detail.transform).toEqual({ x: "10", y: "0" });
  });

  test("should drag from slotted header content but not header controls", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .minimizable=${true}>
        <div slot="header" class="slotted-header">
          <span class="slotted-header-title">Title</span>
          <md-tooltip class="slotted-header-tooltip">
            <md-button class="slotted-header-action">Action</md-button>
          </md-tooltip>
        </div>
        <div class="slotted-body-content">Body</div>
      </md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const header = element.shadowRoot!.querySelector(".md-floating__header") as HTMLElement;
    const hostInteractable = interact(element);
    const dragOptions = hostInteractable.options.drag;
    const slottedHeader = element.querySelector(".slotted-header") as HTMLElement;
    const title = element.querySelector(".slotted-header-title") as HTMLElement;
    const slottedTooltip = element.querySelector(".slotted-header-tooltip") as HTMLElement;
    const slottedAction = element.querySelector(".slotted-header-action") as HTMLElement;
    const bodyContent = element.querySelector(".slotted-body-content") as HTMLElement;
    const moveButton = element.shadowRoot!.querySelector(".md-floating__move") as Button.ELEMENT;
    const minimizeButton = element.shadowRoot!.querySelector(".md-floating__minimize") as Button.ELEMENT;

    expect(dragOptions.enabled).toBeTruthy();
    expect(interact.isSet(header)).toBeFalsy();
    expect(interact.isSet(slottedHeader)).toBeFalsy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, header)).toBeTruthy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, title)).toBeTruthy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, bodyContent)).toBeFalsy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, moveButton)).toBeTruthy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, minimizeButton)).toBeFalsy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, slottedTooltip)).toBeFalsy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, slottedAction)).toBeFalsy();
  });

  test("should drag from header when move button is hidden but not header controls", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .hideMoveButton=${true} .minimizable=${true}>
        <div slot="header" class="slotted-header">
          <span class="slotted-header-title">Title</span>
          <md-button class="slotted-header-action">Action</md-button>
        </div>
        <div class="slotted-body-content">Body</div>
      </md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const header = element.shadowRoot!.querySelector(".md-floating__header") as HTMLElement;
    const hostInteractable = interact(element);
    const dragOptions = hostInteractable.options.drag;
    const title = element.querySelector(".slotted-header-title") as HTMLElement;
    const slottedAction = element.querySelector(".slotted-header-action") as HTMLElement;
    const bodyContent = element.querySelector(".slotted-body-content") as HTMLElement;
    const moveButton = element.shadowRoot!.querySelector(".md-floating__move") as Button.ELEMENT;
    const minimizeButton = element.shadowRoot!.querySelector(".md-floating__minimize") as Button.ELEMENT;

    expect(moveButton).toBeNull();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, header)).toBeTruthy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, title)).toBeTruthy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, bodyContent)).toBeFalsy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, minimizeButton)).toBeFalsy();
    expect(hostInteractable.testIgnoreAllow(dragOptions, element, slottedAction)).toBeFalsy();
  });

  test("should prevent browser text selection while resizing", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .resizable=${true}></md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const container = element.shadowRoot!.querySelector(".md-floating") as HTMLElement;
    expect(interact(container).options.preventDefault).toBe("always");
    expect(interact(container).options.resize.ignoreFrom).toContain("md-button");
  });

  test("should not install interact after modal closes before setup frame runs", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html` <md-floating-modal></md-floating-modal> `);

    element.show = true;
    await elementUpdated(element);
    element.show = false;
    await elementUpdated(element);
    jest.runAllTimers();

    expect(interact.isSet(element)).toBeFalsy();
  });

  test("should use css minimum dimensions as resize constraints", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .resizable=${true}></md-floating-modal>
    `);
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const container = element.shadowRoot!.querySelector(".md-floating") as HTMLElement;
    container.style.minWidth = "420px";
    container.style.minHeight = "360px";

    const [minSizeModifier] = interact(container).options.resize.modifiers as Array<{
      options: {
        min: () => { top: number; left: number; right: number; bottom: number; width: number; height: number };
      };
    }>;

    expect(minSizeModifier.options.min()).toMatchObject({
      top: 0,
      left: 0,
      right: 420,
      bottom: 360,
      width: 420,
      height: 360
    });
  });

  test("Floating Modal should not be resizable if resizable is false", async () => {
    const element = await fixture<FloatingModal.ELEMENT>(html`
      <md-floating-modal .show=${true} .resizable=${true}></md-floating-modal>
    `);

    jest.advanceTimersByTime(600);
    await elementUpdated(element);
    const resizable = element.shadowRoot!.querySelector(".md-floating__resizable");
    expect(resizable).toBeNull();
  });

  test("should minimize modal on click of minimize button", async () => {
    element.show = true;
    element.minimizable = true;
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const minimizeButton = element.shadowRoot!.querySelector(".md-floating__minimize") as Button.ELEMENT;
    const button = minimizeButton.shadowRoot!.querySelector("button");
    button!.click();

    await elementUpdated(element);
    expect(element.show).toBeTruthy();

    const minimizedModal = element.shadowRoot!.querySelector("md-floating-modal-minimized") as HTMLElement;

    const mdButton = minimizedModal.shadowRoot!.querySelector(".md-floating__resize") as Button.ELEMENT;
    expect(mdButton.getAttribute("arialabel")).toEqual("Maximize Modal");
  });
  test("should center align when centered attribute is true", async () => {
    element.show = true;
    element.centered = true;
    element.maximizable = false;
    element.containerRect = element.getBoundingClientRect();
    jest.advanceTimersByTime(600);
    await elementUpdated(element);

    const container = element.shadowRoot!.querySelector(".md-floating") as HTMLDivElement;

    expect(container).not.toBeNull();
    const computedTransform = container.style.transform.trim().replace(/\s+/g, " ");
    expect(computedTransform).toContain("translate(-50%, -50%)");
  });

  test("should move focus to first header button when opened", async () => {
    const opener = document.createElement("button");
    document.body.appendChild(opener);
    opener.focus();
    expect(document.activeElement).toBe(opener);

    element.show = true;
    await elementUpdated(element);
    jest.runAllTimers();

    const firstHeaderButton = element.shadowRoot!.querySelector(
      ".md-floating__header md-button.md-floating__header-button"
    ) as Button.ELEMENT;
    const activeElementInShadow = element.shadowRoot?.activeElement as HTMLElement | null;
    expect(activeElementInShadow).toBe(firstHeaderButton);
    document.body.removeChild(opener);
  });

  test("should return focus to opener when modal closes", async () => {
    const opener = document.createElement("button");
    document.body.appendChild(opener);
    opener.focus();

    element.show = true;
    await elementUpdated(element);
    jest.runAllTimers();

    const closeMdButton = element.shadowRoot!.querySelector(".md-floating__close") as Button.ELEMENT;
    const closeButton = closeMdButton.shadowRoot!.querySelector("button") as HTMLButtonElement;
    closeButton.click();

    await elementUpdated(element);
    jest.runAllTimers();

    expect(element.show).toBeFalsy();
    expect(document.activeElement).toBe(opener);
    document.body.removeChild(opener);
  });

  test("should close modal when escape is pressed inside modal", async () => {
    const opener = document.createElement("button");
    document.body.appendChild(opener);
    opener.focus();

    element.show = true;
    await elementUpdated(element);
    jest.runAllTimers();

    const modalContainer = element.shadowRoot!.querySelector(".md-floating") as HTMLDivElement;
    modalContainer.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Escape, bubbles: true, composed: true }));

    await elementUpdated(element);
    jest.runAllTimers();

    expect(element.show).toBeFalsy();
    expect(document.activeElement).toBe(opener);
    document.body.removeChild(opener);
  });

  test("should focus first header button when modal is restored from minimized", async () => {
    element.show = true;
    element.minimizable = true;
    await elementUpdated(element);
    jest.runAllTimers();

    const minimizeMdButton = element.shadowRoot!.querySelector(".md-floating__minimize") as Button.ELEMENT;
    const minimizeButton = minimizeMdButton.shadowRoot!.querySelector("button") as HTMLButtonElement;
    minimizeButton.click();
    await elementUpdated(element);
    jest.runAllTimers();

    const minimizedModal = element.shadowRoot!.querySelector("md-floating-modal-minimized") as HTMLElement;
    const restoreMdButton = minimizedModal.shadowRoot!.querySelector(".md-floating__resize") as Button.ELEMENT;
    const restoreButton = restoreMdButton.shadowRoot!.querySelector("button") as HTMLButtonElement;
    restoreButton.click();
    await elementUpdated(element);
    jest.runAllTimers();

    const firstHeaderButton = element.shadowRoot!.querySelector(
      ".md-floating__header md-button.md-floating__header-button"
    ) as Button.ELEMENT;
    const activeElementInShadow = element.shadowRoot?.activeElement as HTMLElement | null;
    expect(activeElementInShadow).toBe(firstHeaderButton);
  });
});
