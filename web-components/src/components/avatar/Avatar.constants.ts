const AvatarState = ["active", "rest"] as const;

const AvatarStyle = ["default", "table"] as const;

const AvatarChannelType = [
  "channel-chat",
  "channel-chat-outbound",
  "channel-sms-inbound",
  "channel-sms-outbound",
  "channel-email-inbound",
  "channel-email-outbound",
  "channel-call",
  "channel-call-inbound",
  "channel-social",
  "channel-callback",
  "channel-callback-v2",
  "channel-headset",
  "channel-campaign",
  "channel-emoji",
  "channel-webex",
  "channel-fb-messenger",
  "channel-facebook",
  "channel-apple-chat",
  "channel-line",
  "channel-twitter-x",
  "channel-viber",
  "channel-whats-app",
  "channel-monitoring",
  "channel-we-chat",
  "channel-spam",
  "channel-custom",
  "channel-work-item"
] as const;

const AvatarType = ["bot", "group", "self", "typing", ""] as const;

const AvatarSize = [16, 18, 24, 28, 32, 36, 40, 44, 48, 52, 56, 64, 72, 80, 84, 124];

const PresenceLabelMap: Record<string, string> = {
  active: "Available",
  meeting: "In a meeting",
  schedule: "Scheduled",
  call: "On a call",
  dnd: "Do not disturb",
  presenting: "Presenting",
  "quiet-hours": "Quiet hours",
  away: "Away",
  idle: "Idle",
  inactive: "Inactive",
  "away-calling": "Away",
  ooo: "Out of office",
  busy: "Busy",
  "on-mobile": "On mobile",
  "on-device": "On device",
  "on-hold": "On hold",
  engaged: "Engaged",
  rona: "Unavailable",
  wrapup: "Wrap up"
};

export { AvatarChannelType, AvatarSize, AvatarState, AvatarStyle, AvatarType, PresenceLabelMap };
