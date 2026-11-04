import "@/components/icon/Icon";
import "@/components/theme/Theme";
import { type Theme } from "@/components/theme/Theme";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import "./Tooltip";
import { type Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  let theme: Theme.ELEMENT;
  let tooltip: Tooltip.ELEMENT;

  beforeEach(async () => {
    jest.useFakeTimers();

    theme = await fixture<Theme.ELEMENT>(html`
      <md-theme>
        <md-tooltip message="Tooltip">
          <md-button>Tooltip</md-button>
        </md-tooltip>
      </md-theme>
    `);

    jest.runAllTimers();

    tooltip = theme.querySelector("md-tooltip") as Tooltip.ELEMENT;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should notify md-theme in show/hide case", async () => {
    const createNotifySpy = jest.spyOn(tooltip, "notifyTooltipCreate");
    const destroyNotifySpy = jest.spyOn(tooltip, "notifyTooltipDestroy");

    const mouseEnterEvent = new MouseEvent("mouseenter");
    const mouseLeaveEvent = new MouseEvent("mouseleave");
    tooltip.reference.dispatchEvent(mouseEnterEvent);

    await elementUpdated(theme);
    expect(createNotifySpy).toHaveBeenCalled();

    tooltip.reference.dispatchEvent(mouseLeaveEvent);

    await elementUpdated(theme);
    expect(createNotifySpy).toHaveBeenCalled();

    createNotifySpy.mockRestore();
    destroyNotifySpy.mockRestore();
  });

  test("should dispach event after show/hide case", async () => {
    const createPromise = oneEvent(tooltip, "tooltip-create");
    const destroyPromise = oneEvent(tooltip, "tooltip-destroy");

    tooltip.notifyTooltipCreate();

    const { detail: tooltipCreate } = await createPromise;

    expect(tooltipCreate).toBeDefined();
    expect(tooltip.opened).toBeTruthy();
    expect(tooltipCreate.reference).toEqual(tooltip.reference);
    expect(theme["popperInstance"]?.state.elements.reference).toBe(tooltip.reference);

    tooltip.notifyTooltipDestroy();

    const { detail: tooltipDestroy } = await destroyPromise;

    expect(tooltipDestroy).toBeDefined();
    expect(tooltip.opened).toBeFalsy();
    expect(tooltipDestroy.reference).toEqual(tooltip.reference);
  });

  test("should keep tooltip open while pointer moves through the hover bridge", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");

    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    const hoverBridge = popper.querySelector(".md-tooltip__hover-bridge");
    expect(hoverBridge).not.toBeNull();

    tooltip.reference.dispatchEvent(new MouseEvent("mouseleave"));
    popper.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeTruthy();

    popper.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeFalsy();
  });

  test("should not hide the active tooltip when an earlier tooltip closes", async () => {
    const other = document.createElement("md-tooltip");
    other.message = "Other tooltip";
    theme.append(other);
    await elementUpdated(other);

    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    tooltip.reference.dispatchEvent(new MouseEvent("mouseleave"));

    other.notifyTooltipCreate();
    await oneEvent(other, "tooltip-create");
    jest.advanceTimersByTime(0);
    await elementUpdated(tooltip);

    expect(tooltip.opened).toBeFalsy();
    expect(other.opened).toBeTruthy();
    expect(theme.shadowRoot!.querySelector(".md-tooltip__popper[data-show]")?.textContent).toContain("Other tooltip");
  });

  test("should not hide the active tooltip when an unrelated tooltip is removed", async () => {
    const other = document.createElement("md-tooltip");
    theme.append(other);
    await elementUpdated(other);

    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    other.remove();

    expect(tooltip.opened).toBeTruthy();
    expect(theme.shadowRoot!.querySelector(".md-tooltip__popper[data-show]")).not.toBeNull();
  });

  test("should hide the portaled surface when its tooltip is removed", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    tooltip.remove();

    expect(theme.shadowRoot!.querySelector(".md-tooltip__popper[data-show]")).toBeNull();
    expect((theme.shadowRoot!.querySelector(".md-tooltip__hover-bridge") as HTMLElement).style.display).toBe("none");
  });

  test("should preserve keyboard focus while the pointer leaves and close on blur", async () => {
    tooltip.reference.dispatchEvent(new FocusEvent("focusin"));
    await oneEvent(tooltip, "tooltip-create");
    tooltip.reference.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeTruthy();

    tooltip.reference.dispatchEvent(new FocusEvent("focusout"));
    expect(tooltip.opened).toBeFalsy();
  });

  test("should close on wheel while hovering the portaled surface", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    popper.dispatchEvent(new MouseEvent("mouseenter"));
    window.dispatchEvent(new WheelEvent("wheel"));
    await elementUpdated(tooltip);

    expect(tooltip.opened).toBeFalsy();
    expect(popper.hasAttribute("data-show")).toBeFalsy();
  });

  test("should keep tooltip open during Safari pinch zoom until the pointer moves away", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    popper.dispatchEvent(new MouseEvent("mouseenter"));

    window.dispatchEvent(new Event("gesturestart"));
    popper.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeTruthy();

    window.dispatchEvent(new Event("gestureend"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeTruthy();

    window.dispatchEvent(new MouseEvent("mousemove"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeFalsy();
  });

  test("should distinguish a zoom wheel event from ordinary scrolling", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    popper.dispatchEvent(new MouseEvent("mouseenter"));

    window.dispatchEvent(new WheelEvent("wheel", { ctrlKey: true }));
    popper.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeTruthy();

    window.dispatchEvent(new WheelEvent("wheel"));
    expect(tooltip.opened).toBeFalsy();
  });

  test("should close after zoom even if the surface never received mouseleave", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    popper.dispatchEvent(new MouseEvent("mouseenter"));
    window.dispatchEvent(new Event("gesturestart"));
    window.dispatchEvent(new Event("gestureend"));

    document.body.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true }));
    jest.advanceTimersByTime(0);

    expect(tooltip.opened).toBeFalsy();
  });

  test("should keep checking pointer movement after moving inside the surface following zoom", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    popper.dispatchEvent(new MouseEvent("mouseenter"));
    window.dispatchEvent(new Event("gesturestart"));
    window.dispatchEvent(new Event("gestureend"));

    popper.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true }));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeTruthy();

    document.body.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true }));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeFalsy();
  });

  test("should close on pointer movement outside even if gestureend is missing", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    popper.dispatchEvent(new MouseEvent("mouseenter"));
    window.dispatchEvent(new Event("gesturestart"));

    document.body.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true }));
    jest.advanceTimersByTime(0);

    expect(tooltip.opened).toBeFalsy();
  });

  test("should preserve keyboard focus when checking the pointer after zoom", async () => {
    tooltip.reference.dispatchEvent(new FocusEvent("focusin"));
    await oneEvent(tooltip, "tooltip-create");
    window.dispatchEvent(new Event("gesturestart"));
    window.dispatchEvent(new Event("gestureend"));

    document.body.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true }));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeTruthy();

    tooltip.reference.dispatchEvent(new FocusEvent("focusout"));
    expect(tooltip.opened).toBeFalsy();
  });

  test("should still dismiss on Escape during a pinch gesture", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    window.dispatchEvent(new Event("gesturestart"));
    document.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Escape }));

    expect(tooltip.opened).toBeFalsy();
    window.dispatchEvent(new Event("gestureend"));
    window.dispatchEvent(new MouseEvent("mousemove"));
    jest.advanceTimersByTime(0);
    expect(tooltip.opened).toBeFalsy();
  });

  test("should hide the portaled surface when disabled", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    tooltip.disabled = true;
    await elementUpdated(tooltip);
    await elementUpdated(tooltip);

    expect(tooltip.opened).toBeFalsy();
    expect(theme.shadowRoot!.querySelector(".md-tooltip__popper[data-show]")).toBeNull();
  });

  test("should clear surface hover state when disabled and enabled again", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    const popper = theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
    popper.dispatchEvent(new MouseEvent("mouseenter"));

    tooltip.disabled = true;
    await elementUpdated(tooltip);
    await elementUpdated(tooltip);
    tooltip.disabled = false;
    await elementUpdated(tooltip);

    tooltip.reference.dispatchEvent(new MouseEvent("mouseenter"));
    await oneEvent(tooltip, "tooltip-create");
    tooltip.reference.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);

    expect(tooltip.opened).toBeFalsy();
  });

  test("should close tooltip on pressing escape anywhere when tooltip is open", async () => {
    tooltip.notifyTooltipCreate();

    const { detail: tooltipCreate } = await oneEvent(tooltip, "tooltip-create");

    const focusinEvent = new MouseEvent("focusin");
    const destroyNotifySpy = jest.spyOn(tooltip, "notifyTooltipDestroy");

    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    const escape = createEvent(Key.Escape);

    tooltip.reference.dispatchEvent(focusinEvent);
    expect(tooltip.opened).toBeTruthy();
    expect(tooltipCreate.reference).toEqual(tooltip.reference);
    document.dispatchEvent(escape);

    expect(destroyNotifySpy).toHaveBeenCalled();
    expect(tooltip.opened).toBeFalsy();
  });

  test("should handle with slot content changes", async () => {
    const div = document.createElement("div");
    div.slot = "tooltip-content";
    div.textContent = "Slot Content";

    tooltip.message = "";
    tooltip.append(div);

    await elementUpdated(tooltip);

    expect(tooltip["slotContent"]).toEqual([div]);
  });

  test("should handle disabled state", async () => {
    tooltip.disabled = true;

    await elementUpdated(tooltip);
    expect(tooltip.disabled).toBeTruthy();
    expect(tooltip.shadowRoot!.querySelector(".md-tooltip--disabled")).not.toBeNull();
  });
});
