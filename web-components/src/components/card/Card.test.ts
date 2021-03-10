import "@/components/badge/Badge";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Card";
import { Card } from "./Card";
import { Button } from "@/components/button/Button";
import { cardMenuItems } from "@/[sandbox]/sandbox.mock";
import { Key } from "@/constants";

const fixtureFactory = async (
  id: string,
  title: string,
  subtitle: string,
  info: string,
  fullscreen: boolean
): Promise<Card.ELEMENT> => {
  return await fixture(
    html`
      <md-card
        .menuOption=${cardMenuItems}
        id=${id}
        title=${title}
        subtitle=${subtitle}
        info=${info}
        .fullscreen=${fullscreen}
      >
        <div slot="content">
          <img
            src="https://media.istockphoto.com/vectors/dashboard-ui-modern-presentation-with-data-graphs-and-hud-diagrams-vector-id1159848977"
            alt=""
          />
        </div>
        <md-badge slot="footer" color="violet" small>Active</md-badge>
        <md-badge slot="footer" color="mint" small>Stock Report</md-badge>
      </md-card>
    `
  );
};

describe("Card component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render correctly", async () => {
    const element: Card.ELEMENT = await fixtureFactory("1234567", "Test title", "Test subtitle", "Test Info", false);
    expect(element).not.toBeNull();
  });

  test("should render correctly full screen", async () => {
    const element: Card.ELEMENT = await fixtureFactory("1234567", "Test title", "Test subtitle", "Test Info", true);
    const fullIcon = element.shadowRoot?.querySelector("md-button.md-card-max-icon") as Button.ELEMENT;
    const btn = fullIcon.shadowRoot!.querySelector("button");
    btn!.click();

    await elementUpdated(element);

    const card = element.shadowRoot?.querySelector("div.md-card");
    expect(card!.getAttribute("class")).toEqual("md-card full-screen");
  });

  test("should dispatch events on menu item", async () => {
    const element: Card.ELEMENT = await fixtureFactory("1234567", "Test title", "Test subtitle", "Test Info", false);
    const menuIcon = element.shadowRoot?.querySelector("md-button.md-card-menu-icon") as Button.ELEMENT;
    const btn = menuIcon.shadowRoot!.querySelector("button");
    btn!.click();
    await elementUpdated(element);

    const cardMenuItem = element.shadowRoot?.querySelector(".md-card-menu-list-items md-list-item");
    expect(cardMenuItem).not.toBeDefined;
    const clickEvent = new MouseEvent("click");
    const spyClick = jest.spyOn(element, "handleCardMenuEvent");
    cardMenuItem?.dispatchEvent(clickEvent);
    expect(spyClick).toHaveBeenCalled();
    spyClick.mockRestore();

    const spyKeyDown = jest.spyOn(element, "handleCardKeyDownEvent");
    const keyEvent = new KeyboardEvent("keydown", { code: Key.Enter });
    cardMenuItem?.dispatchEvent(keyEvent);
    expect(spyKeyDown).toHaveBeenCalled();
    spyKeyDown.mockRestore();
  });
});
