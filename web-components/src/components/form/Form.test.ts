import "@/components/button/Button";
import "@/components/input/Input";
import { elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import { querySelectorDeep } from "query-selector-shadow-dom";
import "./Form";
import { Form } from "./Form";

describe("Form Component", () => {
  let element: Form.ELEMENT;

  beforeEach(async () => {
    element = await fixture<Form.ELEMENT>(html`
      <md-form name="form-name" action="https://someurl.com" method="POST">
        <md-input required></md-input>
        <md-input disabled></md-input>
        <button type="submit">Click</button>
      </md-form>
    `);
  });
  afterEach(fixtureCleanup);

  test("should set correct attribute", async () => {
    expect(element.getAttribute("name")).toEqual("form-name");
    expect(element.getAttribute("action")).toEqual("https://someurl.com");
    expect(element.getAttribute("method")).toEqual("POST");
  });

  test("should wrap native input in form", async () => {
    const input = querySelectorDeep(".md-input[required]");
    expect(input.parentElement).toBeInstanceOf(HTMLFormElement);
  });

  test("should validate form when is-valid attribute provided", async () => {
    element.isvalid = true;
    elementUpdated(element);

    const mockSubmit = jest.fn();
    HTMLFormElement.prototype.requestSubmit = mockSubmit;

    const button = element["submitButton"];

    button!.dispatchEvent(new MouseEvent("click"));
    elementUpdated(element);

    expect(mockSubmit).toHaveBeenCalled();
  });

  test("should dispatch event in case if form submitted", async () => {
    element.isvalid = true;
    elementUpdated(element);

    setTimeout(() => element.handleFormSubmit(new Event("dispatch")));
    const event = await oneEvent(element, "form-submitted");

    expect(event).toBeDefined();
  });
});
