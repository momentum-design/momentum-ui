import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Alert";
import { Alert } from "./Alert";

describe("Alert", () => {
  afterEach(fixtureCleanup);
  test("Alert component is not null", async () => {
    const alert = await fixture(`<md-alert></md-alert>`);
    expect(alert).not.toBeNull();
  });

  test("should render an Alert component", async () => {
    const el = await fixture(html`
      <md-alert></md-alert>
    `);
    expect(el).not.toBeNull();
  });

  test("should create Alert element with all default props", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert></md-alert>
    `);

    expect(element.closable).toBeFalsy();
    expect(element.message).toEqual("");
    expect(element.show).toBeFalsy();
    expect(element.title).toEqual("");
    expect(element.type).toEqual("default");
  });

  test("should render visible Alert component with set message & title props", async () => {
    const myMessage = "This is my message";
    const myTitle = "My Title";

    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert .message=${myMessage} .title=${myTitle} show></md-alert>
    `);

    const titleContent = await element.shadowRoot!.querySelector(".md-alert__title");
    const messageContent = await element.shadowRoot!.querySelector(".md-alert__message");

    expect(titleContent?.textContent?.trim()).toEqual(myTitle);
    expect(messageContent?.textContent?.trim()).toEqual(myMessage);
  });

  test("should render visible Alert component with default html class names", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert show></md-alert>
    `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    expect(alertElement?.className).toEqual("md-alert md-alert--default");
  });

  test("should render Alert with icon reflecting default type", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert show></md-alert>
    `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    expect(alertElement?.className).toEqual("md-alert md-alert--default");

    const iconTypeElement = await element.shadowRoot!.querySelector(".md-alert__icon");
    expect(iconTypeElement).not.toBeNull();
  });

  test("should render success Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert type="success" show></md-alert>
    `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    expect(alertElement?.className).toEqual("md-alert md-alert--success");

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("check-circle_36");
    expect(type?.getAttribute("color")).toEqual("green-50");
  });

  test("should render info Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert type="info" show></md-alert>
    `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    expect(alertElement?.className).toEqual("md-alert md-alert--info");

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("info_32");
    expect(type?.getAttribute("color")).toEqual("blue-50");
  });

  test("should render error Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert type="error" show></md-alert>
    `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    expect(alertElement?.className).toEqual("md-alert md-alert--error");

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("icon-warning_32");
    expect(type?.getAttribute("color")).toEqual("red-50");
  });

  test("should render warning Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert type="warning" show></md-alert>
    `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    expect(alertElement?.className).toEqual("md-alert md-alert--warning");

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("icon-warning_32");
    expect(type?.getAttribute("color")).toEqual("orange-50");
  });

  test("should render warning Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert type="warn" show></md-alert>
    `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    expect(alertElement?.className).toEqual("md-alert md-alert--warn");

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("icon-warning_32");
    expect(type?.getAttribute("color")).toEqual("orange-50");
  });

  test("should render close button & icon when closable prop is true", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert show closable></md-alert>
    `);

    const buttomElements = element.shadowRoot!.querySelectorAll(".md-alert__button md-button");
    expect(buttomElements.length).toEqual(1);

    const iconElement = await element.shadowRoot!.querySelector(".md-alert__button md-button md-icon");
    expect(iconElement?.getAttribute("name")).toEqual("icon-cancel_16");
  });

  test("should handle Click event", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert show closable></md-alert>
    `);

    const mockClick = jest.spyOn(element, "close");
    element.close();
    await elementUpdated(element);

    expect(mockClick).toHaveBeenCalled();

    mockClick.mockRestore();
    expect(element.show).toBeFalsy();
  });
});
