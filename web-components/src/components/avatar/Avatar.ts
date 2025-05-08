/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Presence";
import "@/components/icon/Icon";
import "@/components/loading/Loading";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { isActionKey } from "@/utils/keyboard";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { styleMap } from "lit-html/directives/style-map";
import { until } from "lit-html/directives/until.js";
import { AvatarChannelType, AvatarSize, AvatarState, AvatarStyle, AvatarType } from "./Avatar.constants";
import { getPresenceIconColor, PresenceType } from "./Presence.utils";
import { TaskItem } from "../taskitem/TaskItem";
import styles from "./scss/module.scss";

export namespace Avatar {
  export type PresenceState = (typeof PresenceType)[number] | TaskItem.TaskItemStatus;
  export type ChannelType = (typeof AvatarChannelType)[number];
  export type Type = (typeof AvatarType)[number] | PresenceState | ChannelType;
  export type Size = (typeof AvatarSize)[number];
  export type State = (typeof AvatarState)[number];
  export type Style = (typeof AvatarStyle)[number];
  export type Role = "img" | "button";

  @customElementWithCheck("md-avatar")
  export class ELEMENT extends LitElement {
    private _tabIndex = 0;
    @property({ type: Number, attribute: "tab-index", reflect: true })
    get tabIndex() {
      return this._tabIndex;
    }
    set tabIndex(newValue: number) {
      const oldValue = this._tabIndex;
      this._tabIndex = newValue;
      this.requestUpdate("tabIndex", oldValue);
    }

    @property({ type: String }) alt = "";
    @property({ type: String }) src = "";
    @property({ type: String }) label = "";
    @property({ type: String }) title = "";
    @property({ type: String }) color = "";
    @property({ type: Boolean }) decrypting = false;
    @property({ type: String }) role: Avatar.Role = "img";
    @property({ type: String, attribute: "icon-name" }) iconName = "";
    @property({ type: Boolean }) failurePresence = false;
    @property({ type: String }) type: Type = "";
    @property({ type: String, attribute: "presence-type" }) presenceType?: PresenceState;
    @property({ type: Boolean }) newMomentum = false;
    @property({ type: Boolean }) typing = false;
    @property({ type: Number }) size: Size = 40;
    @property({ type: Boolean, attribute: "has-notification" }) hasNotification = false;
    @property({ type: Boolean }) clickable = false;
    @property({ attribute: false }) clickFunction?: () => void;

    /**
     * The style of the avatar based on where it is used.
     * Currently only affects channel avatars.
     * @type {Avatar.Style}
     * @default "default"
     * @property {Avatar.Style} avatarStyle - Options: "default" | "table"
     */
    @property({ type: String, attribute: "avatar-style" })
    avatarStyle: Style = "default";

    /**
     * The state determines the background color of channel avatars,
     * in combination with the avatar style.
     * Currently only affects channel avatars.
     * @type {Avatar.State}
     * @default "rest"
     * @property {Avatar.State} state - Options: "rest" | "active"
     */
    @property({ type: String })
    state: State = "rest";

    @internalProperty() private imageLoaded = false;
    @internalProperty() private imageErrored = false;
    @internalProperty() private presenceColor = "";
    @internalProperty() private presenceIcon = "";

    static get styles() {
      return [reset, styles];
    }

    private isPresenceType(value: string): value is PresenceState {
      return (PresenceType as readonly string[]).includes(value);
    }

    firstUpdated() {
      const presenceValue = this.presenceType || (this.isPresenceType(this.type) ? this.type : "");
      if (presenceValue) {
        const { presenceColor, presenceIcon } = getPresenceIconColor(
          presenceValue,
          this.failurePresence,
          this.newMomentum
        );
        this.presenceColor = presenceColor!;
        this.presenceIcon = presenceIcon!;
      }
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      const presenceValue = this.presenceType || (this.isPresenceType(this.type) ? this.type : "");
      if (
        presenceValue &&
        (changedProperties.has("type") || changedProperties.has("presenceType") || changedProperties.has("newMomentum"))
      ) {
        const { presenceColor, presenceIcon } = getPresenceIconColor(
          presenceValue,
          this.failurePresence,
          this.newMomentum
        );
        this.presenceColor = presenceColor!;
        this.presenceIcon = presenceIcon!;
      }
      if (changedProperties.has("role")) {
        this.style.setProperty("--avatar-cursor", this.role === "button" ? "pointer" : "default");
      }
    }

