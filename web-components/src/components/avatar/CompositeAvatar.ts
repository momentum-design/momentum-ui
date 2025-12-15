/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { AvatarSize } from "./Avatar.constants"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export namespace CompositeAvatar {
  export type Size = (typeof AvatarSize)[number];

  @customElementWithCheck("md-composite-avatar")
  export class ELEMENT extends LitElement {
    @property({ type: Number }) size: Size = 0;

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
}

declare global {
  interface HTMLElementTagNameMap {
    "md-composite-avatar": CompositeAvatar.ELEMENT;
  }
}
