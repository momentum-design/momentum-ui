import { html } from "lit-element";
import type { TaskItem } from "./TaskItem";
import { nothing, TemplateResult } from "lit-html";
import { Avatar } from "@/components/avatar/Avatar";
import { TaskItemStatus, TaskItemMediaType } from "./TaskItem.constants";

export class TaskItemUtils {
  private taskitem: TaskItem.ELEMENT;

  constructor(taskitem: TaskItem.ELEMENT) {
    this.taskitem = taskitem;
  }

  public get taskTypeTemplate() {
    return html`${this.taskitem.isRestyle ? this.renderTaskType : this.renderLegacyTaskType()}`;
  }

  private getChannelAvatar(type: Avatar.ChannelType, slot?: TemplateResult) {
    return html`<md-avatar
      size="32"
      type=${type}
      state=${this.taskitem.selected ? "active" : "rest"}
      presence-type=${this.taskitem.status ?? ""}
      newMomentum
      >${slot ?? nothing}</md-avatar
    >`;
  }

  private get renderTaskType() {
    switch (this.taskitem.mediaType.toLowerCase()) {
      case TaskItemMediaType.TELEPHONY:
        return this.getChannelAvatar("channel-call");
      case TaskItemMediaType.OUTBOUND_TELEPHONY:
        return this.getChannelAvatar("channel-callback");
      case TaskItemMediaType.INBOUND_TELEPHONY:
        return this.getChannelAvatar("channel-call-inbound");
      case TaskItemMediaType.APPLE_MESSAGES:
        return this.getChannelAvatar("channel-apple-chat");

      case TaskItemMediaType.OUTBOUND_CAMPAIGN:
        return this.getChannelAvatar("channel-campaign");
      case TaskItemMediaType.CHAT:
        return this.getChannelAvatar("channel-chat");
      case TaskItemMediaType.EMAIL:
        return this.getChannelAvatar("channel-email-inbound");
      case TaskItemMediaType.SMS:
        return this.getChannelAvatar("channel-sms-inbound");
      case TaskItemMediaType.FACEBOOK:
        return this.getChannelAvatar("channel-fb-messenger");
      case TaskItemMediaType.WHATSAPP:
        return this.getChannelAvatar("channel-whats-app");

      case TaskItemMediaType.MESSENGER:
        return this.getChannelAvatar("channel-facebook");

      case TaskItemMediaType.MIDCALL_TELEPHONY:
      case TaskItemMediaType.ICON_SRC:
        return this.getChannelAvatar(
          "channel-custom",
          html`<img height="16px" width="16px " src="${this.taskitem.iconSrc}" />`
        );

      case TaskItemMediaType.CALLBACK:
        return this.getChannelAvatar("channel-custom", html`<md-icon name="icon-icon-callback_18"></md-icon>`);
      case TaskItemMediaType.PROGRESSIVE_CAMPAIGN:
        return this.getChannelAvatar("channel-custom", html`<md-icon name="icon-icon-campaign_18"></md-icon>`);

      default:
        return this.getChannelAvatar("channel-custom", html`<slot name="task-type"></slot>`);
    }
  }

  renderStatus = () => {
    switch (this.taskitem.status) {
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

  renderLegacyTaskType = () => {
    switch (this.taskitem.mediaType.toLowerCase()) {
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
            <img src="${this.taskitem.iconSrc}" />
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
            state=${this.taskitem.selected ? "active" : "rest"}
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
      default:
        return html` <slot name="task-type"></slot> `;
    }
  };

  renderChatCount() {
    if (this.taskitem.quantity <= 0) {
      this.taskitem.removeAttribute("has-messages");
      return nothing;
    }
    this.taskitem.setAttribute("has-messages", "true");
    const quantitiyLabel = this.taskitem.quantity > 99 ? "99+" : this.taskitem.quantity.toString();

    if (this.taskitem.isRestyle) {
      return html` <md-badge color="unreadcount"> ${quantitiyLabel} </md-badge>`;
    }

    return html` <span class="new-chat-quantity">${quantitiyLabel}</span> `;
  }
}
