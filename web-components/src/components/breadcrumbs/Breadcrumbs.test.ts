import "@/components/breadcrumbs/Breadcrumbs";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import {elementUpdated, fixture, fixtureCleanup} from "@open-wc/testing-helpers";
import { breadCrumbs } from "@/[sandbox]/sandbox.mock";
import { html } from "lit-element";

describe("Breadcrumbs component", () => {
  afterEach(fixtureCleanup);

  let element: Breadcrumbs;
  let anchors: HTMLAnchorElement[];

  beforeEach(async () => {
    element = await fixture<Breadcrumbs>(
      html`
        <md-breadcrumbs .navCrumbs="${breadCrumbs}"></md-breadcrumbs>
      `
    );
    anchors = Array.from(element.shadowRoot!.querySelectorAll("a[href]"));
  });

  test("should render correctly breadcrumbs", async () => {
    expect(element).toBeDefined();
  });

  test("should render anchors", async () => {
    expect(anchors.length).toEqual(4);
  });

  test("should render breadcrumbs label", async () => {
    expect(element.navCrumbs.length).not.toEqual(0);
  });

  test("should dispatch event when breadcrumbs change", async () => {
    const clickSpy = jest.spyOn(element, "handleClick");

    anchors[0].click();

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});
