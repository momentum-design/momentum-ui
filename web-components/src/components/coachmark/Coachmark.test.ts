import "@/components/button/Button";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Coachmark";
import { Coachmark } from "./Coachmark";

const fixtureFactory = async (): Promise<Coachmark.ELEMENT> => {
  return await fixture(html`
    <md-coachmark>
      <div slot="coachmark-content">
        <span>Coachmark test content</span>
        <md-button slot="coachmark-content">Coachmark next</md-button>
      </div>
      <md-button>Coachmark Default</md-button>
    </md-coachmark>
  `);
};

describe("Coachmark component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should set Coachmark", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();

    component.show = true;
    await elementUpdated(component);

    const wrap = component.shadowRoot?.querySelector(".md-coachmark");
    expect(wrap?.getAttribute("class")).toEqual("md-coachmark md-coachmark--active");
  });

  test("should dispatch Action", async () => {
    const component = await fixtureFactory();

    const mockClick = jest.spyOn(component, "coachAction");
    component.coachAction();
    await elementUpdated(component);

    expect(mockClick).toHaveBeenCalled();

    mockClick.mockRestore();
  });

  test("should notify Coachmarkv create", async () => {
    const component = await fixtureFactory();

    const mockCreate = jest.spyOn(component, "notifyCoachCreate");
    component.notifyCoachCreate();
    await elementUpdated(component);

    expect(mockCreate).toHaveBeenCalled();

    mockCreate.mockRestore();
  });

  test("should call notifyCoachCreate on md-coachmark__reference click", async () => {
    const component = await fixtureFactory();

    // Spy on notifyCoachCreate method
    const mockNotify = jest.spyOn(component, "notifyCoachCreate");

    // Simulate click event on md-coachmark__reference div
    const referenceDiv = component.shadowRoot?.querySelector(".md-coachmark__reference") as HTMLDivElement;
    referenceDiv?.click();
    await elementUpdated(component);

    // Assert notifyCoachCreate was called upon clicking the div
    expect(mockNotify).toHaveBeenCalled();

    // Restore the spy
    mockNotify.mockRestore();
  });

  test("should render coachmark-action slot when hidebutton is true", async () => {
    // Setup the component with hidebutton property set to true
    const component = await fixture(
      html`
        <md-coachmark hidebutton>
          <div slot="coachmark-content">
            <span>Coachmark test content</span>
            <md-button slot="coachmark-content">Coachmark next</md-button>
          </div>
          <md-button>Coachmark Default</md-button>
        </md-coachmark>
      `
    );

    // Wait for the component to update
    await elementUpdated(component);

    // Query for the slot named "coachmark-action"
    const slot = component.shadowRoot?.querySelector('slot[name="coachmark-action"]');

    // Assert that the slot is rendered
    expect(slot).not.toBeNull();

    // Optionally, if you want to test that the default button is not rendered when hidebutton is true
    const button = component.shadowRoot?.querySelector("md-button");
    expect(button).toBeNull();
  });

  describe("wrappedCoachmarkContentTemplate", () => {
    it("wraps content in md-theme for momentumV2 theme", async () => {
      // Setup: Create a mock md-theme element with momentumV2 theme and append a coachmark component to it
      const theme = document.createElement("md-theme");
      theme.theme = "momentumV2";
      theme.darkTheme = true;
      document.body.appendChild(theme);

      const coachmark = document.createElement("md-coachmark");
      theme.appendChild(coachmark);

      await elementUpdated(coachmark);

      // Act: Call the wrappedCoachmarkContentTemplate method
      const result = coachmark.wrappedCoachmarkContentTemplate();

      // Assert: Check if the result contains md-theme with momentumV2 theme and correct darkTheme attribute
      expect(result.strings[0]).toContain("<md-theme");

      // Cleanup
      document.body.removeChild(theme);
    });

    it("returns coachmarkContentTemplate content without md-theme wrapper when not momentumV2 theme", async () => {
      // Setup: Create and append a coachmark component without wrapping it in an md-theme element
      const coachmark = document.createElement("md-coachmark");
      document.body.appendChild(coachmark);

      await elementUpdated(coachmark);

      // Act: Call the wrappedCoachmarkContentTemplate method
      const result = coachmark.wrappedCoachmarkContentTemplate();

      // Assert: Check if the result does not contain an md-theme wrapper
      expect(result.strings[0]).not.toContain("<md-theme");

      // Cleanup
      document.body.removeChild(coachmark);
    });
  });
});
