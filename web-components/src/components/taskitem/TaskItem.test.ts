import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./TaskItem";
import { TaskItem } from "./TaskItem";

const fixtureFactory = async (
  mediaType: string,
  popovertitle: string,
  title: string,
  itemTitle: string,
  queue: string,
  status: string,
  quantity: number,
  lastmessage: string,
  selected: boolean,
  customAriaLabel = "",
  iconSrc = ""
): Promise<TaskItem.ELEMENT> => {
  return await fixture(html`
    <md-task-item
      mediaType="${mediaType}"
      popovertitle="${popovertitle}"
      item-title="${itemTitle}"
      title="${title}"
      status="${status}"
      quantity="${quantity}"
      lastmessage="${lastmessage}"
      .selected="${selected}"
      customAriaLabel="${customAriaLabel}"
      iconSrc="${iconSrc}"
    >
      <span slot="queue">
        <span className="queue-name">Test Queue Name 00:00</span>
      </span>
      <div slot="task-addition">00:08</div>
    </md-task-item>
  `);
};

describe("TaskItem", () => {
  afterEach(fixtureCleanup);

  test("should render TaskItem Component", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "telephony",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "consulting",
      0,
      "",
      false
    );
    expect(element).not.toBeNull();
    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("handset-filled");
    expect(status?.getAttribute("name")).toEqual("headset-bold");
  });

  test("should render TaskItem Component", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "facebook",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "consulting",
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("social-fbmessenger");
  });

  test("should render TaskItem Component", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "whatsapp",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "consulting",
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("social-whatsapp");
  });

  test("should render TaskItem Component for Apple Chat Messenger", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "applemessages",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      "play",
      0,
      "",
      false,
      "",
      "/images/illustrations/apple-messages-light.svg"
    );
    const type = element.shadowRoot?.querySelector("img");
    expect(type?.getAttribute("src")).toEqual("/images/illustrations/apple-messages-light.svg");
  });

  test("should render TaskItem Component with progressive_campaign", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "progressive_campaign",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "consulting",
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("icon-icon-campaign_18");
  });

  test("should render correct type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "chat",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "play",
      0,
      "",
      false
    );

    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("chat-filled");
    expect(status?.getAttribute("name")).toEqual("play-bold");
  });

  test("should render correct outbound type ", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "outbound telephony",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      "play",
      0,
      "",
      false
    );

    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("outgoing-call-legacy-filled");
  });

  test("should render midcall type", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "midcall telephony",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      "play",
      0,
      "",
      false,
      "",
      "/images/illustrations/Monitoring-regular-light.svg"
    );

    const type = element.shadowRoot?.querySelector("img");
    expect(type?.getAttribute("src")).toEqual("/images/illustrations/Monitoring-regular-light.svg");
  });

  test("should render caalback type ", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "callback",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "play",
      0,
      "",
      false
    );

    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("icon-icon-callback_18");
  });

  test("should render correct inbound type ", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "inbound telephony",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "play",
      0,
      "",
      false
    );

    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("incoming-call-legacy-filled");
  });

  test("should update type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "email",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "hold",
      0,
      "",
      true
    );

    expect(element.selected).toBeTruthy;
    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("email-filled");
    expect(status?.getAttribute("name")).toEqual("pause-bold");
  });

  test("should update type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "sms",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "conference",
      0,
      "",
      false
    );
    expect(element).not.toBeNull();
    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("social-sms");
    expect(status?.getAttribute("name")).toEqual("meet-bold");
  });

  test("should update type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "transfered",
      0,
      "",
      false
    );
    expect(element).not.toBeNull();
    const type = element.shadowRoot?.querySelector(".md-taskitem__mediatype slot");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("task-type");
    expect(status?.getAttribute("name")).toEqual("assign-privilege-bold");
  });

  test("should update campaign status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "campaign",
      0,
      "",
      false
    );
    expect(element).not.toBeNull();
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(status?.getAttribute("name")).toEqual("announcement-bold");
  });

  test("should update courtesy_callback status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "courtesy_callback",
      0,
      "",
      false
    );
    expect(element).not.toBeNull();
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(status?.getAttribute("name")).toEqual("callrate-bold");
  });

  test("should upadte type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "call",
      10,
      "Test message",
      false
    );
    expect(element).not.toBeNull();
    const status = element.shadowRoot?.querySelector(".md-taskitem__status slot");
    const quantity = element.shadowRoot?.querySelector(".new-chat-quantity");
    expect(element.lastmessage).toEqual("Test message");
    const chat = element.shadowRoot?.querySelector(".md-taskitem__content_chat");
    expect(status?.getAttribute("name")).toEqual("task-status");
    expect(quantity).toBeUndefined;
    expect(chat).toBeUndefined;
  });

  test("should upadte type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "call",
      101,
      "Test message",
      false
    );
    expect(element).not.toBeNull();
    const quantity = element.shadowRoot?.querySelector(".new-chat-quantity span");
    expect(quantity).toBeUndefined;
  });

  test("should render slot quele", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "",
      "call",
      0,
      "Test message",
      false
    );
    expect(element).not.toBeNull();
    const quelle = element.shadowRoot?.querySelector(".md-taskitem__content_queue slot[name='queue']");
    expect(quelle).toBeUndefined;
  });

  test("should upadte type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "transfered",
      0,
      "",
      false
    );
    const mockClick = jest.spyOn(element, "handleClick");
    element.handleClick(new MouseEvent("click"));
    await elementUpdated(element);

    expect(mockClick).toHaveBeenCalled();

    mockClick.mockRestore();
  });

  test("should upadte type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "transfered",
      0,
      "",
      false
    );
    const mockKeydown = jest.spyOn(element, "handleKeyDown");
    element.handleKeyDown(new KeyboardEvent(Key.Enter));
    await elementUpdated(element);

    expect(mockKeydown).toHaveBeenCalled();

    mockKeydown.mockRestore();
  });

  test("should have custom aria label", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare",
      "quelle_1",
      "transfered",
      0,
      "",
      false,
      "Custom area label"
    );
    await elementUpdated(element);
    const ariaLabel = element.shadowRoot?.querySelector(".md-taskitem")?.getAttribute("aria-label");
    expect(ariaLabel).toEqual("Custom area label");
  });

  test("should have custom aria label title", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Mihael Varificantare aria label",
      "",
      "quelle_1",
      "transfered",
      0,
      "",
      false
    );
    await elementUpdated(element);
    const ariaLabel = element.shadowRoot?.querySelector(".md-taskitem")?.getAttribute("aria-label");
    expect(ariaLabel).toEqual("twitter transfered Mihael Varificantare aria label Test Queue Name 0 minutes 0 seconds  ");
  });

  test("should have custom aria label new title", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "",
      "Mihael Varificantare aria label",
      "quelle_1",
      "transfered",
      0,
      "",
      false
    );
    await elementUpdated(element);
    const ariaLabel = element.shadowRoot?.querySelector(".md-taskitem")?.getAttribute("aria-label");
    expect(ariaLabel).toEqual("twitter transfered Mihael Varificantare aria label Test Queue Name 0 minutes 0 seconds  ");
  });

  test("should render titleName as the visible title of the task-item", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Not Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      "transfered",
      0,
      "",
      false
    );
    await elementUpdated(element);
    const itemTitle = element.shadowRoot?.querySelector(".md-taskitem__content_title");
    expect(itemTitle?.textContent).toEqual("Mihael Varificantare");
  });

  test("should render title as the visible title of the task-item in the absence of titleName", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Not Mihael Varificantare",
      "",
      "quelle_1",
      "transfered",
      0,
      "",
      false
    );
    await elementUpdated(element);
    const itemTitle = element.shadowRoot?.querySelector(".md-taskitem__content_title");
    expect(itemTitle?.textContent).toEqual("Not Mihael Varificantare");
  });

});
