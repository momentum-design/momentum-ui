import { Button } from "@/components/button/Button";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame, oneEvent } from "@open-wc/testing-helpers";
import "./FloatingModal";
import { FloatingModal } from "./FloatingModal";

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
    element = await fixture<FloatingModal.ELEMENT>(html` <md-floating-modal></md-floating-modal> `);
  });
  afterEach(fixtureCleanup);

  test("should show modal", async () => {
    element.show = true;
    await nextFrame();
    await elementUpdated(element);

    expect(element.show).toBeTruthy();
  });

  test("should set label is value provided", async () => {
    element.show = true;
    element.label = "Floating Modal";
    await nextFrame();
    await elementUpdated(element);

    expect(element.container!.getAttribute("aria-label")).toEqual("Floating Modal");
  });

  test("should close modal with button click", async () => {
    element.show = true;
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
    await nextFrame();
    await elementUpdated(element);

    const clickEvent = new MouseEvent("click");
    setTimeout(() => element.handleClose(clickEvent));

    const { detail } = await oneEvent(element, "floating-modal-close");

    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(clickEvent);
  });

  test("should resize modal when resize button click", async () => {
    element.show = true;
    await nextFrame();
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
    await nextFrame();
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
    await nextFrame();
    await elementUpdated(element);

    // Change the viewport to 500px.
    global.innerWidth = 500;

    // Trigger the window resize event.
    global.dispatchEvent(new Event("resize"));

    await elementUpdated(element);
    expect(element.show).toBeTruthy();
  });
});
