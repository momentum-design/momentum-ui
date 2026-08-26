import { Button } from "@/components/button/Button";
import interact from "@interactjs/interact/index";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame, oneEvent } from "@open-wc/testing-helpers";
import "./FloatingMinimizedModal";
import { FloatingMinimizedModal } from "./FloatingMinimizedModal";

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
  let element: FloatingMinimizedModal.ELEMENT;

  beforeEach(async () => {
    element = await fixture<FloatingMinimizedModal.ELEMENT>(html`
      <md-floating-modal-minimized .maximizeIconAriaLabel=${"Maximize Modal"}></md-floating-modal-minimized>
    `);
  });
  afterEach(fixtureCleanup);

  test("should show modal and set initial location", async () => {
    element.show = true;
    element.minimize = true;
    element.minPosition = { x: 0, y: 12 };
    await nextFrame();
    await elementUpdated(element);

    expect(element.show).toBeTruthy();
    const ele = element.shadowRoot!.querySelector(".md-floating-minimize") as HTMLElement;
    expect(ele.style.transform).toBe("translate(0px, 12px)");
  });

  test("should close modal with button click", async () => {
    element.show = true;
    element.minimize = true;
    await nextFrame();
    await elementUpdated(element);

    const mdButton = element.shadowRoot!.querySelector(".md-floating__close") as Button.ELEMENT;
    const button = mdButton.shadowRoot!.querySelector("button");
    button!.click();

    await elementUpdated(element);
    expect(element.show).toBeFalsy();
  });

  test("should dispatch event when modal close", async () => {
    element.show = true;
    element.minimize = true;
    await nextFrame();
    await elementUpdated(element);

    const clickEvent = new MouseEvent("click");
    setTimeout(() => element.handleClose(clickEvent));

    const { detail } = await oneEvent(element, "floating-modal-close");

    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(clickEvent);
  });

  test("should dipatch on minimize", async () => {
    element.show = true;
    element.minimize = true;
    await nextFrame();
    await elementUpdated(element);
    const clickEvent = new MouseEvent("click");
    setTimeout(() => element.handleMinimize(clickEvent));

    const { detail } = await oneEvent(element, "floating-min-modal-minimize");
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(clickEvent);
  });

  test("should render text in header", async () => {
    element.show = true;
    element.minimize = true;
    element.heading = "momentum";
    await nextFrame();
    await elementUpdated(element);
    const headerText = element.shadowRoot!.querySelector(".md-floating__header-text") as HTMLElement;
    expect(headerText.textContent?.trim()).toEqual("momentum");
  });

  test("should render maxmimize button when floating modal is minimized", async () => {
    element.show = true;
    element.minimize = true;
    await nextFrame();
    await elementUpdated(element);
    const mdButton = element.shadowRoot!.querySelector(".md-floating__resize") as Button.ELEMENT;
    expect(mdButton.getAttribute("arialabel")).toEqual("Maximize Modal");
    expect(mdButton).toBeDefined();
  });

  test("should drag from slotted header content but not header controls", async () => {
    element = await fixture<FloatingMinimizedModal.ELEMENT>(html`
      <md-floating-modal-minimized .maximizeIconAriaLabel=${"Maximize Modal"}>
        <div slot="header" class="slotted-header">
          <span class="slotted-header-title">Title</span>
          <md-tooltip class="slotted-header-tooltip">
            <md-button class="slotted-header-action">Action</md-button>
          </md-tooltip>
        </div>
      </md-floating-modal-minimized>
    `);
    element.show = true;
    element.minimize = true;
    await nextFrame();
    await elementUpdated(element);

    const container = element.shadowRoot!.querySelector(".md-floating") as HTMLElement;
    const containerInteractable = interact(container);
    const dragOptions = containerInteractable.options.drag;
    const title = element.querySelector(".slotted-header-title") as HTMLElement;
    const slottedTooltip = element.querySelector(".slotted-header-tooltip") as HTMLElement;
    const slottedAction = element.querySelector(".slotted-header-action") as HTMLElement;
    const maximizeButton = element.shadowRoot!.querySelector(".md-floating__resize") as Button.ELEMENT;
    const closeButton = element.shadowRoot!.querySelector(".md-floating__close") as Button.ELEMENT;

    expect(dragOptions.enabled).toBeTruthy();
    expect(containerInteractable.testIgnoreAllow(dragOptions, container, title)).toBeTruthy();
    expect(containerInteractable.testIgnoreAllow(dragOptions, container, slottedTooltip)).toBeFalsy();
    expect(containerInteractable.testIgnoreAllow(dragOptions, container, slottedAction)).toBeFalsy();
    expect(containerInteractable.testIgnoreAllow(dragOptions, container, maximizeButton)).toBeFalsy();
    expect(containerInteractable.testIgnoreAllow(dragOptions, container, closeButton)).toBeFalsy();
  });
});
