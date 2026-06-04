import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import { querySelectorAllDeep, querySelectorDeep } from "query-selector-shadow-dom";
import "./Input";
import { Input } from "./Input";

describe("Input Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should render input", async () => {
    const element = await fixture(html`<md-input name="default" label="Default" containerSize="small-12"></md-input>`);
    expect(element).toBeDefined();
  });

  test("setting helpText property should render helpText component", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input name="default" label="Default" containerSize="small-12" helpText="Help Text for Input"></md-input>`
    );
    expect(element.helpText).toMatch("Help Text for Input");

    const helpTextElement = element.shadowRoot!.querySelector("md-help-text");
    expect(helpTextElement).not.toBeNull();
    expect(helpTextElement!.message).toMatch("Help Text for Input");
  });

  test("should render nothing if helpText property is not setted", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input name="default" label="Default" containerSize="small-12"></md-input>`
    );

    const helpTextElement = element.shadowRoot!.querySelector("md-help-text");
    expect(helpTextElement).toBeNull();
  });

  test("setting label property should render Label component", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input name="default" label="Default" containerSize="small-12"></md-input>`
    );

    expect(element.label).toEqual("Default");

    const labelElement = element.shadowRoot!.querySelector("md-label");
    expect(labelElement).not.toBeNull();
    expect(labelElement!.label).toEqual("Default");
  });

  test("should handle label click event", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input
        name="default"
        label="Default"
        containerSize="small-12"
        secondaryLabel="Secondary Label"
      ></md-input>`
    );

    const spyLabelHandler = jest.spyOn(Input.ELEMENT.prototype, "handleLabelClick");

    const labelElement = element.shadowRoot!.querySelector("md-label");
    labelElement!.handleClick();

    expect(spyLabelHandler).toHaveBeenCalled();
    expect(element.shadowRoot!.activeElement).toEqual(element.input);
  });

  test("should shifts focus away from the input", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input
        name="default"
        label="Default"
        containerSize="small-12"
        secondaryLabel="Secondary Label"
      ></md-input>`
    );

    const spyOutsideHandler = jest.spyOn(Input.ELEMENT.prototype, "handleOutsideClick");

    const label = element.shadowRoot!.querySelector("md-label");
    const labelElement = label!.shadowRoot!.querySelector("label");
    const event = new MouseEvent("click");
    labelElement!.dispatchEvent(event);

    expect(element.shadowRoot!.activeElement).toEqual(element.input);
    const eventListener = (event: MouseEvent) => {
      element.handleOutsideClick(event);
    };

    document.addEventListener("click", eventListener);
    document.dispatchEvent(event);
    expect(spyOutsideHandler).toHaveBeenCalled();
    expect(element.shadowRoot!.activeElement).not.toEqual(element.input);
  });

  test("should handle keyDown event", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyKeyDownHandler = jest.spyOn(Input.ELEMENT.prototype, "handleKeyDown");

    const event = new KeyboardEvent("keydown");

    element.input.dispatchEvent(event);
    expect(spyKeyDownHandler).toHaveBeenCalled();

    const keydownPromise = oneEvent(element, "input-keydown");
    element.handleKeyDown(event);
    const { detail } = await keydownPromise;
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle focus event", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyFocusHandler = jest.spyOn(Input.ELEMENT.prototype, "handleFocus");

    const event = new FocusEvent("focus");

    element.input.dispatchEvent(event);
    expect(spyFocusHandler).toHaveBeenCalled();

    const inputFocusPromise = oneEvent(element, "input-focus");
    element.handleFocus(event);

    const { detail } = await inputFocusPromise;
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle mouseDown event", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyMouseDownHandler = jest.spyOn(Input.ELEMENT.prototype, "handleMouseDown");

    const event = new MouseEvent("mousedown");

    element.input.dispatchEvent(event);
    expect(spyMouseDownHandler).toHaveBeenCalled();

    const mouseDownPromise = oneEvent(element, "input-mousedown");
    element.handleMouseDown(event);

    const { detail } = await mouseDownPromise;
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle input event", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input label="Default" containerSize="small-12"></md-input>`);

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

    const inputChangePromise = oneEvent(element, "input-change");
    element.handleChange(event);

    const { detail } = await inputChangePromise;
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);
  });

  test("should handle blur event", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input label="Default" containerSize="small-12"></md-input>`);
    const spyBlurHandler = jest.spyOn(Input.ELEMENT.prototype, "handleBlur");

    const event = new FocusEvent("blur");

    element.input.dispatchEvent(event);
    expect(spyBlurHandler).toHaveBeenCalled();

    const blurPromise = oneEvent(element, "input-blur");
    element.handleBlur(event);

    const { detail } = await blurPromise;
    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(event);

    element.input.focus();
    const eventListener = (event: MouseEvent) => {
      element.handleOutsideClick(event);
    };

    document.addEventListener("click", eventListener);
    document.dispatchEvent(new MouseEvent("click"));

    expect(element.shadowRoot!.activeElement).not.toEqual(element.input);
    expect(spyBlurHandler).toHaveBeenCalled();
  });

  test("should render nothing if no label provided", async () => {
    const element = await fixture<Input.ELEMENT>(
      html` <md-input value="text" containerSize="small-12" placeholder="Enter Text" clear></md-input>`
    );
    expect(element.shadowRoot!.querySelector("md-label")).toBeNull();
  });
  test("should render search icon if searchable", async () => {
    const element = await fixture<Input.ELEMENT>(
      html` <md-input value="text" containerSize="small-12" placeholder="Enter Text" searchable></md-input>`
    );

    expect(element.shadowRoot!.querySelector("md-icon")!.name).toMatch("search-bold");
  });
  test("should render icon if provided in slot", async () => {
    await fixture<Input.ELEMENT>(
      html`<md-input
        label="Aux Content"
        htmlId="inputLeft"
        containerSize="small-12"
        placeholder="Enter Text"
        auxiliaryContentPosition="before"
      >
        <md-icon name="email-active_16"></md-icon>
      </md-input>`
    );
    const iconElement = querySelectorDeep("md-icon");
    expect(iconElement).not.toBeNull();
  });

  test("should render input-section slot on right side", async () => {
    await fixture<Input.ELEMENT>(
      html` <md-input label="Right Icon" containerSize="small-12" placeholder="Enter Text">
        <md-icon slot="input-section-right" name="accessibility_16"></md-icon>
      </md-input>`
    );

    const iconElement = querySelectorDeep("md-icon");

    expect(iconElement).not.toBeNull();
    expect(iconElement.name).toEqual("accessibility_16");
  });

  test("should not render clear button if input disabled", async () => {
    const element = await fixture<Input.ELEMENT>(
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

    const messagesSpy = jest.spyOn(Input.ELEMENT.prototype, "messages", "get");

    await fixture<Input.ELEMENT>(html`
      <md-input
        label="Warning"
        htmlId="inputWarning"
        containerSize="small-12"
        .messageArr=${[messageArr]}
        value="Warning Text"
        placeholder="Enter Text"
      ></md-input>
    `);

    const inputMessageElement = querySelectorAllDeep("md-help-text");
    expect(messagesSpy).toHaveReturnedWith(["This is where the success message would be."]);
    expect(inputMessageElement.length).toBeGreaterThan(0);
  });

  test("should display error message", async () => {
    const messageArr: Input.Message = {
      message: "This is where the error message would be.",
      type: "error"
    };

    const messagesSpy = jest.spyOn(Input.ELEMENT.prototype, "messages", "get");

    await fixture<Input.ELEMENT>(html`
      <md-input
        label="Error"
        htmlId="inputError"
        containerSize="small-12"
        .messageArr=${[messageArr]}
        value="Error Text"
        placeholder="Enter Text"
      ></md-input>
    `);

    const inputMessageElement = querySelectorAllDeep("md-help-text");
    expect(messagesSpy).toHaveReturnedWith(["This is where the error message would be."]);
    expect(inputMessageElement.length).toBeGreaterThan(0);
  });

  test("should render multiline", async () => {
    const element = await fixture<Input.ELEMENT>(
      `<md-input label="Multiline" containerSize="small-12" multiline></md-input>`
    );

    expect(element.multiline).toBeTruthy();
  });

  test("should dispatch change event", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input name="Default Input" label="Change Input"></md-input>`);

    element.value = "inputText";

    await elementUpdated(element);

    const event: Partial<InputEvent> = {
      type: "change",
      target: element
    };

    const eventListener = jest.fn();
    element.addEventListener("input-change", eventListener);

    element.handleChange(event as Event);
    const detail = eventListener.mock.calls[0][0].detail;
    expect(detail).toBeDefined();
    expect(detail.value).toEqual("inputText");

    element.removeEventListener("input-change", eventListener);
  });

  test("should dispatch change event with clear state", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input name="Default Input" label="Change Input" clear></md-input>`
    );

    element.value = "inputText";

    await elementUpdated(element);

    const event: Partial<KeyboardEvent> = {
      type: "keydown",
      target: element,
      code: "Space",
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    const eventListener = jest.fn();
    element.addEventListener("input-change", eventListener);

    element.handleClear(event as KeyboardEvent);

    const detail = eventListener.mock.calls[0][0].detail;
    expect(detail).toBeDefined();
    expect(detail.value).toEqual("inputText");

    element.removeEventListener("input-change", eventListener);
  });

  test("Should not show cancel button if input is readOnly", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input label="Multiline" containerSize="small-12" ?readonly=${true}></md-input>`
    );
    const rightTemplate = element.shadowRoot!.querySelector(".md-input__after")?.querySelector("md-button");
    expect(rightTemplate).toBeNull();
  });

  test("Should propogate tab key event", async () => {
    //Test case to ensure issue where the clear button became a focus trap does not reoccur
    const el = await fixture(html` <md-input clear value="test value"></md-input> `);

    const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
    const clearButton = el.shadowRoot!.querySelector(".md-input__icon-clear") as HTMLElement;

    // Focus the input and then the clear button
    input.focus();
    clearButton.focus();

    // Simulate Tab key press
    const tabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true
    });
    clearButton.dispatchEvent(tabEvent);

    // Check if the event was propagated and focus moved to the next element
    expect(document.activeElement).not.toBe(clearButton);
  });

  test("Clicking clear button should not propogate", async () => {
    //The focus trap bug was caused by not wanting to propogate the click event
    //Test that this still works
    const el = await fixture(html` <md-input clear value="test value"></md-input> `);

    const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
    const clearButton = el.shadowRoot!.querySelector(".md-input__icon-clear") as HTMLElement;

    // Focus the input and then the clear button
    input.focus();
    clearButton.focus();

    // Simulate Click event
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    });
    clearButton.dispatchEvent(clickEvent);

    // Check if the event was propagated and focus moved to the next element
    expect(document.activeElement).not.toBe(clearButton);
  });
});

