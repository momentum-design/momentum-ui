import "@/components/button/Button";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "CoachmarkPopover";
import { CoachmarkPopover } from "./CoachmarkPopover";

const fixtureFactory = async (): Promise<CoachmarkPopover.ELEMENT> => {
  return await fixture(html`
    <md-coachmark-popover>
      <div slot="coachmark-content">
        <span>Coachmark test content</span>
        <md-button slot="coachmark-content">Coachmark next</md-button>
      </div>
      <md-button>Coachmark Default</md-button>
    </md-coachmark-popover>
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
});
