import "@/components/icon/Icon";

const AvatarType = [
  "active",
  "away",
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

const PresenceSizeRate = 0.844;

const AVATAR_PRESENCE_ICON_SIZE_MAPPING: Record<number, number> = {
  24: 14 * PresenceSizeRate,
  32: 14 * PresenceSizeRate,
  48: 16 * PresenceSizeRate,
  64: 18 * PresenceSizeRate,
  72: 20 * PresenceSizeRate,
  88: 28 * PresenceSizeRate,
  124: 36 * PresenceSizeRate
};

export { AvatarType, AvatarSize, AVATAR_PRESENCE_ICON_SIZE_MAPPING };
