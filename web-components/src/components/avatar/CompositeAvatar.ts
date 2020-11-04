/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "../icon/Icon";
import "../loading/Loading";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

type CompositeAvatarSize = 18 | 24 | 28 | 36 | 40 | 44 | 52 | 56 | 72 | 80 | 84 | 0;

@customElement("md-composite-avatar")
export class CompositeAvatar extends LitElement {
  @property({ type: Number }) size: CompositeAvatarSize = 0;

  static get styles() {
    return [reset, styles];
  }

  get avatarClassMap() {
    return {
      [`md-composite-avatar--${this.size}`]: !!this.size
    };
  }

  render() {
    return html`
      <div class="md-composite-avatar ${classMap(this.avatarClassMap)}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-composite-avatar": CompositeAvatar;
  }
}
