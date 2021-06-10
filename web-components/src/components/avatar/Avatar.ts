/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import "@/components/loading/Loading";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { styleMap } from "lit-html/directives/style-map";
import { until } from "lit-html/directives/until.js";
import styles from "./scss/module.scss";

export const AvatarType = [
  "active",
  "bot",
  "call",
  "dnd",
  "group",
  "inactive",
  "meeting",
  "ooo",
  "presenting",
  "self",
  "typing",
  ""
] as const;
export const AvatarSize = [18, 24, 28, 32, 36, 40, 44, 52, 56, 72, 80, 84];

export namespace Avatar {
  export type Type = typeof AvatarType[number];

  export type Size = typeof AvatarSize[number];

  @customElementWithCheck("md-avatar")
  export class ELEMENT extends LitElement {
    @property({ type: String }) alt = "";
    @property({ type: String }) src = "";
    @property({ type: String }) label = "";
    @property({ type: String }) title = "";
    @property({ type: String }) color = "";
    @property({ type: Boolean }) decrypting = false;
    @property({ type: String, attribute: "icon-name" }) iconName = "";
    @property({ type: String }) type: Type = "";
    @property({ type: Number }) size: Size = 40;
    @property({ type: Boolean, attribute: "has-notification" }) hasNotification = false;

    @internalProperty() private imageLoaded = false;
    @internalProperty() private imageErrored = false;

    static get styles() {
      return [reset, styles];
    }

    private get avatarClassMap() {
      return {
        [`md-avatar--${this.type}`]: !!this.type,
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
    }

    private get chatIconName() {
      return this.size >= 56
        ? "chat-active_20"
        : this.size >= 40 && this.size <= 56
        ? "chat-active_18"
        : this.size >= 36 && this.size <= 40
        ? "chat-active_16"
        : this.size >= 28 && this.size <= 36
        ? "chat-active_14"
        : "chat-active_12";
    }

    private get avatarLetter() {
      return this.title
        ? html`
            <span class="md-avatar__letter ${classMap(this.avatarLetterClassMap)}"
              >${this.pretifyTitle}<slot></slot>
              ${this.type === "typing"
                ? html`
                    <md-loading></md-loading>
                  `
                : nothing}
            </span>
          `
        : nothing;
    }

    private get avatarIcon() {
      return html`
        <span class="md-avatar__icon ${classMap(this.avatarStyleMap)}">
          <md-icon .name=${this.iconName}></md-icon>
        </span>
      `;
    }

    private get avatarImage() {
      return html`
        ${until(
          this.loadImage()
            .then(image => {
              this.handleImageLoad();
              return html`
                ${image}
              `;
            })
            .catch(() => this.handleImageError()),
          html`
            ${this.iconName
              ? this.avatarIcon
              : this.title
              ? html`
                  ${this.avatarLetter}
                `
              : nothing}
          `
        )}
      `;
    }

    private async loadImage() {
      return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.src = this.src;
        img.alt = this.alt;
        img.onload = () => resolve(img);
        img.onerror = error => reject(error);
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

    render() {
      return html`
        <div
          part="avatar"
          class="md-avatar ${classMap(this.avatarClassMap)}"
          role="img"
          aria-label=${ifDefined(this.label)}
        >
          ${this.type === "self"
            ? html`
                <span class="md-avatar__self" style=${styleMap(this.avatarStyleMap)}>
                  <md-icon .name=${this.chatIconName}></md-icon>
                </span>
              `
            : this.src && !this.imageErrored
            ? this.avatarImage
            : this.iconName
            ? this.avatarIcon
            : this.title
            ? this.avatarLetter
            : nothing}
          ${this.hasNotification
            ? html`
                <span class="md-avatar__notification-badge"></span>
              `
            : nothing}
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
