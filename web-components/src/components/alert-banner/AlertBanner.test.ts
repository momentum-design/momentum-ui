import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./AlertBanner";
import { type AlertBanner } from "./AlertBanner";

const fixtureFactory = async (
  type: string,
  message: string,
  closable: boolean,
  show: boolean
): Promise<AlertBanner.ELEMENT> => {
  return await fixture<AlertBanner.ELEMENT>(html`
    <md-alert-banner type=${type} message=${message} ?closable=${closable} ?show=${show}>
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
    const component = await fixtureFactory("info", "my message", false, false);
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
    const component = await fixtureFactory("info", "my message", false, true);
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
    const component = await fixtureFactory("info", "my message", true, true);
    component.handleKeyDown(new KeyboardEvent("keydown", { code: Key.Space }));

    await elementUpdated(component);
    expect(component.show).toBeFalsy();
  });
});
