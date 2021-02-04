import { defineCE, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
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
  });
});
