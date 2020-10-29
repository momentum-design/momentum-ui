import "@/components/toggle-switch/ToggleSwitch";
import { ToggleSwitch } from "@/components/toggle-switch/ToggleSwitch";
import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lmToggleTokens = require("./tokens/lm-toggle-tokens.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mdToggleTokens = require("./tokens/md-toggle-tokens.js");

describe("Toggle Tokens", () => {
  test("Lumos Token Import should not be null", async () => {
    expect(lmToggleTokens).not.toBeNull();
  });
  test("Lumos Token Import should not be null", async () => {
    expect(mdToggleTokens).not.toBeNull();
  });
});

describe("Toggle Switch Component", () => {
  let element: ToggleSwitch;

  beforeEach(async () => {
    element = await fixture<ToggleSwitch>(
      html`
        <md-toggle-switch></md-toggle-switch>
      `
    );
  });
  afterEach(fixtureCleanup);
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
});
