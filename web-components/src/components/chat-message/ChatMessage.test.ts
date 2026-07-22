import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit";
import { Avatar } from "@/components/avatar/Avatar";
import "./ChatMessage";
import { type ChatMessage } from "./ChatMessage";

describe("Chat Message Component", () => {
  let element: ChatMessage.ELEMENT;

  beforeEach(async () => {
    jest.useFakeTimers();
    element = await fixture<ChatMessage.ELEMENT>(html`
      <md-chat-message
        title="John Doe"
        time="11:27AM"
        src="https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
      ></md-chat-message>
    `);
    jest.runAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should render correctly if property self is provided", async () => {
    element.self = true;

    await elementUpdated(element);
    expect(element.self).toBeTruthy();

    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar");
    expect(avatar!.title).toEqual("self");

    element.self = false;

    await elementUpdated(element);
    expect(element.self).toBeFalsy();
    expect(avatar!.title).toEqual("John Doe");
  });

  test("should render correct src", async () => {
    element.self = true;
    await elementUpdated(element);
    expect(element.self).toBeTruthy();

    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar");
    expect(avatar?.src).toBeNull();

    element.self = false;
    await elementUpdated(element);
    expect(element.self).toBeFalsy();
    expect(avatar!.src).toEqual(
      "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
    );
  });

  test("should render correct avatar type", async () => {
    element.self = true;
    await elementUpdated(element);
    expect(element.self).toBeTruthy();

    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar");
    expect(avatar?.type).toEqual("self");

    element.self = false;
    await elementUpdated(element);
    expect(element.self).toBeFalsy();
    expect(avatar?.type).toBeFalsy();
  });

  test("should render correct avatar size", async () => {
    element.avatarSize = 40;
    await elementUpdated(element);
    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar");
    expect(avatar?.size).toEqual(40);

    element.avatarSize = 50;
    await elementUpdated(element);
    expect(avatar?.size).toEqual(50);
  });

  test("should render correct avatar color", async () => {
    element.avatarColor = "blue";
    await elementUpdated(element);
    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar");
    expect(avatar?.color).toEqual("blue");

    element.avatarColor = "red";
    await elementUpdated(element);
    expect(avatar?.color).toEqual("red");
  });

  test("should fire timestamp-clicked event when clickable timestamp is clicked", async () => {
    element.clickableTimestamp = true;
    await elementUpdated(element);
    const dispatchEventSpy = jest.spyOn(element, "dispatchEvent");
    const timestampLink = element.shadowRoot!.querySelector("md-link.md-chat-message_time");
    expect(timestampLink).not.toBeNull();

    (timestampLink as HTMLElement)!.click();

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "timestamp-clicked"
      })
    );
  });

  test("should render timestamp as non-clickable div when clickableTimestamp is false", async () => {
    element.clickableTimestamp = false;
    await elementUpdated(element);

    const timestampDiv = element.shadowRoot!.querySelector("div.md-chat-message_time");
    const timestampLink = element.shadowRoot!.querySelector("md-link.md-chat-message_time");

    expect(timestampDiv).not.toBeNull();
    expect(timestampLink).toBeNull();
  });

  test("should render an icon avatar when iconName is set and src is empty", async () => {
    element.src = "";
    element.iconName = "icon-bot-customer-assistant_16";
    await elementUpdated(element);

    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar")!;
    expect(avatar.iconName).toEqual("icon-bot-customer-assistant_16");

    await avatar.updateComplete;
    const icon = avatar.shadowRoot!.querySelector("md-icon");
    expect(icon).not.toBeNull();
    expect(icon!.name).toEqual("icon-bot-customer-assistant_16");
    expect(avatar.shadowRoot!.querySelector(".md-avatar__icon")).not.toBeNull();
  });

  test("should keep forwarding src when both src and iconName are set so the image still wins", async () => {
    element.iconName = "icon-bot-customer-assistant_16";
    await elementUpdated(element);

    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar")!;
    expect(avatar.src).toEqual(
      "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
    );
    expect(avatar.iconName).toEqual("icon-bot-customer-assistant_16");
  });

  test("should ignore iconName for a self message", async () => {
    element.self = true;
    element.iconName = "icon-bot-customer-assistant_16";
    await elementUpdated(element);

    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar")!;
    expect(avatar.iconName).toBeFalsy();
    expect(avatar.type).toEqual("self");

    await avatar.updateComplete;
    expect(avatar.shadowRoot!.querySelector(".md-avatar__self")).not.toBeNull();
  });

  test("should forward newMomentum to toggle the avatar icon set", async () => {
    element.src = "";
    element.iconName = "icon-bot-customer-assistant_16";
    element.newMomentum = true;
    await elementUpdated(element);

    const avatar = element.shadowRoot!.querySelector<Avatar.ELEMENT>("md-avatar")!;
    expect(avatar.newMomentum).toBe(true);
    await avatar.updateComplete;
    expect(avatar.shadowRoot!.querySelector("md-icon")!.iconSet).toEqual("momentumDesign");

    element.newMomentum = false;
    await elementUpdated(element);
    await avatar.updateComplete;
    expect(avatar.newMomentum).toBe(false);
    expect(avatar.shadowRoot!.querySelector("md-icon")!.iconSet).toEqual("momentumUI");
  });
});
