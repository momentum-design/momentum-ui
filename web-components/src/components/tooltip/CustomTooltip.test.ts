import "../theme/Theme";
import "../chip/Chip";
import "./Tooltip";
import { type Theme } from "../theme/Theme";
import { type Tooltip, type TooltipEvent } from "./Tooltip";
import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";

describe("Custom tooltips dispatched through md-theme", () => {
  let theme: Theme.ELEMENT;
  let reference: HTMLButtonElement;
  let tooltip: Tooltip.ELEMENT;

  const surface = () => theme.shadowRoot!.querySelector(".md-tooltip__popper") as HTMLElement;
  const isVisible = () => !!surface()?.hasAttribute("data-show");
  const destroy = (detail?: Partial<TooltipEvent> | null) => {
    theme.dispatchEvent(new CustomEvent("tooltip-destroy", { bubbles: true, composed: true, detail }));
  };
  const create = () => {
    const popper = document.createElement("div");
    popper.className = "md-tooltip__popper";
    popper.innerHTML = '<div class="md-tooltip__content">Custom tooltip</div>';
    theme.dispatchEvent(new CustomEvent("tooltip-create", { detail: { reference, popper, placement: "top" } }));
  };

  beforeEach(async () => {
    jest.useFakeTimers();
    theme = await fixture<Theme.ELEMENT>(html`
      <md-theme>
        <div id="wrapper"><button>Custom trigger</button></div>
        <md-tooltip><span slot="tooltip-content">Standard tooltip</span></md-tooltip>
      </md-theme>
    `);
    jest.runAllTimers();
    reference = theme.querySelector("button")!;
    tooltip = theme.querySelector("md-tooltip")!;
    // Match the unchanged AgentX BaseComponent event contract.
    reference.onmouseleave = () => destroy({});
    reference.onkeydown = () => destroy({});
  });

  afterEach(() => {
    fixtureCleanup();
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test.each([{}, null, undefined])("accepts legacy destroy detail %p", (detail) => {
    create();
    expect(isVisible()).toBeTruthy();
    destroy(detail);
    expect(isVisible()).toBeFalsy();
  });

  test("keeps custom content hovered, then closes after leaving both regions", () => {
    create();
    reference.dispatchEvent(new MouseEvent("mouseleave"));
    surface().dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);
    expect(isVisible()).toBeTruthy();

    surface().dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);
    expect(isVisible()).toBeFalsy();
  });

  test.each([false, true])("supports wrapper hover with disabled reference: %s", (disabled) => {
    const wrapper = theme.querySelector("#wrapper") as HTMLElement;
    reference.disabled = disabled;
    reference.onmouseleave = null;
    wrapper.onmouseleave = () => destroy({});
    create();
    wrapper.dispatchEvent(new MouseEvent("mouseleave"));
    surface().dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);
    expect(isVisible()).toBeTruthy();

    surface().dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);
    expect(isVisible()).toBeFalsy();
  });

  test("honors the legacy keydown destroy even while its surface is hovered", () => {
    create();
    reference.dispatchEvent(new MouseEvent("mouseleave"));
    surface().dispatchEvent(new MouseEvent("mouseenter"));
    reference.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyA" }));
    expect(isVisible()).toBeFalsy();
  });

  test("isolates custom content from stale standard tooltip close and removal events", async () => {
    tooltip.notifyTooltipCreate();
    await oneEvent(tooltip, "tooltip-create");
    create();
    expect(tooltip.opened).toBeFalsy();
    destroy({ reference: tooltip.reference });
    tooltip.remove();
    expect(isVisible()).toBeTruthy();
    expect(surface().textContent).toContain("Custom tooltip");

    destroy({ reference });
    expect(isVisible()).toBeFalsy();
  });

  test("ignores removal of an unrelated tooltip before its first render", () => {
    create();
    const unrelated = document.createElement("md-tooltip");
    document.body.append(unrelated);
    unrelated.remove();
    expect(isVisible()).toBeTruthy();
  });

  test.each([false, true])("updates slotted content only for the active tooltip: %s", async (active) => {
    if (active) {
      tooltip.notifyTooltipCreate();
      await oneEvent(tooltip, "tooltip-create");
    } else {
      create();
    }
    const replacement = document.createElement("span");
    replacement.slot = "tooltip-content";
    replacement.textContent = "Updated slotted content";
    const changed = oneEvent(tooltip.shadowRoot!.querySelector('slot[name="tooltip-content"]')!, "slotchange");
    tooltip.append(replacement);
    await changed;

    expect(isVisible()).toBeTruthy();
    expect(surface().textContent).toContain(active ? "Updated slotted content" : "Custom tooltip");
    expect(surface().textContent).not.toContain(active ? "Standard tooltip" : "Updated slotted content");
  });

  test("keeps md-chip's explicit close compatible and scoped to its own tooltip", async () => {
    const chip = document.createElement("md-chip");
    chip.value = "Chip";
    chip.tooltipText = "Chip tooltip";
    theme.append(chip);
    await elementUpdated(chip);
    const chipTooltip = chip.shadowRoot!.querySelector("md-tooltip")!;
    await elementUpdated(chipTooltip);
    chipTooltip.notifyTooltipCreate();
    await oneEvent(chipTooltip, "tooltip-create");
    chip.handleClick();
    expect(isVisible()).toBeFalsy();
    expect(chipTooltip.opened).toBeFalsy();

    create();
    chip.handleClick();
    expect(isVisible()).toBeTruthy();
  });

  test("recovers from missing mouseleave after zoom", () => {
    create();
    const popper = surface();
    popper.dispatchEvent(new MouseEvent("mouseenter"));
    window.dispatchEvent(new Event("gesturestart"));
    popper.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);
    expect(isVisible()).toBeTruthy();

    document.body.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true }));
    jest.advanceTimersByTime(0);
    expect(isVisible()).toBeFalsy();
  });

  test.each(["reference", "theme"])("cleans up when the %s is removed", (target) => {
    create();
    const popper = surface();
    popper.dispatchEvent(new MouseEvent("mouseenter"));
    (target === "reference" ? reference : theme).remove();
    jest.advanceTimersByTime(20);
    expect(isVisible()).toBeFalsy();

    popper.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);
    expect(isVisible()).toBeFalsy();
  });
});
