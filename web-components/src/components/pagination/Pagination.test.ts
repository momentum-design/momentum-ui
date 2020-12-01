import "./Pagination";
import { Pagination } from "./Pagination";
import { paginationItems } from "@/[sandbox]/sandbox.mock";
import { html } from "lit-element";
import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";

describe("Pagination component", () => {
  afterEach(fixtureCleanup);

  let element: Pagination;

  beforeEach(async () => {
    element = await fixture<Pagination>(
      html`
        <md-pagination .items="${paginationItems}"></md-pagination>
      `
    );
  });

  test("should render pagination correctly", async () => {
    expect(element).toBeDefined();
  });
});
