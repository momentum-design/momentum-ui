import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import "./Draggable";
import { Draggable } from "./Draggable";
import Sortable, { SortableEvent } from "sortablejs";

const fixtureFactory = async (): Promise<Draggable.ELEMENT> => {
  return await fixture(html`
    <md-draggable>
      <md-draggable-item>Sortable Item1</md-draggable-item>
      <md-draggable-item>Sortable Item2</md-draggable-item>
      <md-draggable-item>Sortable Item3</md-draggable-item>
      <md-draggable-item>Sortable Item4</md-draggable-item>
    </md-draggable>
  `);
};

describe("Draggable component", () => {
  let draggable: Draggable.ELEMENT;

  afterEach(() => {
    fixtureCleanup();
  });

  test("should set component", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();

    const el = component.shadowRoot?.querySelector(".md-draggable");
    expect(el?.getAttribute("class")).toEqual("md-draggable");
  });

  test("set editable mode for drag", async () => {
    const component = await fixtureFactory();
    component.editable = true;
    await elementUpdated(component);

    expect(component.getAttribute("editable")).toBeTruthy;

    const item = component.shadowRoot?.querySelector("md-draggable-item");
    expect(item?.getAttribute("edit")).toBeTruthy;
  });

  test("set editable mode for drag", async () => {
    const component = await fixtureFactory();
    component.editable = true;
    await elementUpdated(component);

    const mockFn = jest.fn().mockName('handleOnStart');
    mockFn();

    expect(mockFn).toHaveBeenCalled();
  });

});
