import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./TaskItem";
import { type TaskItem } from "./TaskItem";
import { TaskItemMediaType, TaskItemStatus } from "./TaskItem.constants";

const fixtureFactory = async (
  mediaType: string,
  popovertitle: string,
  itemTitle: string,
  queue: string,
  status: string,
  quantity: number,
  lastmessage: string,
  selected: boolean,
  customAriaLabel = "",
  iconSrc = "",
  isRestyle = false,
  queueTimeLabel: string = ""
): Promise<TaskItem.ELEMENT> => {
  return await fixture(html`
    <md-task-item
      mediaType="${mediaType}"
      popovertitle="${popovertitle}"
      item-title="${itemTitle}"
      status="${status}"
      queue="${queue}"
      queue-time-label="${queueTimeLabel}"
      quantity="${quantity}"
      lastmessage="${lastmessage}"
      .selected="${selected}"
      customAriaLabel="${customAriaLabel}"
      iconSrc="${iconSrc}"
      ?is-restyle="${isRestyle}"
    >
      <span slot="queue">
        <span class="queue-name">Test Queue Name 00:00</span>
      </span>
      <div slot="task-addition">00:08</div>
    </md-task-item>
  `);
};

describe("TaskItem", () => {
  afterEach(fixtureCleanup);

  test("should render TaskItem Component", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.TELEPHONY,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.CONSULTING,
      0,
      "",
      false
    );
    expect(element).not.toBeNull();
    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("handset-filled");
    expect(status?.getAttribute("name")).toEqual("headset-bold");
    expect(element.itemTitle).toEqual("Mihael Varificantare");
  });

  test("should render TaskItem Component", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.FACEBOOK,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.CONSULTING,
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("messenger_16");
  });

  test("should render TaskItem Component", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.WHATSAPP,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.CONSULTING,
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("whatsApp_16");
  });

  test("should render TaskItem Component for Apple Chat Messenger", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.APPLE_MESSAGES,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.PLAY,
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
      TaskItemMediaType.PROGRESSIVE_CAMPAIGN,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.CONSULTING,
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("icon-icon-campaign_18");
  });

  test("should render TaskItem Component with outbound-campaign", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.OUTBOUND_CAMPAIGN,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.CONSULTING,
      0,
      "",
      false
    );
    const avatarEl = element.shadowRoot?.querySelector("md-avatar");
    expect(avatarEl).toBeTruthy();
  });

  test("should render correct type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.CHAT,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.PLAY,
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
      TaskItemMediaType.OUTBOUND_TELEPHONY,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.PLAY,
      0,
      "",
      false
    );

    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("outgoing-call-legacy-filled");
  });

  test("should render midcall type", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.MIDCALL_TELEPHONY,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.PLAY,
      0,
      "",
      false,
      "",
      "/images/illustrations/Monitoring-regular-light.svg"
    );

    const type = element.shadowRoot?.querySelector("img");
    expect(type?.getAttribute("src")).toEqual("/images/illustrations/Monitoring-regular-light.svg");
  });

  test("should render callback type ", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.CALLBACK,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.PLAY,
      0,
      "",
      false
    );

    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("icon-icon-callback_18");
  });

  test("should render correct inbound type icon", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.INBOUND_TELEPHONY,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.PLAY,
      0,
      "",
      false
    );

    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("incoming-call-legacy-filled");
  });

  test("should update type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.EMAIL,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.HOLD,
      0,
      "",
      true
    );

    expect(element.selected).toBeTruthy();
    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("email-filled");
    expect(status?.getAttribute("name")).toEqual("pause-bold");
  });

  test("should update type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.SMS,
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.CONFERENCE,
      0,
      "",
      false
    );
    expect(element).not.toBeNull();
    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("sms-filled");
    expect(status?.getAttribute("name")).toEqual("meet-bold");
  });

  test("should update type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
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
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.CAMPAIGN,
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
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.COURTESY_CALLBACK,
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
    expect(quantity).toBeDefined();
    expect(chat).toBeDefined();
  });

  test("should upadte type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      "call",
      101,
      "Test message",
      false
    );
    expect(element).not.toBeNull();
    const quantity = element.shadowRoot?.querySelector(".new-chat-quantity span");
    expect(quantity).toBeDefined();
  });

  test("should render slot queue", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "",
      "call",
      0,
      "Test message",
      false
    );
    expect(element).not.toBeNull();
    const queue = element.shadowRoot?.querySelector(".md-taskitem__content_queue slot[name='queue']");
    expect(queue).toBeDefined();
  });

  test("should upadte type and status", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
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
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
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
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
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
      "Mihael Varificantaren aria label",
      "",
      "",
      TaskItemStatus.TRANSFERED,
      0,
      "",
      false
    );
    await elementUpdated(element);
    const ariaLabel = element.shadowRoot?.querySelector(".md-taskitem")?.getAttribute("aria-label");
    expect(ariaLabel).toEqual(
      "twitter transfered Mihael Varificantaren aria label  Test Queue Name 0 minutes 0 seconds   "
    );
  });

  test("should have custom aria label new title", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "",
      "Mihael Varificantare aria label",
      "",
      TaskItemStatus.TRANSFERED,
      0,
      "",
      false
    );
    await elementUpdated(element);
    const ariaLabel = element.shadowRoot?.querySelector(".md-taskitem")?.getAttribute("aria-label");
    expect(ariaLabel).toEqual(
      "twitter transfered  Mihael Varificantare aria label Test Queue Name 0 minutes 0 seconds   "
    );
  });

  test("should render titleName as the visible title of the task-item", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      "twitter",
      "Mihael Varificantare",
      "Mihael Varificantare",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
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
      "quelle_1",
      TaskItemStatus.TRANSFERED,
      0,
      "",
      false
    );
    await elementUpdated(element);
    const itemTitle = element.shadowRoot?.querySelector(".md-taskitem__content_title");
    expect(itemTitle?.textContent).toEqual("Not Mihael Varificantare");
  });

  it("should render new taskType template when isRestyle is true", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.TELEPHONY,
      "Mihael Varificantare",
      "",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
      0,
      "",
      false,
      "",
      "",
      true
    );
    await elementUpdated(element);

    const avatar = element.shadowRoot?.querySelector("md-avatar");
    expect(avatar).not.toBeNull();
    expect(avatar?.getAttribute("type")).toEqual("channel-call");
    expect(avatar?.getAttribute("presence-type")).toEqual(TaskItemStatus.TRANSFERED);
  });

  it("should render legacy taskType template when isRestyle is false", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.TELEPHONY,
      "Mihael Varificantare",
      "",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
      0,
      "",
      false,
      "",
      "",
      false
    );
    await elementUpdated(element);

    const avatar = element.shadowRoot?.querySelector("md-badge");
    expect(avatar).not.toBeNull();
    const icon = avatar?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("handset-filled");
  });

  it("should render queueTimeLabel when queueTimeLabel is set", async () => {
    const element: TaskItem.ELEMENT = await fixtureFactory(
      TaskItemMediaType.TELEPHONY,
      "Mihael Varificantare",
      "",
      "quelle_1",
      TaskItemStatus.TRANSFERED,
      0,
      "",
      false,
      "",
      "",
      true,
      "00:00"
    );
    await elementUpdated(element);

    const queueTimeDot = element.shadowRoot?.querySelector(".md-taskitem__content_queue_dot");
    expect(queueTimeDot).toBeDefined();
  });
});
