import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { PropertyValues } from "lit-element";
import "./ListItem";
import { ListItem } from "./ListItem";

describe("ListItem", () => {
  afterEach(fixtureCleanup);
  test("should set tabindex attribute", async () => {
    const element = await fixture<ListItem.ELEMENT>(`<md-list-item>Neptunium</md-list-item>`);
    expect(element.getAttribute("tabindex")).toEqual("-1");
  });
  test("should add correct aria attribute", async () => {
    const element = await fixture<ListItem.ELEMENT>(`<md-list-item disabled>Neptunium</md-list-item>`);
    expect(element.disabled).toBeTruthy();
    expect(element.getAttribute("aria-disabled")).toEqual("true");
    expect(element.getAttribute("role")).toEqual("option");
  });

  test("should change tabindex when disabled attribute is set", async () => {
    const element = await fixture<ListItem.ELEMENT>(`<md-list-item disabled>Neptunium</md-list-item>`);

    expect(element.tabIndex).toEqual(-1);
    expect(element.getAttribute("tabindex")).toEqual("-1");

    element.disabled = false;
    await elementUpdated(element);

    expect(element.tabIndex).toEqual(-1);
    expect(element.getAttribute("tabindex")).toEqual("-1");
  });

  test("handle firstUpdated lifecycle hook", async () => {
    const tag = defineCE(
      class extends ListItem.ELEMENT {
        protected firstUpdated(changedProperties: PropertyValues) {
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }
      }
    );
    const element = fixtureSync(`<${tag}></${tag}>`);
    const event = await oneEvent(element, "first-updated");
    expect(event).toBeDefined();
  });

  test("should reflect shape property changes to the class attribute", async () => {
    const element = await fixture<ListItem.ELEMENT>(`<md-list-item shape="rounded"></md-list-item>`);
    const listItem = await element.shadowRoot!.querySelector(".md-list-item--rounded");
    let expectedClassList = ["md-list-item", "md-list-item--rounded"];
    expect(listItem?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every(className => listItem?.classList?.contains(className))).toBe(true);

    element.shape = "pill";
    await elementUpdated(element);
    expectedClassList = ["md-list-item", "md-list-item--pill"];
    expect(listItem?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every(className => listItem?.classList?.contains(className))).toBe(true);
  });
});
