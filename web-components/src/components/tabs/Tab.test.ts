import { Key } from "@/constants";
import { nanoid } from "nanoid";
import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, PropertyValues } from "lit-element";
import "./Tab";
import { Tab } from "./Tab";

describe("Tab", () => {
  afterEach(fixtureCleanup);

  test("should (un)register event listeners", async () => {
    const tag = defineCE(
      class extends Tab {
        protected firstUpdated(changedProperties: PropertyValues) {
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }
      }
    );

    const el = fixtureSync<Tab>(`<${tag}></${tag}>`);
    const firstUpdatedEvent = await oneEvent(el, "first-updated");
    expect(el.hasAttribute("role")).toBeTruthy();
    expect(firstUpdatedEvent).toBeDefined();
  });

  test("should reflect `disabled` attribute", async () => {
    const el = await fixture<Tab>(`<md-tab></md-tab>`);

    el.disabled = true;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-disabled")).toBeTruthy();
    expect(el.getAttribute("aria-disabled")).toBe("true");
    expect(el.hasAttribute("disabled")).toBeTruthy();
    expect(el.getAttribute("tabindex")).toBe("-1");

    el.disabled = false;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-disabled")).toBeTruthy();
    expect(el.getAttribute("aria-disabled")).toBe("false");
    expect(el.hasAttribute("disabled")).toBeFalsy();
    expect(el.getAttribute("tabindex")).toBe("0");
  });

  test("should dispatch events to parent component", async () => {
    const id = nanoid();
    const el = await fixture<Tab>(
      html`
        <md-tab id=${id}></md-tab>
      `
    );

    const clickEvent = new MouseEvent("mousedown");
    setTimeout(() => el.handleClick(clickEvent));

    const { detail: click } = await oneEvent(el, "tab-click");
    expect(click).toBeDefined();
    expect(click.id).toBe(id);

    const keyboardEvent = new KeyboardEvent("keydown", {
      code: Key.Enter
    });
    setTimeout(() => el.handleKeyDown(keyboardEvent));

    const { detail: keydown } = await oneEvent(el, "tab-keydown");
    expect(keydown).toBeDefined();
    expect(keydown.id).toBe(id);
    expect(keydown.key).toBe(Key.Enter);
  });

  test("should dispatch event when selected", async() => {
    const el = await fixture<Tab>(`<md-tab></md-tab>`);
    const spySelected = jest.spyOn(el, "notifySelectedTab" as never);

    el.selected = true;
    await elementUpdated(el);

    expect(spySelected).toHaveBeenCalled();
    spySelected.mockRestore();
  });

  test("should set label property if it defined", async() => {
    const el = await fixture<Tab>(`<md-tab label="Tab Label"></md-tab>`);

    expect(el.hasAttribute("aria-label")).toBeTruthy();
    expect(el.getAttribute("aria-label")).toEqual("Tab Label");
  });
});
