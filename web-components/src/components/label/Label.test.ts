import { fixture, fixtureCleanup, oneEvent } from "@open-wc/testing-helpers";
import "./Label";
import { type Label } from "./Label";

describe("Label", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });
  test("should render one Label", async () => {
    const element = await fixture(`<md-label label="Test Label Text"></md-label>`);
    expect(element).not.toBeNull();
  });
  test("should dispatch click", async () => {
    const element = await fixture<Label.ELEMENT>(`<md-label label="Test Label Text" htmlFor="firstValue"></md-label>`);
    const labelClickPromise = oneEvent(element, "label-click");
    element.handleClick();
    const { detail } = await labelClickPromise;
    expect(detail).toBeDefined();
    expect(detail.htmlFor).toBe("firstValue");
  });
  test("should render slot if label not initialize in markup", async () => {
    const element = await fixture(`<md-label></md-label>`);
    expect(element.shadowRoot!.querySelectorAll("slot").length).toBe(1);
  });
  test("should render secondary Label", async () => {
    const element = await fixture(`<md-label label="Label" secondaryLabel="Secondary Label"></md-label>`);
    expect(element.getAttribute("secondaryLabel")).not.toBeNull();
  });
});
