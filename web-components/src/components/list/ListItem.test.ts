import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, PropertyValues } from "lit";
import "../link/Link";
import { type Link } from "../link/Link";
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
          this.dispatchEvent(new CustomEvent("first-updated", { detail: this.getAttribute("tabindex") }));
        }
      }
    );
    const element = fixtureSync(`<${tag}></${tag}>`);
    const event = await oneEvent(element, "first-updated");
    expect(event).toBeDefined();
    expect(event.detail).toBe("-1");
  });

  test("should reflect shape property changes to the class attribute", async () => {
    const element = await fixture<ListItem.ELEMENT>(`<md-list-item shape="rounded"></md-list-item>`);
    const listItem = await element.shadowRoot!.querySelector(".md-list-item--rounded");
    let expectedClassList = ["md-list-item", "md-list-item--rounded"];
    expect(listItem?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => listItem?.classList?.contains(className))).toBe(true);

    element.shape = "pill";
    await elementUpdated(element);
    expectedClassList = ["md-list-item", "md-list-item--pill"];
    expect(listItem?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => listItem?.classList?.contains(className))).toBe(true);
  });

  test("should only set aria-selected when role is option", async () => {
    const optionElement = await fixture<ListItem.ELEMENT>(`<md-list-item selected>Option</md-list-item>`);
    expect(optionElement.getAttribute("role")).toEqual("option");
    expect(optionElement.getAttribute("aria-selected")).toEqual("true");

    const listItemElement = await fixture<ListItem.ELEMENT>(
      `<md-list-item role="listitem" selected>List Item</md-list-item>`
    );
    expect(listItemElement.getAttribute("role")).toEqual("listitem");
    expect(listItemElement.hasAttribute("aria-selected")).toBe(false);

    const menuItemElement = await fixture<ListItem.ELEMENT>(
      `<md-list-item role="menuitem" selected>Menu Item</md-list-item>`
    );
    expect(menuItemElement.getAttribute("role")).toEqual("menuitem");
    expect(menuItemElement.hasAttribute("aria-selected")).toBe(false);
  });

  test("should delegate programmatic focus and preserve focus indicator events", async () => {
    const item = await fixture<ListItem.ELEMENT>(html`
      <md-list-item role="listitem" focus-selector="md-link" tabindex="0">
        <md-link href="#task">Task</md-link>
      </md-list-item>
    `);
    const link = item.querySelector<Link.ELEMENT>("md-link")!;
    await elementUpdated(link);
    const focused = jest.fn();
    const blurred = jest.fn();
    item.addEventListener("focus-visible", focused);
    item.addEventListener("focus-not-visible", blurred);
    item.focus();
    expect(item.hasAttribute("tabindex")).toBe(false);
    expect(link.linkRef.tabIndex).toBe(0);
    expect(link.shadowRoot?.activeElement).toBe(link.linkRef);
    expect(item.hasAttribute("focus-visible")).toBe(true);
    expect(focused).toHaveBeenCalledTimes(1);
    item.blur();
    expect(item.hasAttribute("focus-visible")).toBe(false);
    expect(blurred).toHaveBeenCalledTimes(1);
  });

  test("should delegate focus to a link inside a wrapper", async () => {
    const item = await fixture<ListItem.ELEMENT>(html`
      <md-list-item focus-selector="md-link" tabindex="0">
        <div><md-link href="#task">Task</md-link></div>
      </md-list-item>
    `);
    const link = item.querySelector<Link.ELEMENT>("md-link")!;
    await elementUpdated(link);

    expect(item.hasAttribute("tabindex")).toBe(false);
    expect(link.linkRef.tabIndex).toBe(0);
    item.focus();
    expect(link.shadowRoot?.activeElement).toBe(link.linkRef);
  });

  test("should keep the host out of the tab order when its tabindex attribute is set to the existing value", async () => {
    const item = await fixture<ListItem.ELEMENT>(html`
      <md-list-item focus-selector="md-link" tabindex="0">
        <md-link href="#task">Task</md-link>
      </md-list-item>
    `);
    const link = item.querySelector<Link.ELEMENT>("md-link")!;
    await elementUpdated(link);
    expect(item.hasAttribute("tabindex")).toBe(false);

    item.setAttribute("tabindex", "0");
    await elementUpdated(item);
    await elementUpdated(link);

    expect(item.hasAttribute("tabindex")).toBe(false);
    expect(item.tabIndex).toBe(0);
    expect(link.linkRef.tabIndex).toBe(0);
  });

  test("should restore tab stops when delegation is disabled and handle a replacement link", async () => {
    const item = await fixture<ListItem.ELEMENT>(html`
      <md-list-item focus-selector="md-link" tabindex="0">
        <md-link href="#first" tab-index="-1">First</md-link>
      </md-list-item>
    `);
    const original = item.querySelector<Link.ELEMENT>("md-link")!;
    await elementUpdated(original);
    expect(item.hasAttribute("tabindex")).toBe(false);
    expect(original.tabIndex).toBe(0);

    item.removeAttribute("focus-selector");
    await elementUpdated(item);
    await elementUpdated(original);
    expect(item.tabIndex).toBe(0);
    expect(original.tabIndex).toBe(-1);

    item.setAttribute("focus-selector", "md-link");
    await elementUpdated(item);
    const replacement = document.createElement("md-link");
    replacement.href = "#replacement";
    item.replaceChildren(replacement);
    await elementUpdated(item);
    await elementUpdated(replacement);
    expect(original.tabIndex).toBe(-1);
    expect(item.hasAttribute("tabindex")).toBe(false);
    expect(replacement.linkRef.tabIndex).toBe(0);
    item.focus();
    expect(replacement.shadowRoot?.activeElement).toBe(replacement.linkRef);
  });
});
