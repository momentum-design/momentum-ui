import "./ChatMessage";
import { ChatMessage } from "./ChatMessage";
import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import { Avatar } from "../avatar/Avatar"; // Keep type import as a relative path

describe("Chat Message Component", () => {
  let element: ChatMessage.ELEMENT;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<ChatMessage.ELEMENT>(html`
      <md-chat-message
        title="John Doe"
        time="11:27AM"
        src="https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
      ></md-chat-message>
    `);
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
});
