import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, oneEvent } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./Avatar";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  afterEach(fixtureCleanup);

  test("should set source property", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar alt="avatar" title="Alyson Born" src="https://example.com"></md-avatar>
    `);
    expect(element.src).toEqual("https://example.com");
  });

  test("should set color property", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar alt="avatar" title="Alyson Born" color="mint"></md-avatar>
    `);
    expect(element.color).toEqual("mint");
  });

  test("should set size property", async () => {
    const element = await fixture<Avatar.ELEMENT>(html` <md-avatar alt="avatar" size="44"></md-avatar> `);
    expect(element.size).toEqual(44);
  });

  test("should set correct pretify title", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar alt="avatar" title=" Alyson Born Hoaland "></md-avatar>
    `);
    const letter = element.shadowRoot!.querySelector(".md-avatar__letter");

    expect(letter!.textContent!.trim()).toEqual("AH");

    const element2 = await fixture<Avatar.ELEMENT>(html` <md-avatar alt="avatar" title="Chandler"></md-avatar> `);
    const letter2 = element2.shadowRoot!.querySelector(".md-avatar__letter");

    expect(letter2!.textContent!.trim()).toEqual("C");

    const element3 = await fixture<Avatar.ELEMENT>(html`
      <md-avatar alt="avatar" title="Joseph Francis Tribbiani Junior"></md-avatar>
    `);
    const letter3 = element3.shadowRoot!.querySelector(".md-avatar__letter");

    expect(letter3!.textContent!.trim()).toEqual("JJ");
  });

  test("should render icon even if title is provided", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar alt="avatar" title="Alyson Born Hoaland" color="mint" icon-name="warning_20"></md-avatar>
    `);

    expect(element.shadowRoot!.querySelector(".md-avatar__img")).toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon")).not.toBeNull();
    expect(element.shadowRoot!.querySelector(".md-avatar__letter")).toBeNull();
  });

  test("should render self avatar type if type property provided with self value", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar alt="avatar" size="36" title="Alyson Born Hoaland" type="self"></md-avatar>
    `);
    expect(element.shadowRoot!.querySelector(".md-avatar__self")).not.toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon")).not.toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon")!.name).toEqual("chat-filled");
    expect(element.shadowRoot!.querySelector("md-icon")!.size).toEqual("18");

    element.size = 44;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector("md-icon")!.name).toEqual("chat-filled");
    expect(element.shadowRoot!.querySelector("md-icon")!.size).toEqual("22");

    element.size = 28;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector("md-icon")!.name).toEqual("chat-filled");
    expect(element.shadowRoot!.querySelector("md-icon")!.size).toEqual("14");
  });

  test("should render notification bange", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar has-notification type="active" size="72" title="Tom Smith"></md-avatar>
    `);

    expect(element.hasNotification).toBeTruthy();
    expect(element.shadowRoot!.querySelector(".md-avatar__notification-badge")).not.toBeNull();
  });

  test("should provide loading status if type is typing", async () => {
    const element = await fixture<Avatar.ELEMENT>(html` <md-avatar type="typing" title="Tom Smith"></md-avatar> `);

    expect(element.shadowRoot!.querySelector("md-loading")).not.toBeNull();
  });

  test("should provide loading status if boolean typing is true", async () => {
    const element = await fixture<Avatar.ELEMENT>(html` <md-avatar typing="true" title="Tom Smith"></md-avatar> `);

    expect(element.shadowRoot!.querySelector("md-loading")).not.toBeNull();
  });

  test("should render presence if boolean newMomentum is true", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar type="active" title="active" newMomentum="true"></md-avatar>
    `);

    expect(element.shadowRoot!.querySelector("md-presence")).not.toBeNull();
    expect(element.shadowRoot!.querySelector(".md-avatar--active")).toBeNull();
  });

  test("should set presenceColor, presenceIcon, and isCircularWrapper based on type", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar type="active" title="active" newMomentum="true"></md-avatar>
    `);

    await element.updateComplete;

    const presenceIndicator = element.shadowRoot!.querySelector(".avatar-presence");
    expect(presenceIndicator).not.toBeNull();
    if (presenceIndicator) {
      const computedStyle = window.getComputedStyle(presenceIndicator);
      expect(computedStyle.color).toBe(
        getComputedStyle(document.documentElement).getPropertyValue("--avatar-presence-active")
      );
      expect(presenceIndicator.getAttribute("name")).toBe("unread-filled");
      expect(presenceIndicator.hasAttribute("isCircularWrapper"));
    }
  });

  test("should handle click event in avatar", async () => {
    jest.spyOn(Avatar.ELEMENT.prototype, "blur");
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar title="active" size="40" type="active" newMomentum clickable="true" role="button"></md-avatar>
    `);
    const evt = new MouseEvent("click");
    setTimeout(() => element.handleClick(evt));
    const { detail } = await oneEvent(element, "button-click");
    expect(detail).toBeDefined();
    expect(detail.srcEvent.type).toBe("click");
  });

  test("should handle keydown event in avatar", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar title="active" size="40" type="active" newMomentum clickable="true" role="button"></md-avatar>
    `);
    const spyKeyDown = jest.spyOn(element, "handleKeyDown");

    const mockFn = jest.fn();
    element.addEventListener("button-keydown", mockFn);

    const keyEvent = new KeyboardEvent("keydown", { code: Key.Enter });
    const keyEvent2 = new KeyboardEvent("keydown", { code: Key.Space });
    const keyEvent3 = new KeyboardEvent("keydown", { code: Key.NumpadEnter });
    element.handleKeyDown(keyEvent);
    element.handleKeyDown(keyEvent2);
    element.handleKeyDown(keyEvent3);
    expect(spyKeyDown).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenCalledTimes(3);
    spyKeyDown.mockRestore();
  });

  test("should not dispatch custom keydown event if not clickable", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar title="active" size="40" type="active" newMomentum></md-avatar>
    `);
    const spyKeyDown = jest.spyOn(element, "handleKeyDown");

    const mockFn = jest.fn();
    element.addEventListener("button-keydown", mockFn);

    const keyEvent = new KeyboardEvent("keydown", { code: Key.Enter });
    const keyEvent2 = new KeyboardEvent("keydown", { code: Key.Space });
    const keyEvent3 = new KeyboardEvent("keydown", { code: Key.NumpadEnter });
    element.handleKeyDown(keyEvent);
    element.handleKeyDown(keyEvent2);
    element.handleKeyDown(keyEvent3);
    expect(spyKeyDown).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenCalledTimes(0);
    spyKeyDown.mockRestore();
  });

  test("should not dispatch custom click if not clickable", async () => {
    const element = await fixture<Avatar.ELEMENT>(html`
      <md-avatar title="active" size="40" type="active" newMomentum></md-avatar>
    `);
    const spyHandleClick = jest.spyOn(element, "handleClick");

    const clickFunction = jest.fn();
    element.clickFunction = clickFunction;

    const mockFn = jest.fn();
    element.addEventListener("button-click", mockFn);

    const evt = new MouseEvent("click");
    element.handleClick(evt);
    expect(spyHandleClick).toHaveBeenCalledTimes(1);
    expect(clickFunction).toHaveBeenCalledTimes(0);
    expect(mockFn).toHaveBeenCalledTimes(0);
    spyHandleClick.mockRestore();
  });
});
