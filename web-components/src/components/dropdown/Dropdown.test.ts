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
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame, oneEvent } from "@open-wc/testing-helpers";
import { Dropdown } from "./Dropdown"; // Keep type import as a relative path

describe("Dropdown Component", () => {
  afterEach(() => fixtureCleanup());

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
      dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown .options="${dropdownStringOptions}"></md-dropdown>
        `
      );
    });

    it("should open/close dropdown if label", async () => {
      await toggleExpandCollapseDropdown(dropdown);

      expect(dropdown["expanded"]).toBeTruthy();

      await toggleExpandCollapseDropdown(dropdown);

      expect(dropdown["expanded"]).toBeFalsy();
    });

    it("should set correct handle focusin", async () => {
      dropdown.dispatchEvent(new FocusEvent("focusin"));
      dropdown.focus();
      expect(document.activeElement).toEqual(dropdown);
    });

    it("should set correct handle focusout", async () => {
      dropdown.dispatchEvent(new FocusEvent("focusout"));
      dropdown.blur();

      expect(document.activeElement).not.toEqual(dropdown);
    });

    it("should dispatch events", async () => {
      const eventIn = new Event("focusin");
      const eventOut = new Event("focusout");

      setTimeout(() => dropdown["handleFocusIn"](eventIn));

      const focusIn = await oneEvent(dropdown, "dropdown-focus-in");
      expect(focusIn).toBeDefined();

      setTimeout(() => dropdown["handleFocusOut"](eventOut));

      const focusOut = await oneEvent(dropdown, "dropdown-focus-out");
      expect(focusOut).toBeDefined();

      dropdown.dispatchEvent(new FocusEvent("focusin"));
      dropdown.focus();

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));
      await nextFrame();

      setTimeout(() => dropdown.dispatchEvent(createKeyboardEvent(Key.Enter)));

      const { detail: detailOne } = await oneEvent(dropdown, "dropdown-selected");
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

      setTimeout(() => dropdown.dispatchEvent(createKeyboardEvent(Key.Enter)));

      const { detail } = await oneEvent(dropdown, "dropdown-selected");

      expect(dropdown["expanded"]).toBeFalsy();

      await toggleExpandCollapseDropdown(dropdown);
      dropdown.dispatchEvent(createKeyboardEvent(Key.Escape));
      expect(dropdown["expanded"]).toBeFalsy();

      expect(detail).toEqual(
        expect.objectContaining({
          option: dropdownStringOptions[dropdownStringOptions.length - 1]
        })
      );
    });

    it("should allow unselected", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown .options="${dropdownStringOptions}" allow-unselected></md-dropdown>
        `
      );

      await toggleExpandCollapseDropdown(dropdown);
      expect(dropdown["expanded"]).toBeTruthy();

      expect(dropdown["selectedKey"]).toBe("");

      dropdown.dispatchEvent(createKeyboardEvent(Key.ArrowDown));

      //
      {
        setTimeout(() => dropdown.dispatchEvent(createKeyboardEvent(Key.Enter)));

        const { detail } = await oneEvent(dropdown, "dropdown-selected");
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
        setTimeout(() => dropdown.dispatchEvent(createKeyboardEvent(Key.Enter)));

        const { detail } = await oneEvent(dropdown, "dropdown-selected");
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
      dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
        `
      );
    });

    it("should trim non-trimmed", async () => {
      const duplicatedDropdownStringOptions = [
        "one",
        "two",
        "three",
        "   non-trimmed-with-spaces ",
        " non-trimmed-with-spaces   "
      ];

      dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown .options="${duplicatedDropdownStringOptions}" title="Test"></md-dropdown>
        `
      );

      await elementUpdated(dropdown);

      expect(dropdown["renderOptions"].length).toBe(4);
    });

    it("should set correct aria attributes", async () => {
      dropdown["expanded"] = true;

      await elementUpdated(dropdown);

      expect(dropdown.label!.getAttribute("aria-expanded")).toEqual("true");
      expect(dropdown.label!.getAttribute("aria-label")).toEqual("Test");
    });

    it("should apply disabled attribute", async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown .options="${dropdownStringOptions}" disabled></md-dropdown>
        `
      );
      expect(dropdown.disabled).toBeTruthy();
    });

    it("should render correct icon name", () => {
      expect(dropdown.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("icon-arrow-down_16");
    });

    it("should change selectedKey on update of default option", async () => {
      const dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown
            .options="${dropdownObjectLongOptions}"
            .defaultOption="${dropdownObjectLongOptions[10]}"
            option-id="id"
            option-value="country"
          ></md-dropdown>
        `
      );
      expect(dropdown["selectedKey"]).toEqual(dropdownObjectLongOptions[10].id);

      dropdown["defaultOption"] = dropdownObjectLongOptions[1];
      await elementUpdated(dropdown);

      expect(dropdown["selectedKey"]).toEqual(dropdownObjectLongOptions[1].id);
    });
  });

  describe("List", () => {
    let dropdown: Dropdown.ELEMENT;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
        `
      );
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
      dropdown = await fixture<Dropdown.ELEMENT>(
        html`
          <md-dropdown
            .options="${dropdownObjectLongOptions}"
            .defaultOption="${dropdownObjectLongOptions[10]}"
            option-id="id"
            option-value="country"
          ></md-dropdown>
        `
      );
    });

    it("should set selectedKey on default option", async () => {
      await toggleExpandCollapseDropdown(dropdown);

      expect(dropdown["selectedKey"]).toEqual(dropdownObjectLongOptions[10].id);
      expect(dropdown.optionId).toEqual("id");
      expect(dropdown.optionValue).toEqual("country");
    });
  });
});
