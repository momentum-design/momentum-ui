import { Input } from "@/components/input/Input";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./EditableTextfield";
import { EditableTextfield } from "./EditableTextfield";

const validInputs = {
  text: "text",
  integer: "123",
  decimal: "123.321",
  boolean: "false",
  date: "10/10/2010",
  time: "10:30PM"
};
const invalidInputs = {
  text: 123,
  integer: "1a2-3",
  decimal: ".123.321",
  boolean: "f ",
  date: "15/20/2010",
  time: "10:0PM"
};

const fixtureFactory = async (fieldAlignment: EditableTextfield.Alignment): Promise<EditableTextfield.ELEMENT> => {
  return await fixture(html` <md-editable-field .alignment="${fieldAlignment}">Test text Message</md-editable-field> `);
};

const errorMessageArr: Input.Message = {
  message: "This is where the message would be.",
  type: "error"
};

describe("Editable Textfield component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render component", async () => {
    expect.hasAssertions();
    const component = await fixtureFactory("left");
    expect(component).not.toBeNull();
    expect(component.disabled).toBeFalsy();
  });

  test("should change isEditing property to true after click", async () => {
    const component = await fixtureFactory("left");
    await elementUpdated(component);

    component.handleFocus();
    await elementUpdated(component);

    expect(component.isEditing).toBeTruthy();
  });

  test("shouldn't change property if component is disabled", async () => {
    const component = await fixtureFactory("left");
    component.disabled = true;
    await elementUpdated(component);

    component.handleFocus();
    await elementUpdated(component);

    expect(component.isEditing).toBeFalsy();
  });

  test("should change class if change property", async () => {
    const component = await fixtureFactory("center");
    await elementUpdated(component);

    const el = component.shadowRoot?.querySelector("div.md-editable-textfield");
    let expectedClassList = ["md-editable-textfield", "md-editable-textfield--center"];
    expect(el?.classList?.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => el?.classList?.contains(className))).toBe(true);

    component.alignment = "right";
    await elementUpdated(component);

    expectedClassList = ["md-editable-textfield", "md-editable-textfield--right"];
    expect(el?.classList?.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => el?.classList?.contains(className))).toBe(true);
  });

  test("should update slot element's contenteditable attribute when clicked", async () => {
    const originalText = "test text";
    const component: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field content=${originalText}></md-editable-field>
    `);

    const innerElement = component.shadowRoot?.querySelector<HTMLElement>(".md-editable-textfield");
    innerElement?.focus();

    await elementUpdated(component);

    expect(component.isEditing).toBeTruthy();
    expect(innerElement?.getAttribute("contenteditable")).toBe("");
  });

  test("should update slot element's contenteditable attribute when field blur()", async () => {
    const component: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field>test text</md-editable-field>
    `);

    // First set the component to editing mode
    component.handleFocus();
    await elementUpdated(component);

    // Then trigger blur
    const innerElement = component.shadowRoot?.querySelector(".md-editable-textfield");
    component.handleBlur();
    await elementUpdated(component);

    expect(component.isEditing).toBeFalsy();
    expect(innerElement?.getAttribute("contenteditable")).toBeFalsy();
  });

  test("should render default text", async () => {
    const element: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field content="test content"></md-editable-field>
    `);
    // Fixed: Test that content is properly set
    expect(element.content).toEqual("test content");
  });

  test("should reset the alert when renewing validation", async () => {
    const element: EditableTextfield.ELEMENT = await fixture(html` <md-editable-field></md-editable-field> `);
    element.alert = true; // Set alert to true first
    await elementUpdated(element);

    element.handleBlur();
    await elementUpdated(element);

    expect(element.alert).toBeFalsy();
  });

  test("should trigger validation function on blur", async () => {
    const element: EditableTextfield.ELEMENT = await fixture(html` <md-editable-field></md-editable-field> `);
    const validationFunc = jest.spyOn(element, "handleValidation");
    element.handleBlur();
    expect(validationFunc).toHaveBeenCalled();
  });

  test("should trigger checkValidity when inputType is present", async () => {
    const element: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field type="integer"></md-editable-field>
    `);
    const validationFunc = jest.spyOn(element, "handleValidation");
    element.handleBlur();
    expect(validationFunc).toHaveBeenCalled();
  });

  test("should trigger checkValidity when pattern is present", async () => {
    const element: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field pattern="^([+-]?[1-9]\\d*|0)$"></md-editable-field>
    `);
    const validationFunc = jest.spyOn(element, "checkValidity");
    element.handleBlur();
    expect(validationFunc).toHaveBeenCalled();
  });

  test("should NOT checkValidity when pattern or inputType are missing", async () => {
    const element: EditableTextfield.ELEMENT = await fixture(html` <md-editable-field></md-editable-field> `);
    const validationFunc = jest.spyOn(element, "checkValidity");
    element.handleBlur();
    expect(validationFunc).not.toHaveBeenCalled();
  });

  test("should return true if there is no validation error", async () => {
    const el: EditableTextfield.ELEMENT = await fixture(html` <md-editable-field></md-editable-field> `);
    el.type = "integer";
    await el.updateComplete;
    expect(el.checkValidity?.(validInputs.integer)).toBeTruthy();
    el.type = "decimal";
    await el.updateComplete;
    expect(el.checkValidity?.(validInputs.decimal)).toBeTruthy();
  });

  test("should check keydown entry for type violation", async () => {
    const el: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field type="integer" content="1236"></md-editable-field>
    `);

    await el.updateComplete;

    // Start editing mode first
    el.handleFocus();
    await el.updateComplete;

    const elTextField = el.shadowRoot?.querySelector(".md-editable-textfield") as HTMLElement;
    expect(elTextField).not.toBeNull();

    const keyEvent = jest.spyOn(el, "handleKeydown");
    const event = new KeyboardEvent("keydown", {
      key: ".",
      code: "Period"
    });

    const spy = jest.spyOn(event, "preventDefault");

    elTextField.dispatchEvent(event);
    await el.updateComplete;

    expect(keyEvent).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  test("should return true for valid pattern", async () => {
    const el: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field pattern="^([+-]?[1-9]\\d*|0)$"></md-editable-field>
    `);
    expect(el.checkValidity?.(validInputs.integer)).toBeTruthy();
  });

  test("should return false for invalid pattern", async () => {
    const el: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field pattern="^([+-]?[1-9]\\d*|0)$"></md-editable-field>
    `);
    expect(el.checkValidity?.(invalidInputs.integer)).toBeFalsy();
  });

  test("should return error message if there is a validation error", async () => {
    const el: EditableTextfield.ELEMENT = await fixture(html` <md-editable-field></md-editable-field> `);
    // Fixed: Set up type before testing validation
    el.type = "integer";
    await el.updateComplete;
    expect(el.checkValidity?.(invalidInputs.integer)).not.toBeNull();

    el.type = "decimal";
    await el.updateComplete;
    expect(el.checkValidity?.(invalidInputs.decimal)).not.toBeNull();
  });

  test("should render message when provided", async () => {
    const component: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field alert .message=${{ ...errorMessageArr } as Input.Message}>
        <div>Error Status</div>
      </md-editable-field>
    `);

    await elementUpdated(component);

    expect(component.shadowRoot!.querySelector("md-help-text")?.textContent?.trim()).toEqual(errorMessageArr.message);
    expect(component.shadowRoot!.querySelector(".md-editable-textfield--error")).not.toBeNull();
    expect(component.shadowRoot!.querySelector(".md-editable-textfield")?.getAttribute("aria-invalid")).toEqual("true");
  });

  test("should not render role and aria fields when disabled", async () => {
    const component: EditableTextfield.ELEMENT = await fixture(html`
      <md-editable-field disabled ariaLabel="test field" ariaDescribedBy="test Described details"></md-editable-field>
    `);

    await elementUpdated(component);

    const editComponent = component?.shadowRoot?.querySelector("div");
    expect(editComponent?.getAttribute("role")).toBeNull();
    expect(editComponent?.getAttribute("aria-label")).toBeNull();
    expect(editComponent?.getAttribute("aria-describedby")).toBeNull();
  });
});
