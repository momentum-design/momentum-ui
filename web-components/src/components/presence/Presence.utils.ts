import { TaskItem } from "../taskitem/TaskItem";
import { TaskItemStatus } from "../taskitem/TaskItem.constants";

export type PresenceState = (typeof PresenceType)[number] | TaskItem.TaskItemStatus;

type ReturnType = {
  presenceIcon: string | undefined;
  presenceColor: string | undefined;
};

export const PresenceType = [
  "active",
  "meeting",
  "schedule",
  "call",
  "dnd",
  "presenting",
  "quiet-hours",
  "away",
  "idle",
  "inactive",
  "away-calling",
  "ooo",
  "busy",
  "on-mobile",
  "on-device",
  "on-hold",
  "engaged",
  "rona",
  "wrapup",
  ""
] as const;

export const getPresenceIconColor = (
  presenceType: PresenceState,
  failureBadge: boolean,
  isMomentumDesign = false
): ReturnType => {
  let presenceIcon = "";
  let presenceColor = "";

  if (failureBadge) {
    presenceIcon = "warning-badge-filled";
    presenceColor = "var(--avatar-presence-warning)";
  } else {
    if (!presenceType) {
      return {
        presenceIcon: undefined,
        presenceColor: undefined
      };
    }

    switch (presenceType) {
      case "active":
        presenceIcon = "active-presence-small-filled";
        presenceColor = "var(--avatar-presence-active)";
        break;
      case "meeting":
        presenceIcon = isMomentumDesign ? "camera-presence-filled" : "camera-presence_14";
        presenceColor = "var(--avatar-presence-unstable)";
        break;
      case "schedule":
        presenceIcon = isMomentumDesign ? "meetings-presence-badge-filled" : "meetings-presence_14";
        presenceColor = "var(--avatar-presence-unstable)";
        break;
      case "call":
        presenceIcon = isMomentumDesign ? "handset-filled" : "handset-active_16";
        presenceColor = "var(--avatar-presence-unstable)";
        break;
      case "dnd":
        presenceIcon = isMomentumDesign ? "dnd-presence-badge-filled" : "dnd-presence_14";
        presenceColor = "var(--avatar-presence-dnd)";
        break;
      case "presenting":
        presenceIcon = isMomentumDesign ? "share-screen-badge-filled" : "content-share_14";
        presenceColor = "var(--avatar-presence-dnd)";
        break;
      case "quiet-hours":
        presenceIcon = "quiet-hours-presence-filled"; // quiet-presence
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "away":
      case "idle":
      case "inactive":
        presenceIcon = isMomentumDesign ? "recents-presence-badge-filled" : "recents-presence_14";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "away-calling":
        presenceIcon = "away-calling-presence-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "ooo":
        presenceIcon = "pto-presence-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "busy":
        presenceIcon = "busy-presence-bold";
        presenceColor = "var(--avatar-presence-unstable)";
        break;
      case "wrapup":
        presenceIcon = "archive-filled";
        presenceColor = "var(--avatar-chat-icon-color)";
        break;
      case "on-mobile":
        presenceIcon = "phone-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "on-device":
        presenceIcon = isMomentumDesign ? "generic-device-video-filled" : "generic-device-video_16";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "on-hold":
      case TaskItemStatus.HOLD:
        presenceIcon = "pause-badge-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "engaged":
        presenceIcon = "busy-presence-bold";
        presenceColor = "var(--avatar-presence-engaged)";
        break;
      case "rona":
        presenceIcon = "dnd-presence-badge-filled";
        presenceColor = "var(--avatar-presence-rona)";
        break;
      case TaskItemStatus.CONSULTING:
        presenceIcon = "headset-bold";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case TaskItemStatus.PLAY:
        presenceIcon = "play-bold";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case TaskItemStatus.CONFERENCE:
        presenceIcon = "meet-bold";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case TaskItemStatus.TRANSFERED:
        presenceIcon = "assign-privilege-bold";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case TaskItemStatus.COURTESY_CALLBACK:
        presenceIcon = "callrate-bold";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case TaskItemStatus.CAMPAIGN:
        presenceIcon = "announcement-bold";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      default:
        break;
    }
  }

  return { presenceColor, presenceIcon };
};
