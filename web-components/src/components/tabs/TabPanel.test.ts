import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { PropertyValues } from "lit-element";
import "./TabPanel";
import { TabPanel } from "./TabPanel";

describe("TabPanel", () => {
  afterEach(fixtureCleanup);

  test("should set `role` attribute", async () => {
    const tag = defineCE(
      class extends TabPanel.ELEMENT {
        protected firstUpdated(changedProperties: PropertyValues) {
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }
      }
    );
    const el = fixtureSync<TabPanel.ELEMENT>(`<${tag}></${tag}>`);
    const ev = await oneEvent(el, "first-updated");
    expect(ev).toBeDefined();
    expect(el.hasAttribute("role")).toBeTruthy();
    expect(el.getAttribute("role")).toBe("tabpanel");
    expect(el.getAttribute("tabindex")).toBe("0");
  });

  test("should not have tabindex attribute when removeFocus is passed", async () => {
    const el = await fixture<TabPanel.ELEMENT>(`<md-tab-panel removeFocus="true"></md-tab-panel>`);
    await elementUpdated(el);
    expect(el.hasAttribute("tabindex")).not.toBeTruthy();
  });

});