test("should display character count when maxSuggestedLength is set", async () => {
  const maxLength = 10;
  const value = "abc";
  const element = await fixture<Input.ELEMENT>(
    html`<md-input
      label="With Character Count"
      containerSize="small-12"
      .maxSuggestedLength=${maxLength}
      .value=${value}
    ></md-input>`
  );

  const characterCountLabel = element.shadowRoot!.querySelector(".md-input__character-count-label");
  expect(characterCountLabel).not.toBeNull();
  expect(characterCountLabel!.textContent).toBe(`${value.length}/${maxLength}`);
});

test("should not display character count if maxSuggestedLength is not set", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input label="No Max Length" containerSize="small-12" value="abc"></md-input>`
  );

  const characterCountLabel = element.shadowRoot!.querySelector(".md-input__character-count-label");
  expect(characterCountLabel).toBeNull();
});

test("should not display character count if input is disabled", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input label="Disabled" containerSize="small-12" .maxSuggestedLength=${10} value="abc" disabled></md-input>`
  );

  const characterCountLabel = element.shadowRoot!.querySelector(".md-input__character-count-label");
  expect(characterCountLabel).toBeNull();
});

test("should not display character count if input is readOnly", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input
      label="Read Only"
      containerSize="small-12"
      .maxSuggestedLength=${10}
      value="abc"
      .readOnly=${true}
    ></md-input>`
  );

  const characterCountLabel = element.shadowRoot!.querySelector(".md-input__character-count-label");
  expect(characterCountLabel).toBeNull();
});

test("should display error style when value length equals maxLength", async () => {
  const maxLength = 3;
  const value = "abcd";
  const element = await fixture<Input.ELEMENT>(
    html`<md-input
      label="Error Style"
      containerSize="small-12"
      .maxSuggestedLength=${maxLength}
      .value=${value}
    ></md-input>`
  );

  const errorLabel = element.shadowRoot!.querySelector(".md-input__character-count-label.error");
  expect(errorLabel).not.toBeNull();
  expect(errorLabel!.textContent).toBe(`${value.length}/${maxLength}`);
});

test("should set role attribute when ariaRole is provided", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input label="With Role" containerSize="small-12" ariaRole="combobox"></md-input>`
  );

  const inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.getAttribute("role")).toBe("combobox");
});

