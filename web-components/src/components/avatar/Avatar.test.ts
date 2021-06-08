import "./Avatar";
import { Avatar } from "./Avatar";
import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";

describe("Avatar", () => {
  afterEach(fixtureCleanup);

  test("should set source property", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" title="Alyson Born" src="https://example.com"></md-avatar>
      `
    );
    expect(element.src).toEqual("https://example.com");
  });

  test("should set color property", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" title="Alyson Born" color="mint"></md-avatar>
      `
    );
    expect(element.color).toEqual("mint");
  });

  test("should set size property", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" size="44"></md-avatar>
      `
    );
    expect(element.size).toEqual(44);
  });

  test("should set correct pretify title", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" title=" Alyson Born Hoaland "></md-avatar>
      `
    );
    const letter = element.shadowRoot!.querySelector(".md-avatar__letter");

    expect(letter!.textContent!.trim()).toEqual("AH");


    const element2 = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" title="Chandler"></md-avatar>
      `
    );
    const letter2 = element2.shadowRoot!.querySelector(".md-avatar__letter");

    expect(letter2!.textContent!.trim()).toEqual("C");

    const element3 = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" title="Joseph Francis Tribbiani Junior"></md-avatar>
      `
    );
    const letter3 = element3.shadowRoot!.querySelector(".md-avatar__letter");

    expect(letter3!.textContent!.trim()).toEqual("JJ");
  });

  test("should render icon even if title is provided", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" title="Alyson Born Hoaland" color="mint" icon-name="warning_20"></md-avatar>
      `
    );

    expect(element.shadowRoot!.querySelector(".md-avatar__img")).toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon")).not.toBeNull();
    expect(element.shadowRoot!.querySelector(".md-avatar__letter")).toBeNull();
  });

  test("should render self avatar type if type property provided with self value", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar alt="avatar" size="36" title="Alyson Born Hoaland" type="self"></md-avatar>
      `
    );
    expect(element.shadowRoot!.querySelector(".md-avatar__self")).not.toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon")).not.toBeNull();
    expect(element.shadowRoot!.querySelector("md-icon")!.name).toEqual("chat-active_16");

    element.size = 44;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector("md-icon")!.name).toEqual("chat-active_18");

    element.size = 28;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelector("md-icon")!.name).toEqual("chat-active_14");
  });

  test("should render notification bange", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar has-notification type="active" size="72" title="Tom Smith"></md-avatar>
      `
    );

    expect(element.hasNotification).toBeTruthy();
    expect(element.shadowRoot!.querySelector(".md-avatar__notification-badge")).not.toBeNull();
  });

  test("should provide loading status if type is typing", async () => {
    const element = await fixture<Avatar.ELEMENT>(
      html`
        <md-avatar type="typing" title="Tom Smith"></md-avatar>
      `
    );

    expect(element.shadowRoot!.querySelector("md-loading")).not.toBeNull();
  });
});
