import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import Sortable, { SortableEvent, SortableOptions } from "sortablejs";
import "./Draggable";
import { Draggable } from "./Draggable";
import "./DraggableItem";
import { DraggableItem } from "./DraggableItem";

const resetMocks = () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
};

describe("Draggable Component", () => {
  let element: Draggable.ELEMENT;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    resetMocks();

    element = await fixture<Draggable.ELEMENT>(html`
      <md-draggable>
        <md-draggable-item slot="draggable-item">Sortable Item1</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item2</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item3</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item4</md-draggable-item>
      </md-draggable>
    `);
  });

  test.each([
    ["choose", "handleOnChoose"],
    ["unchoose", "handleOnUnchoose"],
    ["move", "handleOnMove"],
    ["end", "handleOnEnd"],
    ["clone", "handleOnClone"],
    ["start", "handleOnStart"],
    ["add", "handleOnAdd"],
    ["remove", "handleOnRemove"],
    ["change", "handleOnChange"]
  ])("emitted `%s` event from sortable", async (event: string, functionName: string) => {
    const mockSortableEvent = new CustomEvent<SortableEvent>(event, {
      detail: {
        from: jest.fn().mockReturnValue(element) as unknown as HTMLElement,
        clone: jest.fn().mockReturnValue(element) as unknown as HTMLElement,
        item: jest.fn().mockReturnValue(element) as unknown as HTMLElement,
        target: jest.fn().mockReturnValue(element) as unknown as HTMLElement,
        to: jest.fn().mockReturnValue(element) as unknown as HTMLElement,
        newIndex: jest.fn().mockReturnValue(0) as unknown as number,
        oldIndex: jest.fn().mockReturnValue(1) as unknown as number
      } as SortableEvent
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTimeout(() => (element as any)[functionName](mockSortableEvent));

    const { detail } = await oneEvent(element, `drag-${event}`);

    expect(detail).toBeDefined();
    expect(detail.srcEvent).toEqual(mockSortableEvent);
  });

  test("should cleanup sortable instance after disconnected from DOM", async () => {
    element["sortableInstance"] = jest.fn().mockReturnValue({
      el: element
    } as unknown as SortableOptions) as unknown as Sortable;

    const mockDestroy = jest.fn();

    element["sortableInstance"].destroy = mockDestroy;

    element.parentElement!.removeChild(element);
    setTimeout(() => element.disconnectedCallback());

    expect(mockDestroy).toHaveBeenCalled();
  });

  test("should initialize sortable instance after slot `change` event", async () => {
    const initializeSortableMock = jest.fn();
    element["slottedChanged"] = initializeSortableMock;

    const draggableItem = await fixture<DraggableItem.ELEMENT>(html`
      <md-draggable-item slot="draggable-item">Sortable Item5</md-draggable-item>
    `);
    element.append(draggableItem);
    await elementUpdated(element);

    expect(initializeSortableMock).toHaveBeenCalled();
  });

  test("should update sortable options if any related property changed", async () => {
    element["sortableInstance"] = jest.fn().mockReturnValue({
      el: element
    } as unknown as SortableOptions) as unknown as Sortable;

    const optionMock = jest.fn();
    element["sortableInstance"].destroy = jest.fn();
    element["sortableInstance"].option = optionMock.mockImplementation(() => true);

    element.delay = 100;
    await elementUpdated(element);

    expect(optionMock).toHaveBeenCalled();
  });
});
