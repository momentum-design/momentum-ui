/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, LitElement, PropertyValues } from "lit-element";
import "./ButtonGroup";
import { ButtonGroup } from "./ButtonGroup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<A = LitElement> = new (...args: any[]) => A;

describe("ButtonGroup", () => {
  let element: ButtonGroup.ELEMENT;

  let buttons: HTMLButtonElement[];

  const keyEvent = (code: string) =>
    new KeyboardEvent("keydown", {
      code
    });

  beforeEach(async () => {
    element = await fixture<ButtonGroup.ELEMENT>(html`
      <md-button-group>
        <button slot="button" type="button"><md-icon name="icon-text-table_16"></md-icon></button>
        <button slot="button" type="button"><md-icon name="icon-analysis_16"></md-icon></button>
        <button slot="button" type="button">Option A</button>
        <button slot="button" type="button">Option B</button>
      </md-button-group>
    `);

    buttons = element.slotted as HTMLButtonElement[];
  });
  afterEach(fixtureCleanup);

  test("should add correct aria attribute", async () => {
    element.disabled = true;
    await elementUpdated(element);

    expect(element.disabled).toBeTruthy();
    expect(element.getAttribute("aria-disabled")).toEqual("true");
    expect(element.getAttribute("role")).toEqual("group");
  });

  test("should change tabindex when disabled attribute is set", async () => {
    element.disabled = true;
    await elementUpdated(element);

    expect(element.tabIndex).toEqual(-1);
    expect(element.getAttribute("tabindex")).toEqual("-1");

    element.disabled = false;
    await elementUpdated(element);

    expect(element.tabIndex).toEqual(0);
    expect(element.getAttribute("tabindex")).toEqual("0");
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

    const tag = defineCE(class extends mixin(ButtonGroup.ELEMENT) {});
    const firstElement = fixtureSync<ButtonGroup.ELEMENT>(`<${tag}></${tag}>`);
    const firstEvent = await oneEvent(firstElement, "first-updated");
    expect(firstEvent).toBeDefined();

    firstElement.parentElement!.removeChild(firstElement);
    setTimeout(() => firstElement.disconnectedCallback());
    const thirdEvent = await oneEvent(firstElement, "disconnected-callback");
    expect(thirdEvent).toBeDefined();

    fixtureCleanup();

    const secondElement = document.createElement(`${tag}`) as ButtonGroup.ELEMENT;
    setTimeout(() => secondElement.connectedCallback());
    const secondEvent = await oneEvent(secondElement, "connected-callback");
    expect(secondEvent).toBeDefined();
  });

  test("should handle click event", async () => {
    buttons[0].click();
    await elementUpdated(element);

    expect(buttons[0].hasAttribute("selected")).toBeTruthy();

    buttons[1].click();
    await elementUpdated(element);

    expect(buttons[1].hasAttribute("selected")).toBeTruthy();

    buttons[2].disabled = true;
    await elementUpdated(element);

    buttons[2].click();
    await elementUpdated(element);

    expect(buttons[2].hasAttribute("selected")).toBeFalsy();
  });

  test("should handle keydown event", async () => {
    buttons[0].click();
    await elementUpdated(element);

    element.dispatchEvent(keyEvent("KeyA"));
    await elementUpdated(element);
    expect(buttons[0].hasAttribute("selected")).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowRight));
    await elementUpdated(element);
    expect(buttons[1].hasAttribute("selected")).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowRight));
    await elementUpdated(element);
    expect(buttons[2].hasAttribute("selected")).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowRight));
    await elementUpdated(element);
    expect(buttons[3].hasAttribute("selected")).toBeTruthy();

    element.dispatchEvent(keyEvent(Key.ArrowLeft));
    await elementUpdated(element);
    expect(buttons[2].hasAttribute("selected")).toBeTruthy();
  });
});
