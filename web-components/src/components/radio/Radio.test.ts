import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { PropertyValues } from "lit-element";
import { screen } from "shadow-dom-testing-library";
import { Radio } from "./Radio";

describe("Radio", () => {
  afterEach(fixtureCleanup);
  test("should set label attribute", async () => {
    const element = await fixture<Radio.ELEMENT>(`<md-radio value="linting">Linting</md-radio>`);
    expect(element.value).toEqual("linting");
  });
  test("should set tabindex attribute", async () => {
    const element = await fixture<Radio.ELEMENT>(`<md-radio>Linting</md-radio>`);
    expect(element.getAttribute("tabindex")).toEqual("-1");
  });
  test("should add correct aria attribute", async () => {
    const element = await fixture<Radio.ELEMENT>(`<md-radio disabled>Linting</md-radio>`);
    expect(element.disabled).toBeTruthy();

    const radio = screen.getByShadowRole("radio");
    expect(radio).toBeTruthy();
    expect(radio.getAttribute("disabled")).toBeDefined();
  });

  test("should change tabindex when disabled attribute is set", async () => {
    const element = await fixture<Radio.ELEMENT>(`<md-radio disabled>Linting</md-radio>`);

    expect(element.tabIndex).toEqual(-1);
    expect(element.getAttribute("tabindex")).toEqual("-1");

    element.disabled = false;
    await elementUpdated(element);

    expect(element.tabIndex).toEqual(0);
    expect(element.getAttribute("tabindex")).toEqual("0");
  });

  test("should handle checked attribute", async () => {
    const element = await fixture<Radio.ELEMENT>(`<md-radio>Linting</md-radio>`);
    element.checked = false;
    await elementUpdated(element);
    expect(element.getAttribute("checked")).toBeNull();
    element.checked = true;
    await elementUpdated(element);
    expect(element.checked).toBeTruthy();
    expect(element.getAttribute("checked")).toBeDefined();
  });

  test("handle firstUpdated lifecycle hook", async () => {
    const tag = defineCE(
      class extends Radio.ELEMENT {
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

  test("should set aria-label if label is set", async () => {
    const labelValue = "Test Label";
    const element = await fixture(`<md-radio label="${labelValue}"></md-radio>`);
    await elementUpdated(element);

    const radioInput = screen.getByShadowRole("radio");
    expect(radioInput).toBeTruthy();
    expect(radioInput.getAttribute("aria-label")).toEqual(labelValue);
  });
});
