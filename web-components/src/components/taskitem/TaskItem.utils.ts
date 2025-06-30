import { html } from "lit-element";
import { nothing, TemplateResult } from "lit-html";
import { Avatar } from "@/components/avatar/Avatar";
import { TaskItemStatus, TaskItemMediaType } from "./TaskItem.constants";

export const getTaskTypeTemplate = (
  isRestyle: boolean,
  mediaType: string,
  selected: boolean,
  status: string | null,
  iconSrc: string
) => {
  return html`${isRestyle
    ? renderTaskType(mediaType, selected, status, iconSrc)
    : renderLegacyTaskType(mediaType, selected, iconSrc)}`;
};

export const getChannelAvatar = (
  selected: boolean,
  status: string | null,
  type: Avatar.ChannelType,
  slot?: TemplateResult
) => {
  return html`<md-avatar
    size="32"
    type=${type}
    state=${selected ? "active" : "rest"}
    presence-type=${status ?? ""}
    newMomentum
    >${slot ?? nothing}</md-avatar
  >`;
};

export const renderTaskType = (mediaType: string, selected: boolean, status: string | null, iconSrc: string) => {
  switch (mediaType.toLowerCase()) {
    case TaskItemMediaType.PROGRESSIVE_CAMPAIGN:
    case TaskItemMediaType.CALLBACK:
    case TaskItemMediaType.TELEPHONY:
      return getChannelAvatar(selected, status, "channel-call");
    case TaskItemMediaType.OUTBOUND_TELEPHONY:
      return getChannelAvatar(selected, status, "channel-callback");
    case TaskItemMediaType.INBOUND_TELEPHONY:
      return getChannelAvatar(selected, status, "channel-call-inbound");
    case TaskItemMediaType.APPLE_MESSAGES:
      return getChannelAvatar(selected, status, "channel-apple-chat");
    case TaskItemMediaType.OUTBOUND_CAMPAIGN:
      return getChannelAvatar(selected, status, "channel-campaign");
    case TaskItemMediaType.CHAT:
      return getChannelAvatar(selected, status, "channel-chat");
    case TaskItemMediaType.EMAIL:
      return getChannelAvatar(selected, status, "channel-email-inbound");
    case TaskItemMediaType.SMS:
      return getChannelAvatar(selected, status, "channel-sms-inbound");
    case TaskItemMediaType.FACEBOOK:
      return getChannelAvatar(selected, status, "channel-fb-messenger");
    case TaskItemMediaType.WHATSAPP:
      return getChannelAvatar(selected, status, "channel-whats-app");
    case TaskItemMediaType.MESSENGER:
      return getChannelAvatar(selected, status, "channel-facebook");
    case TaskItemMediaType.MIDCALL_TELEPHONY:
      return getChannelAvatar(selected, status, "channel-monitoring");
    case TaskItemMediaType.OUTBOUND_EMAIL:
      return getChannelAvatar(selected, status, "channel-email-outbound");
    case TaskItemMediaType.OUTBOUND_SMS:
      return getChannelAvatar(selected, status, "channel-sms-outbound");
    case TaskItemMediaType.SOCIAL_X:
      return getChannelAvatar(selected, status, "channel-twitter-x");
    case TaskItemMediaType.VIBER:
      return getChannelAvatar(selected, status, "channel-viber");
    case TaskItemMediaType.WECHAT:
      return getChannelAvatar(selected, status, "channel-we-chat");
    case TaskItemMediaType.WEBEX:
      return getChannelAvatar(selected, status, "channel-webex");
    case TaskItemMediaType.OUTBOUND_CHAT:
      return getChannelAvatar(selected, status, "channel-chat-outbound");
    case TaskItemMediaType.GOOGLE_MESSAGES:
      return getChannelAvatar(
        selected,
        status,
        "channel-custom",
        html`<img height="32px" width="32px" src="${iconSrc}" />`
      );
    case TaskItemMediaType.ICON_SRC:
      return getChannelAvatar(
        selected,
        status,
        "channel-custom",
        html`<img height="20px" width="20px" src="${iconSrc}" />`
      );
    default:
      return getChannelAvatar(selected, status, "channel-custom", html`<slot name="task-type"></slot>`);
  }
};

