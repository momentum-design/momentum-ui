import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./TaskItem";
import { TaskItem } from "./TaskItem";

const fixtureFactory = async (
  mediaType: string,
  title: string,
  queue: string,
  status: string,
  quantity: number,
  lastmessage: string,
  selected: boolean
): Promise<TaskItem> => {
  return await fixture(
    html`
      <md-task-item
        mediaType="${mediaType}"
        title="${title}"
        queue="${queue}"
        status="${status}"
        quantity="${quantity}"
        lastmessage="${lastmessage}"
        .selected="${selected}"
      >
        <div slot="task-addition">00:08</div>
      </md-task-item>
    `
  );
};

describe("TaskItem", () => {
  afterEach(fixtureCleanup);

  test("should render TaskItem Component", async () => {
    const element: TaskItem = await fixtureFactory(
      "telephony",
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
    expect(type?.getAttribute("name")).toEqual("handset-active_16");
    expect(status?.getAttribute("name")).toEqual("headset_12");
  });

  test("should render TaskItem Component", async () => {
    const element: TaskItem = await fixtureFactory(
      "facebook",
      "Mihael Varificantare",
      "quelle_1",
      "consulting",
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("messenger_16");
  });

  test("should render TaskItem Component", async () => {
    const element: TaskItem = await fixtureFactory(
      "whatsApp",
      "Mihael Varificantare",
      "quelle_1",
      "consulting",
      0,
      "",
      false
    );
    const type = element.shadowRoot?.querySelector("md-icon");
    expect(type?.getAttribute("name")).toEqual("whatsApp_16");
  });

  test("should render correct type and status", async () => {
    const element: TaskItem = await fixtureFactory("chat", "Mihael Varificantare", "quelle_1", "play", 0, "", false);

    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("chat-active_16");
    expect(status?.getAttribute("name")).toEqual("play_12");
  });

  test("should upadte type and status", async () => {
    const element: TaskItem = await fixtureFactory("email", "Mihael Varificantare", "quelle_1", "hold", 0, "", true);

    expect(element.selected).toBeTruthy;
    const type = element.shadowRoot?.querySelector("md-icon");
    const status = element.shadowRoot?.querySelector(".md-taskitem__status md-icon");
    expect(type?.getAttribute("name")).toEqual("email-active_16");
    expect(status?.getAttribute("name")).toEqual("pause_12");
  });

  test("should upadte type and status", async () => {
    const element: TaskItem = await fixtureFactory(
      "sms",
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
    expect(type?.getAttribute("name")).toEqual("sms_16");
    expect(status?.getAttribute("name")).toEqual("meet_12");
  });

  test("should upadte type and status", async () => {
    const element: TaskItem = await fixtureFactory(
      "twitter",
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
    expect(status?.getAttribute("name")).toEqual("assign-privilege_12");
  });

  test("should upadte type and status", async () => {
    const element: TaskItem = await fixtureFactory(
      "twitter",
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
    const element: TaskItem = await fixtureFactory(
      "twitter",
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
    const element: TaskItem = await fixtureFactory(
      "twitter",
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
});
