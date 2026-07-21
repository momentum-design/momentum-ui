import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit";
import "../icon/Icon";
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
    expect(element.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("error-legacy-badge-filled");
    element.messageType = "success";
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("check-circle-badge-filled");
    element.messageType = "warning";
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("warning-badge-filled");
    element.messageType = "priority";
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector("md-icon")!.getAttribute("name")).toEqual("info-badge-filled");
  });

  test("should hide status icons from assistive technologies for all message types", async () => {
    const messageTypes: Array<{ type: HelpText.ELEMENT["messageType"]; iconName: string }> = [
      { type: "error", iconName: "error-legacy-badge-filled" },
      { type: "success", iconName: "check-circle-badge-filled" },
      { type: "warning", iconName: "warning-badge-filled" },
      { type: "priority", iconName: "info-badge-filled" }
    ];

    for (const { type, iconName } of messageTypes) {
      element.messageType = type;
      element.message = `${type} message`;
      await elementUpdated(element);

      const icon = element.shadowRoot!.querySelector("md-icon") as HTMLElement & { ariaHidden?: string };
      expect(icon).not.toBeNull();
      expect(icon.getAttribute("name")).toEqual(iconName);
      expect(icon.ariaHidden).toEqual("true");

      await elementUpdated(icon);
      expect(icon.shadowRoot?.querySelector(".svg-icon-container")?.getAttribute("aria-hidden")).toEqual("true");
    }
  });

  test("should not render a status icon when message type is not set", async () => {
    element.message = "Help text without icon";
    element.messageType = undefined;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector("md-icon")).toBeNull();
  });
});
