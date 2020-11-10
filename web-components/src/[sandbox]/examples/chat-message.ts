import "@/components/chat-message/ChatMessage";
import { html } from "lit-element";

export const chatMessageTemplate = html`
  <md-chat-message title="John Doe" time="11:27AM">
    <p slot="message">I have issue with my silencer</p>
  </md-chat-message>
  <md-chat-message self title="John Doe" time="11:27AM">
    <p slot="message">I have issue with my silencer</p>
  </md-chat-message>
`;
