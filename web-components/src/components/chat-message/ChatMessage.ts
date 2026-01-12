import "@/components/avatar/Avatar";
import { type Avatar } from "@/components/avatar/Avatar";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./scss/module.scss";

export namespace ChatMessage {
  @customElementWithCheck("md-chat-message")
  export class ELEMENT extends LitElement {
    @property({ type: String }) title = "";
    @property({ type: String }) src = "";
    @property({ type: String }) time = "";
    @property({ type: String }) label = "Avatar";
    @property({ type: String }) status = "";
    @property({ type: Boolean }) clickableTimestamp = false;
    @property({ type: Boolean }) isSelected = false;

    @property({ type: String, reflect: true, attribute: "self-label" })
    selfLabel?: string;

    //Deprecated property use avatarType instead
    @property({ type: Boolean })
    self = false;

    //Exposed avatar properties
    @property({ type: String, reflect: true, attribute: "avatar-color" })
    avatarColor?: string;

    @property({ type: String, reflect: true, attribute: "avatar-type" })
    avatarType?: Avatar.Type;

    @property({ type: Number, reflect: true, attribute: "avatar-size" })
    avatarSize?: Avatar.Size;

    private get computedAvatarType(): Avatar.Type | undefined {
      if (this.avatarType !== undefined) {
        return this.avatarType;
      }
      return this.self ? "self" : undefined;
    }

    private get computedYouLabel() {
      return this.selfLabel || "You";
    }

    private get isSelfType(): boolean {
      if (this.avatarType === undefined) {
        return this.self;
      }
      return this.avatarType === "self";
    }

    private timeStampClicked() {
      this.dispatchEvent(
        new CustomEvent("timestamp-clicked", {
          bubbles: true,
          composed: true
        })
      );
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-chat-message">
          <div class="md-chat-message_avatar">
            <md-avatar
              type=${ifDefined(this.computedAvatarType)}
              title=${this.self ? "self" : this.title}
              label="${this.label}"
              src=${ifDefined(this.self ? undefined : this.src)}
              color=${ifDefined(this.avatarColor)}
              size=${ifDefined(this.avatarSize)}
            ></md-avatar>
          </div>

          <div class="md-chat-message_content ${this.isSelected ? 'selected' : ''}">
            <div class="md-chat-message_heading">
              <div class="md-chat-message_title">
                <span>${this.isSelfType ? this.computedYouLabel : this.title}</span>
              </div>
              ${this.clickableTimestamp
                ? html`<md-link
                    class="md-chat-message_time"
                    @click=${(e: Event) => {
                      e.preventDefault();
                      this.timeStampClicked();
                    }}
                    >${this.time}</md-link
                  >`
                : html`<div class="md-chat-message_time" title="">${this.time}</div>`}
              <div class="md-chat-message_status" title="">${this.status}</div>
              <div class="md-chat-message_custom_content" title="">
                <slot name="custom-content"></slot>
              </div>
            </div>
            <div class="md-chat-message_text" title="">
              <slot name="message"></slot>
            </div>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-chat-message": ChatMessage.ELEMENT;
  }
}