    private get avatarClassMap() {
      return {
        ...((!this.newMomentum || this.type === "bot") && this.type ? { [`md-avatar--${this.type}`]: true } : {}),
        [`md-avatar--${this.size}`]: !!this.size,
        [`md-avatar--${this.color}`]: !!this.color
      };
    }

    private get avatarLetterClassMap() {
      return {
        "md-decrypting": this.decrypting,
        [`md-avatar--${this.color}`]: this.color,
        "new-momentum": this.newMomentum
      };
    }

    private get avatarStyleMap() {
      return {
        [`md-avatar--${this.color}`]: this.color
      };
    }

    private get pretifyTitle() {
      if (this.title.length) {
        const fullName = this.title.trim().split(" ");
        if (fullName.length === 1) return fullName[0].charAt(0);
        else {
          return fullName[0].charAt(0) + fullName[fullName.length - 1].charAt(0);
        }
      }

      return this.title;
    }

    private get chatIconName() {
      return "chat-filled";
    }
    private readonly iconNameMap: { [key: string]: string } = {
      "channel-chat": "chat-filled",
      "channel-social": "sms-message-filled",
      "channel-sms-inbound": "sms-filled",
      "channel-sms-outbound": "sms-outgoing-filled",
      "channel-email-inbound": "email-filled",
      "channel-email-outbound": "email-outgoing-filled",
      "channel-call": "handset-filled",
      "channel-call-inbound": "incoming-call-legacy-filled",
      "channel-callback": "outgoing-call-legacy-filled",
      "channel-headset": "headset-filled",
      "channel-campaign": "campaign-management-bold",
      "channel-emoji": "emoji-happy-filled",
      "channel-webex": "webex-app-icon-color-container",
      "channel-fb-messenger": "social-fbmessenger-color",
      "channel-facebook": "social-facebook-color",
      "channel-apple-chat": "apple-business-chat-color",
      "channel-line": "social-line-color",
      "channel-twitter-x": "social-x",
      "channel-viber": "social-viber-color",
      "channel-whats-app": "social-whatsapp-color",
      "channel-we-chat": "social-wechat-color",
      "channel-spam": "participant-unknown-bold",
      "channel-monitoring": "monitoring-bold"
    };

    private getIconName(type: string): string {
      return this.iconNameMap[type] || "";
    }

    private get chatIconSize() {
      return this.iconSize;
    }

    private get iconSize() {
      if (this.size === 24) {
        return "16";
      }
      if (this.size === 28) {
        return "18";
      }
      if (this.size === 32) {
        return "20";
      }
      if (this.size === 36) {
        return "22";
      }
      if (this.size === 40) {
        return "24";
      }
      if (this.size === 48) {
        return "28";
      }
      if (this.size === 56) {
        return "32";
      }
      if (this.size === 64) {
        return "36";
      }
      if (this.size === 72) {
        return "40";
      }

      return Math.round(this.size / 1.7).toString();
    }

    get renderIsTyping() {
      return this.type === "typing" || this.typing ? html` <md-loading></md-loading> ` : nothing;
    }

    private get avatarLetter() {
      return this.title
        ? html`
            <span class="md-avatar__letter ${classMap(this.avatarLetterClassMap)}">
              ${this.pretifyTitle}
              <slot></slot>
              ${this.renderIsTyping}
            </span>
          `
        : nothing;
    }

    private get avatarIcon() {
      return html`
        <span class="md-avatar__icon ${classMap(this.avatarStyleMap)}">
          <md-icon
            .name=${this.iconName}
            .iconSet=${this.newMomentum ? "momentumDesign" : "momentumUI"}
            .size=${this.newMomentum ? this.iconSize : ""}
          ></md-icon>
        </span>
      `;
    }

