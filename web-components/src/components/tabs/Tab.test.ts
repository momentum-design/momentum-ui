import { Key } from "@/constants";
import { generateSimpleUniqueId } from "@/utils/uniqueId";
import { elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html } from "lit";
import "./Tab";
import { type Tab } from "./Tab";

describe("Tab", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should have tab role", async () => {
    const el = fixtureSync<Tab.ELEMENT>(`<md-tab></md-tab>`);
    await elementUpdated(el);
    expect(el.role).toBe("tab");
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
    expect(el.hasAttribute("aria-disabled")).toBeFalsy();
    expect(el.hasAttribute("disabled")).toBeFalsy();
    expect(el.getAttribute("tabindex")).toBe("-1");

    el.selected = true;
    el.disabled = false;
    await elementUpdated(el);
    expect(el.getAttribute("tabindex")).toBe("0");
  });

  test("should dispatch events to parent component", async () => {
    const id = generateSimpleUniqueId("tabs");
    const el = await fixture<Tab.ELEMENT>(html` <md-tab id=${id} name="test-tab"></md-tab> `);

    const clickEvent = new MouseEvent("mousedown");
    const tabClickPromise = oneEvent(el, "tab-click");
    el.handleClick(clickEvent);

    const { detail: click } = await tabClickPromise;
    expect(click).toBeDefined();
    expect(click.id).toBe(id);
  });

  test("should dispatch keydown events to parent component", async () => {
    const id = generateSimpleUniqueId("tabs");
    const el = await fixture<Tab.ELEMENT>(html` <md-tab closable="custom" id=${id} name="test-tab"></md-tab> `);
    const tabCloseClickPromise = oneEvent(el, "tab-close-click");
    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });
    el.handleCrossKeydown(createEvent(Key.Enter));

    const { detail: click } = await tabCloseClickPromise;
    expect(click).toBeDefined();
    expect(click.id).toBe(id);
  });

  test("should dispatch cross events to parent component", async () => {
    const id = generateSimpleUniqueId("tabs");
    const el = await fixture<Tab.ELEMENT>(html` <md-tab closable="auto" id=${id} .isCrossVisible=${true}></md-tab> `);

    const tabCrossClickPromise = oneEvent(el, "tab-cross-click");
    el.shadowRoot?.querySelector<HTMLElement>(".tab-action-button")?.click();

    const { detail: click } = await tabCrossClickPromise;
    expect(click).toBeDefined();
    expect(click.id).toBe(id);
  });

  test("should dispatch cross events to parent component", async () => {
    const id = generateSimpleUniqueId("tabs");
    const el = await fixture<Tab.ELEMENT>(html` <md-tab closable="custom" id=${id} .isCrossVisible=${true}></md-tab> `);

    const tabCloseClick = oneEvent(el, "tab-close-click");
    el.shadowRoot?.querySelector<HTMLElement>(".tab-action-button")?.click();

    const { detail: click } = await tabCloseClick;
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

  test("add test compatibility button for legacy tests", async () => {
    const el = await fixture<Tab.ELEMENT>(`<md-tab></md-tab>`);
    const spyHandleClick = jest.spyOn(el, "handleClick");

    const legacyButton = el.shadowRoot?.querySelector<HTMLElement>("button");
    legacyButton?.click();

    expect(spyHandleClick).toHaveBeenCalled();

    spyHandleClick.mockRestore();
  });
});
