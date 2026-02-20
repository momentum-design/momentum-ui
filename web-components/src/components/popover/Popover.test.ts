import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Popover";
import { Popover } from "./Popover";
import { popoverStack } from "./Popover.stack";

type EscapeEventStub = KeyboardEvent & {
  preventDefault: jest.Mock;
  stopImmediatePropagation: jest.Mock;
};

const createEscapeEvent = (): EscapeEventStub =>
  ({
    key: "Escape",
    code: "Escape",
    preventDefault: jest.fn(),
    stopImmediatePropagation: jest.fn()
  }) as unknown as EscapeEventStub;

describe("Popover Component", () => {
  let element: Popover;

  beforeEach(async () => {
    jest.useFakeTimers();
    popoverStack.clear();
    element = await fixture<Popover>(html`<md-popover></md-popover>`);
    element.visible = true;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    popoverStack.clear();
    fixtureCleanup();
  });

  test("should close on escape when no popover is on top of stack", () => {
    const event = createEscapeEvent();
    const hideThisPopoverSpy = jest.spyOn(element as unknown as { hideThisPopover: () => void }, "hideThisPopover");

    element["onEscapeKeydown"](event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(hideThisPopoverSpy).toHaveBeenCalled();
  });

  test("should ignore escape when another popover is on top of stack", () => {
    const event = createEscapeEvent();
    const hideThisPopoverSpy = jest.spyOn(element as unknown as { hideThisPopover: () => void }, "hideThisPopover");
    const otherPopover = document.createElement("md-popover") as Popover;
    popoverStack.push(otherPopover);

    element["onEscapeKeydown"](event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopImmediatePropagation).not.toHaveBeenCalled();
    expect(hideThisPopoverSpy).not.toHaveBeenCalled();
  });

  test("should delegate escape from trigger keydown to escape handler", () => {
    element.hideOnEscape = true;
    const onEscapeSpy = jest.spyOn(
      element as unknown as { onEscapeKeydown: (event: KeyboardEvent) => void },
      "onEscapeKeydown"
    );
    const event = new KeyboardEvent("keydown", { key: "Escape", code: "Escape" });

    element["onTriggerKeydown"](event);

    expect(onEscapeSpy).toHaveBeenCalled();
  });

  test("should close on outside pointerdown", () => {
    const hideThisPopoverSpy = jest.spyOn(element as unknown as { hideThisPopover: () => void }, "hideThisPopover");
    const event = {
      composedPath: () => [document.body]
    } as unknown as PointerEvent;

    element["onOutsidePopoverPointerDown"](event);

    expect(hideThisPopoverSpy).toHaveBeenCalled();
  });

  test("should ignore pointerdown when composedPath contains trigger element", () => {
    element.triggerElement = document.createElement("button");
    const hideThisPopoverSpy = jest.spyOn(element as unknown as { hideThisPopover: () => void }, "hideThisPopover");
    const event = {
      composedPath: () => [element.triggerElement as EventTarget]
    } as unknown as PointerEvent;

    element["onOutsidePopoverPointerDown"](event);

    expect(hideThisPopoverSpy).not.toHaveBeenCalled();
  });

  test("should ignore inside scroll and close on outside scroll", () => {
    const hideThisPopoverSpy = jest.spyOn(element as unknown as { hideThisPopover: () => void }, "hideThisPopover");
    const insideEvent = {
      composedPath: () => [element as EventTarget]
    } as unknown as Event;

    element["onOutsidePopoverScrollOrWheel"](insideEvent);
    expect(hideThisPopoverSpy).not.toHaveBeenCalled();

    const outsideEvent = {
      composedPath: () => [document.body]
    } as unknown as Event;

    element["onOutsidePopoverScrollOrWheel"](outsideEvent);
    expect(hideThisPopoverSpy).toHaveBeenCalled();
  });
});