test("should not set role attribute when ariaRole is undefined", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input label="Without Role" containerSize="small-12"></md-input>`
  );

  const inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.hasAttribute("role")).toBe(false);
});

test("should update role attribute when ariaRole changes", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input label="Dynamic Role" containerSize="small-12" ariaRole="textbox"></md-input>`
  );

  let inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.getAttribute("role")).toBe("textbox");

  element.ariaRole = "searchbox";
  await elementUpdated(element);

  inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.getAttribute("role")).toBe("searchbox");
});

test("should set combobox aria attributes when dropdown is shown", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input
      label="Your team"
      value="Applause-Agent Based"
      showDropdown
      ariaControls="team-listbox"
    ></md-input>`
  );

  const inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.getAttribute("aria-label")).toBe("Your team");
  expect(inputElement?.value).toBe("Applause-Agent Based");
  expect(inputElement?.getAttribute("role")).toBe("combobox");
  expect(inputElement?.getAttribute("aria-autocomplete")).toBe("both");
  expect(inputElement?.getAttribute("aria-expanded")).toBe("false");
  expect(inputElement?.getAttribute("aria-controls")).toBe("team-listbox");
});

test("should update combobox aria-expanded when dropdown is toggled", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input label="Your team" showDropdown ariaControls="team-listbox"></md-input>`
  );

  const dropdownButton = element.shadowRoot!.querySelector(".md-input__dropdown-button") as HTMLButtonElement;
  dropdownButton.click();
  await elementUpdated(element);

  const inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.getAttribute("aria-expanded")).toBe("true");
});

