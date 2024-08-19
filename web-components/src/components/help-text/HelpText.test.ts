import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./HelpText";
import { HelpText } from "./HelpText";

describe("TextHelper component", () => {
  let element: HelpText.ELEMENT;
  beforeEach(async () => {
    element = await fixture<HelpText.ELEMENT>(html` <md-help-text></md-help-text> `);
  });

  afterEach(fixtureCleanup);

  test("should render one help text", () => {
    expect(element).not.toBeNull();
  });

  test("should create message help text", async () => {
    element.message = "Test Message";
    await elementUpdated(element);
    expect(element.message).toMatch("Test Message");
  });

  test("should render correct icon type depend on message type", async () => {
    element.messageType = "error";
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("clear-bold");
    element.messageType = "success";
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("check-bold");
    element.messageType = "warning";
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("warning-bold");
  });
});
