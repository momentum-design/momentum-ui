import "@/components/icon/Icon";

const AvatarState = ["active", "rest"] as const;

const AvatarStyle = ["default", "table"] as const;

const AvatarType = [
  "bot",
  "group",
  "self",
  "typing",
  "channel-chat",
  "channel-sms-inbound",
  "channel-sms-outbound",
  "channel-email-inbound",
  "channel-email-outbound",
  "channel-call",
  "channel-social",
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

export { AvatarSize, AvatarState, AvatarStyle, AvatarType };
