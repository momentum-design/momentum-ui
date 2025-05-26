import "@/components/alert-banner/AlertBanner";
import "@/components/alert/Alert";
import "@/components/badge/Badge";
import "@/components/chat-message/ChatMessage";
import "@/components/icon/Icon";
import "@/components/tooltip/Tooltip";
import { html } from "lit";

export const chatMessageTemplate = html`
  <md-chat-message title="Agent" time="11:27AM" status="Received">
    <span slot="custom-content">
      <md-tooltip message="Content restricted as it violates the company data security policy" placement="top">
        <md-icon iconSet="momentumDesign" name="priority-circle-bold" size="14"></md-icon>
      </md-tooltip>
    </span>

    <p slot="message">I have issue with my silencer</p>
  </md-chat-message>
  <md-chat-message self time="11:27AM" status="Failed">
    <div slot="custom-content">
      <md-icon name="icon-blocked_12"></md-icon>
    </div>
    <p slot="message">Sure. I will help with that.</p>
  </md-chat-message>
  <md-chat-message
    title="Barbara"
    time="11:27AM"
    src="https://static.skillshare.com/uploads/users/7330753/user-image-large.png"
    status=""
  >
    <p slot="message">
      <md-alert message="Who's awesome? You are!" show closable>
        <md-badge slot="alert-icon" color="darkmint" circle>
          <md-icon name="sms_16" color="white-100"></md-icon>
        </md-badge>
      </md-alert>
    </p>
  </md-chat-message>
  <md-chat-message self time="11:27AM" status="Delivered">
    <p slot="message">
      <img src="https://static.skillshare.com/uploads/users/7330753/user-image-large.png" alt="" />
    </p>
  </md-chat-message>

  <md-chat-message avatar-type="self" time="11:27AM" status="Delivered" self-label="あなた">
    <span slot="custom-content">
      <md-tooltip message="Content restricted as it violates the company data security policy" placement="top">
        <md-icon name="icon-priority_12"></md-icon>
      </md-tooltip>
    </span>
    <p slot="message">I have issue with my silencer</p>
  </md-chat-message>

  <md-chat-message title="John Doe" avatar-size="32" avatar-color="orange" time="11:27AM" status="Delivered">
    <span slot="custom-content">
      <md-tooltip message="Content restricted as it violates the company data security policy" placement="top">
        <md-icon name="icon-priority_12"></md-icon>
      </md-tooltip>
    </span>
    <p slot="message">I have issue with my silencer</p>
  </md-chat-message>

  <md-chat-message title="Person" avatar-size="32" avatar-color="orange" time="11:27AM" ?clickableTimestamp=${true}>
    <p slot="message">Click my timestamp</p>
  </md-chat-message>
`;
