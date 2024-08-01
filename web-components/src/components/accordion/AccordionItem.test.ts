import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import "./Accordion";
import { Accordion } from "./Accordion";
import "./AccordionItem";
import { AccordionItem } from "./AccordionItem";

describe("AccordionItem", () => {
  let accordion: Accordion.ELEMENT;
  let accordionItems: AccordionItem.ELEMENT[];

  beforeEach(async () => {
    accordion = await fixture(html`
      <md-accordion>
        <md-accordion-item slot="accordion-item" label="Header №1">
          <div>Panel №1</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №2">
          <div>Panel №2</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №3">
          <div>Panel №3</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №4">
          <div>Panel №4</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №5">
          <div>Panel №5</div>
        </md-accordion-item>
      </md-accordion>
    `);
    accordionItems = accordion.slotted as AccordionItem.ELEMENT[];
  });
  afterEach(fixtureCleanup);

  test("should correct render label", async () => {
    expect(accordionItems[0].label).toEqual("Header №1");
    expect(accordionItems[0].header.getAttribute("aria-label")).toEqual("Header №1");
    expect(accordionItems[4].label).toEqual("Header №5");
    expect(accordionItems[4].header.getAttribute("aria-label")).toEqual("Header №5");

    accordionItems[0].label = "";
    await elementUpdated(accordionItems[0]);
    expect(accordionItems[0].header.hasAttribute("aria-label")).toBeFalsy();
  });

  test("should correct set expanded", async () => {
    accordionItems[2].expanded = true;
    await elementUpdated(accordionItems[2]);
    expect(accordionItems[2].expanded).toBeTruthy();
    expect(accordionItems[2].header.getAttribute("aria-expanded")).toEqual("true");
  });

  test("should correct set disabled", async () => {
    expect(accordionItems[2].header.hasAttribute("tabindex")).toBeFalsy();
    accordionItems[2].disabled = true;
    await elementUpdated(accordionItems[2]);
    expect(accordionItems[2].disabled).toBeTruthy();
    expect(accordionItems[2].header.getAttribute("aria-disabled")).toEqual("true");
    expect(accordionItems[2].header.disabled).toEqual(true);
    expect(accordionItems[2].header.getAttribute("tabindex")).toEqual("-1");
  });

  test("should dispatch events when item become expanded", async () => {
    accordionItems[2].expanded = true;
    setTimeout(() => accordionItems[2]["notifyExpandedHeader"]());
    const { detail } = await oneEvent(accordionItems[2], "accordion-item-expanded");
    expect(detail).toBeDefined();
    expect(detail.id).toEqual(accordionItems[2]["uniqueId"]);

    setTimeout(() => accordionItems[2]["notifyAccordionFocus"]());
    const event = await oneEvent(accordionItems[2], "focus-visible");
    expect(event).toBeDefined();
  });

  test("should correct set level", async () => {
    const warnSpy = jest.spyOn(console, "warn");
    const warnMessage = "Please set appropriate section heading level";

    accordionItems[0].level = 0;
    await elementUpdated(accordionItems[0]);

    expect(warnSpy).toHaveBeenCalledWith(warnMessage);
    expect(accordionItems[0].level).toEqual(3);
    expect(accordionItems[0].shadowRoot!.querySelector("div[role='heading']")!.getAttribute("aria-level")).toEqual("3");

    accordionItems[0].level = 7;
    await elementUpdated(accordionItems[0]);

    expect(warnSpy).toHaveBeenCalledWith(warnMessage);
    expect(accordionItems[0].level).toEqual(3);
    expect(accordionItems[0].shadowRoot!.querySelector("div[role='heading']")!.getAttribute("aria-level")).toEqual("3");

    accordionItems[0].level = 4;
    await elementUpdated(accordionItems[0]);

    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(accordionItems[0].level).toEqual(4);
    expect(accordionItems[0].shadowRoot!.querySelector("div[role='heading']")!.getAttribute("aria-level")).toEqual("4");

    warnSpy.mockRestore();
  });

  test("should handle click event", async () => {
    const mouseDown = new MouseEvent("mousedown");
    setTimeout(() => accordionItems[1].handleMouseDown(mouseDown));

    const { detail } = await oneEvent(accordionItems[1], "accordion-item-click");

    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(mouseDown);
  });

  test("should handle keydown event", async () => {
    const keydownEvent = new KeyboardEvent("keydown", {
      code: "Enter"
    });
    setTimeout(() => accordionItems[1].handleKeyDown(keydownEvent));

    const { detail } = await oneEvent(accordionItems[1], "accordion-item-keydown");

    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(keydownEvent);
  });
});
