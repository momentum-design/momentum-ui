/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property } from "lit";
import { nothing } from "lit-html";
import { classMap } from "lit/directives/class-map";
import { ifDefined } from "lit/directives/if-defined";
import styles from "./scss/module.scss";

export namespace Favorite {
  @customElementWithCheck("md-favorite")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) checked = false;
    @property({ type: String }) value = "Select favorite";
    @property({ type: String }) id = "";
    @property({ type: String }) label = "Favorite";

    @internalProperty() private customId = "";

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this.handleElectKeyDown);
      this.addEventListener("click", this.handleFavorite as EventListener);
    }

    static get styles() {
      return [reset, styles];
    }

    handleFavorite(event: CustomEvent) {
      if (this.disabled) {
        return;
      } else {
        this.checked = !this.checked;
        this.dispatchEvent(
          new CustomEvent<{ value: string; active: boolean }>("favorite-toggle", {
            detail: {
              active: this.checked,
              value: this.value
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    handleElectKeyDown(event: KeyboardEvent) {
      if (event.code === Key.Enter || event.code === Key.Space) {
        this.checked = !this.checked;
        this.dispatchEvent(
          new CustomEvent<{ value: string; active: boolean }>("favorite-keydown", {
            detail: {
              active: this.checked,
              value: this.value
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this.handleElectKeyDown);
      this.removeEventListener("click", this.handleFavorite as EventListener);
    }

    get favoriteClassMap() {
      return {
        "md-favorite--active": this.checked,
        "md-favorite--disabled": this.disabled
      };
    }

    render() {
      return html`
        <label
          for="favorite-checkbox"
          id="${this.id}"
          class="md-favorite ${classMap(this.favoriteClassMap)}"
          tabindex="0"
        >
          <input
            type="checkbox"
            aria-label=${ifDefined(this.label.length ? this.label : undefined)}
            value=${this.value}
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            aria-hidden="true"
            name="favorite-checkbox"
          />
          <md-icon
            name="${this.checked ? "favorite-active_16" : "favorite_16"}"
            color="${this.checked ? "yellow" : nothing}"
          ></md-icon>
        </label>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-favorite": Favorite.ELEMENT;
  }
}
