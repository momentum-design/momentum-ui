import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Loading";
import { type Loading } from "./Loading";

describe("Loading", () => {
  let element: Loading.ELEMENT;

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  beforeEach(async () => {
    jest.useFakeTimers();
    element = await fixture<Loading.ELEMENT>(html` <md-loading></md-loading> `);
  });

  test("should render component", async () => {
    expect(element).not.toBeNull();
  });

  test("should change size property accordingly", async () => {
    expect(element.size).toEqual("");
    element.size = "small";
    expect(element.size).toEqual("small");
    element.size = "large";
    expect(element.size).toEqual("large");
    element.size = "middle";
    expect(element.size).toEqual("middle");
    element.size = "";
    expect(element.size).toEqual("");
  });
});
