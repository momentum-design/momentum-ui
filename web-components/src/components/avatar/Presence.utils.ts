type ReturnType = {
  presenceIcon?: string | undefined;
  presenceColor?: string | undefined;
  isCircularWrapper?: boolean;
};

export const getPresenceIconColor = (presenceType: string, failureBadge: boolean): ReturnType => {
  let presenceIcon: string = "";
  let presenceColor: string = "";
  let isCircularWrapper = true;

  //TODO: temporary fix until design gives proper design spec for failure badge
  if (failureBadge) {
    presenceIcon = "warning";
    presenceColor = "var(--mds-color-theme-indicator-attention)";
  } else {
    if (!presenceType || presenceType === "") {
      return {};
    }

    switch (presenceType) {
      case "active":
        presenceIcon = "unread-badge_12";
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
        presenceIcon = "handset_16";
        presenceColor = "var(--avatar-presence-unstable)";
        isCircularWrapper = false;
        break;
      case "dnd":
        presenceIcon = "dnd-presence_14";
        presenceColor = "var(--avatar-presence-rona)";
        break;
      case "presenting":
        presenceIcon = "content-share_16"; // share-screen
        presenceColor = "var(--avatar-presence-rona)";
        isCircularWrapper = false;
        break;
      case "quiet-hours":
        presenceIcon = "dnd-presence_14"; // quiet-presence
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "away":
        presenceIcon = "recents-presence_14";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "ooo":
        presenceIcon = "pto_16";
        presenceColor = "var(--avatar-presence-inactive)";
        break;
      case "busy":
        presenceIcon = "busy-presence";
        presenceColor = "var(--mds-color-theme-indicator-unstable)";
        break;
      case "on-mobile":
        presenceIcon = "phone-ios_16";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "on-device":
        presenceIcon = "generic-device-video_16";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "on-hold":
        presenceIcon = "pause_16";
        presenceColor = "var(--avatar-presence-inactive)";
        isCircularWrapper = false;
        break;
      case "engaged":
        presenceIcon = "unread-badge_12";
        presenceColor = "var(--avatar-presence-engaged)";
        break;
      case "idle":
        presenceIcon = "unread-badge_12";
        presenceColor = "var(--avatar-blue-bg-color)";
        break;
      case "rona":
        presenceIcon = "unread-badge_12";
        presenceColor = "var(--avatar-presence-rona)";
        break;
      default:
        break;
    }
  }

  return { presenceColor, presenceIcon, isCircularWrapper };
};
