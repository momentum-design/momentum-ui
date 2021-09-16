import "@/components/alert-banner/AlertBanner";
import "@/components/alert/Alert";
import "@/components/badge/Badge";
import "@/components/chat-message/ChatMessage";
import "@/components/icon/Icon";
import { html } from "lit";

export const chatMessageTemplate = html`
  <md-chat-message title="John Doe" time="11:27AM">
    <p slot="message">I have issue with my silencer</p>
  </md-chat-message>
  <md-chat-message self time="11:27AM">
    <p slot="message">Sure. I will help with that.</p>
  </md-chat-message>
  <md-chat-message
    title="Barbara"
    time="11:27AM"
    src="https://static.skillshare.com/uploads/users/7330753/user-image-large.png"
  >
    <p slot="message">
      <md-alert message="Who's awesome? You are!" show closable>
        <md-badge slot="alert-icon" color="darkmint" circle>
          <md-icon name="sms_16" color="white"></md-icon>
        </md-badge>
      </md-alert>
    </p>
  </md-chat-message>
  <md-chat-message self time="11:27AM">
    <p slot="message">
      <img src="https://static.skillshare.com/uploads/users/7330753/user-image-large.png" alt="" />
    </p>
  </md-chat-message>
`;
