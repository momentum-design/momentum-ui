import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./Presence";
import { type Presence } from "./Presence";
import { getPresenceIconColor, getPresenceSize } from "./Presence.utils";

describe("Presence", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should set size property", async () => {
    const element = await fixture<Presence.ELEMENT>(html` <md-presence size="36" title="active"></md-presence> `);
    expect(element.size).toEqual(36);
    expect(element.title).toEqual("active");
  });

  test("should set color property", async () => {
    const element = await fixture<Presence.ELEMENT>(html`
      <md-presence color="var(--mds-color-theme-indicator-stable)" title="active"></md-presence>
    `);
    expect(element.color).toEqual("var(--mds-color-theme-indicator-stable)");
    expect(element.title).toEqual("active");
  });

  // Present.utils tests
  test("returns correct values for active presenceType", () => {
    const result = getPresenceIconColor("active", false);
    expect(result).toEqual({
      presenceIcon: "active-presence-small-filled",
      presenceColor: "var(--avatar-presence-active)"
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("meeting", false);
    expect(result).toEqual({
      presenceIcon: "camera-presence_14",
      presenceColor: "var(--avatar-presence-unstable)"
    });
  });

  test("returns correct values for schedule presenceType", () => {
    const result = getPresenceIconColor("schedule", false);
    expect(result).toEqual({
      presenceIcon: "meetings-presence_14",
      presenceColor: "var(--avatar-presence-unstable)"
    });
  });

  test("returns correct values for call presenceType", () => {
    const result = getPresenceIconColor("call", false);
    expect(result).toEqual({
      presenceIcon: "handset-active_16",
      presenceColor: "var(--avatar-presence-unstable)"
    });
  });

  test("returns correct values for dnd presenceType", () => {
    const result = getPresenceIconColor("dnd", false);
    expect(result).toEqual({
      presenceIcon: "dnd-presence_14",
      presenceColor: "var(--avatar-presence-dnd)"
    });
  });

  test("returns correct values for presenting presenceType", () => {
    const result = getPresenceIconColor("presenting", false);
    expect(result).toEqual({
      presenceIcon: "content-share_14",
      presenceColor: "var(--avatar-presence-dnd)"
    });
  });

  test("returns correct values for quiet hours presenceType", () => {
    const result = getPresenceIconColor("quiet-hours", false);
    expect(result).toEqual({
      presenceIcon: "quiet-hours-presence-filled",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for away presenceType", () => {
    const result = getPresenceIconColor("away", false);
    expect(result).toEqual({
      presenceIcon: "recents-presence_14",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for idle presenceType", () => {
    const result = getPresenceIconColor("idle", false);
    expect(result).toEqual({
      presenceIcon: "recents-presence_14",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for away calling presenceType", () => {
    const result = getPresenceIconColor("away-calling", false);
    expect(result).toEqual({
      presenceIcon: "away-calling-presence-filled",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for pto presenceType", () => {
    const result = getPresenceIconColor("ooo", false);
    expect(result).toEqual({
      presenceIcon: "pto-presence-filled",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for busy presenceType", () => {
    const result = getPresenceIconColor("busy", false);
    expect(result).toEqual({
      presenceIcon: "busy-presence-bold",
      presenceColor: "var(--avatar-presence-unstable)"
    });
  });

  test("returns correct values for on mobile presenceType", () => {
    const result = getPresenceIconColor("on-mobile", false);
    expect(result).toEqual({
      presenceIcon: "phone-filled",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for on device presenceType", () => {
    const result = getPresenceIconColor("on-device", false);
    expect(result).toEqual({
      presenceIcon: "generic-device-video_16",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for meeting presenceType", () => {
    const result = getPresenceIconColor("on-hold", false);
    expect(result).toEqual({
      presenceIcon: "pause-badge-filled",
      presenceColor: "var(--avatar-presence-inactive)"
    });
  });

  test("returns correct values for engaged presenceType", () => {
    const result = getPresenceIconColor("engaged", false);
    expect(result).toEqual({
      presenceIcon: "busy-presence-bold",
      presenceColor: "var(--avatar-presence-engaged)"
    });
  });

  test("returns correct values for rona presenceType", () => {
    const result = getPresenceIconColor("rona", false);
    expect(result).toEqual({
      presenceIcon: "dnd-presence-badge-filled",
      presenceColor: "var(--avatar-presence-rona)"
    });
  });

  test("returns correct values when failureBadge is true", () => {
    const result = getPresenceIconColor("", true);
    expect(result).toEqual({
      presenceIcon: "warning-badge-filled",
      presenceColor: "var(--mds-color-theme-indicator-attention)"
    });
  });

  test("returns an empty object for invalid presenceType", () => {
    const result = getPresenceIconColor("", false);
    expect(result).toEqual({});
  });
});

describe("getPresenceSize", () => {
  it("should return 10.5 for sizes <= 24", () => {
    expect(getPresenceSize(24)).toBe(10.5);
    expect(getPresenceSize(20)).toBe(10.5);
    expect(getPresenceSize(10)).toBe(10.5);
  });

  it("should return 14 for sizes <= 32", () => {
    expect(getPresenceSize(32)).toBe(14);
    expect(getPresenceSize(25)).toBe(14);
  });

  it("should return 16 for sizes <= 36", () => {
    expect(getPresenceSize(36)).toBe(13.94);
    expect(getPresenceSize(33)).toBe(13.94);
  });

  it("should return 16 for sizes <= 40", () => {
    expect(getPresenceSize(40)).toBe(13.94);
    expect(getPresenceSize(37)).toBe(13.94);
  });

  it("should return 16 for sizes <= 48", () => {
    expect(getPresenceSize(48)).toBe(13.94);
    expect(getPresenceSize(41)).toBe(13.94);
  });

  it("should return 18 for sizes <= 64", () => {
    expect(getPresenceSize(64)).toBe(18.58);
    expect(getPresenceSize(49)).toBe(18.58);
  });

  it("should return 20 for sizes <= 72", () => {
    expect(getPresenceSize(72)).toBe(20.9);
    expect(getPresenceSize(65)).toBe(20.9);
  });

  it("should return 28 for sizes <= 88", () => {
    expect(getPresenceSize(88)).toBe(25.55);
    expect(getPresenceSize(73)).toBe(25.55);
  });

  it("should return 36 for sizes > 88", () => {
    expect(getPresenceSize(89)).toBe(36);
    expect(getPresenceSize(100)).toBe(36);
  });
});
