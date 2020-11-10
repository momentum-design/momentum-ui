import { fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import { querySelectorAllDeep, querySelectorDeep } from "query-selector-shadow-dom";
import "./Input";
import { Input } from "./Input";
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const lmBadgeTokens = require("./tokens/lm-input-tokens.js");
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const mdbadgeTokens = require("./tokens/md-input-tokens.js");

describe("Input Tokens", () => {
  test("Lumos Token Import should not be null", async () => {
    // const tokens = lmBadgeTokens;
    expect(lmBadgeTokens).not.toBeNull();
  });
  test("Lumos Token Import should not be null", async () => {
    // const tokens = mdbadgeTokens;
    expect(mdbadgeTokens).not.toBeNull();
  });
});

describe("Input Component", () => {
  afterEach(() => {
    fixtureCleanup();
    jest.restoreAllMocks();
  });

  test("should render input", async () => {
    const element = await fixture(`<md-input name="default" label="Default" containerSize="small-12"></md-input>`);
    expect(element).toBeDefined();
  });

  test("setting helpText property should render helpText component", async () => {
    const element = await fixture<Input>(
      `<md-input name="default" label="Default" containerSize="small-12" helpText="Help Text for Input"></md-input>`
    );
    expect(element.helpText).toMatch("Help Text for Input");

    const helpTextElement = element.shadowRoot!.querySelector("md-help-text");
    expect(helpTextElement).not.toBeNull();
    expect(helpTextElement!.message).toMatch("Help Text for Input");
  });

  test("should render nothing if helpText property is not setted", async () => {
    const element = await fixture<Input>(
      `<md-input name="default" label="Default" containerSize="small-12"></md-input>`
    );

    const helpTextElement = element.shadowRoot!.querySelector("md-help-text");
    expect(helpTextElement).toBeNull();
  });

  test("setting label property should render Label component", async () => {
    const element = await fixture<Input>(
      `<md-input name="default" label="Default" containerSize="small-12"></md-input>`
    );

    expect(element.label).toEqual("Default");

    const labelElement = element.shadowRoot!.querySelector("md-label");
    expect(labelElement).not.toBeNull();
    expect(labelElement!.label).toEqual("Default");
  });

  test("should handle label click event", async () => {
    const element = await fixture<Input>(
      `<md-input name="default" label="Default" containerSize="small-12" secondaryLabel="Secondary Label"></md-input>`
    );

    const spyLabelHandler = jest.spyOn(Input.prototype, "handleLabelClick");
    const labelElement = element.shadowRoot!.querySelector("md-label");
    const event = new MouseEvent("click");
    labelElement!.handleClick(event);

    expect(spyLabelHandler).toHaveBeenCalled();
    expect(element.shadowRoot!.activeElement).toEqual(element.input);
  });

  test("should shifts focus away from the input", async () => {
    const element = await fixture<Input>(
      `<md-input name="default" label="Default" containerSize="small-12" secondaryLabel="Secondary Label"></md-input>`
    );

    const spyOutsideHandler = jest.spyOn(Input.prototype, "handleOutsideClick");

    const label = element.shadowRoot!.querySelector("md-label");
    const labelElement = label!.shadowRoot!.querySelector("label");
    const event = new MouseEvent("click");
    labelElement!.dispatchEvent(event);

    expect(element.shadowRoot!.activeElement).toEqual(element.input);

    document.dispatchEvent(event);
    expect(spyOutsideHandler).toHaveBeenCalled();
    expect(element.shadowRoot!.activeElement).not.toEqual(element.input);
  });

  test("should handle keyDown event", async () => {
    const element = await fixture<Input>(`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyKeyDownHandler = jest.spyOn(Input.prototype, "handleKeyDown");

    const event = new KeyboardEvent("keydown");

    element.input.dispatchEvent(event);
    expect(spyKeyDownHandler).toHaveBeenCalled();

    setTimeout(() => element.handleKeyDown(event));

    const { detail } = await oneEvent(element, "input-keydown");
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle focus event", async () => {
    const element = await fixture<Input>(`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyFocusHandler = jest.spyOn(Input.prototype, "handleFocus");

    const event = new FocusEvent("focus");

    element.input.dispatchEvent(event);
    expect(spyFocusHandler).toHaveBeenCalled();

    setTimeout(() => element.handleFocus(event));

    const { detail } = await oneEvent(element, "input-focus");
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle mouseDown event", async () => {
    const element = await fixture<Input>(`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyMouseDownHandler = jest.spyOn(Input.prototype, "handleMouseDown");

    const event = new MouseEvent("mousedown");

    element.input.dispatchEvent(event);
    expect(spyMouseDownHandler).toHaveBeenCalled();

    setTimeout(() => element.handleMouseDown(event));

    const { detail } = await oneEvent(element, "input-mousedown");
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle input event", async () => {
    const element = await fixture<Input>(`<md-input label="Default" containerSize="small-12"></md-input>`);

    const mockInputHandler = jest.fn().mockImplementation((event: Event) => {
      event.stopPropagation();
      element.dispatchEvent(
        new CustomEvent("input-change", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event
          }
        })
      );
    });

    element.handleChange = mockInputHandler;

    const event = new InputEvent("input");

    element.input.dispatchEvent(event);
    expect(mockInputHandler).toHaveBeenCalled();

    setTimeout(() => element.handleChange(event));

    const { detail } = await oneEvent(element, "input-change");
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle blur event", async () => {
    const element = await fixture<Input>(`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyBlurHandler = jest.spyOn(Input.prototype, "handleBlur");

    const event = new FocusEvent("blur");

    element.input.dispatchEvent(event);
    expect(spyBlurHandler).toHaveBeenCalled();

    setTimeout(() => element.handleBlur(event));

    const { detail } = await oneEvent(element, "input-blur");
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);

    element.input.focus();

    document.dispatchEvent(new MouseEvent("click"));

    expect(element.shadowRoot!.activeElement).not.toEqual(element.input);
    expect(spyBlurHandler).toHaveBeenCalled();
  });

  // test("should handle clear event", async () => {
  //   const element = await fixture<Input>(
  //     ` <md-input label="Clear" value="text" containerSize="small-12" placeholder="Enter Text" clear></md-input>`
  //   );

  //   const spyButtonHandler = jest.spyOn(Input.prototype, "handleClear");
  //   const buttonElement = querySelectorDeep("button");
  //   const event = new MouseEvent("click");

  //   const value = jest.fn().mockReturnValue({ value: element.value });
  //   Object.defineProperty(event, "target", { value: { value } });

  //   const customEvent = new CustomEvent("button-click", {
  //     bubbles: true,
  //     composed: true,
  //     detail: {
  //       srcEvent: event
  //     }
  //   });

  //   buttonElement.dispatchEvent(event);

  //   expect(spyButtonHandler).toHaveBeenCalled();

  //   setTimeout(() => element.handleClear(customEvent));

  //   const { detail } = await oneEvent(element, "input-change");

  //   expect(detail).toBeDefined();
  //   expect(element.shadowRoot!.activeElement).toEqual(element.input);
  // });

  test("should render nothing if no label provided", async () => {
    const element = await fixture<Input>(
      ` <md-input value="text" containerSize="small-12" placeholder="Enter Text" clear></md-input>`
    );
    expect(element.shadowRoot!.querySelector("md-label")).toBeNull();
  });
  test("should render search icon if searchable", async () => {
    const element = await fixture<Input>(
      ` <md-input value="text" containerSize="small-12" placeholder="Enter Text" searchable></md-input>`
    );

    expect(element.shadowRoot!.querySelector("md-icon")!.name).toMatch(/^search?_\w+/);
  });
  test("should render icon if provided in slot", async () => {
    const element = await fixture<Input>(
      `<md-input label="Aux Content" htmlId="inputLeft" containerSize="small-12" placeholder="Enter Text" auxiliaryContentPosition="before">
        <md-icon name="email-active_16"></md-icon>
      </md-input>`
    );
    const iconElement = querySelectorDeep("md-icon");
    expect(iconElement).not.toBeNull();
  });

  test("should render input-section slot on right side", async () => {
    await fixture<Input>(`
      <md-input label="Right Icon" containerSize="small-12" placeholder="Enter Text">
        <md-icon slot="input-section-right" name="accessibility_16"></md-icon>
      </md-input>`);

    const iconElement = querySelectorDeep("md-icon");

    expect(iconElement).not.toBeNull();
    expect(iconElement.name).toEqual("accessibility_16");
  });

  test("should not render clear button if input disabled", async () => {
    const element = await fixture<Input>(
      ` <md-input label="Clear" value="text" containerSize="small-12" placeholder="Enter Text" clear disabled></md-input>`
    );

    const iconElement = querySelectorDeep("md-icon[name='clear-active_16']");
    expect(element.disabled).toBeTruthy();
    expect(iconElement).toBeNull();
  });

  test("should display success message", async () => {
    const messageArr: Input.Message = {
      message: "This is where the success message would be.",
      type: "success"
    };

    const messagesSpy = jest.spyOn(Input.prototype, "messages", "get");

    await fixture<Input>(
      html`
        <md-input
          label="Warning"
          htmlId="inputWarning"
          containerSize="small-12"
          .messageArr=${[messageArr]}
          value="Warning Text"
          placeholder="Enter Text"
        ></md-input>
      `
    );

    const inputMessageElement = querySelectorAllDeep("md-help-text");
    expect(messagesSpy).toHaveReturnedWith(["This is where the success message would be."]);
    expect(inputMessageElement.length).toBeGreaterThan(0);
  });

  test("should display error message", async () => {
    const messageArr: Input.Message = {
      message: "This is where the error message would be.",
      type: "error"
    };

    const messagesSpy = jest.spyOn(Input.prototype, "messages", "get");

    await fixture<Input>(
      html`
        <md-input
          label="Error"
          htmlId="inputError"
          containerSize="small-12"
          .messageArr=${[messageArr]}
          value="Error Text"
          placeholder="Enter Text"
        ></md-input>
      `
    );

    const inputMessageElement = querySelectorAllDeep("md-help-text");
    expect(messagesSpy).toHaveReturnedWith(["This is where the error message would be."]);
    expect(inputMessageElement.length).toBeGreaterThan(0);
  });

  test("should render multiline", async () => {
    const element = await fixture<Input>(`<md-input label="Multiline" containerSize="small-12" multiline></md-input>`);

    expect(element.multiline).toBeTruthy();
  });
});
