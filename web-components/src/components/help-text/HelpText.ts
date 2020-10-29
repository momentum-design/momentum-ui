/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { Input } from "../input/Input";
import styles from "./scss/module.scss";

@customElement("md-help-text")
export class HelpText extends LitElement {
  @property({ type: String }) message = "";
  @property({ attribute: false }) messageType: Input.MessageType | undefined = undefined;

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

declare global {
  interface HTMLElementTagNameMap {
    "md-help-text": HelpText;
  }
}
