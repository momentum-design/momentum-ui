import "./FloatingMinimizedModal";
import { FloatingMinimizedModal } from "./FloatingMinimizedModal";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame, oneEvent } from "@open-wc/testing-helpers";
import { Button } from "@/components/button/Button";

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
  }
  );
  
});
