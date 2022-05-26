/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "@/components/label/Label";
import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export const alignLabel = ["left", "right"] as const;

export namespace ToggleSwitch {
  export type alignLabel = typeof alignLabel[number];
  @customElementWithCheck("md-toggle-switch")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String }) htmlId = "";
    @property({ type: String }) label = "toggle";
    @property({ type: Boolean }) checked = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) small = false;
    @property({ type: Boolean }) smaller = false;
    @property({ type: String }) alignLabel: ToggleSwitch.alignLabel = "right";
    @property({ type: Boolean, reflect: true }) autofocus = false;

    handleClick() {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    }

    get toggleSwitchClassMap() {
      return {
        "md-toggle-switch--small": this.small,
        "md-toggle-switch--smaller": this.smaller
      };
    }

    switchTemplate() {
      if (this.alignLabel == "left") {
        return html`
          <slot></slot>
          <span class="md-toggle-switch__label__container md-toggle-switch__label__container__left"></span>
        `;
      } else {
        return html`
          <span class="md-toggle-switch__label__container"></span>
          <slot></slot>
        `;
      }
    }

    render() {
      return html`
        <div
          class="md-input-container md-toggle-switch  ${classMap(this.toggleSwitchClassMap)}"
          @click=${this.handleClick}
        >
          <input
            type="checkbox"
            class="md-toggle-switch__input"
            aria-label="${this.label}"
            .id=${this.htmlId}
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            ?autofocus=${this.autofocus}
            tabindex=${this.disabled ? -1 : 0}
          />
          <md-label .htmlFor=${this.htmlId} class="md-toggle-switch__label">
            ${this.switchTemplate()}
          </md-label>
        </div>
      `;
    }
    static get styles() {
      return [reset, styles];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-toggle-switch": ToggleSwitch.ELEMENT;
  }
}
