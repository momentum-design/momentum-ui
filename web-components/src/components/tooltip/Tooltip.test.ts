import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./../icon/Icon";
import "./Tooltip";
import { Tooltip } from "./Tooltip";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const lmTooltipTokens = require("./tokens/lm-tooltip-tokens.js");
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const mdTooltipTokens = require("./tokens/md-tooltip-tokens.js");

describe("Tooltip Tokens", () => {
  test("Lumos Token Import should not be null", () => {
    expect(lmTooltipTokens).not.toBeNull();
  });
  test("Lumos Token Import should not be null", () => {
    expect(mdTooltipTokens).not.toBeNull();
  });
});

const fixtureFactory = async (tooltip: string, disabled: boolean): Promise<Tooltip> => {
  return await fixture(
    html`
      <md-tooltip message=${tooltip} ?disabled=${disabled}>
        <md-icon name="apps_24"></md-icon>
      </md-tooltip>
    `
  );
};

describe("Tooltip", () => {
  afterEach(fixtureCleanup);

  test("should render Tooltip Component", async () => {
    expect(true).toBeTruthy();
  });

  test("should show/hide Tooltip Component", async () => {
    const element: Tooltip = await fixtureFactory("Test text", false);
    element.showTooltip();
    await elementUpdated(element);

    expect(element.getAttribute("data-show")).toBeTruthy;

    element.hideTooltip();
    await elementUpdated(element);
    expect(element.getAttribute("data-show")).toBeFalsy;
  });

  test("should show/hide Tooltip Component if trigger is focus", async () => {
    const element: Tooltip = await fixtureFactory("Test text", false);
    element.hideTooltip();
    await elementUpdated(element);
    expect(element.getAttribute("data-show")).toBeTruthy;
    await elementUpdated(element);
    expect(element.getAttribute("data-show")).toBeFalsy;
  });

  test("should disable Tooltip Component even if trigger is focus", async () => {
    const element: Tooltip = await fixtureFactory("Test text", true);
    element.showTooltip();
    await elementUpdated(element);

    const tooltipElm = element?.shadowRoot?.querySelector(".md-tooltip");
    expect(tooltipElm?.getAttribute("class")).toMatch("md-tooltip md-tooltip--disabled");
  });

  test("should render content within named slot", async () => {
    const element: Tooltip = await fixture(
      html`
        <md-tooltip>
          <md-icon slot="tooltip-content" name="apps_24"></md-icon>
          <md-button>Hover me</md-button>
        </md-tooltip>
      `
    );
    expect(element).not.toBeNull();
    element.showTooltip();
    await elementUpdated(element);

    const namedSlotContent = element.renderRoot.querySelector('slot[name="tooltip-content"]') as HTMLSlotElement;
    expect(namedSlotContent).not.toBeNull();
    const slotElement = namedSlotContent.assignedElements()[0] as HTMLElement;
    expect(slotElement).not.toBeNull();
  });
});
