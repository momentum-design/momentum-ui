import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./AlertBanner";
import { type AlertBanner } from "./AlertBanner";

const fixtureFactory = async (
  type: string,
  message: string,
  closable: boolean,
  show: boolean,
  titleText: string = ""
): Promise<AlertBanner.ELEMENT> => {
  return await fixture<AlertBanner.ELEMENT>(html`
    <md-alert-banner type=${type} titleText=${titleText} message=${message} ?closable=${closable} ?show=${show}>
      <p>Test Alert Message</p>
    </md-alert-banner>
  `);
};

describe("Alert Banner component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });
  test("should render component", async () => {
    expect.hasAssertions();
    const component = await fixtureFactory("info", "my message", false, false, "my title");
    expect(component).not.toBeNull();
    expect(component.closable).toBeFalsy();
    expect(component.show).toBeFalsy();
  });

  test("should show component when show property is true", async () => {
    const component = await fixtureFactory("info", "my message", false, true);
    await elementUpdated(component);
    expect(component.show).toBeTruthy();
  });

  test("should show and hide component", async () => {
    const component = await fixtureFactory("info", "my message", false, true, "my title");
    await elementUpdated(component);
    expect(component.show).toBeTruthy();
    component.onHide();
    await elementUpdated(component);
    expect(component.show).toBeFalsy();
  });

  test("should render close button when closable property is true", async () => {
    const component = await fixtureFactory("info", "my message", true, true);
    await elementUpdated(component);

    const closeBtn = component.shadowRoot?.querySelector("md-button");

    expect(component.closable).toBeTruthy();
    expect(closeBtn).not.toBeNull();

    closeBtn!.dispatchEvent(new MouseEvent("click"));
    await elementUpdated(component);
    expect(component.show).toBeFalsy();
  });

  test("should hide when Enter keydown", async () => {
    const component = await fixtureFactory("info", "my message", true, true);
    await elementUpdated(component);
    expect(component.closable).toBeTruthy();

    const closeBtn = component.shadowRoot?.querySelector("md-button");
    closeBtn!.dispatchEvent(new KeyboardEvent("keydown", { code: Key.Enter }));

    await elementUpdated(component);
    expect(component.show).toBeFalsy();
  });

  test("should hide when Space keydown", async () => {
    const component = await fixtureFactory("info", "my message", true, true, "my title");
    component.handleKeyDown(new KeyboardEvent("keydown", { code: Key.Space }));

    await elementUpdated(component);
    expect(component.show).toBeFalsy();
  });

  test("should render titleText when specified", async () => {
    const component = await fixtureFactory("info", "my message", false, true, "My Title");
    await elementUpdated(component);

    const titleElement = component.shadowRoot?.querySelector(".md-alert-banner__title");
    expect(titleElement).not.toBeNull();
    expect(titleElement?.textContent).toBe("My Title");
  });

  test("should not render titleText when not specified", async () => {
    const component = await fixtureFactory("info", "my message", false, true);
    await elementUpdated(component);

    const titleElement = component.shadowRoot?.querySelector(".md-alert-banner__title");
    expect(titleElement).toBeNull();
  });

  test("should apply 'with-title' class when titleText is specified", async () => {
    const component = await fixtureFactory("info", "my message", false, true, "My Title");
    await elementUpdated(component);

    const bannerElement = component.shadowRoot?.querySelector(".md-alert-banner");
    expect(bannerElement?.classList.contains("with-title")).toBeTruthy();
  });

  test("should not apply 'with-title' class when titleText is not specified", async () => {
    const component = await fixtureFactory("info", "my message", false, true);
    await elementUpdated(component);

    const bannerElement = component.shadowRoot?.querySelector(".md-alert-banner");
    expect(bannerElement?.classList.contains("with-title")).toBeFalsy();
  });
});
