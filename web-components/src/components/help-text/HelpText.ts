/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { Input } from "../input/Input"; // Keep type import as a relative path
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
          <md-icon name="${this.getIconName()}" size="14" iconSet="momentumDesign"></md-icon>
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
