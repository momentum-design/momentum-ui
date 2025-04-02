import { cardMenuItems } from "@/[sandbox]/sandbox.mock";
import "@/components/badge/Badge";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Card";
import { type Card } from "./Card";

const fixtureFactory = async (id: string, title: string, subtitle: string, info: string): Promise<Card.ELEMENT> => {
  return await fixture(html`
    <md-card .menuOption=${cardMenuItems} id=${id} title=${title} subtitle=${subtitle} info=${info}>
      <div slot="content">
        <img
          src="https://freepngimg.com/download/business/66729-google-business-big-analysis-analytics-data.png"
          alt=""
        />
      </div>
      <md-badge slot="footer" color="violet" small>Active</md-badge>
      <md-badge slot="footer" color="mint" small>Stock Report</md-badge>
    </md-card>
  `);
};

describe("Card component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should render correctly", async () => {
    const element: Card.ELEMENT = await fixtureFactory("1234567", "Test title", "Test subtitle", "Test Info");
    expect(element).not.toBeNull();
  });

  test("should render card without menu", async () => {
    const element: Card.ELEMENT = await fixtureFactory("1234567", "Test title", "Test subtitle", "Test Info");
    const menuIcon = element.shadowRoot?.querySelector(".md-card-menu");
    element.menuOptions = [];
    await elementUpdated(element);

    expect(menuIcon).not.toBeDefined();

    element.menuOptions = ["Edit", "Test"];
    await elementUpdated(element);

    expect(menuIcon).toBeDefined();
  });

  test("should dispatch events on card click", async () => {
    const element: Card.ELEMENT = await fixtureFactory("1234567", "Test title", "Test subtitle", "Test Info");

    const card = element.shadowRoot?.querySelector(".md-card");
    expect(card).not.toBeDefined();
    const clickEvent = new MouseEvent("click");
    const spyClick = jest.spyOn(element, "handleCardClick");
    card?.dispatchEvent(clickEvent);
    expect(spyClick).toHaveBeenCalled();
    spyClick.mockRestore();

    const spyKeyDown = jest.spyOn(element, "handleCardKeyDown");
    const keyEvent = new KeyboardEvent("keydown", { code: Key.Enter });
    card?.dispatchEvent(keyEvent);
    expect(spyKeyDown).toHaveBeenCalled();
    spyKeyDown.mockRestore();
  });

  test("should dispatch events on menu item click", async () => {
    const element: Card.ELEMENT = await fixtureFactory("1234567", "Test title", "Test subtitle", "Test Info");

    const spyMenuClick = jest.spyOn(element, "handleCardMenuEvent");
    element.handleCardMenuEvent(new MouseEvent("click"), "1234");
    await elementUpdated(element);

    expect(spyMenuClick).toHaveBeenCalled();
    spyMenuClick.mockRestore();

    const spyMenuKeyDown = jest.spyOn(element, "handleCardMenuKeyDown");
    const keyEvent = new KeyboardEvent("keydown", { code: Key.Enter });
    element.handleCardMenuKeyDown(keyEvent, "1234");
    await elementUpdated(element);

    expect(spyMenuKeyDown).toHaveBeenCalled();
    spyMenuKeyDown.mockRestore();
  });
});
