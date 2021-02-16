import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import "./Draggable";
import { Draggable } from "./Draggable";
import { DraggableItem } from "./DraggableItem";
import Sortable, { SortableEvent } from "sortablejs";



const fixtureFactory = async (): Promise<Draggable.ELEMENT> => {
  return await fixture(html`
    <md-draggable>
      <md-draggable-item slot="draggable-item">Sortable Item1</md-draggable-item>
      <md-draggable-item slot="draggable-item">Sortable Item2</md-draggable-item>
      <md-draggable-item slot="draggable-item">Sortable Item3</md-draggable-item>
      <md-draggable-item slot="draggable-item">Sortable Item4</md-draggable-item>
    </md-draggable>
  `);
};

describe("Draggable component", () => {

  afterEach(() => {
    fixtureCleanup();
  });

  test("should set component", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();
    expect(component.draggableSlot).toBeDefined();

    const el = component.shadowRoot?.querySelector(".md-draggable");
    expect(el?.getAttribute("class")).toEqual("md-draggable");
  });

  test("set editable mode for drag", async () => {
    const component = await fixtureFactory();
    component.editable = true;
    await elementUpdated(component);

    expect(component.getAttribute("editable")).toBeTruthy;

    const item = component.shadowRoot?.querySelector("md-draggable-item");
    expect(item?.getAttribute("editable")).toBeTruthy;
  });

  test("set editable mode for drag", async () => {
    const component = await fixtureFactory();
    component.sort = true;
    component.editable = true;
    await elementUpdated(component);

    const item = component.shadowRoot?.querySelector("md-draggable-item") as DraggableItem.ELEMENT;

    const mockDragStart = jest.spyOn(component, "handleOnStart");
    const mockDragAdd = jest.spyOn(component, "handleOnAdd");
    const mockDragChange = jest.spyOn(component, "handleOnChange");
    const mockDragRemove = jest.spyOn(component, "handleOnRemove");

    const startEvent: CustomEvent = new CustomEvent("drag-start", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
    const addEvent: CustomEvent = new CustomEvent("drag-add", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
    const changeEvent: CustomEvent = new CustomEvent("drag-change", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
    const removeEvent: CustomEvent = new CustomEvent("drag-remove", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
   
    component.handleOnStart(startEvent as unknown as SortableEvent);
    component.handleOnAdd(addEvent as unknown as SortableEvent);
    component.handleOnChange(changeEvent as unknown as SortableEvent);
    component.handleOnRemove(removeEvent as unknown as SortableEvent);

    expect(mockDragStart).toHaveBeenCalled();
    expect(mockDragAdd).toHaveBeenCalled();
    expect(mockDragChange).toHaveBeenCalled();
    expect(mockDragRemove).toHaveBeenCalled();

    mockDragStart.mockRestore();
    mockDragAdd.mockRestore();
    mockDragChange.mockRestore();
    mockDragRemove.mockRestore();
  });

  test("should dispatch event when move", async () => {
    const component = await fixtureFactory();
    component.sort = true;
    component.editable = true;
    await elementUpdated(component);

    const item = component.shadowRoot?.querySelector("md-draggable-item") as DraggableItem.ELEMENT;

    const mockDragStart = jest.spyOn(component, "handleOnStart");
    const mockDragChoose = jest.spyOn(component, "handleOnChoose");
    const mockDragMove = jest.spyOn(component, "handleOnMove");
    const mockDragUnchoose = jest.spyOn(component, "handleOnUnchoose");
    const mockDragEnd = jest.spyOn(component, "handleOnEnd");

    const startEvent: CustomEvent = new CustomEvent("drag-start", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
    const chooseEvent: CustomEvent = new CustomEvent("drag-choose", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
    const moveEvent: CustomEvent = new CustomEvent("drag-move", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
    const unchooseEvent: CustomEvent = new CustomEvent("drag-unchoose", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
    const endEvent: CustomEvent = new CustomEvent("drag-end", {
      bubbles: true,
      composed: true,
      detail: {
        srcEvent: { item }
      }
    });
   
    component.handleOnStart(startEvent as unknown as SortableEvent);
    component.handleOnChoose(chooseEvent as unknown as SortableEvent);
    component.handleOnMove(moveEvent as unknown as SortableEvent);
    component.handleOnUnchoose(unchooseEvent as unknown as SortableEvent);
    component.handleOnEnd(endEvent as unknown as SortableEvent);

    expect(mockDragStart).toHaveBeenCalled();
    expect(mockDragChoose).toHaveBeenCalled();
    expect(mockDragMove).toHaveBeenCalled();
    expect(mockDragUnchoose).toHaveBeenCalled();
    expect(mockDragEnd).toHaveBeenCalled();

    mockDragStart.mockRestore();
    mockDragChoose.mockRestore();
    mockDragMove.mockRestore();
    mockDragUnchoose.mockRestore();
    mockDragEnd.mockRestore();

  });

});
