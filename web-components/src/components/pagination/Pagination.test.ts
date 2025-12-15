import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit";
import "./Pagination";
import { Pagination } from "./Pagination";

describe("Pagination component", () => {
  afterEach(fixtureCleanup);

  let element: Pagination.ELEMENT;

  beforeEach(async () => {
    element = await fixture<Pagination.ELEMENT>(html`
      <md-pagination total-page="20" current-page="10" visible-page="3"></md-pagination>
    `);
  });

  test("should render pagination correctly", async () => {
    expect(element).toBeDefined();
  });

  test("should handle click navigation", async () => {
    const nav = Array.from(element.shadowRoot!.querySelectorAll(".md-pagination-nav")) as HTMLButtonElement[];

    element.currentPage = 5;
    await elementUpdated(element);
    nav[0].click();
    await elementUpdated(element);
    expect(element.currentPage).toEqual(1);

    element.currentPage = 5;
    await elementUpdated(element);
    nav[1].click();
    await elementUpdated(element);
    expect(element.currentPage).toEqual(4);

    element.currentPage = 5;
    await elementUpdated(element);
    nav[2].click();
    await elementUpdated(element);
    expect(element.currentPage).toEqual(6);

    element.currentPage = 5;
    await elementUpdated(element);
    nav[3].click();
    await elementUpdated(element);
    expect(element.currentPage).toEqual(20);
  });

  test("should set current page", async () => {
    const link = Array.from(element.shadowRoot!.querySelectorAll(".md-pagination-list li")) as HTMLAnchorElement[];
    element.currentPage = 1;
    await elementUpdated(element);
    link[2].click();
    await elementUpdated(element);
    expect(element.currentPage).toEqual(3);
  });

  test("should set total page attribute", async () => {
    element.totalPage = 0;
    await elementUpdated(element);
    element.totalPage = 20;
    expect(element.totalPage).toEqual(20);
  });

  test("should render dots pagination", async () => {
    element.hasDots = true;
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector(".md-pagination-dots")).toBeDefined();

    element.onlyDots = true;
    await elementUpdated(element);
    expect(element.shadowRoot!.querySelector(".md-pagination-dots")).toBeDefined();
  });
});
