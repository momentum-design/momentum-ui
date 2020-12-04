import "./Pagination";
import { Pagination } from "./Pagination";
import { html } from "lit-element";
import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";

describe("Pagination component", () => {
  afterEach(fixtureCleanup);

  let element: Pagination;

  beforeEach(async () => {
    element = await fixture<Pagination>(
      html`
        <md-pagination page="1" total="101" limit="10" size="2"></md-pagination>
      `
    );
  });

  test("should render pagination correctly", async () => {
    expect(element).toBeDefined();
  });
});
