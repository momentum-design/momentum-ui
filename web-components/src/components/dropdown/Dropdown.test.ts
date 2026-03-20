/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { dropdownObjectLongOptions, dropdownStringOptions } from "@/[sandbox]/examples/dropdown";
import "@/components/dropdown/Dropdown";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import { Dropdown } from "./Dropdown"; // Keep type import as a relative path

describe("Dropdown Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  const createKeyboardEvent = (code: string) =>
    new KeyboardEvent("keydown", {
      code
    });

  const createClickEvent = () => new MouseEvent("click");

  const toggleExpandCollapseDropdown = async (dropdown: Dropdown.ELEMENT) => {
    const label = dropdown.shadowRoot!.querySelector("label");
    const event = createClickEvent();
    label!.dispatchEvent(event);

    await dropdown.updateComplete;
  };

  describe("Events", () => {
    let dropdown: Dropdown.ELEMENT;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}"></md-dropdown>
      `);
    });

    it("should open/close dropdown if label", async () => {
      await toggleExpandCollapseDropdown(dropdown);

      expect(dropdown["expanded"]).toBeTruthy();

      await toggleExpandCollapseDropdown(dropdown);

      expect(dropdown["expanded"]).toBeFalsy();
    });

    it("should set correct handle focusin", async () => {
      const eventIn = new Event("focusin");

      const focusInPromise = oneEvent(dropdown, "dropdown-focus-in");
      dropdown["handleFocusIn"](eventIn);
      const focusIn = await focusInPromise;
      expect(focusIn).toBeDefined();
    });

    it("should set correct handle focusout", async () => {
      dropdown.dispatchEvent(new FocusEvent("focusout"));
      dropdown.blur();

      expect(document.activeElement).not.toEqual(dropdown);
    });

    it("should dispatch events", async () => {
      const eventIn = new Event("focusin");
      const eventOut = new Event("focusout");

      const foucsInPromise = oneEvent(dropdown, "dropdown-focus-in");
      dropdown["handleFocusIn"](eventIn);

      const focusIn = await foucsInPromise;
      expect(focusIn).toBeDefined();

      const focusOutPromise = oneEvent(dropdown, "dropdown-focus-out");
      dropdown["handleFocusOut"](eventOut);

      await focusOutPromise;
      expect(focusOutPromise).toBeDefined();

      dropdown.dispatchEvent(new FocusEvent("focusin"));
      dropdown.focus();

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      jest.advanceTimersByTime(1000);

      const dropdownSelectedPromise = oneEvent(dropdown, "dropdown-selected");
      dropdown.dispatchEvent(createKeyboardEvent(Key.Enter));

      const { detail: detailOne } = await dropdownSelectedPromise;
      expect(detailOne).toBeDefined();
      expect(detailOne).toEqual(
        expect.objectContaining({
          option: "one"
        })
      );
    });

    it("should handle keydown events", async () => {
      await toggleExpandCollapseDropdown(dropdown);

      expect(dropdown["expanded"]).toBeTruthy();

      expect(dropdown["focusedIndex"]).toBe(0);

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));

      expect(dropdown["focusedIndex"]).toBe(2);

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowUp));

      expect(dropdown["focusedIndex"]).toBe(1);

      dropdown.dispatchEvent(createKeyboardEvent(Key.Home));

      expect(dropdown["focusedIndex"]).toBe(0);

      dropdown.dispatchEvent(createKeyboardEvent(Key.End));

      expect(dropdown["focusedIndex"]).toBe(dropdownStringOptions.length - 1);

      const dropdownSelectedPromise = oneEvent(dropdown, "dropdown-selected");
      dropdown.dispatchEvent(createKeyboardEvent(Key.Enter));

      const { detail } = await dropdownSelectedPromise;

      expect(dropdown["expanded"]).toBeFalsy();

      await toggleExpandCollapseDropdown(dropdown);
      dropdown.dispatchEvent(createKeyboardEvent(Key.Escape));
      expect(dropdown["expanded"]).toBeFalsy();

      expect(detail).toEqual(
        expect.objectContaining({
          option: dropdownStringOptions[dropdownStringOptions.length - 1]
        })
      );

      await toggleExpandCollapseDropdown(dropdown);
      expect(dropdown["expanded"]).toBeTruthy();

      dropdown.dispatchEvent(createKeyboardEvent(Key.Tab));
      expect(dropdown["expanded"]).toBeFalsy();
    });

    it("should call collapse on outside click", async () => {
      const originalComposedPath = Event.prototype.composedPath;
      const collapseFunc = jest.spyOn(dropdown, "collapse");

      await toggleExpandCollapseDropdown(dropdown);

      Event.prototype.composedPath = originalComposedPath;
      const outsideDivPromise = fixture<HTMLElement>(html` <div></div> `);
      jest.runAllTimers();
      const outsideDiv = await outsideDivPromise;
      const composedPathMock1 = jest.fn(() => [outsideDiv]);
      Event.prototype.composedPath = composedPathMock1;
      dropdown.onOutsideClick(new MouseEvent("click"));
      expect(collapseFunc).toHaveBeenCalled();
      Event.prototype.composedPath = originalComposedPath;
    });

    it("should allow unselected", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" allow-unselected></md-dropdown>
      `);

      await toggleExpandCollapseDropdown(dropdown);
      expect(dropdown["expanded"]).toBeTruthy();

      expect(dropdown["selectedKey"]).toBe("");

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));

      //
      {
        const dropdownSelectedPromise = oneEvent(dropdown, "dropdown-selected");
        dropdown.dispatchEvent(createKeyboardEvent(Key.Enter));

        const { detail } = await dropdownSelectedPromise;
        expect(dropdown["expanded"]).toBeFalsy();

        expect(detail).toEqual(
          expect.objectContaining({
            option: dropdownStringOptions[0]
          })
        );
      }

      await toggleExpandCollapseDropdown(dropdown);
      expect(dropdown["expanded"]).toBeTruthy();

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowUp));

      //
      {
        const dropdownSelectedPromise = oneEvent(dropdown, "dropdown-selected");
        dropdown.dispatchEvent(createKeyboardEvent(Key.Enter));

        const { detail } = await dropdownSelectedPromise;
        expect(dropdown["expanded"]).toBeFalsy();

        expect(detail).toEqual(
          expect.objectContaining({
            option: ""
          })
        );
      }
    });
  });

  describe("Behavior", () => {
    let dropdown: Dropdown.ELEMENT;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
      `);
    });

    it("should trim non-trimmed", async () => {
      const duplicatedDropdownStringOptions = [
        "one",
        "two",
        "three",
        "   non-trimmed-with-spaces ",
        " non-trimmed-with-spaces   "
      ];

      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {
        /* no-op */
      });

      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${duplicatedDropdownStringOptions}" title="Test"></md-dropdown>
      `);

      await elementUpdated(dropdown);

      expect(dropdown["dropdownRenderOptions"].length).toBe(4);

      consoleSpy.mockRestore();
    });

    it("should set correct aria attributes", async () => {
      dropdown["expanded"] = true;

      await elementUpdated(dropdown);

      expect(dropdown.label.getAttribute("aria-expanded")).toEqual("true");
      expect(dropdown.label.getAttribute("aria-label")).toEqual("Test");
    });

    it("should apply disabled attribute", async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" disabled></md-dropdown>
      `);
      expect(dropdown.disabled).toBeTruthy();
    });

    it("should render correct icon name", () => {
      expect(dropdown.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("arrow-down-bold");
    });

    it("should change selectedKey on update of default option", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownObjectLongOptions}"
          .defaultOption="${dropdownObjectLongOptions[10]}"
          option-id="id"
          option-value="country"
        ></md-dropdown>
      `);
      expect(dropdown["selectedKey"]).toEqual(dropdownObjectLongOptions[10].id);

      dropdown["defaultOption"] = dropdownObjectLongOptions[1];
      await elementUpdated(dropdown);

      expect(dropdown["selectedKey"]).toEqual(dropdownObjectLongOptions[1].id);
    });

    test("should render correct icon name", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(
        html`<md-dropdown .options="${dropdownStringOptions}" title="Test" searchable newMomentum></md-dropdown>`
      );

      expect(dropdown.shadowRoot!.querySelector(".md-dropdown-button md-icon")!.getAttribute("name")).toEqual(
        "arrow-down-bold"
      );
    });
  });

  describe("List", () => {
    let dropdown: Dropdown.ELEMENT;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
      `);
    });

    it("should set correct aria label attribute", async () => {
      expect(dropdown.optionsList!.getAttribute("aria-label")).toEqual("Test");
    });

    it("should set correct css class", async () => {
      expect(dropdown["expanded"]).toBeFalsy();
      expect(dropdown.classList.contains("md-dropdown__expanded")).toBeFalsy();

      dropdown["expanded"] = true;

      await elementUpdated(dropdown);

      expect(dropdown["expanded"]).toBeTruthy();

      expect(
        dropdown.shadowRoot!.querySelector(".md-dropdown")!.classList.contains("md-dropdown__expanded")
      ).toBeTruthy();
    });
  });

  describe("Option", () => {
    let dropdown: Dropdown.ELEMENT;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownObjectLongOptions}"
          .defaultOption="${dropdownObjectLongOptions[10]}"
          option-id="id"
          option-value="country"
        ></md-dropdown>
      `);
    });

    it("should set selectedKey on default option", async () => {
      await toggleExpandCollapseDropdown(dropdown);

      expect(dropdown["selectedKey"]).toEqual(dropdownObjectLongOptions[10].id);
      expect(dropdown.optionId).toEqual("id");
      expect(dropdown.optionValue).toEqual("country");
    });
  });

  describe("Input", () => {
    let dropdown: Dropdown.ELEMENT;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          Placeholder="Jason"
          searchable
          newMomentum
          title="Test"
        ></md-dropdown>
      `);
    });

    test("should set new-dropbox if newMomentum set", async () => {
      expect(dropdown.newMomentum).toEqual(true);
      expect(dropdown.shadowRoot!.querySelector(".md-new-dropdown")).not.toBeNull();
    });

    test("should render input field if searchable set", async () => {
      expect(dropdown.searchable).toEqual(true);
      expect(dropdown.shadowRoot!.querySelector(".group")).not.toBeNull();
    });

    test("should set placeholder if property exist", async () => {
      expect(dropdown.placeholder).toEqual("Jason");
    });

    test("should set input value in handler", async () => {
      const event = new Event("input");
      dropdown.input!.value = "dropdown";
      dropdown.input!.dispatchEvent(event);

      expect(dropdown["inputValue"]).toEqual("dropdown");
    });

    test('should stop event propagation and dispatch "remove-all-selected" event', async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          .defaultOption="${dropdownStringOptions[0]}"
          searchable
          newMomentum
          title="Test"
        ></md-dropdown>
      `);

      const clearButton = dropdown.shadowRoot!.querySelector(".md-dropdown-button.clear") as HTMLElement;
      expect(clearButton).not.toBeNull();

      // Set up an event listener to check if the 'remove-all-selected' event is dispatched
      const eventSpy = jest.fn();
      dropdown.addEventListener("remove-all-selected", eventSpy);

      // Create a mock event to check if propagation is stopped
      const mockEvent = new Event("click", { bubbles: true, cancelable: true });
      const stopPropagationSpy = jest.spyOn(mockEvent, "stopPropagation");

      // Dispatch the event
      clearButton!.dispatchEvent(mockEvent);

      expect(stopPropagationSpy).toHaveBeenCalled();

      expect(eventSpy).toHaveBeenCalled();

      stopPropagationSpy.mockRestore();
    });
  });

  describe("Left Icon", () => {
    let dropdown: Dropdown.ELEMENT;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          Placeholder="Jason"
          left-icon="search-bold"
          searchable
          newMomentum
          title="Test"
        ></md-dropdown>
      `);
    });

    test("should render left icon if left-icon set", async () => {
      expect(dropdown.shadowRoot!.querySelector(".md-dropdown-left-icon")).not.toBeNull();
    });
  });

  describe("Help Text", () => {
    const messageArr: Dropdown.Message = {
      message: "This is where the message would be.",
      type: "success"
    };

    test("should render help text if helpText set", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          helpText="This is help text"
          searchable
          newMomentum
          title="Test"
        ></md-dropdown>
      `);

      expect(dropdown.shadowRoot!.querySelector(".help-text")).not.toBeNull();
    });

    test("should render message type help text if type set", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          htmlId="dropDownWarning"
          .messageArr=${[{ ...messageArr, ...{ type: "warning" } } as Dropdown.Message]}
          searchable
          newMomentum
          title="Test"
        ></md-dropdown>
      `);

      expect(dropdown.shadowRoot!.querySelector(".md-dropbox__messages")).not.toBeNull();
    });

    test("should render left-icon even with passing searchable", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          htmlId="dropDownWarning"
          left-icon="search-bold"
          .messageArr=${[{ ...messageArr, ...{ type: "warning" } } as Dropdown.Message]}
        ></md-dropdown>
      `);

      expect(dropdown.shadowRoot!.querySelector(".md-dropdown-label--left-icon")).not.toBeNull();
    });

    test("should render not left-icon wrapper when we dont pass left icon and searchable", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          htmlId="dropDownWarning"
          .messageArr=${[{ ...messageArr, ...{ type: "warning" } } as Dropdown.Message]}
        ></md-dropdown>
      `);

      expect(dropdown.shadowRoot!.querySelector(".md-dropdown-label--left-icon")).toBeNull();
    });
  });

  describe("Accessibility - Selection State", () => {
    const createKeyboardEvent = (code: string) => new KeyboardEvent("keydown", { code });

    const toggleExpandCollapseDropdown = async (dropdown: Dropdown.ELEMENT) => {
      const label = dropdown.shadowRoot!.querySelector("label");
      label!.dispatchEvent(new MouseEvent("click"));
      await dropdown.updateComplete;
    };

    it("should set aria-selected='true' and aria-label to option value for the selected option", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          .defaultOption="${dropdownStringOptions[1]}"
          title="Test"
        ></md-dropdown>
      `);

      await elementUpdated(dropdown);
      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      const options = dropdown.shadowRoot!.querySelectorAll("li.md-dropdown-option");
      const selectedOption = options[1];

      expect(selectedOption.getAttribute("aria-selected")).toEqual("true");
      expect(selectedOption.getAttribute("aria-label")).toEqual(dropdownStringOptions[1]);
    });

    it("should set aria-selected='false' and aria-label to option value for non-selected options", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          .defaultOption="${dropdownStringOptions[1]}"
          title="Test"
        ></md-dropdown>
      `);

      await elementUpdated(dropdown);
      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      const options = dropdown.shadowRoot!.querySelectorAll("li.md-dropdown-option");
      const nonSelectedOption = options[0];

      expect(nonSelectedOption.getAttribute("aria-selected")).toEqual("false");
      expect(nonSelectedOption.getAttribute("aria-label")).toEqual(dropdownStringOptions[0]);
    });

    it("should update aria-selected after selecting a new option", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
      `);

      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      await elementUpdated(dropdown);

      const dropdownSelectedPromise = oneEvent(dropdown, "dropdown-selected");
      dropdown.dispatchEvent(createKeyboardEvent(Key.Enter));
      await dropdownSelectedPromise;
      await elementUpdated(dropdown);

      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      const options = dropdown.shadowRoot!.querySelectorAll("li.md-dropdown-option");

      expect(options[2].getAttribute("aria-selected")).toEqual("true");
      expect(options[2].getAttribute("aria-label")).toEqual(dropdownStringOptions[2]);

      expect(options[0].getAttribute("aria-selected")).toEqual("false");
      expect(options[0].getAttribute("aria-label")).toEqual(dropdownStringOptions[0]);
    });

    it("should update aria-activedescendant on arrow key navigation", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
      `);

      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      expect(dropdown.label.getAttribute("aria-activedescendant")).toEqual("combo-0");

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      await elementUpdated(dropdown);

      expect(dropdown.label.getAttribute("aria-activedescendant")).toEqual("combo-1");

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      await elementUpdated(dropdown);

      expect(dropdown.label.getAttribute("aria-activedescendant")).toEqual("combo-2");

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowUp));
      await elementUpdated(dropdown);

      expect(dropdown.label.getAttribute("aria-activedescendant")).toEqual("combo-1");
    });

    it("should clear aria-activedescendant when dropdown collapses", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
      `);

      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      expect(dropdown.label.getAttribute("aria-activedescendant")).toEqual("combo-0");

      dropdown.dispatchEvent(createKeyboardEvent(Key.Escape));
      await elementUpdated(dropdown);

      expect(dropdown.label.getAttribute("aria-activedescendant")).toEqual("");
    });

    it("should keep focus on combobox label when expanding, not on listbox", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
      `);

      dropdown.label.focus();
      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      await elementUpdated(dropdown);

      expect(dropdown["expanded"]).toBeTruthy();
      expect(dropdown.shadowRoot!.activeElement).toBe(dropdown.label);
    });

    it("should render check icon only for newMomentum selected option", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          .defaultOption="${dropdownStringOptions[0]}"
          newMomentum
          title="Test"
        ></md-dropdown>
      `);

      await elementUpdated(dropdown);
      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      const selectedLi = dropdown.shadowRoot!.querySelector("li.md-dropdown-option[selected]");
      const checkIcon = selectedLi?.querySelector("md-icon.md-dropdown-option--icon");

      expect(checkIcon).not.toBeNull();
      expect(checkIcon!.getAttribute("name")).toEqual("check-bold");
      expect(checkIcon!.getAttribute("aria-hidden")).toEqual("true");
    });

    it("should not render check icon when newMomentum is false", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(html`
        <md-dropdown
          .options="${dropdownStringOptions}"
          .defaultOption="${dropdownStringOptions[0]}"
          title="Test"
        ></md-dropdown>
      `);

      await elementUpdated(dropdown);
      await toggleExpandCollapseDropdown(dropdown);
      await elementUpdated(dropdown);

      const checkIcon = dropdown.shadowRoot!.querySelector("md-icon.md-dropdown-option--icon");
      expect(checkIcon).toBeNull();
    });
  });

  describe("newMomentum", () => {
    const createKbEvent = (code: string) =>
      new KeyboardEvent("keydown", { code, bubbles: true, cancelable: true, composed: true });

    const expandDropdown = async (dropdown: Dropdown.ELEMENT) => {
      dropdown.shadowRoot!.querySelector("label")!.dispatchEvent(new MouseEvent("click"));
      await dropdown.updateComplete;
    };

    describe("Disabled State", () => {
      it("should set tabindex=-1 when disabled with newMomentum, tabindex=0 without", async () => {
        const withNM = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" disabled newMomentum title="Test"></md-dropdown>
        `);
        await elementUpdated(withNM);
        expect(withNM.shadowRoot!.querySelector("label")!.getAttribute("tabindex")).toEqual("-1");

        const withoutNM = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" disabled title="Test"></md-dropdown>
        `);
        await elementUpdated(withoutNM);
        expect(withoutNM.shadowRoot!.querySelector("label")!.getAttribute("tabindex")).toEqual("0");
      });

      it.each([Key.Enter, Key.ArrowDown, Key.Space])("should not open dropdown on %s when disabled", async (key) => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" disabled newMomentum title="Test"></md-dropdown>
        `);
        dropdown.dispatchEvent(createKbEvent(key));
        await elementUpdated(dropdown);
        expect(dropdown["expanded"]).toBeFalsy();
      });
    });

    describe("Keyboard Behavior", () => {
      it.each([Key.ArrowDown, Key.ArrowUp])("should preventDefault on %s when expanded", async (key) => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" newMomentum title="Test"></md-dropdown>
        `);
        await expandDropdown(dropdown);

        const event = createKbEvent(key);
        const spy = jest.spyOn(event, "preventDefault");
        dropdown.dispatchEvent(event);
        expect(spy).toHaveBeenCalled();
      });

      it.each([Key.Backspace, Key.Escape])("should close dropdown on %s", async (key) => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" newMomentum title="Test"></md-dropdown>
        `);
        await expandDropdown(dropdown);
        expect(dropdown["expanded"]).toBeTruthy();

        dropdown.dispatchEvent(createKbEvent(key));
        expect(dropdown["expanded"]).toBeFalsy();
      });
    });

    describe("Focus Management", () => {
      it("should not set tabindex on ul/li when newMomentum is true, but should when false", async () => {
        const withNM = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" newMomentum title="Test"></md-dropdown>
        `);
        await expandDropdown(withNM);
        await elementUpdated(withNM);

        expect(withNM.shadowRoot!.querySelector("ul.md-dropdown-list")!.hasAttribute("tabindex")).toBeFalsy();
        withNM.shadowRoot!.querySelectorAll("li.md-dropdown-option").forEach((item) => {
          expect(item.hasAttribute("tabindex")).toBeFalsy();
        });

        const withoutNM = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
        `);
        await expandDropdown(withoutNM);
        await elementUpdated(withoutNM);

        expect(withoutNM.shadowRoot!.querySelector("ul.md-dropdown-list")!.hasAttribute("tabindex")).toBeTruthy();
        withoutNM.shadowRoot!.querySelectorAll("li.md-dropdown-option").forEach((item) => {
          expect(item.hasAttribute("tabindex")).toBeTruthy();
        });
      });
    });
  });

  describe("VoiceOver / Accessibility", () => {
    const createKbEvent = (code: string) =>
      new KeyboardEvent("keydown", { code, bubbles: true, cancelable: true, composed: true });

    describe("Non-searchable label", () => {
      it("should set aria-label to title when unselected, and to selected value after selection", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" title="Filter"></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const label = dropdown.shadowRoot!.querySelector("label")!;
        expect(label.getAttribute("aria-label")).toEqual("Filter");

        dropdown["defaultOption"] = dropdownStringOptions[1];
        await elementUpdated(dropdown);
        expect(label.getAttribute("aria-label")).toEqual(dropdownStringOptions[1]);
      });

      it("should hide all child spans from screen readers", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const root = dropdown.shadowRoot!;
        expect(root.querySelector(".md-dropdown-label--text")!.getAttribute("aria-hidden")).toEqual("true");
        expect(root.querySelector(".md-dropdown-label--icon")!.getAttribute("aria-hidden")).toEqual("true");
      });
    });

    describe("Searchable input", () => {
      it("should sync inputValue and hide aria-label/placeholder after selection", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown
            .options="${dropdownStringOptions}"
            .defaultOption="${dropdownStringOptions[0]}"
            title="Select..."
            placeholder="Choose..."
            searchable
          ></md-dropdown>
        `);
        await elementUpdated(dropdown);

        expect(dropdown["inputValue"]).toEqual(dropdownStringOptions[0]);

        const input = dropdown.shadowRoot!.querySelector(".md-dropdown-input")!;
        expect(input.hasAttribute("aria-label")).toBeFalsy();
        expect(input.getAttribute("placeholder")).toEqual("");
      });

      it("should show aria-label and placeholder when no value is present", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown
            .options="${dropdownStringOptions}"
            title="Select..."
            placeholder="Choose..."
            searchable
          ></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const input = dropdown.shadowRoot!.querySelector(".md-dropdown-input")!;
        expect(input.getAttribute("aria-label")).toEqual("Select...");
        expect(input.getAttribute("placeholder")).toEqual("Choose...");
      });
    });

    describe("Searchable Tab behavior", () => {
      it("should close dropdown on Tab without re-stealing focus via debounced handler", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown
            .options="${dropdownStringOptions}"
            .defaultOption="${dropdownStringOptions[0]}"
            title="Test"
            searchable
          ></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const input = dropdown.shadowRoot!.querySelector(".md-dropdown-input") as HTMLInputElement;
        input.dispatchEvent(new MouseEvent("click"));
        await dropdown.updateComplete;
        expect(dropdown["expanded"]).toBeTruthy();

        dropdown.dispatchEvent(createKbEvent(Key.Tab));
        expect(dropdown["expanded"]).toBeFalsy();

        jest.advanceTimersByTime(300);
        await elementUpdated(dropdown);

        expect(dropdown["inputValue"]).toEqual(dropdownStringOptions[0]);
      });
    });

    describe("Searchable navigation after selection", () => {
      it("should not navigate to hidden options via arrow keys", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown
            .options="${dropdownStringOptions}"
            .defaultOption="${dropdownStringOptions[0]}"
            title="Test"
            searchable
          ></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const input = dropdown.shadowRoot!.querySelector(".md-dropdown-input") as HTMLInputElement;
        input.dispatchEvent(new MouseEvent("click"));
        await dropdown.updateComplete;

        expect(dropdown["expanded"]).toBeTruthy();
        const visibleCount = dropdown["filteredOptions"].length;
        expect(visibleCount).toBe(1);
        expect(dropdown["focusedIndex"]).toBe(0);

        dropdown.dispatchEvent(
          new KeyboardEvent("keydown", { code: Key.ArrowDown, bubbles: true, cancelable: true, composed: true })
        );
        await elementUpdated(dropdown);
        expect(dropdown["focusedIndex"]).toBe(0);

        dropdown.dispatchEvent(
          new KeyboardEvent("keydown", { code: Key.ArrowUp, bubbles: true, cancelable: true, composed: true })
        );
        await elementUpdated(dropdown);
        expect(dropdown["focusedIndex"]).toBe(0);
      });
    });

    describe("Dropdown buttons", () => {
      it("should hide clear button icon from screen readers", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown
            .options="${dropdownStringOptions}"
            .defaultOption="${dropdownStringOptions[0]}"
            title="Test"
            searchable
          ></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const clearIcon = dropdown.shadowRoot!.querySelector(".md-dropdown-button.clear md-icon");
        expect(clearIcon!.getAttribute("aria-hidden")).toEqual("true");
      });

      it("should hide arrow button icon from screen readers", async () => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown .options="${dropdownStringOptions}" title="Test" searchable></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const arrowIcon = dropdown.shadowRoot!.querySelector(".md-dropdown-button.arrow-down md-icon");
        expect(arrowIcon!.getAttribute("aria-hidden")).toEqual("true");
      });

      it.each([Key.Space, Key.Enter])("should not open popover when %s is pressed on clear button", async (key) => {
        const dropdown = await fixture<Dropdown.ELEMENT>(html`
          <md-dropdown
            .options="${dropdownStringOptions}"
            .defaultOption="${dropdownStringOptions[0]}"
            title="Test"
            searchable
          ></md-dropdown>
        `);
        await elementUpdated(dropdown);

        const clearButton = dropdown.shadowRoot!.querySelector(".md-dropdown-button.clear")!;
        clearButton.dispatchEvent(createKbEvent(key));
        await elementUpdated(dropdown);

        expect(dropdown["expanded"]).toBeFalsy();
      });
    });
  });
});
