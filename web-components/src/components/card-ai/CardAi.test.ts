import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { CardAi, CardAiVariant } from "./CardAi";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('<svg><circle cx="50" cy="50" r="40" /></svg>')
  })
) as jest.Mock;

const fixtureFactory = async (
  id: string,
  title: string,
  cardText: string,
  timestamp: string,
  variant: CardAiVariant,
  summariseMoreVisible: boolean
): Promise<CardAi.ELEMENT> => {
  return await fixture(html`
    <md-card-ai
      id=${id}
      title=${title}
      cardText=${cardText}
      timestamp=${timestamp}
      variant=${variant}
      .summariseMoreVisible=${summariseMoreVisible}
    >
    </md-card-ai>
  `);
};

const getHeader = (element: CardAi.ELEMENT) => element.shadowRoot?.querySelector(".md-card-ai-header");
const getCardTextForResponse = (element: CardAi.ELEMENT) =>
  element.shadowRoot?.querySelector(".md-card-ai-card-body-response-with-bottom-border-radius");
const getCardTextForUserQuery = (element: CardAi.ELEMENT) =>
  element.shadowRoot?.querySelector(".md-card-ai-card-body-user-query");
const getThumbsUpButton = (element: CardAi.ELEMENT) =>
  element.shadowRoot?.querySelector(".md-card-ai-thumbs-up md-button");
const getCopyButton = (element: CardAi.ELEMENT) =>
  element.shadowRoot?.querySelector(".md-card-ai-copy-button-container md-button");
const getResponseCard = (element: CardAi.ELEMENT) => element.shadowRoot?.querySelector(".md-card-ai-time-wrapper");
const getFooter = (element: CardAi.ELEMENT) => element.shadowRoot?.querySelector(".md-card-ai-footer");
const getSummariseMoreButton = (element: CardAi.ELEMENT) =>
  element.shadowRoot?.querySelector(".md-card-ai-footer  md-button");

describe("CardAi component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should render header when title is not empty", async () => {
    const element = await fixtureFactory("123", "Test Title", "", "", CardAiVariant.RESPONSE, false);
    const header = getHeader(element);
    expect(header).not.toBeNull();
  });

  test("should render card text for response when cardText is not empty", async () => {
    const element = await fixtureFactory("123", "", "Test Card Text", "2023-01-01", CardAiVariant.RESPONSE, false);
    const cardText = getCardTextForResponse(element);
    expect(cardText).not.toBeNull();
  });

  test("should not render card text when cardText is empty", async () => {
    const element = await fixtureFactory("123", "", "", "", CardAiVariant.RESPONSE, false);
    const cardText = getCardTextForResponse(element);
    expect(cardText).toBeNull();
  });

  test("should render thumbs up button when timestamp is present", async () => {
    const element = await fixtureFactory("123", "", "Test Card Text", "2023-01-01", CardAiVariant.RESPONSE, false);
    const thumbsUpButton = getThumbsUpButton(element);
    expect(thumbsUpButton).not.toBeNull();
  });

  test("should not render thumbs up button without timestamp", async () => {
    const element = await fixtureFactory("123", "", "Test Card Text", "", CardAiVariant.RESPONSE, false);
    const thumbsUpButton = getThumbsUpButton(element);
    expect(thumbsUpButton).toBeNull();
  });

  test("should render copy button when timestamp present", async () => {
    const element = await fixtureFactory("123", "", "Test Card Text", "2023-01-01", CardAiVariant.RESPONSE, false);
    const copyButton = getCopyButton(element);
    expect(copyButton).not.toBeNull();
  });

  test("should not render copy button when timestamp is not present", async () => {
    const element = await fixtureFactory("123", "", "Test Card Text", "", CardAiVariant.RESPONSE, false);
    const copyButton = getCopyButton(element);
    expect(copyButton).toBeNull();
  });

  test("should render footer when summariseMoreVisible is true", async () => {
    const element = await fixtureFactory("123", "", "", "", CardAiVariant.RESPONSE, true);
    const footer = getFooter(element);
    expect(footer).not.toBeNull();
  });

  test("should not render footer when summariseMoreVisible is false", async () => {
    const element = await fixtureFactory("123", "", "", "", CardAiVariant.RESPONSE, false);
    const footer = getFooter(element);
    expect(footer).toBeNull();
  });

  test("should render response card and timestamp is not empty", async () => {
    const element = await fixtureFactory("123", "", "Test Card Text", "2023-01-01", CardAiVariant.RESPONSE, false);
    const responseCard = getResponseCard(element);
    expect(responseCard).not.toBeNull();
  });

  test("should not render response card when timestamp is empty", async () => {
    const element = await fixtureFactory("123", "", "Test Card Text", "", CardAiVariant.RESPONSE, false);
    const responseCard = getResponseCard(element);
    expect(responseCard).toBeNull();
  });

  test("check UI elements when variant is USER_QUERY", async () => {
    const element = await fixtureFactory("123", "Test Title", "Test Card Text", "", CardAiVariant.USER_QUERY, false);
    const header = getHeader(element);
    expect(header).toBeNull();
    const responseCard = getResponseCard(element);
    expect(responseCard).toBeNull();
    const cardText = getCardTextForUserQuery(element);
    expect(cardText).not.toBeNull();
  });

  test("Actioning copy button should restore itself after 2 seconds", async () => {
    const element = await fixtureFactory(
      "123",
      "Test Title",
      "Test Card Text",
      "2023-01-01",
      CardAiVariant.RESPONSE,
      false
    );

    const writeTextMock = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    const copyButton = getCopyButton(element) as HTMLButtonElement;
    expect(copyButton).not.toBeNull();

    const originalText = copyButton.textContent;

    copyButton?.click();
    await elementUpdated(element);

    jest.advanceTimersByTime(1000);
    await elementUpdated(element);

    expect(copyButton.textContent).not.toBe(originalText);

    jest.advanceTimersByTime(1100);
    await elementUpdated(element);

    expect(copyButton.textContent).toBe(originalText);
  });

  test("Actioning thumbs up should dispatch its event", async () => {
    const element = await fixtureFactory(
      "123",
      "Test Title",
      "Test Card Text",
      "2023-01-01",
      CardAiVariant.RESPONSE,
      false
    );

    const thumbsUpButton = getThumbsUpButton(element) as HTMLButtonElement;
    expect(thumbsUpButton).not.toBeNull();

    const eventSpy = jest.fn();
    element.addEventListener("thumbs-up-toggled", eventSpy);

    thumbsUpButton?.click();
    await elementUpdated(element);

    expect(eventSpy).toHaveBeenCalled();
  });

  test("Actioning summarise more should dispatch its event", async () => {
    const element = await fixtureFactory(
      "123",
      "Test Title",
      "Test Card Text",
      "2023-01-01",
      CardAiVariant.RESPONSE,
      true
    );

    const summariseMoreButton = getSummariseMoreButton(element) as HTMLButtonElement;
    expect(summariseMoreButton).not.toBeNull();

    const eventSpy = jest.fn();
    element.addEventListener("summarise-more-toggled", eventSpy);

    summariseMoreButton?.click();
    await elementUpdated(element);

    expect(eventSpy).toHaveBeenCalled();
  });
});
