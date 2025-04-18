const TaskItemStatus = {
  CONSULTING: "consulting",
  PLAY: "play",
  HOLD: "hold",
  CONFERENCE: "conference",
  TRANSFERED: "transfered",
  COURTESY_CALLBACK: "courtesy_callback",
  CAMPAIGN: "campaign"
} as const;

const TaskItemMediaType = {
  TELEPHONY: "telephony",
  OUTBOUND_TELEPHONY: "outbound telephony",
  INBOUND_TELEPHONY: "inbound telephony",
  OUTBOUND_CAMPAIGN: "outbound-campaign",
  CALLBACK: "callback",
  CHAT: "chat",
  PROGRESSIVE_CAMPAIGN: "progressive_campaign",
  MIDCALL_TELEPHONY: "midcall telephony",
  APPLE_MESSAGES: "applemessages",
  ICON_SRC: "icon src",
  EMAIL: "email",
  SMS: "sms",
  FACEBOOK: "facebook",
  WHATSAPP: "whatsapp",
  MESSENGER: "messenger"
} as const;

export { TaskItemStatus, TaskItemMediaType };
