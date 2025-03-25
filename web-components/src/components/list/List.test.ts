import { Key } from "@/constants";
import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, LitElement, PropertyValues } from "lit";
import { List } from "./List";
import "./ListItem";
import { type ListItem } from "./ListItem";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...args: any[]) => A;

describe("List", () => {
  let element: List.ELEMENT;
  let listItems: ListItem.ELEMENT[];
  const keyEvent = (code: string) =>
    new KeyboardEvent("keydown", {
      code
    });

  beforeEach(async () => {
    jest.useFakeTimers();
    element = await fixture<List.ELEMENT>(html`
      <md-list label="Transuranium elements">
        <md-list-item slot="list-item">Neptunium</md-list-item>
        <md-list-item slot="list-item">Plutonium</md-list-item>
        <md-list-item slot="list-item">Americium</md-list-item>
        <md-list-item slot="list-item">Curium</md-list-item>
      </md-list>
    `);
    listItems = element.slotted as ListItem.ELEMENT[];
    jest.runAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should set correct attribute", async () => {
    expect(element.shadowRoot?.querySelector("ul")?.getAttribute("role")).toEqual("listbox");
    expect(element.getAttribute("aria-label")).toEqual("Transuranium elements");
    expect(element.getAttribute("alignment")).toEqual("vertical");

    element.alignment = "horizontal";
    await elementUpdated(element);

    expect(element.getAttribute("alignment")).toEqual("horizontal");
  });

  test("should correct handle lifecycle callbacks", async () => {
    const mixin = (superclass: AnyConstructor) =>
      class extends superclass {
        protected firstUpdated(changedProperties: PropertyValues) {
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }

        connectedCallback() {
          super.connectedCallback();
          this.dispatchEvent(new CustomEvent("connected-callback"));
        }

        disconnectedCallback() {
          super.disconnectedCallback();
          this.dispatchEvent(new CustomEvent("disconnected-callback"));
        }
      };

    const tag = defineCE(class extends mixin(List.ELEMENT) {});
    const firstElement = fixtureSync<List.ELEMENT>(`<${tag}></${tag}>`);
    const firstEvent = await oneEvent(firstElement, "first-updated");
    expect(firstEvent).toBeDefined();

    firstElement.parentElement!.removeChild(firstElement);
    const disconnectedPromise = oneEvent(firstElement, "disconnected-callback");
    firstElement.disconnectedCallback();
    const thirdEvent = await disconnectedPromise;
    expect(thirdEvent).toBeDefined();

    const secondElement = document.createElement(`${tag}`) as List.ELEMENT;
    const connectedPromise = oneEvent(secondElement, "connected-callback");
    secondElement.connectedCallback();
    const secondEvent = await connectedPromise;
    expect(secondEvent).toBeDefined();
  });

  test("should handle click event", async () => {
    listItems[0].click();
    await elementUpdated(element);

    expect(element.selected).toEqual(0);

    listItems[0].click();
    await elementUpdated(element);

    expect(element.selected).toEqual(0);

    listItems[2].disabled = true;
    await elementUpdated(element);

    listItems[2].click();
    await elementUpdated(element);

    expect(element.selected).toEqual(0);
  });

  test("should set focus on first list item if selected is not provided", async () => {
    expect(element.selected).toEqual(0);
    element.dispatchEvent(keyEvent(Key.Tab));
    expect(document.activeElement).toEqual(listItems[0]);
    expect(element.selected).toEqual(0);
  });

  test("should reflect changes rely to activated", async () => {
    element.activated = 4;
    await elementUpdated(element);

    expect(element.selected).toEqual(4);
    expect(listItems[3].selected).toBeFalsy();

    element.activated = 3;
    await elementUpdated(element);

    expect(element.selected).toEqual(3);
    expect(listItems[3].selected).toBeTruthy();
  });

  test("should handle keydown event", async () => {
    listItems[0].click();
    await elementUpdated(element);
    element.dispatchEvent(keyEvent("KeyA"));
    await elementUpdated(element);
    expect(element.activated).toEqual(0);
    element.dispatchEvent(keyEvent(Key.Space));
    await elementUpdated(element);
    expect(listItems[0].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowDown));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Enter));
    await elementUpdated(element);
    expect(element.activated).toEqual(1);
    expect(listItems[0].selected).toBeFalsy();
    expect(listItems[1].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowRight));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Enter));
    await elementUpdated(element);
    expect(element.activated).toEqual(2);
    expect(listItems[1].selected).toBeFalsy();
    expect(listItems[2].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowDown));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Enter));
    await elementUpdated(element);
    expect(element.activated).toEqual(3);
    expect(listItems[2].selected).toBeFalsy();
    expect(listItems[3].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowDown));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Space));
    await elementUpdated(element);
    expect(element.activated).toEqual(0);
    expect(listItems[3].selected).toBeFalsy();
    expect(listItems[0].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowUp));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Space));
    await elementUpdated(element);
    expect(element.activated).toEqual(3);
    expect(listItems[0].selected).toBeFalsy();
    expect(listItems[3].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowLeft));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Space));
    await elementUpdated(element);
    expect(element.activated).toEqual(2);
    expect(listItems[3].selected).toBeFalsy();
    expect(listItems[2].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.Home));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Space));
    await elementUpdated(element);
    expect(element.activated).toEqual(0);
    expect(listItems[3].selected).toBeFalsy();
    expect(listItems[0].selected).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.End));
    await elementUpdated(element);
    element.dispatchEvent(keyEvent(Key.Enter));
    await elementUpdated(element);
    expect(element.activated).toEqual(3);
    expect(listItems[0].selected).toBeFalsy();
    expect(listItems[3].selected).toBeTruthy();
  });

  test("set first checked list item if selected property index provided", async () => {
    element.selected = 2;
    await elementUpdated(element);
    expect(element.selected).toEqual(2);
  });
  test("should dispatch event when list item change", async () => {
    const clickEvent = new MouseEvent("click");

    const listItemChangePromise = oneEvent(element, "list-item-change");

    listItems[0].click();
    element.handleClick(clickEvent);

    const { detail } = await listItemChangePromise;

    await elementUpdated(element);

    expect(detail).toBeDefined();
  });
});
