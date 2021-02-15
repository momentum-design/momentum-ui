
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./DraggableItem";
import { DraggableItem } from "./DraggableItem";

const fixtureFactory = async (): Promise<DraggableItem.ELEMENT> => {
  return await fixture(html`
    <md-draggable-item>
      <span>Draggable  test content</span>
    </md-draggable-item>
  `);
};

describe("DraggableItem component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should set component", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();

    const el = component.shadowRoot?.querySelector(".md-draggable-item");
    expect(el?.getAttribute("class")).toEqual("md-draggable-item default");
  });

  test("should set component with extended view", async () => {
    const component = await fixtureFactory();
    component.extended = true;
    await elementUpdated(component);

    const el = component.shadowRoot?.querySelector(".md-draggable-item");
    expect(el?.getAttribute("class")).toEqual("md-draggable-item extended");
  });

  test("should set component with extended view", async () => {
    const component = await fixtureFactory();
    component.extended = true;
    component.editable = true;
    await elementUpdated(component);

    const el = component.shadowRoot?.querySelector(".md-draggable-item");
    expect(el?.getAttribute("class")).toEqual("md-draggable-item extended");
    const icon = component.shadowRoot?.querySelector(".md-draggable-item md-icon");
    expect(icon?.getAttribute("name")).toEqual("panel-control-dragger_16");
  });

});
