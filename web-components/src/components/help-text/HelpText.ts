/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Input } from "@/components/input/Input";
import styles from "./scss/module.scss";

export namespace HelpText {
  @customElementWithCheck("md-help-text")
  export class ELEMENT extends LitElement {
    @property({ type: String }) message = "";
    @property({ type: String }) messageType: Input.MessageType | undefined = undefined;
    @property({ type: String }) id = "";
    @property({ type: String }) ariaLive: "off" | "assertive" | "polite" = "off";

    get inputMessageClassMap() {
      return {
        [`md-${this.messageType}`]: !!this.messageType
      };
    }

    static get styles() {
      return [reset, styles];
    }

    getIconName() {
      switch (this.messageType) {
        case "success":
          return "check-circle-badge-filled";
        case "error":
          return "error-legacy-badge-filled";
        case "warning":
          return "warning-badge-filled";
        case "priority":
          return "info-badge-filled";
        default:
          return "";
      }
    }

    render() {
      return html`
        <div
          class="md-input__message ${classMap(this.inputMessageClassMap)}"
          id=${this.id}
          aria-live=${this.ariaLive}
          role="alert"
        >
          ${this.messageType
            ? html`<md-icon name="${this.getIconName()}" size="14" iconSet="momentumDesign"></md-icon>`
            : nothing}
          <slot>${this.message}</slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-help-text": HelpText.ELEMENT;
  }
}
