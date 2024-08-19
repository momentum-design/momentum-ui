import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import "./Spinner";
import { html } from "lit-element";
import { Spinner } from "./Spinner";

describe("Spinner component", () => {
  afterEach(fixtureCleanup);

  test("should render correctly", async () => {
    const element = await fixture<Spinner.ELEMENT>(`<md-spinner></md-spinner>`);
    expect(element).toBeDefined();
  });

  test("should render size", async () => {
    const element = await fixture<Spinner.ELEMENT>(html` <md-spinner size="20"></md-spinner> `);
    expect(element.size).toEqual(20);
  });
});
