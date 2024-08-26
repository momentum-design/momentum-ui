import "@/components/icon/Icon";

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
  ""
] as const;

const AvatarSize = [18, 24, 28, 32, 36, 40, 44, 48, 52, 56, 64, 72, 80, 84, 124];

export { AvatarSize, AvatarType };
