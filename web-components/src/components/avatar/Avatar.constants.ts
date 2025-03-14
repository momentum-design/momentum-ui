import "@/components/icon/Icon";

const ChannelState = ["active", "rest"] as const;

const ChannelStyle = ["default", "table"] as const;

const AvatarType = [
  "active",
  "away",
  "away-calling",
  "busy",
  "bot",
  "call",
  "dnd",
  "group",
  "inactive",
  "meeting",
  "ooo",
  "on-mobile",
  "on-device",
  "on-hold",
  "presenting",
  "self",
  "schedule",
  "typing",
  "engaged",
  "idle",
  "rona",
  "quiet-hours",
  "channel-chat",
  "channel-sms-inbound",
  "channel-sms-outbound",
  "channel-email-inbound",
  "channel-email-outbound",
  "channel-call",
  "channel-callback",
  "channel-headset",
  "channel-campaign",
  "channel-emoji",
  "channel-webex",
  "channel-fb-messenger",
  "channel-apple-chat",
  "channel-line",
  "channel-twitter-x",
  "channel-viber",
  "channel-whats-app",
  "channel-we-chat",
  "channel-spam",
  "channel-custom",
  ""
] as const;

const AvatarSize = [18, 24, 28, 32, 36, 40, 44, 48, 52, 56, 64, 72, 80, 84, 124];

export { AvatarSize, AvatarType, ChannelState, ChannelStyle };
