import "@/components/button/Button";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Coachmark";
import { Coachmark } from "./Coachmark";

const fixtureFactory = async (): Promise<Coachmark.ELEMENT> => {
  return await fixture(html`
    <md-coachmark>
      <div slot="coachmark-content">
        <span>Coachmark  test content</span>
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

});
