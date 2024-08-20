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
    const el = await fixture(html` <md-alert></md-alert> `);
    expect(el).not.toBeNull();
  });

  test("should create Alert element with all default props", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert></md-alert> `);

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
    const element = await fixture<Alert.ELEMENT>(html` <md-alert show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--default"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);
  });

  test("should render Alert with icon reflecting default type", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--default"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const iconTypeElement = await element.shadowRoot!.querySelector(".md-alert__icon");
    expect(iconTypeElement).not.toBeNull();
  });

  test("should render success Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="success" show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--success"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("check-circle-regular");
    expect(type?.getAttribute("color")).toEqual("var(--md-alert-success-text-color, green)");
  });

  test("should render info Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="info" show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--info"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("info-circle-regular");
    expect(type?.getAttribute("color")).toEqual("var(--md-alert-info-text-color, blue)");
  });

  test("should render error Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="error" show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--error"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("warning-regular");
    expect(type?.getAttribute("color")).toEqual("var(--md-alert-error-text-color, red)");
  });

  test("should render warning Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="warning" show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--warning"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("warning-regular");
    expect(type?.getAttribute("color")).toEqual("var(--md-alert-warning-text-color, orange)");
  });

  test("should render warning Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="warn" show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--warn"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("warning-regular");
    expect(type?.getAttribute("color")).toEqual("var(--md-alert-warning-text-color, orange)");
  });

  test("should render close button & icon when closable prop is true", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert show closable></md-alert> `);

    const buttomElements = element.shadowRoot!.querySelectorAll(".md-alert__button md-button");
    expect(buttomElements.length).toEqual(1);

    const iconElement = await element.shadowRoot!.querySelector(".md-alert__button md-button md-icon");
    expect(iconElement?.getAttribute("name")).toEqual("cancel-bold");
  });

  test("should handle Click event", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert show closable></md-alert> `);

    const mockClick = jest.spyOn(element, "close");
    element.close();
    await elementUpdated(element);

    expect(mockClick).toHaveBeenCalled();

    mockClick.mockRestore();
    expect(element.show).toBeFalsy();
  });
});
