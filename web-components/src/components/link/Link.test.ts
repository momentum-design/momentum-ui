import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Link";
import { Link } from "./Link";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const lmLinkTokens = require("./tokens/lm-link-tokens.js");
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const mdLInkTokens = require("./tokens/md-link-tokens.js");

describe("Link Tokens", () => {
  test("Lumos Token Import should not be null", async () => {
    expect(lmLinkTokens).not.toBeNull();
  });
  test("Lumos Token Import should not be null", async () => {
    expect(mdLInkTokens).not.toBeNull();
  });
});

describe("Link component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  //tag
  test("should create correct tag", async () => {
    expect.hasAssertions();
    const component: Link = await fixture(`<md-link tag="span"></md-link>`);
    expect(component.tag).toMatch("span");
  });

  //tag div
  test("should create correct tag", async () => {
    expect.hasAssertions();
    const component: Link = await fixture(`<md-link tag="div"></md-link>`);
    expect(component.tag).toMatch("div");
  });

  // href
  test("should provide link href", async () => {
    expect.hasAssertions();
    const component: Link = await fixture(` <md-link href="#"></md-link> `);
    expect(component.href).not.toBeNull();
  });

  // color
  test("should set link color", async () => {
    expect.hasAssertions();
    const component: Link = await fixture(` <md-link class="md-link--yellow"></md-link> `);
    expect(component.className).toContain("md-link--yellow");
  });

  test("should set link tab-index", async () => {
    expect.hasAssertions();
    const component: Link = await fixture(` <md-link tab-index="1"></md-link> `);
    expect(component.getAttribute("tab-index")).toEqual("1");

    const linkShadow = component!.shadowRoot!.querySelector(".md-link");
    expect(linkShadow!.getAttribute("tabindex")).toContain("1");
  });

  test("should set link tab-index correctly when disabled", async () => {
    expect.hasAssertions();
    const component: Link = await fixture<Link>(` <md-link tab-index="1" disabled></md-link> `);
    expect(component.disabled).toBeTruthy();

    const linkShadow = component!.shadowRoot!.querySelector(".md-link");
    expect(linkShadow!.getAttribute("tabindex")).toContain("-1");
  });

  // disabled
  test("should check if link disabled", async () => {
    expect.hasAssertions();
    const component: Link = await fixture(
      html`
        <md-link disabled></md-link>
      `
    );
    expect(component.disabled).toBeTruthy();
  });

  // inline
  test("should make link inline", async () => {
    const component: Link = await fixture(`<md-link class="md-link--inline"></md-link>`);
    expect(component.className).toContain("md-link--inline");
  });
});
