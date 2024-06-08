import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./ActivityButton";
import { ActivityButton } from "./ActivityButton";

describe("ActivityButton", () => {
  afterEach(fixtureCleanup);

  test("should render one ActivityButton button", async () => {
    const element = await fixture(`<md-activity-button type="meetings"></md-activity-button>`);
    expect(element.shadowRoot!.querySelectorAll("md-button").length).toEqual(1);
  });

  test("should render ActivityButton by passing size properties as number or string value type", async () => {
    const numberSize = 68;
    const stringSize = "68";
    const elementNumber = await fixture(
      html`
        <md-activity-button .type=${"chat"} .size=${numberSize}></md-activity-button>
      `
    );
    const buttonNumber = elementNumber.shadowRoot!.querySelector("md-button");
    const elementString = await fixture(
      html`
        <md-activity-button .type=${"camera"} .size=${stringSize}></md-activity-button>
      `
    );
    const buttonString = elementString.shadowRoot!.querySelector("md-button");
    expect(buttonNumber!.size).toEqual(numberSize);
    expect(buttonString!.size).toEqual(stringSize);
  });

  test("should render meetings type", async () => {
    const element = await fixture(`<md-activity-button type="meetings" ariaLabel="test"></md-activity-button>`);
    const buttonElement = element.shadowRoot!.querySelector("md-button");
    expect(buttonElement!.shadowRoot!.querySelector("button")!.classList).toContain("md-activity__meetings");
  });

  test("should render large meetings type", async () => {
    const element = await fixture<ActivityButton.ELEMENT>(
      `<md-activity-button type="meetings" size="84" label="Chat" disabled></md-activity-button>`
    );
    expect(element.size).toEqual("84");

    const buttonElement = element.shadowRoot!.querySelector("md-button");
    const button = buttonElement!.shadowRoot!.querySelector("button");
    expect(button!.getAttribute("class")).toContain("md-button--84");
    expect(element.formatClass["md-activity"]).toBe(true);
  });

  test("should set default type if attribute value not correct", async () => {
    const element = await fixture<ActivityButton.ELEMENT>(
      `<md-activity-button type="meeting" label="Chat"></md-activity-button>`
    );
    expect(element.type).toEqual("chat");
  });
});
