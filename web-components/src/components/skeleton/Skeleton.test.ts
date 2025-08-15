import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Skeleton";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  afterEach(() => fixtureCleanup());

  it("should render with default props", async () => {
    const element = await fixture<Skeleton.ELEMENT>(html` <md-skeleton></md-skeleton> `);
    expect(element?.shadowRoot).not.toBeNull();
    expect(element).toBeInstanceOf(Skeleton.ELEMENT);

    expect(element.variant).toBe("rounded");
    expect(element.animation).toBe("pulse");
  });

  it("should set style width and height from properties", async () => {
    const element = await fixture<Skeleton.ELEMENT>(html` <md-skeleton width="120px" height="60px"></md-skeleton> `);
    expect(element.style.width).toBe("120px");
    expect(element.style.height).toBe("60px");
  });

  it("should expand to fill parent container if no dimensions specified", async () => {
    const parent = await fixture(html` <div style="width: 300px; height: 150px;"><md-skeleton></md-skeleton></div> `);
    const element = parent.querySelector<Skeleton.ELEMENT>("md-skeleton")!;
    expect(element.clientWidth).toBe(parent.clientWidth);
    expect(element.clientHeight).toBe(parent.clientHeight);
  });
});
