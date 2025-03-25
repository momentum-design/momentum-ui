import "@/components/icon/Icon";
import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit";
import "./DraggableItem";
import { DraggableItem } from "./DraggableItem";

describe("Draggable Item Component", () => {
  let element: DraggableItem.ELEMENT;
  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<DraggableItem.ELEMENT>(html` <md-draggable-item></md-draggable-item> `);
  });

  test("should render with correct class", async () => {
    expect(element.shadowRoot!.querySelector(".md-draggable-item")!.classList.contains("default")).toBeTruthy();

    element.disabled = true;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector(".md-draggable-item")!.classList.contains("disabled")).toBeTruthy();

    element.extended = true;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector(".md-draggable-item")!.classList.contains("default")).toBeFalsy();
    expect(element.shadowRoot!.querySelector(".md-draggable-item")!.classList.contains("extended")).toBeTruthy();
  });

  test("should render different html depending on the properties value", async () => {
    expect(element.shadowRoot!.querySelector("slot[name='extended']")).toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon[name='dragger-vertical-bold']")).toBeNull();

    element.extended = true;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector("slot[name='extended']")).not.toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon[name='dragger-vertical-bold']")).toBeNull();

    element.editable = true;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector("md-icon[name='dragger-vertical-bold']")).not.toBeNull();
  });
});
