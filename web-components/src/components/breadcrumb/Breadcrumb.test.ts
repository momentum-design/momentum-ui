import { breadCrumb } from "@/[sandbox]/sandbox.mock";
import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./Breadcrumb";
import { type Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  let element: Breadcrumb.ELEMENT;
  let anchors: HTMLAnchorElement[];

  beforeEach(async () => {
    element = await fixture<Breadcrumb.ELEMENT>(html` <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb> `);
    anchors = Array.from(element.shadowRoot!.querySelectorAll("a[href]"));
  });

  test("should render correctly breadcrumb", async () => {
    expect(element).toBeDefined();
  });

  test("should render anchors", async () => {
    expect(anchors.length).toEqual(4);
  });

  test("should render breadcrumb label", async () => {
    expect(element.navCrumbs.length).not.toEqual(0);
  });

  test("should dispatch event when breadcrumb change", async () => {
    const clickSpy = jest.spyOn(element, "handleClick");

    anchors[0].click();

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});
