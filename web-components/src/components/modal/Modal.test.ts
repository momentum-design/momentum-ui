import "@/components/modal/Modal";
import { Modal } from "@/components/modal/Modal";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame, oneEvent } from "@open-wc/testing-helpers";

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
  let element: Modal;

  beforeEach(async () => {
    element = await fixture<Modal>(
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

  test("should set first focusable element if modal open", async () => {
    jest.useFakeTimers();

    element.show = true;
    await elementUpdated(element);

    element.backDrop.dispatchEvent(new Event("transitionend"));
    await nextFrame();
    const input = element.querySelector("input");

    expect(document.activeElement).toEqual(input);
  });

  test("should dispatch event when modal closed", async () => {
    jest.useRealTimers();
    element.show = true;
    element.showCloseButton = true;
    await elementUpdated(element);
    const enter = new KeyboardEvent("keydown", { code: Key.Enter });
    const enterButton = () => element.shadowRoot!.querySelector(".md-close.md-modal__close")!.dispatchEvent(enter);
    setTimeout(enterButton);
    const enterEvent = await oneEvent(element, "close-modal");
    expect(enterEvent).toBeDefined();

    element.show = true;
    element.showCloseButton = true;
    await elementUpdated(element);

    const space = new KeyboardEvent("keydown", { code: Key.Space });
    const spaceButton = () => element.shadowRoot!.querySelector(".md-close.md-modal__close")!.dispatchEvent(space);
    setTimeout(spaceButton);
    const spaceEvent = await oneEvent(element, "close-modal");
    expect(spaceEvent).toBeDefined();
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

  test("should close modal", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.backdropClickExit = true;

    await elementUpdated(element);
    element["modalFadeOut"]();
    jest.runAllTimers();
    expect(element.show).toBeFalsy();
  });

  test("should  close modal if noExitOnEsc is set to true and escape key is pressed", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.backdropClickExit = true;
    await elementUpdated(element);
    const escapePressEvent = new KeyboardEvent("keydown", { code: Key.Escape });
    element.handleCloseOutside(escapePressEvent);
    jest.runAllTimers();
    expect(element.show).toBeFalsy();
  });

  test("should not close modal if noExitOnEsc is set to false and escape key is pressed", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.backdropClickExit = true;
    element.noExitOnEsc = true;
    await elementUpdated(element);
    const escapePressEvent = new KeyboardEvent("keydown", { code: Key.Escape });
    element.handleCloseOutside(escapePressEvent);
    expect(element.show).toBeTruthy();
  });

  test("should close modal if backdrop button clicked", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.backdropClickExit = true;

    await elementUpdated(element);
    element.handleCloseBackdrop();
    jest.runAllTimers();
    expect(element.show).toBeFalsy();
  });

  test("should close modal if clicked outside", async () => {
    jest.useFakeTimers();
    element.show = true;
    await elementUpdated(element);

    const enter = new KeyboardEvent("keydown", { code: Key.Escape });
    element.handleCloseOutside(enter);
    jest.runAllTimers();
    expect(element.show).toBeFalsy();
  });
});
