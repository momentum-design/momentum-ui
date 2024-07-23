import "./Presence";
import { Presence } from "./Presence";
import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import { getPresenceIconColor } from "./Presence.utils";

describe("Presence", () => {
  afterEach(fixtureCleanup);

  test("should set size property", async () => {
    const element = await fixture<Presence.ELEMENT>(
      html`
        <md-presence size="36" title="active"></md-presence>
      `
    );
    expect(element.size).toEqual("36");
    expect(element.title).toEqual("active");
  });

  test("should set color property", async () => {
    const element = await fixture<Presence.ELEMENT>(
      html`
        <md-presence color="var(--mds-color-theme-indicator-stable)" title="active"></md-presence>
      `
    );
    expect(element.color).toEqual("var(--mds-color-theme-indicator-stable)");
    expect(element.title).toEqual("active");
  });

  // Present.utils tests
  test("returns correct values for active presenceType", () => {
    const result = getPresenceIconColor("active", false);
    expect(result).toEqual({
      presenceIcon: "unread-badge_12",
      presenceColor: "var(--avatar-presence-active)",
      isCircularWrapper: true
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("meeting", false);
    expect(result).toEqual({
      presenceIcon: "camera-presence_14",
      presenceColor: "var(--avatar-presence-unstable)",
      isCircularWrapper: false
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("schedule", false);
    expect(result).toEqual({
      presenceIcon: "meetings-presence_14",
      presenceColor: "var(--avatar-presence-unstable)",
      isCircularWrapper: false
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("call", false);
    expect(result).toEqual({
      presenceIcon: "handset_16",
      presenceColor: "var(--avatar-presence-unstable)",
      isCircularWrapper: false
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("dnd", false);
    expect(result).toEqual({
      presenceIcon: "dnd-presence_14",
      presenceColor: "var(--avatar-presence-rona)",
      isCircularWrapper: true
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("presenting", false);
    expect(result).toEqual({
      presenceIcon: "content-share_16",
      presenceColor: "var(--avatar-presence-rona)",
      isCircularWrapper: false
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("quiet-hours", false);
    expect(result).toEqual({
      presenceIcon: "dnd-presence_14",
      presenceColor: "var(--avatar-presence-inactive)",
      isCircularWrapper: true
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("away", false);
    expect(result).toEqual({
      presenceIcon: "recents-presence_14",
      presenceColor: "var(--avatar-presence-inactive)",
      isCircularWrapper: true
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("ooo", false);
    expect(result).toEqual({
      presenceIcon: "pto_16",
      presenceColor: "var(--avatar-presence-inactive)",
      isCircularWrapper: true
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("busy", false);
    expect(result).toEqual({
      presenceIcon: "busy-presence",
      presenceColor: "var(--avatar-presence-rona)",
      isCircularWrapper: true
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("on-mobile", false);
    expect(result).toEqual({
      presenceIcon: "phone-ios_16",
      presenceColor: "var(--avatar-presence-inactive)",
      isCircularWrapper: false
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("on-device", false);
    expect(result).toEqual({
      presenceIcon: "generic-device-video_16",
      presenceColor: "var(--avatar-presence-inactive)",
      isCircularWrapper: false
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("on-hold", false);
    expect(result).toEqual({
      presenceIcon: "pause_16",
      presenceColor: "var(--avatar-presence-inactive)",
      isCircularWrapper: false
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("engaged", false);
    expect(result).toEqual({
      presenceIcon: "unread-badge_12",
      presenceColor: "var(--avatar-presence-engaged)",
      isCircularWrapper: true
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("rona", false);
    expect(result).toEqual({
      presenceIcon: "unread-badge_12",
      presenceColor: "var(--avatar-presence-rona)",
      isCircularWrapper: true
    });
  });

  test("returns correct values when failureBadge is true", () => {
    const result = getPresenceIconColor("", true);
    expect(result).toEqual({
      presenceIcon: "warning",
      presenceColor: "var(--mds-color-theme-indicator-attention)",
      isCircularWrapper: true
    });
  });

  test("returns an empty object for invalid presenceType", () => {
    const result = getPresenceIconColor("", false);
    expect(result).toEqual({});
  });
});
