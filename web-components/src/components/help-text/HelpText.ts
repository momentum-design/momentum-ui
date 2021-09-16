/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit";
import { classMap } from "lit/directives/class-map";
import { Input } from "../input/Input"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export namespace HelpText {
  @customElementWithCheck("md-help-text")
  export class ELEMENT extends LitElement {
    @property({ type: String }) message = "";
    @property({ type: String }) messageType: Input.MessageType | undefined = undefined;

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
          return "check_12";
        case "error":
          return "error_12";
        case "warning":
          return "warning_12";
        default:
          return "";
      }
    }

    render() {
      return html`
        <div class="md-input__message ${classMap(this.inputMessageClassMap)}" role="alert">
          <md-icon name="${this.getIconName()}"></md-icon>
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
