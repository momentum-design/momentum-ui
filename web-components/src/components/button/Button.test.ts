import "./Button";
import { Button } from "./Button";
import { Key } from "@/constants";
import { fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";

describe("Button Component", () => {
  afterEach(fixtureCleanup);

  test("should render one Button", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button></md-button>
      `
    );
    expect(element).not.toBeNull();
  });

  test("should render input if passed tag input", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button tag="input"><span slot="text">Test</span></md-button>
      `
    );
    const input = element.shadowRoot!.querySelectorAll("input");
    expect(input).toBeDefined;
  });

  test("should render link if passed tag a", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button tag="a"><span slot="text">Test</span></md-button>
      `
    );
    const link = element.shadowRoot!.querySelectorAll("a");
    expect(link).toBeDefined;
  });

  test("should render Loading component is pass loading props", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button loading></md-button>
      `
    );
    expect(element.loading).toBeTruthy;
    const spinner = element.shadowRoot!.querySelector(".md-button md-spinner");
    expect(spinner).toBeDefined;
    expect(spinner?.getAttribute("size")).toEqual("16");
  });

  test("should not render Loading component is loading props absent", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button></md-button>
      `
    );
    expect(element.shadowRoot!.querySelectorAll("md-loading").length).toEqual(0);
  });

  test("should remove all styles from component if hasRemoveStyle props exist", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button hasRemoveStyle color="blue" size="52"></md-button>
      `
    );
    expect(element.shadowRoot!.querySelectorAll(".md-button--blue").length).toEqual(0);
    expect(element.shadowRoot!.querySelectorAll(".md-button--none").length).toEqual(1);
    expect(element.shadowRoot!.querySelectorAll(".md-button--52").length).toEqual(0);
  });

  test("should apply correct class for color name", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button color="color-none"></md-button>
      `
    );
    expect(element.shadowRoot!.querySelectorAll(".md-button--color-none").length).toEqual(1);
  });

  test("should render wrapped button if label passed", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button label="buttonComponent" ariaLabel="buttonComponent"></md-button>
      `
    );
    expect(element.shadowRoot!.querySelectorAll(".md-button__container--small").length).toEqual(1);
    expect(element.shadowRoot!.querySelectorAll(".md-button__label").length).toEqual(1);
  });

  test("should render correct aria live", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button ariaLive="polite" active></md-button>
      `
    );
    const btn = element.shadowRoot!.querySelector(".md-button");
    expect(btn?.getAttribute("aria-live")).toMatch("polite");
  });

  test("should not set aria live when not passed for button tag", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button></md-button>
      `
    );
    const btn = element.shadowRoot!.querySelector(".md-button");
    expect(btn?.getAttribute("aria-live")).toBeNull();
  });


  test("should not set aria live when not passed for input tag", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button tag="input"><span slot="text">Test</span></md-button>
      `
    );
    const btn = element.shadowRoot!.querySelector(".md-button");
    expect(btn?.getAttribute("aria-live")).toBeNull();
  });


  test("should not set aria live when not passed for a tag", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button tag="a"><span slot="text">Test</span></md-button>
      `
    );
    const btn = element.shadowRoot!.querySelector(".md-button");
    expect(btn?.getAttribute("aria-live")).toBeNull();
  });

  test("should render wrapped button in large container if label and containerLarge passed", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button label="Button Component" containerLarge></md-button>
      `
    );
    expect(element.shadowRoot!.querySelectorAll(".md-button__container").length).toEqual(1);
  });

  test("should show active class when passed active prop", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button label="Button Component" active></md-button>
      `
    );
    const btn = element.shadowRoot!.querySelector(".md-button");
    expect(btn?.getAttribute("class")).toContain("md-button active md-button--32");
  });

  test("should show type if passed one", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button type="submit"></md-button>
      `
    );
    expect(element.getAttribute("type")).toEqual("submit");
  });

  test("should have tab-index attribute if defined", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button tab-index="1"></md-button>
      `
    );
    expect(element.getAttribute("tab-index")).toEqual("1");

    const button = element.shadowRoot!.querySelector("button");
    expect(button!.getAttribute("tabindex")).toContain("1");
    expect(element.disabled).toBeFalsy();
  });

  test("should have tab-index of -1 if disabled", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button tab-index="1" disabled></md-button>
      `
    );
    const button = element.shadowRoot!.querySelector("button");
    expect(button!.getAttribute("tabindex")).toContain("-1");
    expect(element.disabled).toBeTruthy();
  });

  test("should handle disabled state", async () => {
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button disabled></md-button>
      `
    );
    expect(element.disabled).toEqual(true);
  });

  test("should set width successfully", async () => {
    const customWidth = "260px";
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button width=${customWidth}></md-button>
      `
    );
    expect(element.width).toEqual(customWidth);

    const styles = element["getStyles"]();
    const hasStyle = styles?.values.includes(`width: ${customWidth};`);
    expect(hasStyle).toBeTruthy();
  });

  test("should set maxWidth successfully", async () => {
    const customMaxWidth = "100px";
    const element: Button.ELEMENT = await fixture(
      html`
        <md-button maxWidth=${customMaxWidth}></md-button>
      `
    );
    expect(element.maxWidth).toEqual(customMaxWidth);

    const styles = element["getStyles"]();
    const hasStyle = styles?.values.includes(`max-width: ${customMaxWidth};`);
    expect(hasStyle).toBeTruthy();
  });

  test("should handle click event", async () => {
    jest.spyOn(Button.ELEMENT.prototype, "blur");
    const element = await fixture<Button.ELEMENT>(`<md-button label="Button Component"></md-button>`);
    const evt = new MouseEvent("click");
    setTimeout(() => element.handleClick(evt));
    const { detail } = await oneEvent(element, "button-click");
    expect(detail).toBeDefined();
    expect(detail.srcEvent.type).toBe("click");
  });

  test("should handle keydown event", async () => {
    const element = await fixture<Button.ELEMENT>(
      html`
        <md-button label="Button Component"></md-button>
      `
    );
    const spyKeyDown = jest.spyOn(element, "handleKeyDown");
    const keyEvent = new KeyboardEvent("keydown", { code: Key.Enter });
    const keyEvent2 = new KeyboardEvent("keydown", { code: Key.Space });
    element.handleKeyDown(keyEvent);
    element.handleKeyDown(keyEvent2);
    expect(spyKeyDown).toHaveBeenCalledTimes(2);
    spyKeyDown.mockRestore();
  });

  test("should render nothing if correct tag is not provided", async () => {
    const buttonElement = await fixture(`<md-button label="Button Component" tag="p"></md-button>`);
    expect(buttonElement.shadowRoot!.querySelector("button")).toBeNull();
  });
});
