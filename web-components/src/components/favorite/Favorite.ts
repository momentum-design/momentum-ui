/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
//import { classMap } from "lit-html/directives/class-map";
import "@/components/icon/Icon";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";

@customElement("md-favorite")
export class Favorite extends LitElement {
  @property({ type: Boolean }) elect = false;
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  static get styles() {
    return [reset, styles];
  }

  getIconName() {
    switch (this.elect) {
      case true:
        return "favorite-active_16";
      default:
        return "favorite_16";
    }
  }

  handleFavorite(event: MouseEvent) {
    if (this.disabled) {
      return;
    } else {
      this.elect = !this.elect;
      this.dispatchEvent(
        new CustomEvent("favorite-elect", {
          composed: true,
          bubbles: true,
          detail: {
            elect: this.elect
          }
        })
      )
    }
  }

  render() {
    return html`
      <div class="md-favorite" @click=${(e: MouseEvent) => this.handleFavorite(e)}>
        <md-icon name="${this.getIconName()}" color="${this.elect ? "yellow" : nothing}"></md-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-favorite": Favorite;
  }
}
