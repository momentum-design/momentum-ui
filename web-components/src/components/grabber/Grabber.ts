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
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export namespace Grabber {
  @customElementWithCheck("md-grabber")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String }) value = "Expanded";
    @property({ type: String }) label = "Expand";

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) checked = false;
    @property({ type: String, reflect: true }) alignment: "leading" | "trailing" | "top" | "bottom" = "leading";

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
          new CustomEvent<{ value: string; active: boolean }>("grabber-toggle", {
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
          new CustomEvent<{ value: string; active: boolean }>("grabber-keydown", {
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

    get grabberClassMap() {
      return {
        "md-grabber--active": this.checked,
        "md-grabber--disabled": this.disabled,
        [`md-grabber--${this.alignment}`]: this.alignment
      };
    }

    get iconName() {
      if (this.alignment === "leading" || this.alignment === "trailing") {
        return this.checked ? "arrow-left-optical_12" : "arrow-right-optical_12";
      }

      return this.checked ? "arrow-up-optical_12" : "arrow-down-optical_12";
    }

    render() {
      return html`
        <label
          for="favorite-checkbox"
          id="${this.id}"
          class="md-grabber ${classMap(this.grabberClassMap)}"
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
          <md-icon name="${this.iconName}"></md-icon>
        </label>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-grabber": Grabber.ELEMENT;
  }
}
