import "@/components/input/Input";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Accordion";
import { type Accordion } from "./Accordion";
import "./AccordionItem";
import { type AccordionItem } from "./AccordionItem";

describe("Accordion", () => {
  let accordion: Accordion.ELEMENT;
  let accordionItems: AccordionItem.ELEMENT[];

  beforeEach(async () => {
    jest.useFakeTimers();

    accordion = await fixture(html`
      <md-accordion>
        <md-accordion-item slot="accordion-item" label="Header №1" expanded>
          <div>Panel №1</div>
          <md-input type="text"></md-input>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №2" disabled>
          <div>Panel №2</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №3">
          <div>Panel №3</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №4" expanded>
          <div>Panel №4</div>
        </md-accordion-item>
        <md-accordion-item slot="accordion-item" label="Header №5">
          <div>Panel №5</div>
        </md-accordion-item>
      </md-accordion>
    `);
    accordionItems = accordion.slotted as AccordionItem.ELEMENT[];
    jest.runAllTimers();
  });
  afterEach(async () => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("slotted item", async () => {
    expect(accordion.slotItem.name).toBe("accordion-item");
  });

  test("should correct navigate between items using keyboard", async () => {
    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    const arrowDown = createEvent("ArrowDown");
    const arrowUp = createEvent("ArrowUp");
    const home = createEvent("Home");
    const end = createEvent("End");
    const enter = createEvent("Enter");
    const space = createEvent("Space");
    const keyA = createEvent("KeyA");

    await elementUpdated(accordionItems[0]);

    accordionItems[0].header.dispatchEvent(arrowDown);
    jest.advanceTimersByTime(100);

    expect(document.activeElement).toEqual(accordionItems[0]);

    accordionItems[0].header.dispatchEvent(arrowDown);
    jest.advanceTimersByTime(100);

    expect(document.activeElement).toEqual(accordionItems[2]);

    accordionItems[0].header.dispatchEvent(arrowDown);
    jest.advanceTimersByTime(100);

    accordionItems[0].header.dispatchEvent(arrowDown);
    jest.advanceTimersByTime(100);

    accordionItems[0].header.dispatchEvent(arrowDown);
    jest.advanceTimersByTime(100);

    expect(document.activeElement).toEqual(accordionItems[0]);

    accordionItems[0].header.dispatchEvent(arrowUp);
    jest.advanceTimersByTime(100);

    accordionItems[0].header.dispatchEvent(arrowUp);
    jest.advanceTimersByTime(100);

    accordionItems[0].header.dispatchEvent(arrowUp);
    jest.advanceTimersByTime(100);

    expect(document.activeElement).toEqual(accordionItems[2]);

    accordionItems[4].header.dispatchEvent(home);
    jest.advanceTimersByTime(100);

    expect(document.activeElement).toEqual(accordionItems[0]);

    accordionItems[0].header.dispatchEvent(end);
    jest.advanceTimersByTime(100);

    expect(document.activeElement).toEqual(accordionItems[4]);

    accordionItems[4].header.dispatchEvent(enter);
    jest.advanceTimersByTime(100);

    expect(accordionItems[4].expanded).toBeTruthy();
    expect(document.activeElement).toEqual(accordionItems[4]);

    accordionItems[4].header.dispatchEvent(arrowUp);
    jest.advanceTimersByTime(100);

    accordionItems[3].header.dispatchEvent(space);
    jest.advanceTimersByTime(100);

    expect(accordionItems[4].expanded).toBeFalsy();
    expect(accordionItems[3].expanded).toBeTruthy();
    expect(document.activeElement).toEqual(accordionItems[3]);

    accordionItems[3].header.dispatchEvent(keyA);
    expect(document.activeElement).toEqual(accordionItems[3]);
  });

  test("should correct select accordion item by click", async () => {
    const click = new MouseEvent("click");
    accordionItems[1].header.dispatchEvent(click);
    jest.advanceTimersByTime(100);

    expect(accordionItems[1].expanded).toBeFalsy();

    accordionItems[3].header.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(100);

    expect(accordionItems[3].expanded).toBeTruthy();

    accordionItems[4].header.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(100);

    expect(accordionItems[3].expanded).toBeFalsy();
    expect(accordionItems[4].expanded).toBeTruthy();

    accordion.multiple = true;
    await elementUpdated(accordion);

    accordionItems[0].header.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(100);

    expect(accordionItems[0].expanded).toBeTruthy();
    expect(accordionItems[4].expanded).toBeTruthy();

    accordionItems[0].header.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(100);

    expect(accordionItems[0].expanded).toBeFalsy();
  });

  test("should propagate doubleClickToExpand to accordion items", async () => {
    accordion.doubleClickToExpand = true;
    await elementUpdated(accordion);
    jest.advanceTimersByTime(100);

    // Verify the property is propagated to all items
    accordionItems.forEach((item) => {
      expect(item.doubleClickToExpand).toBeTruthy();
    });

    // Single click should not expand
    accordionItems[3].header.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(100);
    expect(accordionItems[3].expanded).toBeFalsy();

    // Double click should expand
    accordionItems[3].header.dispatchEvent(new MouseEvent("dblclick"));
    jest.advanceTimersByTime(100);
    expect(accordionItems[3].expanded).toBeTruthy();
  });
});
