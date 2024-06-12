import "./Checkbox";
import { Checkbox } from "./Checkbox";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, oneEvent } from "@open-wc/testing-helpers";

describe("Checkbox component", () => {
  let element: Checkbox.ELEMENT;
  afterEach(fixtureCleanup);
  beforeEach(async () => {
    element = await fixture<Checkbox.ELEMENT>(`<md-checkbox label="text"></md-checkbox>`);
  });
  test("should render checkbox", async () => {
    expect(element).not.toBeNull();
  });

  test("should set correct checked property", async () => {
    element.checked = true;
    await elementUpdated(element);

    expect(element.checked).toBeTruthy();
    expect(element.hasAttribute("checked")).toBeTruthy();
    expect(element.getAttribute("aria-checked")).toEqual("true");

    element.indeterminate = true;
    await elementUpdated(element);

    expect(element.checked).toBeFalsy();
    expect(element.hasAttribute("checked")).toBeFalsy();
    expect(element.indeterminate).toBeTruthy();
    expect(element.hasAttribute("indeterminate")).toBeTruthy();
    expect(element.getAttribute("aria-checked")).toEqual("mixed");
  });

  test("should set disabled property", async () => {
    element.disabled = true;
    await elementUpdated(element);

    expect(element.disabled).toBeTruthy();
    expect(element.getAttribute("aria-disabled")).toEqual("true");
    expect(element.tabIndex).toEqual(-1);

    element.disabled = false;
    await elementUpdated(element);

    expect(element.getAttribute("aria-disabled")).toEqual("false");
    expect(element.tabIndex).toEqual(0);
  });

  test("should handle click event", async () => {
    const event = new MouseEvent("click");
    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(element.checked).toBeTruthy();

    element.disabled = true;
    element.checked = false;
    await elementUpdated(element);

    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(element.checked).toBeFalsy();

    element.disabled = false;
    element.checked = false;
    element.indeterminate = true;
    await elementUpdated(element);

    element.dispatchEvent(event);
    await elementUpdated(element);

    expect(element.checked).toBeFalsy();
    expect(element.input.indeterminate).toBeTruthy();
  });

  test("should handle key event", async () => {
    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    element.dispatchEvent(createEvent("KeyA"));
    await elementUpdated(element);

    expect(element.checked).toBeFalsy();

    element.dispatchEvent(createEvent(Key.Space));
    await elementUpdated(element);

    expect(element.checked).toBeTruthy();

    element.disabled = true;
    element.checked = false;
    await elementUpdated(element);

    element.dispatchEvent(createEvent(Key.Space));
    await elementUpdated(element);

    expect(element.checked).toBeFalsy();
  });

  test("should dispatch change event if change checked state using mouse click", async () => {
    const event = new MouseEvent("click");
    element.dispatchEvent(event);

    setTimeout(() => element.handleChange(event));
    const { detail } = await oneEvent(element, "checkbox-change");
    expect(detail).toBeDefined();
    expect(detail.sourceEvent).toEqual(event);
  });

  test("should dispatch change event if change checked state using keyboard", async () => {
    const event = new KeyboardEvent("mousedown", {
      code: Key.Space
    });
    element.dispatchEvent(event);

    setTimeout(() => element.handleChange(event));
    const { detail } = await oneEvent(element, "checkbox-change");
    expect(detail).toBeDefined();
    expect(detail.sourceEvent).toEqual(event);
  });
});
