import { Key } from "@/constants";
import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit";
import "./Checkbox";
import "./CheckboxGroup";
import { CheckboxGroup } from "./CheckboxGroup";

describe("Checkbox component", () => {
  let element: CheckboxGroup.ELEMENT;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<CheckboxGroup.ELEMENT>(html`
      <md-checkboxgroup group-label="group_process">
        <md-checkbox slot="checkbox">Developing</md-checkbox>
        <md-checkbox slot="checkbox">Linting</md-checkbox>
        <md-checkbox slot="checkbox">Testing</md-checkbox>
      </md-checkboxgroup>
    `);
  });

  test("should switch radio using keyboard", async () => {
    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    expect(element.selected).toEqual(0);
    element.dispatchEvent(createEvent(Key.ArrowDown));
    expect(element.selected).toEqual(1);
    element.dispatchEvent(createEvent(Key.ArrowDown));
    expect(element.selected).toEqual(2);
    element.dispatchEvent(createEvent(Key.ArrowDown));
    expect(element.selected).toEqual(0);
    element.dispatchEvent(createEvent(Key.ArrowUp));
    expect(element.selected).toEqual(2);
    element.dispatchEvent(createEvent(Key.ArrowUp));
    expect(element.selected).toEqual(1);
    element.dispatchEvent(createEvent("KeyA"));
    expect(element.selected).toEqual(1);
  });
});
