import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame, oneEvent } from "@open-wc/testing-helpers";
import "./Modal";
import { Modal } from "./Modal";

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

describe("Modal Component", () => {
  let element: Modal.ELEMENT;

  beforeEach(async () => {
    element = await fixture<Modal.ELEMENT>(
      html`
        <md-modal>
          <input type="text" placeholder="Type Text" />
          <button slot="footer" type="reset">Reset</button>
          <button slot="footer" type="submit">Submit</button>
        </md-modal>
      `
    );
  });
  afterEach(fixtureCleanup);

  test("should dispatch event when modal closed", async () => {
    jest.useRealTimers();
    element.show = true;
    element.backdropClickExit = true;
    await elementUpdated(element);

    setTimeout(() => element["handleCloseBackdrop"]());
    const enterEvent = await oneEvent(element, "close-modal");
    expect(enterEvent).toBeDefined();
  });

  test("should render slot footer", async () => {
    element.hideFooter = true;
    element.show = true;
    await elementUpdated(element);

    expect(element.hideFooter).toBeTruthy();
    expect(element.shadowRoot!.querySelector(".md-modal__footer slot[name='footer']")).not.toBeNull();
  });

  test("should render slot header", async () => {
    element.hideHeader = true;
    element.show = true;
    await elementUpdated(element);

    expect(element.hideHeader).toBeTruthy();
    expect(element.shadowRoot!.querySelector(".md-modal__header slot[name='header']")).not.toBeNull();
  });

  test("should render header message", async () => {
    element.headerMessage = "Header Message";
    element.show = true;
    await elementUpdated(element);

    expect(element.headerMessage).toEqual("Header Message");
    expect(element.shadowRoot!.querySelector(".md-modal__header .md-modal__message")).not.toBeNull();
  });

  test("should render exit button", async () => {
    element.backdropClickExit = true;
    element.show = true;
    await elementUpdated(element);

    expect(element.backdropClickExit).toBeTruthy();
    expect(element.shadowRoot!.querySelector(".md-modal_overlay")).not.toBeNull();
  });

  test("should render close button", async () => {
    element.showCloseButton = true;
    element.show = true;
    await elementUpdated(element);

    expect(element.showCloseButton).toBeTruthy();
    expect(element.shadowRoot!.querySelector(".md-close.md-modal__close")).not.toBeNull();
  });

  test("should close modal if noExitOnEsc is set to true and escape key is pressed", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.noExitOnEsc = false;
    element.backdropClickExit = true;
    await elementUpdated(element);
    const escapePressEvent = new KeyboardEvent("keydown", { code: Key.Escape });
    element.handleCloseOutside(escapePressEvent);
    expect(element.show).toBeFalsy();
    jest.clearAllTimers();
  });

  test("should not close modal if noExitOnEsc is set to false and escape key is pressed", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.noExitOnEsc = true;
    element.backdropClickExit = true;
    await elementUpdated(element);
    const escapePressEvent = new KeyboardEvent("keydown", { code: Key.Escape });
    element.handleCloseOutside(escapePressEvent);
    expect(element.show).toBeTruthy();
  });

  test("should close modal when enter key is pressed", async () => {
    jest.useFakeTimers();

    await elementUpdated(element);

    const mockEnterClick = jest.spyOn(element, "handleKeyDown");
    element.handleKeyDown(new KeyboardEvent("Enter"));
    await elementUpdated(element);

    expect(mockEnterClick).toHaveBeenCalled();

    mockEnterClick.mockRestore();
  });

  test("should close modal if backdrop button clicked", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.backdropClickExit = true;
    element.noExitOnEsc = false;
    await elementUpdated(element);
    element.handleCloseBackdrop();
    await nextFrame();
    jest.runAllTimers();
    expect(element.show).toBeFalsy();
    jest.clearAllTimers();
  });

  test("should close modal if clicked on modal footer button", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.showCloseButton = true;
    await elementUpdated(element);

    const click = new MouseEvent("click");
    const closeButton = element.shadowRoot!.querySelector(".md-modal__footer md-button");

    closeButton!.dispatchEvent(click);

    await elementUpdated(element);

    jest.runAllTimers();
    expect(element.show).toBeFalsy();
  });

  test("should call focusInsideModal in modal", async () => {
    const focusInsideModal = jest.fn();
    element["focusInsideModal"] = focusInsideModal;
    const mockTransitionPromise = jest.fn();
    element["transitionPromise"] = mockTransitionPromise;
    element.show = true;
    element.disableInitialFocus = false;

    await elementUpdated(element);
    jest.runAllTimers();

    expect(mockTransitionPromise).toBeCalled();
    expect(focusInsideModal).toBeCalled();
  });

  test("shouldn't call focusInsideModal in modal", async () => {
    const focusInsideModal = jest.fn();
    element["focusInsideModal"] = focusInsideModal;
    const mockTransitionPromise = jest.fn();
    element["transitionPromise"] = mockTransitionPromise;
    element.show = true;
    element.disableInitialFocus = true;

    await elementUpdated(element);
    jest.runAllTimers();

    expect(mockTransitionPromise).toBeCalled();
    expect(focusInsideModal).not.toBeCalled();
  });
});
