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
import { Key } from "@/constants";
import { nothing } from "lit-html";
import { nanoid } from "nanoid";
import { classMap } from "lit-html/directives/class-map";

export namespace Favorite {
  @customElement("md-favorite")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean }) active = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) id = "";
    @property({ type: String }) label = "Favorite"

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

    handleElectKeyDown(event: KeyboardEvent) {
      if (event.code === Key.Enter || event.code === Key.Space) { 
        this.active = !this.active;
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
          title="${this.label} ${this.active ? " not selected" : "selected"}"
          class="md-favorite ${classMap(this.favoriteClassMap)}"
          @click=${(e: CustomEvent) => this.handleFavorite(e)}
          @keydown=${(e: KeyboardEvent) => this.handleElectKeyDown(e)}>
          <md-icon name="${this.getIconName()}" color="${this.active ? "yellow" : nothing}"></md-icon>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-favorite": Favorite.ELEMENT;
  }
}
