import "@/components/input/Input";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame } from "@open-wc/testing-helpers";
import "./Accordion";
import { Accordion } from "./Accordion";
import "./AccordionItem";
import { AccordionItem } from "./AccordionItem";

describe("Accordion", () => {
  let accordion: Accordion.ELEMENT;
  let accordionItems: AccordionItem.ELEMENT[];

  beforeEach(async () => {
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
  });
  afterEach(async () => {
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
    await nextFrame();

    expect(document.activeElement).toEqual(accordionItems[0]);

    accordionItems[0].header.dispatchEvent(arrowDown);
    await nextFrame();

    expect(document.activeElement).toEqual(accordionItems[2]);

    accordionItems[0].header.dispatchEvent(arrowDown);
    await nextFrame();

    accordionItems[0].header.dispatchEvent(arrowDown);
    await nextFrame();

    accordionItems[0].header.dispatchEvent(arrowDown);
    await nextFrame();

    expect(document.activeElement).toEqual(accordionItems[0]);

    accordionItems[0].header.dispatchEvent(arrowUp);
    await nextFrame();

    accordionItems[0].header.dispatchEvent(arrowUp);
    await nextFrame();

    accordionItems[0].header.dispatchEvent(arrowUp);
    await nextFrame();

    expect(document.activeElement).toEqual(accordionItems[2]);

    accordionItems[4].header.dispatchEvent(home);
    await nextFrame();

    expect(document.activeElement).toEqual(accordionItems[0]);

    accordionItems[0].header.dispatchEvent(end);
    await nextFrame();

    expect(document.activeElement).toEqual(accordionItems[4]);

    accordionItems[4].header.dispatchEvent(enter);
    await nextFrame();

    expect(accordionItems[4].expanded).toBeTruthy();
    expect(document.activeElement).toEqual(accordionItems[4]);

    accordionItems[4].header.dispatchEvent(arrowUp);
    await nextFrame();

    accordionItems[3].header.dispatchEvent(space);
    await nextFrame();

    expect(accordionItems[4].expanded).toBeFalsy();
    expect(accordionItems[3].expanded).toBeTruthy();
    expect(document.activeElement).toEqual(accordionItems[3]);

    accordionItems[3].header.dispatchEvent(keyA);
    expect(document.activeElement).toEqual(accordionItems[3]);
  });

  test("should correct select accordion item by click", async () => {
    const mouseDown = new MouseEvent("mousedown");
    accordionItems[1].header.dispatchEvent(mouseDown);
    await nextFrame();

    expect(accordionItems[1].expanded).toBeFalsy();

    accordionItems[3].header.dispatchEvent(mouseDown);
    await nextFrame();

    expect(accordionItems[3].expanded).toBeTruthy();

    accordionItems[4].header.dispatchEvent(mouseDown);
    await nextFrame();

    expect(accordionItems[3].expanded).toBeFalsy();
    expect(accordionItems[4].expanded).toBeTruthy();

    accordion.multiple = true;
    await elementUpdated(accordion);

    accordionItems[0].header.dispatchEvent(mouseDown);
    await nextFrame();

    expect(accordionItems[0].expanded).toBeTruthy();
    expect(accordionItems[4].expanded).toBeTruthy();

    accordionItems[0].header.dispatchEvent(mouseDown);
    await nextFrame();

    expect(accordionItems[0].expanded).toBeFalsy();
  });
});
