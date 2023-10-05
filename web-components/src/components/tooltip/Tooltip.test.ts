import "@/components/icon/Icon";
import "@/components/theme/Theme";
import { Theme } from "@/components/theme/Theme";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import "./Tooltip";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  let theme: Theme.ELEMENT;
  let tooltip: Tooltip.ELEMENT;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    theme = await fixture<Theme.ELEMENT>(html`
      <md-theme>
        <md-tooltip message="Tooltip">
          <md-button>Tooltip</md-button>
        </md-tooltip>
      </md-theme>
    `);
    tooltip = theme.querySelector("md-tooltip") as Tooltip.ELEMENT;
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
    setTimeout(() => tooltip.notifyTooltipCreate());

    const { detail: tooltipCreate } = await oneEvent(tooltip, "tooltip-create");

    expect(tooltipCreate).toBeDefined();
    expect(tooltip.opened).toBeTruthy();
    expect(tooltipCreate.reference).toEqual(tooltip.reference);

    setTimeout(() => tooltip.notifyTooltipDestroy());

    const { detail: tooltipDestroy } = await oneEvent(tooltip, "tooltip-destroy");

    expect(tooltipDestroy).toBeDefined();
    expect(tooltip.opened).toBeFalsy();
    expect(tooltipDestroy.reference).toEqual(tooltip.reference);
  });

  test("should close tooltip on pressing escape anywhere when tooltip is open", async () => {
    setTimeout(() => tooltip.notifyTooltipCreate());

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
