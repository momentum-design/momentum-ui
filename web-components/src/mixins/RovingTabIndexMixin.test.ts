import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { RovingTabIndexInterface, RovingTabIndexMixin } from "./RovingTabIndexMixin";

describe("RovingTabIndex Mixin", () => {
  let el: CustomElement & RovingTabIndexInterface;

  @customElement("custom-element")
  class CustomElement extends RovingTabIndexMixin(RovingTabIndexMixin(LitElement)) {
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
    el = await fixture<CustomElement & RovingTabIndexInterface>(html`
      <custom-element selected="2">
        <div>
          <span>One</span>
        </div>
        <div>
          <span>Two</span>
        </div>
        <div disabled>
          <span>Three</span>
        </div>
        <div>
          <span>Four</span>
        </div>
      </custom-element>
    `);
  });

  test("should applying to component", () => {
    expect(el).toHaveProperty("selected", expect.any(Number));
    expect(el).toHaveProperty("getAvailableSelectedIndex", expect.any(Function));
  });

  test("should not set tabindex if selected item is not correct", () => {
    expect(el.slotted[0].tabIndex).toBe(-1);
  });

  test("should set tabindex to next available item", async () => {
    el.selected = 1;
    await elementUpdated(el);
    expect(el.slotted[0].tabIndex).toBe(-1);
    expect(el.slotted[1].tabIndex).toBe(0);
  });

  test("should prevent focus in rovingPreventFocus property is passed", async () => {
    el.rovingPreventFocus = true;
    await elementUpdated(el);
    expect(document.activeElement).not.toEqual(el);
  });
});
