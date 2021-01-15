/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property } from "lit-element";
//import { classMap } from "lit-html/directives/class-map";
import "@/components/icon/Icon";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";
import { nanoid } from "nanoid";
import { classMap } from "lit-html/directives/class-map";

@customElement("md-favorite")
export class Favorite extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) id = "";

  @internalProperty() private customId = "";

  connectedCallback() {
    super.connectedCallback();
    const id = nanoid();

    this.customId = id;
  }

  static get styles() {
    return [reset, styles];
  }

  getIconName() {
    switch (this.active) {
      case true:
        return "favorite-active_16";
      default:
        return "favorite_16";
    }
  }

  handleFavorite(event: CustomEvent) {
    if (this.disabled) {
      return;
    } else {
      this.active = !this.active;
      this.dispatchEvent(
        new CustomEvent<{id: string, active: boolean}>("favorite-elect", {
        detail: {
            active: this.active,
            id: this.id || this.customId
        },
        bubbles: true,
        composed: true
        })
      )
      console.log(event);
    }
  }

  get favoriteClassMap() {
    return {
      "md-favorite--active": this.active,
      "md-favorite--disabled": this.disabled
    };
  }

  render() {
    return html`
      <div
        id="${this.id ? this.id : this.customId}" 
        ?disabled=${this.disabled} 
        tabindex=${this.disabled ? -1 : 0}
        class="md-favorite ${classMap(this.favoriteClassMap)}"
        @click=${(e: CustomEvent) => this.handleFavorite(e)}>
        <md-icon name="${this.getIconName()}" color="${this.active ? "yellow" : nothing}"></md-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-favorite": Favorite;
  }
}
