/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { isActionKey } from "@/utils/keyboard";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export namespace Grabber {
  @customElementWithCheck("md-grabber")
  export class ELEMENT extends FocusMixin(LitElement) {
    /**
     * aria label of unchecked grabber
     */
    @property({ type: String })
    label = "Expand";

    /**
     * aria label of checked grabber
     */
    @property({ type: String })
    checkedLabel = "Collapse";

    /**
     * If true, the grabber is hovered. grabber-hover-changed event is dispatched on hover change
     */
    @property({ type: Boolean })
    hovered = false;

    /**
     * If true, the grabber is disabled
     */
    @property({ type: Boolean })
    disabled = false;

    /**
     * If true, the grabber is checked
     */
    @property({ type: Boolean })
    checked = false;

    /**
     * If true, the grabber is visible. Grabber will also be visible if it is focused
     */
    @property({ type: Boolean })
    visible = true;

    /**
     * True when grabber has keyboard focus
     */
    @property({ type: Boolean })
    focused = false;

    /**
     * By default clicking the grabber toggles the checked state and fires an event.
     * Setting this attribute will prevent the checked state from being toggled
     */
    @property({ type: Boolean, attribute: "disable-click-toggle" })
    disableClickToggle = false;

    /**
     * Alignment that says if the `md-grabber` is being used for leading, trailing, top or bottom
     *
     * Default: leading
     */
    @property({ type: String, reflect: true })
    alignment: "leading" | "trailing" | "top" | "bottom" = "leading";

    /**
     * Update the icon and icon size for dragger type
     *
     * Default: false
     */
    @property({ type: Boolean })
    dragger = false;

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

    handleMouseDown() {
      if (this.disableClickToggle) {
        return;
      }

      this.toggleGrabber();
    }

    handleKeyDown(e: KeyboardEvent) {
      if (this.disableClickToggle) {
        return;
      }

      if (isActionKey(e.code)) {
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

    handleFocus() {
      this.focused = true;
    }

    handleBlur() {
      this.focused = false;
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
        "md-grabber--dragger": this.dragger,
        [`md-grabber--${this.alignment}`]: this.alignment,
        visible: this.visible || this.focused
      };
    }

    private get grabberContainerClassMap() {
      return {
        [`${this.alignment}`]: true
      };
    }

    get iconName() {
      if (this.dragger) {
        return "list-menu-bold";
      }

      if (this.alignment === "leading" || this.alignment === "trailing") {
        return this.checked ? "arrow-left-bold" : "arrow-right-bold";
      }

      return this.checked ? "arrow-up-bold" : "arrow-down-bold";
    }

    get iconSize() {
      return this.dragger ? "10" : "12";
    }

    render() {
      return html`
        <div class="md-grabber__container ${classMap(this.grabberContainerClassMap)}">
          <button
            class="md-grabber ${classMap(this.grabberClassMap)}"
            part="grabber"
            aria-pressed=${this.checked}
            ?disabled=${this.disabled}
            tabindex="0"
            aria-label=${ifDefined(this.label.length ? this.label : undefined)}
            type="button"
            role="button"
            @click="${() => this.handleMouseDown()}"
            @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e)}"
            @mouseenter="${() => this.handleMouseEnter()}"
            @mouseleave="${() => this.handleMouseLeave()}"
            @focus="${() => this.handleFocus()}"
            @blur="${() => this.handleBlur()}"
          >
            <md-icon name="${this.iconName}" size="${this.iconSize}" iconSet="momentumDesign"></md-icon>
          </button>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-grabber": Grabber.ELEMENT;
  }
}
