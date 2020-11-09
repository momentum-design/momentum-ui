import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import { Avatar } from "@/components/avatar/Avatar";

customElement("md-chat-message");
export class ChatMessage extends LitElement {
  @property({ type: String }) title = "";
  @property({ type: String }) src = "";
  @property({ type: String }) time = "";
  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <div class="md-chat-message">
        <md-avatar title=${this.title} src=${this.src}></md-avatar>
        <div class="md-chat-message__content">
          <div class="md-chat-message__title">
            ${this.title}
          </div>
          <div class="md-chat-message__time">
            ${this.time}
          </div>
          <div class="md-chat-message__text">
            <slot name="message"></slot>
          </div>
        </div>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "md-chat-message": ChatMessage;
  }
}