export const renderStatus = (status: string) => {
  switch (status) {
    case TaskItemStatus.CONSULTING:
      return html` <md-icon name="headset-bold" size="12" iconSet="momentumDesign"></md-icon> `;
    case TaskItemStatus.PLAY:
      return html` <md-icon name="play-bold" size="12" iconSet="momentumDesign"></md-icon> `;
    case TaskItemStatus.HOLD:
      return html` <md-icon name="pause-bold" size="12" iconSet="momentumDesign"></md-icon> `;
    case TaskItemStatus.CONFERENCE:
      return html` <md-icon name="meet-bold" size="16" iconSet="momentumDesign"></md-icon> `;
    case TaskItemStatus.TRANSFERED:
      return html` <md-icon name="assign-privilege-bold" size="16" iconSet="momentumDesign"></md-icon> `;
    case TaskItemStatus.COURTESY_CALLBACK:
      return html` <md-icon name="callrate-bold" size="12" iconSet="momentumDesign"></md-icon> `;
    case TaskItemStatus.CAMPAIGN:
      return html` <md-icon name="announcement-bold" size="12" iconSet="momentumDesign"></md-icon> `;
    default:
      return html` <slot name="task-status"></slot> `;
  }
};

export const renderLegacyTaskType = (mediaType: string, selected: boolean, iconSrc: string) => {
  switch (mediaType.toLowerCase()) {
    case TaskItemMediaType.TELEPHONY:
      return html`
        <md-badge color="green" circle>
          <md-icon name="handset-filled" size="20" iconSet="momentumDesign"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.OUTBOUND_TELEPHONY:
      return html`
        <md-badge color="green" circle>
          <md-icon name="outgoing-call-legacy-filled" size="20" iconSet="momentumDesign"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.INBOUND_TELEPHONY:
      return html`
        <md-badge color="green" circle>
          <md-icon name="incoming-call-legacy-filled" size="20" iconSet="momentumDesign"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.APPLE_MESSAGES:
    case TaskItemMediaType.MIDCALL_TELEPHONY:
    case TaskItemMediaType.ICON_SRC:
      return html`
        <md-badge circle>
          <img src="${iconSrc}" />
        </md-badge>
      `;
    case TaskItemMediaType.CALLBACK:
      return html`
        <md-badge color="lime" circle>
          <md-icon name="icon-icon-callback_18"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.PROGRESSIVE_CAMPAIGN:
      return html`
        <md-badge color="green" circle>
          <md-icon name="icon-icon-campaign_18"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.OUTBOUND_CAMPAIGN:
      return html`
        <md-avatar
          title="Channel Campaign"
          type="channel-campaign"
          avatar-style="default"
          state=${selected ? "active" : "rest"}
        ></md-avatar>
      `;
    case TaskItemMediaType.CHAT:
      return html`
        <md-badge color="blue" circle>
          <md-icon name="chat-filled" size="20" iconSet="momentumDesign"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.EMAIL:
      return html`
        <md-badge color="violet" circle>
          <md-icon name="email-filled" size="20" iconSet="momentumDesign"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.SMS:
      return html`
        <md-badge color="darkmint" circle>
          <md-icon name="sms-filled" size="20" iconSet="momentumDesign" color="white-100"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.FACEBOOK:
      return html`
        <md-badge bgColor="#0078FF" circle>
          <md-icon name="messenger_16" iconSet="momentumUI" color="white-100"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.WHATSAPP:
      return html`
        <md-badge bgColor="#25D366" circle>
          <md-icon name="whatsApp_16" iconSet="momentumUI" color="white-100"></md-icon>
        </md-badge>
      `;
    case TaskItemMediaType.OUTBOUND_CHAT:
      return html`
        <md-badge color="blue" circle>
          <md-icon name="chat-outbound-filled" size="20" iconSet="momentumDesign"></md-icon>
        </md-badge>
      `;
    default:
      return html` <slot name="task-type"></slot> `;
  }
};

export const renderChatCount = (quantity: number, isRestyle: boolean, element: HTMLElement) => {
  if (quantity <= 0) {
    element.removeAttribute("has-messages");
    return nothing;
  }

  element.setAttribute("has-messages", "true");
  const quantitiyLabel = quantity > 99 ? "99+" : quantity.toString();

  if (isRestyle) {
    return html` <md-badge color="unreadcount"> ${quantitiyLabel} </md-badge>`;
  }

  return html` <span class="new-chat-quantity">${quantitiyLabel}</span> `;
};
