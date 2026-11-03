import "@/components/button/Button";
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

    tooltip.notifyTooltipDestroy();

    const { detail: tooltipDestroy } = await destroyPromise;

    expect(tooltipDestroy).toBeDefined();
    expect(tooltip.opened).toBeFalsy();
    expect(tooltipDestroy.reference).toEqual(tooltip.reference);
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

  test("should delay closing tooltip when pointer leaves the reference", async () => {
    tooltip.reference.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(tooltip);
    expect(tooltip.opened).toBeTruthy();

    tooltip.reference.dispatchEvent(new MouseEvent("mouseleave"));
    await elementUpdated(tooltip);
    expect(tooltip.opened).toBeTruthy();

    jest.advanceTimersByTime(300);
    await elementUpdated(tooltip);
    expect(tooltip.opened).toBeFalsy();
  });

  test("should keep tooltip open when pointer enters virtual popper before close delay expires", async () => {
    tooltip.reference.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(tooltip);
    await elementUpdated(theme);

    const virtualPopper = theme.shadowRoot!.querySelector(".md-tooltip__popper[data-show]") as HTMLElement;
    expect(virtualPopper).not.toBeNull();
    expect(virtualPopper.querySelector(".tooltip-hover-bridge")).not.toBeNull();

    tooltip.reference.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(100);

    virtualPopper.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    jest.advanceTimersByTime(300);
    await elementUpdated(tooltip);

    expect(tooltip.opened).toBeTruthy();
    expect(theme.shadowRoot!.querySelector(".md-tooltip__popper[data-show]")).not.toBeNull();
  });

  test("should keep active virtual tooltip visible when stale destroy is received after switching triggers", async () => {
    fixtureCleanup();

    theme = await fixture<Theme.ELEMENT>(html`
      <md-theme>
        <md-tooltip message="Home" placement="right">
          <md-button>Home</md-button>
        </md-tooltip>
        <md-tooltip message="Interactions" placement="right">
          <md-button>Interactions</md-button>
        </md-tooltip>
      </md-theme>
    `);

    jest.runAllTimers();

    const homeTooltip = theme.querySelector("md-tooltip") as Tooltip.ELEMENT;
    const interactionsTooltip = theme.querySelectorAll("md-tooltip")[1] as Tooltip.ELEMENT;

    homeTooltip.reference.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(theme);

    interactionsTooltip.reference.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(theme);

    expect(interactionsTooltip.opened).toBeTruthy();
    expect(theme.shadowRoot!.querySelector(".md-tooltip__content")?.textContent).toContain("Interactions");

    theme.dispatchEvent(
      new CustomEvent("tooltip-destroy", {
        detail: {
          placement: "right",
          reference: homeTooltip.reference,
          popper: homeTooltip.popper
        }
      })
    );

    await elementUpdated(theme);

    expect(interactionsTooltip.opened).toBeTruthy();
    expect(theme.shadowRoot!.querySelector(".md-tooltip__popper[data-show]")).not.toBeNull();
  });
});
