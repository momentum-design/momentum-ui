import { html } from "lit";
import { TaskItemMediaType } from "./TaskItem.constants";
import { getChannelAvatar, renderChatCount, renderLegacyTaskType, renderTaskType } from "./TaskItem.utils";

describe("TaskItem Utils", () => {
  let mockElement: HTMLElement;
  beforeEach(() => {
    mockElement = document.createElement("div");
  });

  describe("renderTaskType", () => {
    it("should return the correct avatar for TELEPHONY", () => {
      const result = renderTaskType(TaskItemMediaType.TELEPHONY, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-call"));
    });

    it("should return the correct avatar for PROGRESSIVE_CAMPAIGN", () => {
      const result = renderTaskType(TaskItemMediaType.PROGRESSIVE_CAMPAIGN, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-callback-v2"));
    });

    it("should return the correct avatar for CALLBACK", () => {
      const result = renderTaskType(TaskItemMediaType.CALLBACK, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-callback-v2"));
    });

    it("should return the correct avatar for OUTBOUND_TELEPHONY", () => {
      const result = renderTaskType(TaskItemMediaType.OUTBOUND_TELEPHONY, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-callback"));
    });

    it("should return the correct avatar for INBOUND_TELEPHONY", () => {
      const result = renderTaskType(TaskItemMediaType.INBOUND_TELEPHONY, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-call-inbound"));
    });

    it("should return the correct avatar for APPLE_MESSAGES", () => {
      const result = renderTaskType(TaskItemMediaType.APPLE_MESSAGES, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-apple-chat"));
    });

    it("should return the correct avatar for OUTBOUND_CAMPAIGN", () => {
      const result = renderTaskType(TaskItemMediaType.OUTBOUND_CAMPAIGN, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-campaign"));
    });

    it("should return the correct avatar for CHAT", () => {
      const result = renderTaskType(TaskItemMediaType.CHAT, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-chat"));
    });

    it("should return the correct avatar for EMAIL", () => {
      const result = renderTaskType(TaskItemMediaType.EMAIL, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-email-inbound"));
    });

    it("should return the correct avatar for SMS", () => {
      const result = renderTaskType(TaskItemMediaType.SMS, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-sms-inbound"));
    });

    it("should return the correct avatar for FACEBOOK", () => {
      const result = renderTaskType(TaskItemMediaType.FACEBOOK, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-fb-messenger"));
    });

    it("should return the correct avatar for WHATSAPP", () => {
      const result = renderTaskType(TaskItemMediaType.WHATSAPP, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-whats-app"));
    });

    it("should return the correct avatar for MESSENGER", () => {
      const result = renderTaskType(TaskItemMediaType.MESSENGER, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-facebook"));
    });

    it("should return the correct avatar for MIDCALL_TELEPHONY", () => {
      const result = renderTaskType(TaskItemMediaType.MIDCALL_TELEPHONY, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-monitoring"));
    });

    it("should return the correct avatar for OUTBOUND_EMAIL", () => {
      const result = renderTaskType(TaskItemMediaType.OUTBOUND_EMAIL, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-email-outbound"));
    });

    it("should return the correct avatar for OUTBOUND_SMS", () => {
      const result = renderTaskType(TaskItemMediaType.OUTBOUND_SMS, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-sms-outbound"));
    });

    it("should return the correct avatar for SOCIAL_X", () => {
      const result = renderTaskType(TaskItemMediaType.SOCIAL_X, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-twitter-x"));
    });

    it("should return the correct avatar for VIBER", () => {
      const result = renderTaskType(TaskItemMediaType.VIBER, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-viber"));
    });

    it("should return the correct avatar for WECHAT", () => {
      const result = renderTaskType(TaskItemMediaType.WECHAT, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-we-chat"));
    });

    it("should return the correct avatar for WEBEX", () => {
      const result = renderTaskType(TaskItemMediaType.WEBEX, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-webex"));
    });

    it("should return the correct avatar for GOOGLE_MESSAGES with iconSrc", () => {
      const iconSrc = "https://example.com/icon.png";
      const result = renderTaskType(TaskItemMediaType.GOOGLE_MESSAGES, false, "inactive", iconSrc);
      expect(result).toEqual(
        getChannelAvatar(false, "inactive", "channel-custom", html`<img height="32px" width="32px" src="${iconSrc}" />`)
      );
    });

    it("should return the correct avatar for ICON_SRC with iconSrc", () => {
      const iconSrc = "https://example.com/icon.png";
      const result = renderTaskType(TaskItemMediaType.ICON_SRC, false, "inactive", iconSrc);
      expect(result).toEqual(
        getChannelAvatar(false, "inactive", "channel-custom", html`<img height="20px" width="20px" src="${iconSrc}" />`)
      );
    });

    it("should return the correct avatar for WORKITEM", () => {
      const result = renderTaskType(TaskItemMediaType.WORKITEM, true, "active", "");
      expect(result).toEqual(getChannelAvatar(true, "active", "channel-work-item"));
    });

    it("should return the default avatar for unsupported mediaType", () => {
      const result = renderTaskType("UNSUPPORTED_TYPE", false, null, "");
      expect(result).toEqual(getChannelAvatar(false, null, "channel-custom", html`<slot name="task-type"></slot>`));
    });

    it("should return md-badge with unread count when isRestyle is true", () => {
      const quantity = 10;
      const isRestyle = true;

      const result = renderChatCount(quantity, isRestyle, mockElement);

      expect(result).toEqual(html` <md-badge color="unreadcount"> ${quantity.toString()} </md-badge>`);
      expect(mockElement.getAttribute("has-messages")).toBe("true");
    });

    it("should return md-avatar with active state when selected is true", () => {
      const selected = true;
      const result = renderLegacyTaskType(TaskItemMediaType.OUTBOUND_CAMPAIGN, selected, "");
      expect(result).toEqual(html`
        <md-avatar
          title="Channel Campaign"
          type="channel-campaign"
          avatar-style="default"
          state=${selected ? "active" : "rest"}
        ></md-avatar>
      `);
    });
  });
});