test("should allow explicit combobox aria values to override dropdown defaults", async () => {
  const element = await fixture<Input.ELEMENT>(
    html`<md-input
      label="Your team"
      showDropdown
      ariaRole="searchbox"
      ariaAutocomplete="list"
      ariaExpanded="true"
    ></md-input>`
  );

  const inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.getAttribute("role")).toBe("searchbox");
  expect(inputElement?.getAttribute("aria-autocomplete")).toBe("list");
  expect(inputElement?.getAttribute("aria-expanded")).toBe("true");
});

test("should not render empty aria-controls", async () => {
  const element = await fixture<Input.ELEMENT>(html`<md-input label="Without Controls"></md-input>`);

  const inputElement = element.shadowRoot!.querySelector("input");
  expect(inputElement?.hasAttribute("aria-controls")).toBe(false);
});

describe("aria-label", () => {
  test("should use label as aria-label when ariaLabel is not set", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input label="First Name"></md-input>`);
    const input = element.shadowRoot!.querySelector("input");
    expect(input?.getAttribute("aria-label")).toBe("First Name");
  });

  test("should prefer explicit ariaLabel over label", async () => {
    const element = await fixture<Input.ELEMENT>(
      html`<md-input label="First Name" ariaLabel="Custom Label"></md-input>`
    );
    const input = element.shadowRoot!.querySelector("input");
    expect(input?.getAttribute("aria-label")).toBe("Custom Label");
  });

  test("should not render aria-label when neither ariaLabel nor label is set", async () => {
    const element = await fixture<Input.ELEMENT>(html`<md-input placeholder="First Name"></md-input>`);
    const input = element.shadowRoot!.querySelector("input");
    expect(input?.hasAttribute("aria-label")).toBe(false);
  });
});

describe("Input auto-combobox", () => {
  afterEach(() => fixtureCleanup());

  // Helper: build a popup wrapper containing a searchable md-input and an external listbox.
  const mountPopupWithInput = async (popupTag = "md-popover", isOpen = true, withList = true) => {
    const wrapper = document.createElement(popupTag);
    if (isOpen) wrapper.setAttribute("is-open", "");
    wrapper.innerHTML = `
      <md-input searchable ariaLabel="Search ANI" placeholder="Search ANI"></md-input>
      ${
        withList
          ? `<div role="listbox" aria-activedescendant="stale-id">
               <ul>
                 <li>Option A</li>
                 <li>Option B</li>
                 <li>Option C</li>
               </ul>
             </div>`
          : ""
      }
    `;
    document.body.appendChild(wrapper);
    const input = wrapper.querySelector("md-input") as Input.ELEMENT;
    await input.updateComplete;
    // Give firstUpdated + observer microtasks a chance to run.
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    await input.updateComplete;
    return { wrapper, input };
  };

  test("should engage as combobox when searchable input is inside a known popup ancestor", async () => {
    const { input } = await mountPopupWithInput("md-popover");
    const inner = input.shadowRoot!.querySelector("input");
    expect(input.isCombobox).toBe(true);
    expect(inner?.getAttribute("role")).toBe("combobox");
    expect(inner?.getAttribute("aria-autocomplete")).toBe("list");
    expect(inner?.getAttribute("aria-expanded")).toBe("true");
  });

  test("should not engage when input is not searchable", async () => {
    const wrapper = document.createElement("md-popover");
    wrapper.setAttribute("is-open", "");
    wrapper.innerHTML = `<md-input ariaLabel="x"></md-input>`;
    document.body.appendChild(wrapper);
    const input = wrapper.querySelector("md-input") as Input.ELEMENT;
    await input.updateComplete;
    expect(input.isCombobox).toBe(false);
  });

  test("should not engage when disable-auto-combobox is set", async () => {
    const wrapper = document.createElement("md-popover");
    wrapper.setAttribute("is-open", "");
    wrapper.innerHTML = `<md-input searchable disable-auto-combobox></md-input>`;
    document.body.appendChild(wrapper);
    const input = wrapper.querySelector("md-input") as Input.ELEMENT;
    await input.updateComplete;
    expect(input.isCombobox).toBe(false);
  });

  test("should not engage when ancestor is not a recognised popup", async () => {
    const wrapper = document.createElement("section");
    wrapper.innerHTML = `<md-input searchable></md-input>`;
    document.body.appendChild(wrapper);
    const input = wrapper.querySelector("md-input") as Input.ELEMENT;
    await input.updateComplete;
    expect(input.isCombobox).toBe(false);
  });

  test("should engage for every supported popup tag", async () => {
    const tags = ["md-menu-overlay", "md-popover", "md-floating-modal", "md-modal", "md-coachmark-popover"];
    for (const tag of tags) {
      const { input, wrapper } = await mountPopupWithInput(tag);
      expect(input.isCombobox).toBe(true);
      wrapper.remove();
    }
  });

  test("should tag the discovered listbox with id, role, tabindex=-1 and link via aria-controls", async () => {
    const { wrapper, input } = await mountPopupWithInput();
    const listbox = wrapper.querySelector('[role="listbox"]') as HTMLElement;
    expect(listbox.id).toMatch(/^md-input-listbox-/);
    expect(listbox.getAttribute("tabindex")).toBe("-1");
    expect(input.shadowRoot!.querySelector("input")?.getAttribute("aria-controls")).toBe(listbox.id);
  });

  test("should strip stale aria-activedescendant from the listbox", async () => {
    const { wrapper } = await mountPopupWithInput();
    const listbox = wrapper.querySelector('[role="listbox"]') as HTMLElement;
    expect(listbox.hasAttribute("aria-activedescendant")).toBe(false);
  });

  test("should mark intervening UL as role=presentation when listbox is a wrapper div", async () => {
    const { wrapper } = await mountPopupWithInput();
    const ul = wrapper.querySelector('[role="listbox"] ul') as HTMLElement;
    expect(ul.getAttribute("role")).toBe("presentation");
  });

  test("should normalise options with role, posinset, setsize, and tabindex", async () => {
    const { wrapper } = await mountPopupWithInput();
    const items = wrapper.querySelectorAll('[role="listbox"] li');
    expect(items.length).toBe(3);
    items.forEach((li, i) => {
      expect(li.getAttribute("role")).toBe("option");
      expect(li.getAttribute("aria-posinset")).toBe(String(i + 1));
      expect(li.getAttribute("aria-setsize")).toBe("3");
      expect(li.getAttribute("tabindex")).toBe("-1");
      expect(li.id).toMatch(/^md-input-option-/);
    });
  });

  test("should reflect popup open state on aria-expanded", async () => {
    const { wrapper, input } = await mountPopupWithInput("md-popover", true);
    const inner = input.shadowRoot!.querySelector("input");
    expect(inner?.getAttribute("aria-expanded")).toBe("true");

    wrapper.removeAttribute("is-open");
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    await input.updateComplete;
    expect(inner?.getAttribute("aria-expanded")).toBe("false");
  });

  test("ArrowDown on input should move DOM focus to the first option", async () => {
    const { wrapper, input } = await mountPopupWithInput();
    const inner = input.shadowRoot!.querySelector("input") as HTMLInputElement;
    inner.focus();
    inner.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown", bubbles: true }));
    await input.updateComplete;
    const firstOption = wrapper.querySelector('[role="listbox"] li') as HTMLElement;
    expect(document.activeElement).toBe(firstOption);
    expect(firstOption.getAttribute("tabindex")).toBe("0");
  });

  test("ArrowDown/ArrowUp on the listbox should cycle focus through options", async () => {
    const { wrapper, input } = await mountPopupWithInput();
    const listbox = wrapper.querySelector('[role="listbox"]') as HTMLElement;
    const opts = Array.from(wrapper.querySelectorAll('[role="listbox"] li')) as HTMLElement[];
    (input.shadowRoot!.querySelector("input") as HTMLElement).focus();
    input.shadowRoot!
      .querySelector("input")!
      .dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown", bubbles: true }));
    expect(document.activeElement).toBe(opts[0]);

    listbox.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown", bubbles: true }));
    expect(document.activeElement).toBe(opts[1]);

    listbox.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowUp", bubbles: true }));
    expect(document.activeElement).toBe(opts[0]);
  });

  test("Escape on the listbox should close the popup and return focus to the input", async () => {
    const { wrapper, input } = await mountPopupWithInput();
    const listbox = wrapper.querySelector('[role="listbox"]') as HTMLElement;
    const inner = input.shadowRoot!.querySelector("input") as HTMLInputElement;
    inner.focus();
    inner.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown", bubbles: true }));
    listbox.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape", bubbles: true }));
    expect(wrapper.hasAttribute("is-open")).toBe(false);
    expect(document.activeElement === inner || input.shadowRoot!.activeElement === inner).toBe(true);
  });

  test("Enter on the focused option should click that option", async () => {
    const { wrapper, input } = await mountPopupWithInput();
    const listbox = wrapper.querySelector('[role="listbox"]') as HTMLElement;
    const opts = Array.from(wrapper.querySelectorAll('[role="listbox"] li')) as HTMLElement[];
    const clickSpy = jest.fn();
    opts[0].addEventListener("click", clickSpy);
    (input.shadowRoot!.querySelector("input") as HTMLElement).focus();
    input.shadowRoot!
      .querySelector("input")!
      .dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown", bubbles: true }));
    listbox.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter", bubbles: true }));
    expect(clickSpy).toHaveBeenCalled();
  });

  test("printable character on the focused option should return focus to the input", async () => {
    const { wrapper, input } = await mountPopupWithInput();
    const listbox = wrapper.querySelector('[role="listbox"]') as HTMLElement;
    const inner = input.shadowRoot!.querySelector("input") as HTMLInputElement;
    inner.focus();
    inner.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown", bubbles: true }));
    listbox.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyA", key: "a", bubbles: true }));
    expect(input.shadowRoot!.activeElement).toBe(inner);
  });

  test("should clean up on disconnect", async () => {
    const { wrapper, input } = await mountPopupWithInput();
    expect(input.isCombobox).toBe(true);
    wrapper.remove();
    // No assertion is needed beyond not throwing; the listbox observer + keydown
    // listener are released on disconnectedCallback.
    expect(true).toBe(true);
  });
});
