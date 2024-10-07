type ReturnType = {
  presenceIcon: string | undefined;
  presenceColor: string | undefined;
  isCircularWrapper?: boolean;
};

export const getPresenceIconColor = (
  presenceType: string,
  failureBadge: boolean,
  isMomentumDesign = false
): ReturnType => {
  let presenceIcon = "";
  let presenceColor = "";
  let isCircularWrapper = true;

  //TODO: temporary fix until design gives proper design spec for failure badge
  if (failureBadge) {
    presenceIcon = "warning";
    presenceColor = "var(--mds-color-theme-indicator-attention)";
  } else {
    if (!presenceType || presenceType === "") {
      return {
        presenceIcon: undefined,
        presenceColor: undefined,
        isCircularWrapper: undefined
      };
    }

    switch (presenceType) {
      case "active":
        presenceIcon = "unread-filled";
        presenceColor = "var(--avatar-presence-active)";
        break;
      case "meeting":
        presenceIcon = isMomentumDesign ? "camera-presence-filled" : "camera-presence_14";
        presenceColor = "var(--avatar-presence-unstable)";
        isCircularWrapper = false;
        break;
      case "schedule":
        presenceIcon = isMomentumDesign ? "meetings-presence-badge-filled" : "meetings-presence_14";
        presenceColor = "var(--avatar-presence-unstable)";
        isCircularWrapper = false;
        break;
      case "call":
        presenceIcon = isMomentumDesign ? "handset-filled" : "handset-active_16";
        presenceColor = "var(--avatar-presence-unstable)";
        isCircularWrapper = false;
        break;
      case "dnd":
        presenceIcon = isMomentumDesign ? "dnd-presence-badge-filled" : "dnd-presence_14";
        presenceColor = "var(--avatar-presence-dnd)";
        break;
      case "presenting":
        presenceIcon = isMomentumDesign ? "share-screen-badge-filled" : "content-share_14";
        presenceColor = "var(--avatar-presence-dnd)";
        isCircularWrapper = false;
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
        isCircularWrapper = false;
        break;
      case "ooo":
        presenceIcon = "pto-presence-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "busy":
        presenceIcon = "busy-presence-bold";
        presenceColor = "var(--avatar-presence-unstable)";
        break;
      case "on-mobile":
        presenceIcon = "phone-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "on-device":
        presenceIcon = isMomentumDesign ? "generic-device-video-filled" : "generic-device-video_16";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "on-hold":
        presenceIcon = "pause-badge-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "engaged":
        presenceIcon = "busy-presence-bold";
        presenceColor = "var(--avatar-presence-engaged)";
        break;
      case "rona":
        presenceIcon = "dnd-presence-badge-filled";
        presenceColor = "var(--avatar-presence-rona)";
        break;
      default:
        break;
    }
  }

  return { presenceColor, presenceIcon, isCircularWrapper };
};

export function getPresenceSize(size: number): number {
  if (size <= 24) {
    return 14;
  } else if (size <= 32) {
    return 14;
  } else if (size <= 36) {
    return 16;
  } else if (size <= 40) {
    return 16;
  } else if (size <= 48) {
    return 16;
  } else if (size <= 64) {
    return 18;
  } else if (size <= 72) {
    return 20;
  } else if (size <= 88) {
    return 28;
  } else {
    return 36;
  }
}
