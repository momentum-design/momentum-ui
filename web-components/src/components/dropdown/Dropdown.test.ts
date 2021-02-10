import { dropdownStringOptions } from "@/[sandbox]/examples/dropdown";
import { Dropdown } from "@/components/dropdown/Dropdown";
import "@/components/dropdown/Dropdown";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame, oneEvent } from "@open-wc/testing-helpers";

describe("Dropdown Component", () => {
  afterEach(() => fixtureCleanup());

  const createKeyboardEvent = (code: string) =>
    new KeyboardEvent("keydown", {
      code
    });

  describe("Events", () => {
    let dropdown: Dropdown;

    beforeEach(async () => {
      dropdown = await fixture<Dropdown>(
        html`
          <md-dropdown .options="${dropdownStringOptions}"></md-dropdown>
        `
      );
    });

    it("should open/close dropdown if label", async () => {
      const label = dropdown.shadowRoot!.querySelector("label");
      const event = new MouseEvent("click");
      label!.dispatchEvent(event);
      await dropdown.updateComplete;
      expect(dropdown["expanded"]).toBeTruthy();
      label!.dispatchEvent(event);
      await dropdown.updateComplete;
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
  });

  describe("Behavior", () => {
    it("should set correct aria attributes", async () => {
      const dropdown = await fixture<Dropdown>(
        html`
          <md-dropdown .options="${dropdownStringOptions}" title="Test"></md-dropdown>
        `
      );

      dropdown["expanded"] = true;

      await elementUpdated(dropdown);
      expect(dropdown.label!.getAttribute("aria-expanded")).toEqual("true");
      expect(dropdown.label!.getAttribute("aria-label")).toEqual("Test");
    });
  });
});
