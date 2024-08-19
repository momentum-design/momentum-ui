import { Key } from "@/constants";
import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, PropertyValues } from "lit-element";
import { nanoid } from "nanoid";
import "./Tab";
import { Tab } from "./Tab";

describe("Tab", () => {
  afterEach(fixtureCleanup);

  test("should (un)register event listeners", async () => {
    const tag = defineCE(
      class extends Tab.ELEMENT {
        protected firstUpdated(changedProperties: PropertyValues) {
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }
      }
    );

    const el = fixtureSync<Tab.ELEMENT>(`<${tag}></${tag}>`);
    const firstUpdatedEvent = await oneEvent(el, "first-updated");
    expect(el.hasAttribute("role")).toBeTruthy();
    expect(firstUpdatedEvent).toBeDefined();
  });

  test("should reflect `disabled` attribute", async () => {
    const el = await fixture<Tab.ELEMENT>(`<md-tab></md-tab>`);

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
    const el = await fixture<Tab.ELEMENT>(html` <md-tab id=${id} name="test-tab"></md-tab> `);

    const clickEvent = new MouseEvent("mousedown");
    setTimeout(() => el.handleClick(clickEvent));

    const { detail: click } = await oneEvent(el, "tab-click");
    expect(click).toBeDefined();
    expect(click.id).toBe(id);
  });

  test("should dispatch keydown events to parent component", async () => {
    const id = nanoid();
    const el = await fixture<Tab.ELEMENT>(html` <md-tab closable="custom" id=${id} name="test-tab"></md-tab> `);
    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });
    setTimeout(() => (el as any).handleCrossKeydown(createEvent(Key.Enter)), 10);

    const { detail: click } = await oneEvent(el, "tab-close-click");
    expect(click).toBeDefined();
    expect(click.id).toBe(id);
  });

  test("should dispatch cross events to parent component", async () => {
    const id = nanoid();
    const el = await fixture<Tab.ELEMENT>(html` <md-tab closable="auto" id=${id} .isCrossVisible=${true}></md-tab> `);

    setTimeout(() => (el.shadowRoot?.querySelector(".tab-action-button") as HTMLElement).click());

    const { detail: click } = await oneEvent(el, "tab-cross-click");
    expect(click).toBeDefined();
    expect(click.id).toBe(id);
  });

  test("should dispatch cross events to parent component", async () => {
    const id = nanoid();
    const el = await fixture<Tab.ELEMENT>(html` <md-tab closable="custom" id=${id} .isCrossVisible=${true}></md-tab> `);

    setTimeout(() => (el.shadowRoot?.querySelector(".tab-action-button") as HTMLElement).click());

    const { detail: click } = await oneEvent(el, "tab-close-click");
    expect(click).toBeDefined();
    expect(click.id).toBe(id);
  });

  test("should dispatch event when selected", async () => {
    const el = await fixture<Tab.ELEMENT>(`<md-tab></md-tab>`);
    const spySelected = jest.spyOn(el, "notifySelectedTab" as never);

    el.selected = true;
    await elementUpdated(el);

    expect(spySelected).toHaveBeenCalled();
    spySelected.mockRestore();
  });
});
