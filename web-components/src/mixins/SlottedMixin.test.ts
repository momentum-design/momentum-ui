import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { customElement, html, LitElement, query } from "lit-element";
import { SlotableInterface, SlottedMixin } from "./SlottedMixin";

describe("SLotted Mixin", () => {
  let el: CustomElement & SlotableInterface;

  @customElement("custom-element")
  class CustomElement extends SlottedMixin(SlottedMixin(LitElement)) {
    @query("slot") defaultSlot!: HTMLSlotElement;

    get slotElement() {
      return this.defaultSlot;
    }

    render() {
      return html`
        <div class="wrapper">
          <slot></slot>
        </div>
      `;
    }
  }

  afterEach(fixtureCleanup);
  beforeEach(async () => {
    el = await fixture<CustomElement & SlotableInterface>(html`
      <custom-element>
        <div>
          <span>One</span>
        </div>
        <div>
          <span>Two</span>
        </div>
      </custom-element>
    `);
  });

  test("should applying to component", () => {
    expect(el).toHaveProperty("slottedChanged", expect.any(Function));
    expect(el).toHaveProperty("filterSlotted", expect.any(Function));
  });

  test("should set `slotted` to the array of child nodes", () => {
    expect(el.slotted).toBeInstanceOf(Array);
    expect(el.slotted.length).toBe(2);
  });

  test("should update `items` value when removing nodes", async () => {
    el.removeChild(el.slotted[0]);
    await elementUpdated(el);
    expect(el.slotted.length).toBe(1);
  });

  test("should update `items` value when removing nodes", async () => {
    const div = document.createElement("div");
    el.appendChild(div);
    await elementUpdated(el);
    expect(el.slotted.length).toBe(3);
  });

  test("should disallow external `items` modifications", async () => {
    el.slotted = [];
    el.requestUpdate("slotted");
    await elementUpdated(el);
    expect(el.slotted.length).toBe(2);
  });
});
