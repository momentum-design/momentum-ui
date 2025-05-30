import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./ToggleSwitch";
import { type ToggleSwitch } from "./ToggleSwitch";

describe("Toggle Switch Component", () => {
  let element: ToggleSwitch.ELEMENT;

  beforeEach(async () => {
    jest.useFakeTimers();
    element = await fixture<ToggleSwitch.ELEMENT>(html` <md-toggle-switch></md-toggle-switch> `);
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("shouldn't toggle if disabled property provided", async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(element.checked).toBeFalsy();
  });
  test("should apply correct tabindex", async () => {
    const input = element.shadowRoot!.querySelector(".md-toggle-switch__input") as HTMLInputElement;
    expect(input.tabIndex).toBe(0);
    element.disabled = true;
    await elementUpdated(element);
    expect(input.tabIndex).toBe(-1);
  });

  test("should add class on different sizes", async () => {
    const div = element.shadowRoot!.querySelector(".md-toggle-switch") as HTMLInputElement;
    element.small = true;
    await elementUpdated(element);

    expect(div.classList.contains("md-toggle-switch--small")).toBeTruthy();

    element.smaller = true;
    element.small = false;
    await elementUpdated(element);

    expect(div.classList.contains("md-toggle-switch--smaller")).toBeTruthy();
    expect(div.classList.contains("md-toggle-switch--small")).toBeFalsy();
  });

  test("should handle click event", async () => {
    const label = element.shadowRoot!.querySelector(".md-toggle-switch__label") as HTMLLabelElement;

    expect(element.checked).toBeFalsy();

    label.click();
    expect(element.checked).toBeTruthy();

    element.disabled = true;
    await elementUpdated(element);

    label.click();

    expect(element.checked).toBeTruthy();
  });

  test("should add class md-toggle-switch__label__container__left on align label left", async () => {
    const div = element.shadowRoot!.querySelector(".md-toggle-switch") as HTMLInputElement;
    element.alignLabel = "left";
    await elementUpdated(element);
    const span = div.querySelector("span") as HTMLSpanElement;

    expect(span.classList.contains("md-toggle-switch__label__container__left")).toBeTruthy();
  });

  test("should not add class md-toggle-switch__label__container__left on align label right", async () => {
    const div = element.shadowRoot!.querySelector(".md-toggle-switch") as HTMLInputElement;
    element.alignLabel = "right";
    await elementUpdated(element);
    const span = div.querySelector("span") as HTMLSpanElement;

    expect(span.classList.contains("md-toggle-switch__label__container__left")).toBeFalsy();
  });

  test("should have correct accessible description", async () => {
    expect(element.hasAttribute("description")).toBe(false);

    const input = element.shadowRoot!.querySelector(".md-toggle-switch__input")!;
    let accessibleDescriptionLabel = element.shadowRoot!.getElementById("md-toggle-switch__accessible-description");

    expect(input.hasAttribute("aria-describedby")).toBe(false);
    expect(accessibleDescriptionLabel).toBeNull();

    element.description = "this is a test description";
    await elementUpdated(element);
    accessibleDescriptionLabel = element.shadowRoot!.getElementById("md-toggle-switch__accessible-description");

    expect(input.getAttribute("aria-describedby")).toBe("md-toggle-switch__accessible-description");
    expect(accessibleDescriptionLabel).not.toBeNull();
    expect(accessibleDescriptionLabel!.getAttribute("id")).toBe("md-toggle-switch__accessible-description");
  });
});
