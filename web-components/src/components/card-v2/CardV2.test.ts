import { fixture, elementUpdated, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./CardV2";
import { CardState, CardV2 } from "./CardV2";

const fixtureFactory = async (
  state: CardState, 
  identifier: string, 
  header: string,
  info: string,
  data: string,
  expandable: boolean
): Promise<CardV2.ELEMENT> => {
  return await fixture(html`
    <md-card-v2 
      state=${state} 
      identifier=${identifier} 
      header=${header} 
      info=${info} 
      data=${data} 
      .expandable=${expandable}>
    </md-card-v2>
  `);
};


describe("Card-v2 component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it("should render correctly", async () => {
    const element: CardV2.ELEMENT = await fixtureFactory(CardState.ACTIVE, "123", "Test Title", "Test Info", "Test Data", true);
    expect(element).not.toBeNull();
  });

  it("should render title when title is not empty", async () => {
    const element: CardV2.ELEMENT = await fixtureFactory(CardState.ACTIVE, "123", "Test Title", "Test Info", "Test Data", true);
    const header = element.shadowRoot?.querySelector(".md-card-v2-header-title h3");
    expect(header).not.toBeNull();
    expect(header?.textContent).toBe("Test Title");
  });

  it("should render info when info is not empty", async () => {
    const element: CardV2.ELEMENT = await fixtureFactory(CardState.ACTIVE, "123", "Test Title", "Test Info", "Test Data", true);
    const info = element.shadowRoot?.querySelector(".md-card-v2-header-title md-icon") as HTMLButtonElement;
    expect(info).not.toBeNull();
    expect(info?.name).toBe("info-badge-filled");
  });

  it("should render data when data is not empty", async () => {
    const element: CardV2.ELEMENT = await fixtureFactory(CardState.ACTIVE, "123", "Test Title", "Test Info", "Test Data", true);
    const data = element.shadowRoot?.querySelector(".md-card-v2-content h2");
    expect(data).not.toBeNull();
    expect(data?.textContent).toBe("Test Data");
  });

  it("should render footer when expandable is true", async () => {
    const element: CardV2.ELEMENT = await fixtureFactory(CardState.ACTIVE, "123", "Test Title", "Test Info", "Test Data", true);
    const footer = element.shadowRoot?.querySelector(".md-card-v2-footer");
    expect(footer).not.toBeNull();
    expect(footer?.classList.contains("hidden")).toBe(false);
  });

  it("should hide footer when expandable is false", async () => {
    const element: CardV2.ELEMENT = await fixtureFactory(CardState.ACTIVE, "123", "Test Title", "Test Info", "Test Data", false);
    const footer = element.shadowRoot?.querySelector(".md-card-v2-footer");
    expect(footer).not.toBeNull();
    expect(footer?.classList.contains("hidden")).toBe(true);
  });

  it("Toggling expand card should dispatch its event", async () => {
    const element: CardV2.ELEMENT = await fixtureFactory(
      CardState.ACTIVE, 
      "123", 
      "Test Title", 
      "Test Info", 
      "Test Data", 
      true
    );

    const expandCardButton = element.shadowRoot?.querySelector(".md-card-v2-footer md-button") as HTMLButtonElement;
    expect(expandCardButton).not.toBeNull();

    const eventSpy = jest.fn();
    element.addEventListener("expand-card-toggled", eventSpy);

    const info = element.shadowRoot?.querySelector(".md-card-v2-footer md-icon") as HTMLButtonElement;
    expect(info).not.toBeNull();
    expect(info?.name).toBe("arrow-circle-down_16");

    expandCardButton?.click();
    await elementUpdated(element);

    expect(eventSpy).toHaveBeenCalled();
    expect(info?.name).toBe("arrow-circle-up_16");
  });
});
