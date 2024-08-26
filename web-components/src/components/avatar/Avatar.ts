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
import { AvatarSize, AvatarType } from "./Avatar.constants";
import { getPresenceIconColor } from "./Presence.utils";
import styles from "./scss/module.scss";

export namespace Avatar {
  export type Type = (typeof AvatarType)[number];
  export type Size = (typeof AvatarSize)[number];
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
    @property({ type: String }) type: Type = "";
    @property({ type: Boolean }) newMomentum = false;
    @property({ type: Boolean }) typing = false;
    @property({ type: Number }) size: Size = 40;
    @property({ type: Boolean, attribute: "has-notification" }) hasNotification = false;
    @property({ type: Boolean }) clickable = false;
    @property({ attribute: false }) clickFunction?: () => void;

    @internalProperty() private imageLoaded = false;
    @internalProperty() private imageErrored = false;
    @internalProperty() private presenceColor = "";
    @internalProperty() private presenceIcon = "";
    @internalProperty() private isCircularWrapper = false;

    static get styles() {
      return [reset, styles];
    }

    firstUpdated() {
      const { presenceColor, presenceIcon, isCircularWrapper } = getPresenceIconColor(
        this.type,
        false,
        this.newMomentum
      );
      this.presenceColor = presenceColor!;
      this.presenceIcon = presenceIcon!;
      this.isCircularWrapper = isCircularWrapper!;
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("type")) {
        const { presenceColor, presenceIcon, isCircularWrapper } = getPresenceIconColor(
          this.type,
          false,
          this.newMomentum
        );
        this.presenceColor = presenceColor!;
        this.presenceIcon = presenceIcon!;
        this.isCircularWrapper = isCircularWrapper!;
      }
      if (changedProperties.has("role")) {
        this.style.setProperty("--avatar-cursor", this.role === "button" ? "pointer" : "default");
      }
    }

    private get avatarClassMap() {
      return {
        ...(!this.newMomentum && this.type ? { [`md-avatar--${this.type}`]: true } : {}),
        [`md-avatar--${this.size}`]: !!this.size
      };
    }

    private get avatarLetterClassMap() {
      return {
        "md-decrypting": this.decrypting,
        [`md-avatar--${this.color}`]: this.color
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

    private get chatIconSize() {
      return this.iconSize;
    }

    private get iconSize() {
      return (this.size / 2).toString();
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
      this.clickFunction && this.clickFunction();
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
      return this.newMomentum && this.type && this.type !== "self" && this.presenceIcon
        ? html`
            <md-presence
              class="avatar-presence"
              name="${this.presenceIcon}"
              color="${this.presenceColor}"
              .isCircularWrapper=${this.isCircularWrapper}
              size="${this.size}"
            >
            </md-presence>
          `
        : nothing;
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
            : this.avatarContent}
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
