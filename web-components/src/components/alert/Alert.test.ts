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
    expect(type?.getAttribute("name")).toEqual("check-circle-bold");
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
    expect(type?.getAttribute("name")).toEqual("error-legacy-bold");
    expect(type?.getAttribute("color")).toEqual("var(--md-alert-error-text-color, red)");
  });

  test("should render warning Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="warning" show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--warning"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("warning-bold");
    expect(type?.getAttribute("color")).toEqual("var(--md-alert-warning-text-color, orange)");
  });

  test("should render warning Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="warn" show></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-alert");
    const expectedClassList = ["md-alert", "md-alert--warn"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("warning-bold");
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

describe("New Alert", () => {
  afterEach(fixtureCleanup);
  test("Alert component is not null", async () => {
    const alert = await fixture(`<md-alert newMomentum></md-alert>`);
    expect(alert).not.toBeNull();
  });

  test("should render an New Momentum Alert component", async () => {
    const el = await fixture(html` <md-alert newMomentum show></md-alert> `);

    expect(el.shadowRoot!.querySelector(".md-new-alert")).not.toBeNull();
  });

  test("should render message Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="message" show newMomentum></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-new-alert");
    const expectedClassList = ["md-new-alert", "md-alert--message"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-new-alert__icon md-icon");
    expect(type?.getAttribute("name")).toEqual("chat-bold");
    expect(type?.getAttribute("color")).toEqual("var(--alert-title-text-color)");
  });

  test("should render loading Alert", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert type="loading" show newMomentum></md-alert> `);

    const alertElement = await element.shadowRoot!.querySelector(".md-new-alert");
    const expectedClassList = ["md-new-alert", "md-alert--loading"];
    expect(alertElement?.classList.length).toEqual(expectedClassList.length);
    expect(expectedClassList.every((className) => alertElement?.classList.contains(className))).toBe(true);

    const type = element.shadowRoot?.querySelector(".md-new-alert__icon md-spinner");
    expect(type).not.toBeNull();
  });

  test("should render close button & icon when closable prop is true", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert show closable newMomentum></md-alert> `);

    const buttomElements = element.shadowRoot!.querySelectorAll(".md-new-alert__button md-button");
    expect(buttomElements.length).toEqual(1);

    const iconElement = await element.shadowRoot!.querySelector(".md-new-alert__button md-button md-icon");
    expect(iconElement?.getAttribute("name")).toEqual("cancel-bold");
  });

  test("should handle close button Click event", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert show closable newMomentum></md-alert> `);

    const mockClick = jest.spyOn(element, "close");
    element.close();
    await elementUpdated(element);

    expect(mockClick).toHaveBeenCalled();

    mockClick.mockRestore();
    expect(element.show).toBeFalsy();
  });

  test("should render primary button if primaryButton is set", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert show closable newMomentum primaryButton="OK"></md-alert>
    `);

    const buttomElements = element.shadowRoot!.querySelectorAll(".md-new-alert__footer md-button");
    expect(buttomElements.length).toEqual(1);

    const primaryButton = await element.shadowRoot!.querySelector(".md-new-alert__footer md-button");
    expect(primaryButton?.getAttribute("variant")).toEqual("primary");
  });

  test("should render secondary button if secondaryButton is set", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert show closable newMomentum secondaryButton="OK"></md-alert>
    `);

    const buttomElements = element.shadowRoot!.querySelectorAll(".md-new-alert__footer md-button");
    expect(buttomElements.length).toEqual(1);

    const primaryButton = await element.shadowRoot!.querySelector(".md-new-alert__footer md-button");
    expect(primaryButton?.getAttribute("variant")).toEqual("secondary");
  });

  test("should render link if link is set", async () => {
    const element = await fixture<Alert.ELEMENT>(html` <md-alert show closable newMomentum link href="/"></md-alert> `);

    const linkElement = await element.shadowRoot!.querySelector(".md-new-alert__link");
    expect(linkElement).not.toBeNull();
  });

  test("alert with slotted buttons", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert title="title" message="message" closable show newMomentum>
        <md-icon slot="alert-icon" size="24" iconSet="momentumBrandVisuals" name="cisco-ai-assistant-color"> </md-icon>
        <div slot="alert-footer">
          <md-button variant="primary">
            <span slot="text">primary</span>
          </md-button>
          <md-button variant="secondary">
            <span slot="text">secondary</span>
          </md-button>
          <md-button variant="secondary">
            <span slot="text">secondary</span>
          </md-button>
        </div>
      </md-alert>
    `);

    const elementFooter = await element.shadowRoot!.querySelector(".md-new-alert__footer");
    expect(elementFooter?.classList.contains("is-empty")).toBeFalsy();
  });

  test("alert without footer slot", async () => {
    const element = await fixture<Alert.ELEMENT>(html`
      <md-alert title="title" message="message" closable show newMomentum>
        <md-icon slot="alert-icon" size="24" iconSet="momentumBrandVisuals" name="cisco-ai-assistant-color"> </md-icon>
      </md-alert>
    `);

    const elementFooter = await element.shadowRoot!.querySelector(".md-new-alert__footer.is-empty");
    expect(elementFooter).not.toBeNull();
  });
});
