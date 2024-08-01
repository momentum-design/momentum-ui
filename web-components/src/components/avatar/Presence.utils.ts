type ReturnType = {
  presenceIcon: string | undefined;
  presenceColor: string | undefined;
  isCircularWrapper?: boolean;
};

export const getPresenceIconColor = (presenceType: string, failureBadge: boolean): ReturnType => {
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
        presenceIcon = "camera-presence_14";
        presenceColor = "var(--avatar-presence-unstable)";
        isCircularWrapper = false;
        break;
      case "schedule":
        presenceIcon = "meetings-presence_14";
        presenceColor = "var(--avatar-presence-unstable)";
        isCircularWrapper = false;
        break;
      case "call":
        presenceIcon = "handset-active_16";
        presenceColor = "var(--avatar-presence-unstable)";
        isCircularWrapper = false;
        break;
      case "dnd":
        presenceIcon = "dnd-presence_14";
        presenceColor = "var(--avatar-presence-rona)";
        break;
      case "presenting":
        presenceIcon = "content-share_14";
        presenceColor = "var(--avatar-presence-rona)";
        isCircularWrapper = false;
        break;
      case "quiet-hours":
        presenceIcon = "quiet-hours-presence-filled"; // quiet-presence
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "away":
        presenceIcon = "recents-presence_14";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "idle":
        presenceIcon = "recents-presence_14";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "away-calling":
        presenceIcon = "call-private-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "ooo":
        presenceIcon = "pto-presence-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "busy":
        presenceIcon = "busy-presence-bold"; // busy-presence
        presenceColor = "var(--avatar-presence-rona)";
        break;
      case "on-mobile":
        presenceIcon = "phone-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "on-device":
        presenceIcon = "generic-device-video_16";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "on-hold":
        presenceIcon = "pause-badge-filled";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "engaged":
        presenceIcon = "unread-filled";
        presenceColor = "var(--avatar-presence-engaged)";
        break;
      case "rona":
        presenceIcon = "unread-filled";
        presenceColor = "var(--avatar-presence-rona)";
        break;
      default:
        break;
    }
  }

  return { presenceColor, presenceIcon, isCircularWrapper };
};
