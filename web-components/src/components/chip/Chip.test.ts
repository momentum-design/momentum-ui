import "@/components/icon/Icon";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Chip";
import { type Chip } from "./Chip";

const fixtureFactory = async (): Promise<Chip.ELEMENT> => {
  return await fixture(html` <md-chip value="chip text content"></md-chip> `);
};

describe("Chip component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.runAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  // color
  test("should set chip color", async () => {
    const component: Chip.ELEMENT = await fixture(html` <md-chip color="blue"></md-chip> `);
    expect(component.color).not.toBeNull();
  });

  // small
  test("should set chip to small size", async () => {
    const component: Chip.ELEMENT = await fixture(html` <md-chip small></md-chip> `);
    expect(component.small).toBeTruthy();
  });

  // custom bgColor chip
  test("should set user bgColor chip", async () => {
    const component: Chip.ELEMENT = await fixture(html` <md-chip bgColor="#000"></md-chip> `);
    expect(component.bgColor).toEqual("#000");
  });
  // custom size chip
  test("should set user width", async () => {
    const component: Chip.ELEMENT = await fixture(html` <md-chip height="100px"></md-chip> `);
    expect(component.height).toEqual("100px");
  });
  // custom textColor chip
  test("should set user textColor", async () => {
    const component: Chip.ELEMENT = await fixture(html` <md-chip textColor="#000"></md-chip> `);
    expect(component.textColor).toEqual("#000");
  });

  test("should truncate long text from value attribute", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="chip text content that is way tooooooo long"></md-chip>
    `);
    expect(component.truncStringPortion).toHaveBeenCalled();
  });
  test("should render determinate progress bar", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="chip text content" determinateProgress="50"></md-chip>
    `);
    expect(component.shadowRoot?.querySelector("md-progress-bar")).not.toBeNull();
  });
  test("should render indeterminate progress bar", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="chip text content" indeterminateProgress></md-chip>
    `);
    expect(component.shadowRoot?.querySelector("md-progress-bar")).not.toBeNull();
  });
  test("should render an icon when icon attribute is used", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="chip text content" icon="icon-alert_16"></md-chip>
    `);
    expect(component.shadowRoot?.querySelector("md-icon")).not.toBeNull();
  });

  test("should set disabled state", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="chip text content" disabled icon="icon-alert_16"></md-chip>
    `);
    expect(component.disabled).toBeTruthy();
  });

  test("should handleClear", async () => {
    const component = await fixtureFactory();
    const spyKeyDown = jest.spyOn(component, "handleClear");

    component.handleClear("chipID");

    expect(spyKeyDown).toHaveBeenCalledTimes(1);
  });
  test("should handleClick when interaction comes from main Chip", async () => {
    const component = await fixtureFactory();
    const spyKeyDown = jest.spyOn(component, "handleClick");
    const chip = component.shadowRoot?.querySelector(".md-chip");
    chip!.dispatchEvent(new MouseEvent("click"));
    chip!.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.Enter
      })
    );

    chip!.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: Key.ArrowUp
      })
    );

    expect(spyKeyDown).toHaveBeenCalledTimes(2);
  });
  test("should be selectable", async () => {
    const component = await fixtureFactory();

    component.handleSelect();
    await elementUpdated(component);
    expect(component.selected).toBeTruthy();
    component.handleDeSelect();
    await elementUpdated(component);
    expect(component.selected).toBeFalsy();
  });

  test("should return add tooltip text", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="Test Line1" tooltipText="More Info about the Chip"></md-chip>
    `);
    const expectedResult = "More Info about the Chip";
    expect(component.shadowRoot?.querySelector("md-tooltip")?.getAttribute("message")).toEqual(expectedResult);
  });

  test("should truncate long text from value attribute and also add tooltip text", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="chip text content that is too long" tooltipText="More Info about the Chip"></md-chip>
    `);
    const expectedResult = "chip text content that is too long, More Info about the Chip";
    expect(component.shadowRoot?.querySelector("md-tooltip")?.getAttribute("message")).toEqual(expectedResult);
  });

  test("should truncate long text and if the tooltip is the same string as the value attribute then use only one of them.", async () => {
    const component: Chip.ELEMENT = await fixture(html`
      <md-chip value="chip text content that is too long" tooltipText="chip text content that is too long"></md-chip>
    `);
    const expectedResult = "chip text content that is too long";
    expect(component.shadowRoot?.querySelector("md-tooltip")?.getAttribute("message")).toEqual(expectedResult);
  });
});
