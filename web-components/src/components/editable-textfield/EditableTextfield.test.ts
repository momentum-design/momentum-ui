import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { Input } from "../input/Input";
import "./EditableTextfield";
import { EditableTextfield } from "./EditableTextfield";

const fixtureFactory = async (fieldAlignment: EditableTextfield.Alignment): Promise<EditableTextfield> => {
  return await fixture(html`
    <md-editable-field .alignment="${fieldAlignment}">Test text Message</md-editable-field>
  `);
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
    expect(component.disabled).toBeFalsy;
  });

  test("should change isEditing property to true after click", async () => {
    const component = await fixtureFactory("left");
    await elementUpdated(component);

    component.handleFocus();
    await elementUpdated(component);

    expect(component.isEditing).toBeTruthy;
  });

  test("shouldn't change property if component is disabled", async () => {
    const component = await fixtureFactory("left");
    component.disabled = true;
    await elementUpdated(component);

    component.handleFocus();
    await elementUpdated(component);

    expect(component.isEditing).toBeFalsy;
  });

  test("should change class if change property", async () => {
    const component = await fixtureFactory("center");
    await elementUpdated(component);

    const el = component.shadowRoot?.querySelector("div.md-editable-textfield");
    expect(el?.getAttribute("class")).toMatch("md-editable-textfield md-editable-textfield--center");

    component.alignment = "right";
    await elementUpdated(component);
    expect(el?.getAttribute("class")).toMatch("md-editable-textfield md-editable-textfield--right");
  });

  test("should update slot element's contenteditable attribute when clicked", async () => {
    const originalText = "test text";
    const component: EditableTextfield = await fixture(html`
      <md-editable-field content=${originalText}></md-editable-field>
    `);

    const innerElement = component.shadowRoot?.querySelector(".md-editable-textfield");
    innerElement?.dispatchEvent(new MouseEvent("click"));

    await elementUpdated(component);
    expect(component.handleFocus).toHaveBeenCalled;
    expect(component.isEditing).toBeTruthy;
    expect(innerElement?.getAttribute("contenteditable")).toBeTruthy;
  });
  test("should update slot element's contenteditable attribute when field blur()", async () => {
    const component: EditableTextfield = await fixture(html`
      <md-editable-field>test text</md-editable-field>
    `);

    const innerElement = component.querySelector(".md-editable-textfield");
    innerElement?.dispatchEvent(new FocusEvent("blur"));
    await elementUpdated(component);
    expect(component.isEditing).toBeFalsy;
    expect(innerElement?.getAttribute("contenteditable")).toBeFalsy;
  });

  test("should render message when provided", async () => {
    const component: EditableTextfield = await fixture(html`
      <md-editable-field .message=${{ ...errorMessageArr } as Input.Message}>
        <div>Error Status</div>
      </md-editable-field>
    `);
    expect(component.messagesTemplate).toBeCalled;
    expect(component.shadowRoot!.querySelector("md-help-text")?.textContent?.trim()).toEqual(errorMessageArr.message);
    expect(component.shadowRoot!.querySelector(".md-editable-textfield--error")).not.toBeNull;
    expect(component.shadowRoot!.querySelector(".md-editable-textfield")?.getAttribute("aria-invalid")).toEqual("true");
  });
});