    private get avatarImage() {
      return html`
        ${until(
          this.loadImage()
            .then((image) => {
              this.handleImageLoad();
              return html` ${image} `;
            })
            .catch(() => this.handleImageError()),
          html` ${this.iconName ? this.avatarIcon : this.title ? html` ${this.avatarLetter} ` : nothing} `
        )}
      `;
    }

    private async loadImage() {
      return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.src = this.src;
        img.alt = this.alt;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.classList.add("md-avatar__img");
        img.classList.toggle("md-avatar__img--hidden", !this.imageLoaded);
      });
    }

    private handleImageLoad() {
      this.imageLoaded = true;
    }

    private handleImageError() {
      this.imageErrored = true;
    }

    handleKeyDown(event: KeyboardEvent) {
      if (!this.clickable) {
        return;
      }
      const { code } = event;
      if (isActionKey(code)) {
        this.dispatchEvent(
          new CustomEvent("button-keydown", {
            composed: true,
            bubbles: true,
            detail: {
              srcEvent: event
            }
          })
        );
      }
    }

    handleClick(event: MouseEvent) {
      if (!this.clickable) {
        return;
      }
      this.clickFunction?.();
      this.dispatchEvent(
        new CustomEvent("button-click", {
          composed: true,
          bubbles: true,
          detail: {
            srcEvent: event
          }
        })
      );
    }

    private getBrandOrDesignIconSet(iconName: string) {
      const brandIcons = new Set([
        "webex-app-icon-color-container",
        "social-fbmessenger-color",
        "social-facebook-color",
        "apple-business-chat-color",
        "social-line-color",
        "social-viber-color",
        "social-x",
        "social-whatsapp-color",
        "social-wechat-color"
      ]);

      return brandIcons.has(iconName) ? "momentumBrandVisuals" : "momentumDesign";
    }

    get avatarContent() {
      if (this.src && !this.imageErrored) {
        return this.avatarImage;
      } else if (this.iconName) {
        return this.avatarIcon;
      } else if (this.title) {
        return this.avatarLetter;
      }
      return nothing;
    }

    renderPresence() {
      return this.newMomentum && (this.presenceType || this.type) && this.type !== "self" && this.presenceIcon
        ? html`
            <md-presence
              class="avatar-presence"
              name="${this.presenceIcon}"
              color="${this.presenceColor}"
              size="${this.size}"
            >
            </md-presence>
          `
        : nothing;
    }

    private renderAvatarContent() {
      const iconName = this.getIconName(this.type);
      if (this.type === "channel-custom") {
        return html`
          <span class="md-avatar__logo" data-channel-style=${this.avatarStyle} data-channel-state=${this.state}>
            <slot></slot>
          </span>
        `;
      } else if (iconName) {
        const iconSet = this.getBrandOrDesignIconSet(iconName);
        return html`
          <span
            class="md-avatar__logo ${this.type}"
            data-channel-style=${this.avatarStyle}
            data-channel-state=${this.state}
          >
            <md-icon
              .name=${iconName}
              .iconSet=${iconSet}
              .size=${this.chatIconSize}
              color="var(--icon-color-${this.type})"
            ></md-icon>
          </span>
        `;
      }
      return this.avatarContent;
    }

    render() {
      return html`
        <div
          part="avatar"
          class="md-avatar 
          ${classMap(this.avatarClassMap)}"
          role=${this.role}
          @click=${(e: MouseEvent) => this.handleClick(e)}
          @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e)}
          tabindex=${ifDefined(this.tabIndex || undefined)}
          aria-label=${ifDefined(this.label)}
        >
          ${this.type === "self"
            ? html`
                <span class="md-avatar__self" style=${styleMap(this.avatarStyleMap)}>
                  <md-icon .name=${this.chatIconName} .iconSet=${"momentumDesign"} .size=${this.chatIconSize}></md-icon>
                </span>
              `
            : this.renderAvatarContent()}
          ${this.hasNotification ? html` <span class="md-avatar__notification-badge"></span> ` : nothing}
          ${this.renderPresence()}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-avatar": Avatar.ELEMENT;
  }
}
