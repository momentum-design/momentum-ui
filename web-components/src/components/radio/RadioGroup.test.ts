import { Key } from "@/constants";
import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, LitElement, PropertyValues } from "lit-element";
import "./Radio";
import { Radio } from "./Radio";
import "./RadioGroup";
import { RadioGroup } from "./RadioGroup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...args: any[]) => A;

describe("RadioGroup", () => {
  let element: RadioGroup.ELEMENT;
  let radioButtons: Radio.ELEMENT[];
  const keyEvent = (code: string) =>
    new KeyboardEvent("keydown", {
      code
    });

  beforeEach(async () => {
    element = await fixture<RadioGroup.ELEMENT>(html`
      <md-radiogroup group-label="recommendations">
        <md-radio slot="radio" value="developing">Developing</md-radio>
        <md-radio slot="radio" value="linting">Linting</md-radio>
        <md-radio slot="radio" value="testing">Testing</md-radio>
        <md-radio slot="radio" value="building">Building</md-radio>
      </md-radiogroup>
    `);
    radioButtons = element.slotted as Radio.ELEMENT[];
  });
  afterEach(fixtureCleanup);
  test("should set correct attribute", async () => {
    expect(element.getAttribute("group-label")).toEqual("recommendations");
    expect(element.getAttribute("role")).toEqual("radiogroup");
    expect(element.getAttribute("aria-label")).toEqual("recommendations");
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

    const tag = defineCE(class extends mixin(RadioGroup.ELEMENT) {});
    const firstElement = fixtureSync<RadioGroup.ELEMENT>(`<${tag}></${tag}>`);
    const firstEvent = await oneEvent(firstElement, "first-updated");
    expect(firstEvent).toBeDefined();

    firstElement.parentElement!.removeChild(firstElement);
    setTimeout(() => firstElement.disconnectedCallback());
    const thirdEvent = await oneEvent(firstElement, "disconnected-callback");
    expect(thirdEvent).toBeDefined();

    fixtureCleanup();

    const secondElement = document.createElement(`${tag}`) as RadioGroup.ELEMENT;
    setTimeout(() => secondElement.connectedCallback());
    const secondEvent = await oneEvent(secondElement, "connected-callback");
    expect(secondEvent).toBeDefined();
  });

  test("should handle click event", async () => {
    radioButtons[0].click();
    await elementUpdated(element);

    expect(element.selected).toEqual(0);

    radioButtons[0].click();
    await elementUpdated(element);

    expect(element.selected).toEqual(0);

    radioButtons[2].disabled = true;
    await elementUpdated(element);

    radioButtons[2].click();
    await elementUpdated(element);

    expect(element.selected).toEqual(0);
  });

  test("should set focus on first radio if checked is not provided", async () => {
    expect(element.checked).toEqual(-1);

    element.dispatchEvent(keyEvent(Key.Tab));
    expect(document.activeElement).toEqual(radioButtons[0]);

    element.dispatchEvent(keyEvent(Key.Space));
    await elementUpdated(element);
    expect(element.selected).toEqual(0);
    expect(radioButtons[0].checked).toBeTruthy();
  });

  test("should handle keydown event", async () => {
    radioButtons[0].click();
    await elementUpdated(element);

    element.dispatchEvent(keyEvent("KeyA"));
    await elementUpdated(element);
    expect(element.selected).toEqual(0);
    expect(radioButtons[0].checked).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowDown));
    await elementUpdated(element);
    expect(element.selected).toEqual(1);
    expect(radioButtons[0].checked).toBeFalsy();
    expect(radioButtons[1].checked).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowRight));
    await elementUpdated(element);
    expect(element.selected).toEqual(2);
    expect(radioButtons[1].checked).toBeFalsy();
    expect(radioButtons[2].checked).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowRight));
    await elementUpdated(element);
    expect(element.selected).toEqual(3);
    expect(radioButtons[2].checked).toBeFalsy();
    expect(radioButtons[3].checked).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowRight));
    await elementUpdated(element);
    expect(element.selected).toEqual(0);
    expect(radioButtons[3].checked).toBeFalsy();
    expect(radioButtons[0].checked).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowUp));
    await elementUpdated(element);
    expect(element.selected).toEqual(3);
    expect(radioButtons[0].checked).toBeFalsy();
    expect(radioButtons[3].checked).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowLeft));
    await elementUpdated(element);
    expect(element.selected).toEqual(2);
    expect(radioButtons[3].checked).toBeFalsy();
    expect(radioButtons[2].checked).toBeTruthy();
  });

  test("set first checked radio if checked property index provided", async () => {
    const el = await fixture<RadioGroup.ELEMENT>(html`
      <md-radiogroup group-label="recommendations" checked="2">
        <md-radio slot="radio" value="developing">Developing</md-radio>
        <md-radio slot="radio" value="linting">Linting</md-radio>
        <md-radio slot="radio" value="testing">Testing</md-radio>
        <md-radio slot="radio" value="building">Building</md-radio>
      </md-radiogroup>
    `);
    expect(el.selected).toEqual(2);
  });
  test("should dispatch event when radio change", async () => {
    const clickEvent = new MouseEvent("click");

    setTimeout(() => {
      radioButtons[0].click();
      element.handleClick(clickEvent);
    });
    const { detail } = await oneEvent(element, "radio-change");

    await elementUpdated(element);

    expect(detail).toBeDefined();
  });

  test("disable check on radio group", async () => {
    const el = await fixture<RadioGroup.ELEMENT>(html`
      <md-radiogroup disabled group-label="recommendations">
        <md-radio slot="radio" value="developing">Developing</md-radio>
        <md-radio slot="radio" value="linting">Linting</md-radio>
        <md-radio slot="radio" value="testing">Testing</md-radio>
        <md-radio slot="radio" value="building">Building</md-radio>
      </md-radiogroup>
    `);
    const clickEvent = new MouseEvent("click");
    setTimeout(() => {
      radioButtons[0].click();
      el.handleClick(clickEvent);
    });
    const { detail } = await oneEvent(element, "radio-change");
    await elementUpdated(element);
    expect(detail).toBeDefined();
    const notifyEvent = jest.spyOn(el, "notifySelectedChange" as never);
    expect(notifyEvent).toBeCalledTimes(0);

    const keyboardEvent = new KeyboardEvent("keydown");
    el.handleKeyDown(keyboardEvent);
    await elementUpdated(element);
    expect(notifyEvent).toBeCalledTimes(0);
  });
});
