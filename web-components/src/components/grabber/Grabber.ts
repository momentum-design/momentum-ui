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
    @property({ type: String }) label = "Expand";
    @property({ type: String }) checkedLabel = "Collapse";
    @property({ type: Boolean }) hovered = false;

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) checked = false;
    @property({ type: Boolean }) visible = true;
    @property({ type: String, reflect: true }) alignment: "leading" | "trailing" | "top" | "bottom" = "leading";

    connectedCallback() {
      super.connectedCallback();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
    }

    static get styles() {
      return [reset, styles];
    }

    toggleGrabber() {
      if (this.disabled) {
        return;
      } else {
        this.checked = !this.checked;
        this.dispatchEvent(
          new CustomEvent<{ checked: boolean }>("grabber-toggled", {
            detail: {
              checked: this.checked
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    handleKeyDown(e: KeyboardEvent) {
      if (e.code === Key.Enter || e.code === Key.Space) {
        e.preventDefault();
        this.toggleGrabber();
      }
    }

    handleMouseEnter() {
      this.hovered = true;
      this.dispatchHoverEvent();
    }

    handleMouseLeave() {
      this.hovered = false;
      this.dispatchHoverEvent();
    }

    dispatchHoverEvent() {
      this.dispatchEvent(
        new CustomEvent("grabber-hover-changed", {
          bubbles: true,
          composed: true,
          detail: { hovered: this.hovered }
        })
      );
    }

    get collapsed() {
      return !this.checked;
    }

    get grabberClassMap() {
      return {
        "md-grabber--active": this.checked,
        "md-grabber--disabled": this.disabled,
        [`md-grabber--${this.alignment}`]: this.alignment,
        visible: this.visible || this.collapsed
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
        <button
          class="md-grabber ${classMap(this.grabberClassMap)}"
          aria-checked=${this.checked}
          ?disabled=${this.disabled}
          tabindex="0"
          aria-label=${ifDefined(this.label.length ? this.label : undefined)}
          type="button"
          role="button"
          @click="${() => this.toggleGrabber()}"
          @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e)}"
          @mouseenter="${() => this.handleMouseEnter()}"
          @mouseleave="${() => this.handleMouseLeave()}"
        >
          <md-icon name="${this.iconName}" size="12"></md-icon>
        </button>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-grabber": Grabber.ELEMENT;
  }
}
