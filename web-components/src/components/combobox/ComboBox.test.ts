import { comboBoxComplexObjectOption, comboBoxObjectOptions, comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import { repeat } from "lit/directives/repeat.js";
import "./ComboBox";
import { type ComboBox } from "./ComboBox";

describe("Combobox Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  describe("Interaction", () => {
    let el: ComboBox.ELEMENT;

    beforeEach(async () => {
      el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions} is-multi></md-combobox> `);
    });
    test("should set class if combobox with multi attribute", async () => {
      expect(el.group!.classList.contains("md-combobox-multiselect")).toBeTruthy();
    });
    test("should open/close dropdown if arrow icon clicked", async () => {
      const button = el.shadowRoot!.querySelector("button[class='md-combobox-button arrow-down']");
      const event = new MouseEvent("click");
      button!.dispatchEvent(event);
      await el.updateComplete;
      expect(el.expanded).toBeTruthy();
      button!.dispatchEvent(event);
      await el.updateComplete;
      expect(el.expanded).toBeFalsy();
    });

    test("should dispatch events", async () => {
      const eventIn = new Event("focusin");
      const eventOut = new Event("focusOut");

      const focusInPromsie = oneEvent(el, "combobox-focus-in");
      el["handleFocusIn"](eventIn);
      const focusIn = await focusInPromsie;
      expect(focusIn).toBeDefined();

      const focusOutPromise = oneEvent(el, "combobox-focus-out");
      el["handleFocusOut"](eventOut);
      const focusOut = await focusOutPromise;
      expect(focusOut).toBeDefined();

      const createEvent = (code: string) =>
        new KeyboardEvent("keydown", {
          code
        });
      el.input!.dispatchEvent(createEvent(Key.ArrowDown));
      jest.advanceTimersByTime(600);
      const changeSelectedPromise = oneEvent(el, "change-selected");
      el.input!.dispatchEvent(createEvent(Key.Enter));
      jest.advanceTimersByTime(600);
      const { detail: detailOne } = await changeSelectedPromise;
      expect(detailOne).toBeDefined();
      expect(detailOne).toEqual(
        expect.objectContaining({
          value: "Afghanistan",
          selected: ["Afghanistan"]
        })
      );
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.ArrowDown));
      jest.advanceTimersByTime(100);
      const changedSelected2Promise = oneEvent(el, "change-selected");
      el.input!.dispatchEvent(createEvent(Key.Enter));
      jest.advanceTimersByTime(600);
      const { detail: detailTwo } = await changedSelected2Promise;
      expect(detailTwo).toBeDefined();
      expect(detailTwo).toEqual(
        expect.objectContaining({
          value: "Aland Islands",
          selected: ["Afghanistan", "Aland Islands"]
        })
      );
    });

    test("should dispatch input event", async () => {
      el.input!.value = "a";
      el["inputValue"] = "a";
      const comboBoxInputPromise = oneEvent(el, "combobox-input");
      el.input!.dispatchEvent(new Event("input"));
      jest.advanceTimersByTime(600);

      const { detail } = await comboBoxInputPromise;

      expect(detail).toBeDefined();
      expect(detail).toEqual(expect.objectContaining({ value: "a" }));
    });

    test("should render selected options with multi attribute", async () => {
      expect(el.selectedOptions.length).toEqual(0);
      expect(el.selected!.length).toEqual(0);

      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1]];

      await elementUpdated(el);

      expect(el.selectedOptions.length).toEqual(2);
      expect(el.selected!.length).toEqual(2);
    });

    test("shouldn't render selected options without multi attribute", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);
      expect(el.selectedOptions.length).toEqual(0);
      expect(el.selected!.length).toEqual(0);

      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1]];

      await elementUpdated(el);

      expect(el.selectedOptions.length).toEqual(2);
      expect(el.selected!.length).toEqual(0);
    });

    test("should render slotted content", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox with-custom-content is-multi>
          <div slot="one" aria-label="Facebook" display-value="Facebook">
            <span>Facebook</span>
            <md-icon name="icon-facebook_16"></md-icon>
          </div>
          <div slot="two" aria-label="Twitter" display-value="Twitter">
            <span class="company-value">Twitter</span>
            <md-icon name="icon-twitter_16"></md-icon>
          </div>
          <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
            <span class="company-value">Wikipedia</span>
            <md-icon name="icon-wikipedia_16"></md-icon>
          </div>
          <div slot="four" aria-label="Google" display-value="Google">
            <span class="company-value">Google</span>
            <md-icon name="icon-google_16"></md-icon>
          </div>
        </md-combobox>
      `);
      expect(el.isCustomContent).toBeTruthy();
      expect(el["customContent"].length).toEqual(4);
    });

    test("should render complex slotted content", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox with-custom-content is-multi>
          ${repeat(
            comboBoxComplexObjectOption,
            (country) => country.countryNameEn,
            (country: { countryNameEn: string; countryCallingCode: string }, index) => html`
              <div
                slot=${index}
                display-value=${country.countryNameEn}
                aria-label="+${country.countryCallingCode}${country.countryNameEn}"
              >
                <span>${country.countryNameEn}</span>
                <span>+${country.countryCallingCode}</span>
              </div>
            `
          )}
        </md-combobox>
      `);
      expect(el.isCustomContent).toBeTruthy();
      expect(el["customContent"].length).toEqual(10);

      const createEvent = (code: string) =>
        new KeyboardEvent("keydown", {
          code
        });

      el.input!.dispatchEvent(createEvent(Key.ArrowDown));
      jest.advanceTimersByTime(600);
      el.input!.dispatchEvent(createEvent(Key.Enter));

      expect(el.input!.value).toEqual("Andorra");

      const event = new Event("input");
      el.input!.value = "4";
      el.input!.dispatchEvent(event);

      await elementUpdated(el);
      expect(el.filteredOptions.length).toEqual(5);
    });

    test("should render async slotted content", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox with-custom-content is-multi .customOptions=${[]}></md-combobox>
      `);

      el.expanded = true;
      await elementUpdated(el);

      jest.setTimeout(1000);

      const slottedContent = comboBoxComplexObjectOption
        .map((country: { countryNameEn: string; countryCallingCode: string }, index) => {
          return ` <div
        slot=${index}
        display-value=${country.countryNameEn}
        aria-label="+${country.countryCallingCode}${country.countryNameEn}"
      >
        <span>${country.countryNameEn}</span>
        <span>+${country.countryCallingCode}</span>
      </div>`;
        })
        .join("");

      const resizeSpy = jest.spyOn(el, "resizeListbox" as never);

      el.innerHTML = `${slottedContent}`;
      el.customOptions = comboBoxComplexObjectOption as never[];

      await elementUpdated(el);

      expect(el.options.length).toEqual(10);
      expect(resizeSpy).toHaveBeenCalled();

      resizeSpy.mockRestore();
    });
  });

  describe("Combobox", () => {
    test("should set correct aria attributes", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} label="Country"></md-combobox>
      `);

      el.expanded = true;
      await elementUpdated(el);
      expect(el.input!.getAttribute("aria-expanded")).toEqual("true");
      expect(el.button!.getAttribute("aria-expanded")).toEqual("true");
    });

    test("should open/close dropdown if clicked", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} no-clear-icon></md-combobox>
      `);
      const event = new MouseEvent("click");
      el.input!.dispatchEvent(event);
      el.input!.focus();

      expect(el.expanded).toBeTruthy();

      document.dispatchEvent(event);
      el.input!.blur();

      expect(el.expanded).toBeFalsy();
    });

    test("should set placeholder if property exist", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} placeholder="Placeholder Input"></md-combobox>
      `);

      expect(el.placeholder).toEqual("Placeholder Input");
    });

    test("should apply disabled attribute", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} disabled></md-combobox>
      `);
      expect(el.disabled).toBeTruthy();
    });

    test("should set input value in handler", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} disabled></md-combobox>
      `);
      const event = new Event("input");
      el.input!.value = "combobox";
      el.input!.dispatchEvent(event);

      expect(el["inputValue"]).toEqual("combobox");
    });

    test("should handle keyUp event", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);
      const createEvent = (code: string) =>
        new KeyboardEvent("keyup", {
          code
        });

      const backspace = createEvent(Key.Backspace);
      el.input!.dispatchEvent(backspace);

      const mock = jest.fn();

      el.listBox!.style.maxHeight = mock();

      expect(el.expanded).toBeTruthy();
      expect(mock).toBeCalled();

      el.expanded = false;

      await elementUpdated(el);

      mock.mockReset();
      const escape = createEvent(Key.Escape);
      el.input!.dispatchEvent(escape);

      expect(el.expanded).toBeFalsy();
      expect(mock).not.toBeCalled();
    });

    test("should handle keyDown event", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} is-multi></md-combobox>
      `);
      const createEvent = (code: string) =>
        new KeyboardEvent("keydown", {
          code
        });

      const listLen = el.lists!.length;

      const backspace = createEvent(Key.Backspace);
      el.input!.dispatchEvent(backspace);

      await elementUpdated(el);

      expect(el.focusedIndex).toEqual(-1);

      el.expanded = true;
      el.focusedIndex = 0;
      await elementUpdated(el);

      const arrowLeft = createEvent(Key.ArrowLeft);
      const propogationSpyLeft = jest.spyOn(arrowLeft, "stopPropagation");
      el.input!.dispatchEvent(arrowLeft);

      expect(propogationSpyLeft).toHaveBeenCalled();
      await elementUpdated(el);

      const arrowRight = createEvent(Key.ArrowRight);
      const propogationSpyRight = jest.spyOn(arrowRight, "stopPropagation");
      el.input!.dispatchEvent(arrowRight);

      expect(propogationSpyRight).toHaveBeenCalled();
      await elementUpdated(el);

      const enter = createEvent(Key.Enter);
      el.input!.dispatchEvent(enter);

      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeFalsy();
      expect(el.selectedOptions.length).toEqual(1);
      expect(el.selectedOptions).toEqual(expect.arrayContaining(["Afghanistan"]));
      expect(el.input!.value).toEqual("Afghanistan");

      el.expanded = false;
      el.focusedIndex = 0;
      await elementUpdated(el);

      const arrowDown = createEvent(Key.ArrowDown);
      el.input!.dispatchEvent(arrowDown);

      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedIndex).toEqual(1);
      expect(el.lists![1].hasAttribute("focused")).toBeTruthy();

      el.expanded = false;
      el.focusedIndex = listLen - 1;
      await elementUpdated(el);

      el.input!.dispatchEvent(arrowDown);

      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedIndex).toEqual(0);
      expect(el.lists![0].hasAttribute("focused")).toBeTruthy();

      el.expanded = false;
      el.focusedIndex = -1;
      await elementUpdated(el);

      el.input!.dispatchEvent(arrowDown);

      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedIndex).toEqual(0);
      expect(el.lists![0].hasAttribute("focused")).toBeTruthy();

      el.expanded = false;
      el.focusedIndex = 0;
      await elementUpdated(el);

      const arrowUp = createEvent(Key.ArrowUp);
      el.input!.dispatchEvent(arrowUp);

      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedIndex).toEqual(listLen - 1);
      expect(el.lists![listLen - 1].hasAttribute("focused")).toBeTruthy();

      el.expanded = false;
      el.focusedIndex = listLen - 1;
      await elementUpdated(el);

      el.input!.dispatchEvent(arrowUp);

      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedIndex).toEqual(listLen - 2);
      expect(el.lists![listLen - 2].hasAttribute("focused")).toBeTruthy();

      el.expanded = false;
      el.focusedIndex = 0;
      el.input!.value = "combobox";
      el.selectedOptions.push("Afghanistan");
      const escape = createEvent(Key.Escape);

      el.input!.dispatchEvent(escape);

      expect(el.input!.value).toEqual("");
      expect(el.focusedIndex).toEqual(-1);
      expect(el.selectedOptions.length).toEqual(0);

      el.expanded = true;
      el.focusedIndex = 0;
      el.input!.value = "combobox";
      el.selectedOptions.push("Afghanistan");
      await elementUpdated(el);

      el.input!.dispatchEvent(escape);
      expect(el.expanded).toBeFalsy();
      expect(el.input!.value).toEqual("combobox");
      expect(el.focusedIndex).toEqual(0);
      expect(el.selectedOptions.length).toEqual(1);
      const tab = createEvent(Key.Tab);
      el.expanded = true;
      el.focusedIndex = 0;
      el.input!.value = "combobox";
      el.selectedOptions.push("Afghanistan");
      await elementUpdated(el);

      el.input!.dispatchEvent(tab);
      expect(el.expanded).toBeFalsy();
      expect(el.input!.value).toEqual("combobox");
      expect(el.focusedIndex).toEqual(0);

      const home = createEvent(Key.Home);

      const selectionMock = jest.fn();
      el.input!.setSelectionRange = selectionMock;
      el.input!.dispatchEvent(home);

      expect(selectionMock).toHaveBeenCalled();

      const end = createEvent(Key.End);
      el.input!.dispatchEvent(end);

      expect(selectionMock).toHaveBeenCalledTimes(2);

      el.expanded = true;
      el.selectedOptions = [];
      el.focusedIndex = 0;
      await elementUpdated(el);

      const space = createEvent(Key.Space);
      el.input!.dispatchEvent(space);

      await elementUpdated(el);

      expect(el.selectedOptions).toEqual(expect.arrayContaining(["Afghanistan"]));

      const key = createEvent("KeyZ");
      el.input!.dispatchEvent(key);
      expect(el.focusedIndex).toEqual(0);
    });
    test("should remove all selected option if clear icon clicked", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} is-multi></md-combobox>
      `);

      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1]];
      const event = new MouseEvent("click");

      const removeAllSelectedPromise = oneEvent(el, "remove-all-selected");
      el.handleRemoveAll(event);
      const customEvent = await removeAllSelectedPromise;
      expect(customEvent).toBeDefined();
      expect(el.selectedOptions.length).toEqual(0);
    });

    test("should remove option if option icon clicked", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} is-multi></md-combobox>
      `);
      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1]];
      await elementUpdated(el);

      const clearOptionIcon = el.shadowRoot!.querySelector("md-icon[name='cancel-bold']");

      clearOptionIcon!.dispatchEvent(new MouseEvent("click"));

      expect(el.selectedOptions.length).toEqual(1);
      expect(el.selectedOptions).toEqual(expect.arrayContaining(["Aland Islands"]));
    });

    test("should render correct multi icon name", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} is-multi></md-combobox>
      `);

      expect(el.shadowRoot!.querySelector(".md-combobox-button md-icon")!.getAttribute("name")).toEqual(
        "arrow-down-bold"
      );

      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1]];
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector(".md-combobox-button md-icon")!.getAttribute("name")).toEqual("cancel-bold");
    });
    test("should render correct icon name", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);

      expect(el.shadowRoot!.querySelector(".md-combobox-button md-icon")!.getAttribute("name")).toEqual(
        "arrow-down-bold"
      );

      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1]];
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector(".md-combobox-button md-icon")!.getAttribute("name")).toEqual(
        "arrow-down-bold"
      );
    });

    test("should set correct icon for different combobox state", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);
      const event = new InputEvent("input", {
        data: "a"
      });
      el.input!.value = "a";
      expect(el.shadowRoot!.querySelector("md-icon[name='arrow-down-bold']")).not.toBeNull();
      expect(el.shadowRoot!.querySelector("md-icon[name='cancel-bold']")).toBeNull();
      el.input!.dispatchEvent(event);

      await elementUpdated(el);

      expect(el.shadowRoot!.querySelector("md-icon[name='arrow-down-bold']")).toBeNull();
      expect(el.shadowRoot!.querySelector("md-icon[name='cancel-bold']")).not.toBeNull();

      const backspace = new KeyboardEvent("keydown", {
        code: Key.Backspace
      });
      el.input!.dispatchEvent(backspace);
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector("md-icon[name='arrow-down-bold']")).toBeNull();
      expect(el.shadowRoot!.querySelector("md-icon[name='cancel-bold']")).not.toBeNull();
    });
    test("should set correct icon for different combobox state in multi mode", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} is-multi></md-combobox>
      `);
      const arrowDown = new KeyboardEvent("keydown", {
        code: Key.ArrowDown
      });
      el.input!.value = "Afghanistan";

      expect(el.shadowRoot!.querySelector("md-icon[name='arrow-down-bold']")).not.toBeNull();
      expect(el.shadowRoot!.querySelector("md-icon[name='cancel-bold']")).toBeNull();
      el.input!.dispatchEvent(arrowDown);

      await elementUpdated(el);

      expect(el.shadowRoot!.querySelector("md-icon[name='arrow-down-bold']")).toBeNull();
      expect(el.shadowRoot!.querySelector("md-icon[name='cancel-bold']")).not.toBeNull();
    });
  });

  describe("Combobox Multi Selected", () => {
    let el: ComboBox.ELEMENT;
    afterEach(fixtureCleanup);

    beforeEach(async () => {
      el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions} is-multi></md-combobox> `);
    });
    test("should add selected options", async () => {
      const event = new MouseEvent("click");
      el.lists![0].dispatchEvent(event);
      el.lists![1].dispatchEvent(event);

      await elementUpdated(el);

      expect(el.selected!.length).toEqual(2);
    });
    test("should clear selected option by click", async () => {
      const event = new MouseEvent("click");
      el.lists![0].dispatchEvent(event);
      el.lists![1].dispatchEvent(event);

      el.expanded = true;
      await elementUpdated(el);

      expect(el.selected!.length).toEqual(2);
      expect(el.selectedOptions.length).toEqual(2);

      const firstListIcon = el.selected![0].querySelector("md-icon[name='cancel-bold']");
      const secondListIcon = el.selected![1].querySelector("md-icon[name='cancel-bold']");

      firstListIcon!.dispatchEvent(event);
      secondListIcon!.dispatchEvent(event);

      await elementUpdated(el);

      expect(el.selected!.length).toEqual(0);
      expect(el.selectedOptions.length).toEqual(0);
    });
    test("should clear selected option by unchecked", async () => {
      const createEvent = (code: string) =>
        new KeyboardEvent("keydown", {
          code
        });

      el.input!.dispatchEvent(createEvent(Key.ArrowDown));
      jest.advanceTimersByTime(600);
      el.input!.dispatchEvent(createEvent(Key.Space));
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.ArrowDown));
      jest.advanceTimersByTime(600);
      el.input!.dispatchEvent(createEvent(Key.Space));
      await elementUpdated(el);

      expect(el.selected!.length).toEqual(2);
      expect(el.selectedOptions.length).toEqual(2);

      el.input!.dispatchEvent(createEvent(Key.Space));
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.ArrowUp));
      jest.advanceTimersByTime(600);
      el.input!.dispatchEvent(createEvent(Key.Space));
      await elementUpdated(el);

      expect(el.selected!.length).toEqual(0);
      expect(el.selectedOptions.length).toEqual(0);
    });
    test("should add/remove selected attribute option when arrow and shift clicked", async () => {
      el.selectedOptions = [
        comboBoxOptions[0],
        comboBoxOptions[1],
        comboBoxOptions[2],
        comboBoxOptions[3],
        comboBoxOptions[4],
        comboBoxOptions[5]
      ];

      await elementUpdated(el);
      const createEvent = (code: string, shiftKey: boolean) =>
        new KeyboardEvent("keyup", {
          code,
          shiftKey
        });

      el.input!.dispatchEvent(createEvent(Key.ArrowLeft, true));
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.ArrowLeft, true));
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.ArrowLeft, true));
      await elementUpdated(el);

      el.input!.dispatchEvent(createEvent(Key.Backspace, true));
      await elementUpdated(el);

      expect(el.selected!.length).toEqual(3);
      expect(el.selectedOptions.length).toEqual(3);
    });
    test("should add/remove selected attribute option when arrow clicked", async () => {
      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1]];

      await elementUpdated(el);
      const createEvent = (code: string) =>
        new KeyboardEvent("keyup", {
          code
        });

      el.input!.dispatchEvent(createEvent(Key.ArrowLeft));
      await elementUpdated(el);
      expect(el.selected![1].hasAttribute("selected")).toBeTruthy();
      el.input!.dispatchEvent(createEvent(Key.ArrowLeft));
      await elementUpdated(el);
      expect(el.selected![1].hasAttribute("selected")).toBeFalsy();
      expect(el.selected![0].hasAttribute("selected")).toBeTruthy();

      el.input!.dispatchEvent(createEvent(Key.Backspace));
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.Backspace));
      await elementUpdated(el);

      expect(el.selectedOptions.length).toEqual(0);
      expect(el.selected!.length).toEqual(0);
    });

    test("should unselect all if default button was pressed", async () => {
      el.selectedOptions = [comboBoxOptions[0], comboBoxOptions[1], comboBoxOptions[2], comboBoxOptions[4]];
      await elementUpdated(el);
      const createEvent = (code: string) =>
        new KeyboardEvent("keyup", {
          code
        });

      const selectedAttribute = {
        get count() {
          return [...el.selected!].filter((selected) => selected.hasAttribute("selected"));
        }
      };

      expect(el.selectedOptions.length).toEqual(4);
      expect(el.selected!.length).toEqual(4);
      expect(selectedAttribute.count.length).toEqual(0);

      el.input!.dispatchEvent(createEvent(Key.ArrowLeft));
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.ArrowLeft));
      await elementUpdated(el);
      el.input!.dispatchEvent(createEvent(Key.ArrowLeft));
      await elementUpdated(el);

      expect(selectedAttribute.count.length).toEqual(1);

      el.input!.dispatchEvent(createEvent("KeyA"));
      await elementUpdated(el);
      expect(selectedAttribute.count.length).toEqual(0);
    });
  });

  describe("Listbox", () => {
    test("should set correct aria label attribute", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} label="Country"></md-combobox>
      `);
      expect(el.listBox!.getAttribute("aria-label")).toEqual("Country");
    });

    test("should set correct styles", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);
      expect(el.expanded).toBeFalsy();
      expect(el.listBox!.style.display).toEqual("none");

      el.expanded = true;

      expect(el.expanded).toBeTruthy();
      expect(el.listBox!.style.zIndex).toEqual("99");
    });

    test("should correct render options depends on input value", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);
      el["inputValue"] = "f";
      await elementUpdated(el);
      expect(el.lists!.length).toEqual(1);

      el["inputValue"] = "fa";
      await elementUpdated(el);
      expect(el.filteredOptions.length).toEqual(0);
      expect(el.shadowRoot!.querySelector(".no-result")).not.toBeNull();
    });

    test("should set correct id to each option in dom", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxObjectOptions} option-id="id" option-value="country" is-multi></md-combobox>
      `);

      const optionsCheckbox = el.shadowRoot!.querySelectorAll(".select-option");

      const matcherId = [...el.lists!].map((option) => option.getAttribute("id"));
      const matcherChecked = [...el.lists!].every((option) => option.hasAttribute("aria-checked"));

      expect(matcherId).toEqual(expect.arrayContaining(comboBoxObjectOptions.map((option) => option.id)));
      expect(optionsCheckbox.length).toEqual(29);
      expect(matcherChecked).toBeTruthy();
    });
  });

  describe("Option", () => {
    test("should dispatch event when option clicked", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);

      const event = new MouseEvent("click");

      const selectedChangedPromise = oneEvent(el, "selected-changed");
      el.handleListClick(event);
      const customEvent = await selectedChangedPromise;

      expect(customEvent).toBeDefined();
      expect(el.expanded).toBeFalsy();
    });
    test("should dispatch event when option clicked (multi)", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} is-multi></md-combobox>
      `);

      const event = new MouseEvent("click");
      const selectedChangedPromise = oneEvent(el, "selected-changed");

      el.handleListClick(event);
      const customEvent = await selectedChangedPromise;

      await elementUpdated(el);

      expect(customEvent).toBeDefined();
      expect(el.expanded).toBeTruthy();
    });

    test("should toggle aria tags", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxObjectOptions} option-id="id" option-value="country" is-multi></md-combobox>
      `);

      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.ArrowDown }));
      expect(el.expanded).toBeTruthy();

      jest.advanceTimersByTime(600);

      expect(el.focusedIndex).toEqual(0);
      //expect(el.lists![0].getAttribute("aria-selected")).toEqual("true");

      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Space }));

      expect(el.selectedOptions.length).toEqual(1);
      expect(el.selectedOptions).toEqual(expect.arrayContaining([{ country: "Afghanistan", id: "0" }]));
      expect(el.input!.value.length).toEqual(0);

      await elementUpdated(el);

      expect(el.lists![0].getAttribute("aria-checked")).toEqual("true");
      expect(el.lists![0].getAttribute("selected")).toEqual("true");

      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.ArrowDown }));
      jest.advanceTimersByTime(600);
      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Space }));
      await elementUpdated(el);

      expect(el.selectedOptions.length).toEqual(2);
      expect(el.selectedOptions).toEqual(
        expect.arrayContaining([
          { country: "Afghanistan", id: "0" },
          { country: "Aland Islands", id: "1" }
        ])
      );
    });
    test("should handle selected option without multi attribute", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);

      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.ArrowDown }));
      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Enter }));
      jest.advanceTimersByTime(600);

      expect(el.selectedOptions.length).toEqual(1);

      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.ArrowDown }));
      el.input!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Enter }));
      jest.advanceTimersByTime(600);

      expect(el.selectedOptions.length).toEqual(1);
    });

    test("should change selected option", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${comboBoxOptions}></md-combobox> `);
      el.expanded = true;
      el.lists![0].dispatchEvent(new MouseEvent("click"));

      await elementUpdated(el);

      expect(el.focusedIndex).toEqual(0);
      expect(el.selectedOptions.length).toEqual(1);
      expect(el.selectedOptions).toEqual(expect.arrayContaining(["Afghanistan"]));
    });
  });

  test("should set initial value", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox .options=${comboBoxOptions} .value=${[comboBoxOptions[0]]}></md-combobox>
    `);

    expect(el.value).toEqual(expect.arrayContaining([comboBoxOptions[0]]));
    expect(el.selectedOptions).toEqual(expect.arrayContaining(["Afghanistan"]));
  });
  test("should set initial value for multi", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox
        .options=${comboBoxOptions}
        .value=${[comboBoxOptions[1], comboBoxOptions[2]]}
        is-multi
      ></md-combobox>
    `);

    expect(el.value).toEqual(expect.arrayContaining([comboBoxOptions[1], comboBoxOptions[2]]));
    expect(el.selected!.length).toEqual(2);
    expect(el.selectedOptions).toEqual(expect.arrayContaining(["Aland Islands", "Albania"]));
  });

  test("should set initial value for option object", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox
        .options=${comboBoxObjectOptions}
        .value=${[comboBoxObjectOptions[4], comboBoxObjectOptions[5], { country: "Andorra", id: "17" }]}
        is-multi
        option-id="id"
        option-value="country"
      ></md-combobox>
    `);

    expect(el.value).toEqual(expect.arrayContaining([comboBoxObjectOptions[4], comboBoxObjectOptions[5]]));
    expect(el.selected!.length).toEqual(2);
    expect(el.optionId).toEqual("id");
    expect(el.optionValue).toEqual("country");
    expect(el.selectedOptions).toEqual(
      expect.arrayContaining([
        { country: "American Samoa", id: "4" },
        { country: "Andorra", id: "5" }
      ])
    );
  });

  test("should render no options list if empty options provided", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html` <md-combobox .options=${[]}></md-combobox> `);
    el.expanded = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector(".no-result")!.textContent!.trim()).toEqual("No Options");

    el.inputValue = "One";
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector(".no-result")!.textContent!.trim()).toEqual("No Options");
    expect(el.shadowRoot!.querySelectorAll(".no-result")!.length).toEqual(1);

    el.inputValue = "On";
    await elementUpdated(el);

    expect(el.shadowRoot!.querySelector(".no-result")!.textContent!.trim()).toEqual("No Options");
    expect(el.shadowRoot!.querySelectorAll(".no-result")!.length).toEqual(1);
  });

  test("should set custom value for default options", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox .options=${comboBoxOptions} .value=${[comboBoxOptions[1]]} allow-custom-value></md-combobox>
    `);
    el.expanded = true;
    const enter = new KeyboardEvent("keydown", { code: Key.Enter });

    el.inputValue = "One";

    await elementUpdated(el);
    el.input!.dispatchEvent(enter);
    jest.advanceTimersByTime(600);

    expect(el.filteredOptions.includes("One")).toBeTruthy();
    expect(el.filteredOptions.length).toEqual(12);

    el.inputValue = comboBoxOptions[2];
    await elementUpdated(el);
    el.input!.dispatchEvent(enter);
    jest.advanceTimersByTime(600);

    expect(el.filteredOptions.includes("Albania")).toBeTruthy();
    expect(el.filteredOptions.length).toEqual(1);
  });

  test("should not set custom value for object options", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox
        .options=${comboBoxObjectOptions}
        .value=${[comboBoxObjectOptions[4]]}
        option-id="id"
        option-value="country"
        is-multi
        allow-custom-value
      ></md-combobox>
    `);
    el.expanded = true;
    const enter = new KeyboardEvent("keydown", { code: Key.Enter });

    el.inputValue = "One";

    await elementUpdated(el);
    el.input!.dispatchEvent(enter);
    jest.advanceTimersByTime(600);

    expect(el.filteredOptions.includes("One")).not.toBeTruthy();
    expect(el.filteredOptions.length).toEqual(29);
  });

  test("should correct render invalid state", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox
        .options=${comboBoxOptions}
        .value=${[comboBoxOptions[4]]}
        invalid
        invalid-text-i18n="Error Message from Combobox"
      ></md-combobox>
    `);

    expect(el.invalid).toBeTruthy();
    expect(el.shadowRoot!.querySelector(".md-combobox-error")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("md-help-text")!.message).toEqual("Error Message from Combobox");
  });

  test("should render with Slect All option", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox .options=${comboBoxOptions} is-multi allow-select-all> </md-combobox>
    `);
    el.expanded = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector("#md-combobox-listbox")?.querySelector("#selectAll")).not.toBeNull();
  });

  test("should select/unselect all options on clicking Select All", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox .options=${comboBoxOptions} is-multi allow-select-all show-selected-count> </md-combobox>
    `);
    el.expanded = true;
    await elementUpdated(el);
    const selectAllEl = el.shadowRoot!.querySelector("#md-combobox-listbox")?.querySelector("#selectAll");
    expect(selectAllEl).not.toBeNull();
    expect(el.selectedOptions.length).toEqual(0);
    selectAllEl?.dispatchEvent(new MouseEvent("click"));

    jest.advanceTimersByTime(600);
    await elementUpdated(el);

    expect(el.selectedOptions.length).toEqual(comboBoxOptions.length);
    expect(el.shadowRoot!.querySelector(".md-combobox__multiwrap .selected-count")).not.toBeNull();
    expect(el.shadowRoot!.querySelector(".md-combobox__multiwrap .selected-count")?.textContent).toEqual("All");

    el.expanded = true;
    await elementUpdated(el);
    selectAllEl?.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(600);
    await elementUpdated(el);

    expect(el.selectedOptions.length).toEqual(0);
    expect(el.shadowRoot!.querySelector(".md-combobox__multiwrap .selected-count")).toBeNull();
  });

  test("should show selected option's count", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox .options=${comboBoxOptions} is-multi allow-select-all show-selected-count> </md-combobox>
    `);
    el.expanded = true;
    await elementUpdated(el);

    const firstOption = el.shadowRoot!.querySelectorAll("#md-combobox-listbox .md-combobox-option")[1];
    firstOption.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(600);
    await elementUpdated(el);
    expect(el.selectedOptions.length).toEqual(1);
    expect(el.shadowRoot!.querySelector(".md-combobox__multiwrap .selected-count")?.textContent).toEqual("1 Selected");
  });

  test("should render with custom error", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox .options=${comboBoxOptions} show-custom-error>
        <div slot="custom-error">Custom Error!!!</div>
      </md-combobox>
    `);
    el.expanded = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector('[slot="custom-error"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[slot="custom-error"]')!.innerHTML).toEqual("Custom Error!!!");
  });

  describe("Combobox with group options", () => {
    test("should render group label", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox with-custom-content>
          <optgroup label="Countries">
            <div slot="Australia" aria-label="Australia" display-value="Australia">
              <span>Australia</span>
            </div>
            <div slot="Austria" aria-label="Austria" display-value="Austria">
              <span>Austria</span>
            </div>
          </optgroup>
          <optgroup label="Cites">
            <div slot="Ambala" aria-label="Ambala" display-value="Ambala">
              <span>Ambala</span>
            </div>
            <div slot="Banaras" aria-label="Banaras" display-value="Banaras">
              <span>Banaras</span>
            </div>
          </optgroup>
        </md-combobox>
      `);

      el.expanded = true;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector(".group-label")).not.toBeNull();

      const createEvent = (code: string) =>
        new KeyboardEvent("keydown", {
          code
        });

      const backspace = createEvent(Key.Backspace);
      el.input!.dispatchEvent(backspace);

      await elementUpdated(el);

      expect(el.focusedIndex).toEqual(-1);
      const arrowDown = createEvent(Key.ArrowDown);
      el.input!.dispatchEvent(arrowDown);

      await elementUpdated(el);
      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedIndex).toEqual(-1);

      const groupList = el.shadowRoot!.querySelectorAll(".group-label");
      expect(groupList![0].hasAttribute("focused")).toBeTruthy();

      const enter = createEvent(Key.Enter);
      groupList![0].dispatchEvent(enter);
      await elementUpdated(el);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedGroupIndex).toEqual(0);
      expect(el.lists?.length).toEqual(2);

      groupList![0].dispatchEvent(arrowDown);

      await elementUpdated(el);
      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      expect(el.focusedIndex).toEqual(0);

      groupList![0].dispatchEvent(arrowDown);
      await elementUpdated(el);
      jest.advanceTimersByTime(600);

      expect(el.focusedGroupIndex).toEqual(-1);
      expect(el.focusedIndex).toEqual(1);

      groupList![0].dispatchEvent(enter);
      await elementUpdated(el);
      jest.advanceTimersByTime(600);

      expect(el.input?.value).toEqual("Austria");
      expect(el.expanded).toBeFalsy();

      const arrowUp = createEvent(Key.ArrowUp);
      el.input!.dispatchEvent(arrowUp);

      await elementUpdated(el);
      jest.advanceTimersByTime(600);

      expect(el.expanded).toBeTruthy();
      groupList![0].dispatchEvent(enter);

      expect(el.input?.value).toEqual("Australia");
      expect(el.expanded).toBeFalsy();
    });
  });

  test("should navigate through tab between groups", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox with-custom-content>
        <optgroup label="Countries">
          <div slot="Australia" aria-label="Australia" display-value="Australia">
            <span>Australia</span>
          </div>
          <div slot="Austria" aria-label="Austria" display-value="Austria">
            <span>Austria</span>
          </div>
        </optgroup>
        <optgroup label="Cites">
          <div slot="Ambala" aria-label="Ambala" display-value="Ambala">
            <span>Ambala</span>
          </div>
          <div slot="Banaras" aria-label="Banaras" display-value="Banaras">
            <span>Banaras</span>
          </div>
        </optgroup>
      </md-combobox>
    `);

    el.expanded = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector(".group-label")).not.toBeNull();

    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    const backspace = createEvent(Key.Backspace);
    const arrowDown = createEvent(Key.ArrowDown);
    const arrowUp = createEvent(Key.ArrowUp);
    const tab = createEvent(Key.Tab);
    const enter = createEvent(Key.Enter);
    const escape = createEvent(Key.Escape);

    el.input!.dispatchEvent(backspace);

    await elementUpdated(el);
    expect(el.focusedIndex).toEqual(-1);
    el.input!.dispatchEvent(arrowUp);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.expanded).toBeTruthy();
    expect(el.focusedIndex).toEqual(-1);

    const groupList = el.shadowRoot!.querySelectorAll(".group-label");
    expect(groupList![0].hasAttribute("focused")).toBeTruthy();

    groupList![0].dispatchEvent(arrowDown);
    await elementUpdated(el);
    groupList![0].dispatchEvent(arrowUp);

    groupList![0].dispatchEvent(enter);
    await elementUpdated(el);

    expect(el.expanded).toBeTruthy();
    expect(el.focusedGroupIndex).toEqual(0);
    expect(el.lists?.length).toEqual(2);

    groupList![0]!.dispatchEvent(tab);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.expanded).toBeTruthy();
    expect(el.focusedIndex).toEqual(-1);
    expect(el.focusedGroupIndex).toEqual(1);

    groupList![1].dispatchEvent(enter);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.lists?.length).toEqual(2);
    groupList![1].dispatchEvent(arrowDown);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    groupList![1].dispatchEvent(arrowUp);
    groupList![1].dispatchEvent(enter);

    expect(el.input?.value).toEqual("Ambala");
    expect(el.expanded).toBeFalsy();

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    el.input!.dispatchEvent(arrowDown);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    groupList![0]!.dispatchEvent(escape);
  });

  test("should list all group related options on match", async () => {
    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox with-custom-content>
        <optgroup label="Countries">
          <div slot="Australia" aria-label="Australia" display-value="Australia">
            <span>Australia</span>
          </div>
          <div slot="Austria" aria-label="Austria" display-value="Austria">
            <span>Austria</span>
          </div>
          <div slot="India" aria-label="India" display-value="India">
            <span>India</span>
          </div>
        </optgroup>
        <optgroup label="Cites">
          <div slot="Ambala" aria-label="Ambala" display-value="Ambala">
            <span>Ambala</span>
          </div>
          <div slot="Banaras" aria-label="Banaras" display-value="Banaras">
            <span>Banaras</span>
          </div>
          <div slot="Ujjaini" aria-label="Ujjaini" display-value="Ujjaini">
            <span>Indonasia</span>
          </div>
          <div slot="Indore" aria-label="Indore" display-value="Indore">
            <span>Indore</span>
          </div>
        </optgroup>
      </md-combobox>
    `);

    el.expanded = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector(".group-label")).not.toBeNull();

    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    const backspace = createEvent(Key.Backspace);
    el.input!.dispatchEvent(backspace);

    await elementUpdated(el);

    const event = new Event("input");
    el.input!.value = "In";
    el.input!.dispatchEvent(event);
    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.lists?.length).toEqual(3);
    const arrowDown = createEvent(Key.ArrowDown);
    el.input!.dispatchEvent(arrowDown);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    const enter = createEvent(Key.Enter);
    el.input!.dispatchEvent(enter);
    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.input?.value).toEqual("India");
  });

  test("should navigate through tab between groups for multi select", async () => {
    const el2 = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox with-custom-content is-multi use-virtual-scroll allow-select-all placeholder="Placeholder">
        <div label="Countries">
          <div slot="Austria" aria-label="Austria" display-value="Austria">
            <span>Austria</span>
          </div>
        </div>
      </md-combobox>
    `);
    await elementUpdated(el2);
    jest.advanceTimersByTime(600);

    const el = await fixture<ComboBox.ELEMENT>(html`
      <md-combobox with-custom-content is-multi placeholder="Placeholder">
        <optgroup label="Countries">
          <div slot="Australia" aria-label="Australia" display-value="Australia">
            <span>Australia</span>
          </div>
          <div slot="Austria" aria-label="Austria" display-value="Austria">
            <span>Austria</span>
          </div>
        </optgroup>
        <optgroup label="Cites">
          <div slot="Ambala" aria-label="Ambala" display-value="Ambala">
            <span>Ambala</span>
          </div>
          <div slot="Banaras" aria-label="Banaras" display-value="Banaras">
            <span>Banaras</span>
          </div>
        </optgroup>
      </md-combobox>
    `);

    el.expanded = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector(".group-label")).not.toBeNull();

    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    const backspace = createEvent(Key.Backspace);
    const arrowDown = createEvent(Key.ArrowDown);
    const arrowUp = createEvent(Key.ArrowUp);
    const tab = createEvent(Key.Tab);
    const enter = createEvent(Key.Enter);
    const escape = createEvent(Key.Escape);
    const end = createEvent(Key.End);

    el.input!.dispatchEvent(backspace);

    await elementUpdated(el);
    expect(el.focusedIndex).toEqual(-1);
    el.input!.dispatchEvent(arrowUp);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.expanded).toBeTruthy();
    expect(el.focusedIndex).toEqual(-1);

    const groupList = el.shadowRoot!.querySelectorAll(".group-label");
    expect(groupList![0].hasAttribute("focused")).toBeTruthy();

    groupList![0].dispatchEvent(arrowDown);
    await elementUpdated(el);
    groupList![0].dispatchEvent(arrowUp);

    groupList![0].dispatchEvent(enter);
    await elementUpdated(el);

    expect(el.expanded).toBeTruthy();
    expect(el.focusedGroupIndex).toEqual(0);
    expect(el.lists?.length).toEqual(2);

    groupList![0]!.dispatchEvent(tab);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.expanded).toBeTruthy();
    expect(el.focusedIndex).toEqual(-1);
    expect(el.focusedGroupIndex).toEqual(1);

    groupList![1].dispatchEvent(enter);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.lists?.length).toEqual(2);
    groupList![1].dispatchEvent(arrowDown);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    groupList![1].dispatchEvent(enter);

    await elementUpdated(el);
    jest.advanceTimersByTime(600);

    expect(el.input?.value).toEqual("Ambala");
    expect(el.expanded).toBeFalsy();

    await elementUpdated(el);
    jest.advanceTimersByTime(600);
    groupList![0]!.dispatchEvent(end);
    groupList![0]!.dispatchEvent(escape);
  }, 2000);

  describe("Combobox with virtual scroll", () => {
    test("should handle keyUp event", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} use-virtual-scroll></md-combobox>
      `);
      const createEvent = (code: string) =>
        new KeyboardEvent("keyup", {
          code
        });

      const backspace = createEvent(Key.Backspace);
      el.input!.dispatchEvent(backspace);

      const mock = jest.fn();

      el.listBox!.style.maxHeight = mock();

      expect(el.expanded).toBeTruthy();
      expect(mock).toBeCalled();

      el.expanded = false;

      await elementUpdated(el);

      mock.mockReset();
      const escape = createEvent(Key.Escape);
      el.input!.dispatchEvent(escape);

      expect(el.expanded).toBeFalsy();
      expect(mock).not.toBeCalled();
    });
    test("should set initial value for multi", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox
          .options=${comboBoxOptions}
          .value=${[comboBoxOptions[1], comboBoxOptions[2]]}
          is-multi
          use-virtual-scroll
        ></md-combobox>
      `);

      expect(el.value).toEqual(expect.arrayContaining([comboBoxOptions[1], comboBoxOptions[2]]));
      expect(el.selected!.length).toEqual(2);
      expect(el.selectedOptions).toEqual(expect.arrayContaining(["Aland Islands", "Albania"]));
    });

    test("should update ariaLabelForComboBox based on search result count", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${["One", "Two", "Three"]}></md-combobox>
      `);

      el.searchResultAriaLabel = "Search results: {{count}} results found.";
      el.inputValue = "One";
      el["notifySearchResultCount"]();
      await elementUpdated(el);

      const inputEl = el.shadowRoot!.querySelector("input");

      expect(inputEl?.getAttribute("aria-label")).toEqual("Search results: 1 results found.");

      el.searchResultAriaLabel = "";
      el.ariaLabel = "Search results";
      el["notifySearchResultCount"]();
      await elementUpdated(el);
      expect(inputEl?.getAttribute("aria-label")).toEqual("Search results, 1 results found.");

      el.ariaLabel = "";
      el["notifySearchResultCount"]();
      await elementUpdated(el);
      expect(inputEl?.getAttribute("aria-label")).toEqual("ComboBox Element, 1 results found.");
    });

    test("should change selected option for virtual scroll", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} use-virtual-scroll></md-combobox>
      `);
      el.expanded = true;
      const lists = comboBoxOptions.map((item) => {
        return `<div id=${item} class="md-combobox-option" role="option" style="height:12px;">${item}</div>`;
      });

      if (lists && el.listBox) {
        el.listBox.innerHTML = `${lists.join("")}`;
      }
      const upd = el.lists![0];
      if (el.lists![0]) {
        upd.onclick = (event) => el.handleListClick(event);
      }
      el.lists![0].dispatchEvent(new MouseEvent("click"));

      await elementUpdated(el);

      expect(el.focusedIndex).toEqual(0);
      expect(el.selectedOptions.length).toEqual(1);
      expect(el.selectedOptions).toEqual(expect.arrayContaining(["Afghanistan"]));
    });

    test("should preserve options list when preventFilter is true", async () => {
      const el = await fixture<ComboBox.ELEMENT>(html`
        <md-combobox .options=${comboBoxOptions} prevent-filter></md-combobox>
      `);
      el.inputValue = "Afghanistan";
      await elementUpdated(el);
      expect(el.filteredOptions.length).toEqual(comboBoxOptions.length);
      expect(el.filteredOptions).toEqual(expect.arrayContaining(comboBoxOptions));
    });
  });
});
