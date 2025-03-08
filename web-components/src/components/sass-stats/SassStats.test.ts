import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { SassStats } from "./SassStats";

describe("SassStats component", () => {
  afterEach(fixtureCleanup);

  test("should render", async () => {
    expect.hasAssertions();
    const component: SassStats = await fixture(html` <sass-stats component="badge"></sass-stats> `);
    expect(component.component).toEqual("badge");
  });
});
