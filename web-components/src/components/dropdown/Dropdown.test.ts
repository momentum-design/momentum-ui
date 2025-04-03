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

      expect(dropdown["renderOptions"].length).toBe(4);

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
});
