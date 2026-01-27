/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "../icon/Icon";
import { themeManager } from "@/managers/ThemeManager";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { isActionKey } from "@/utils/keyboard";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
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

    /**
     * Update the icon and icon size for dragger type
     *
     * Default: false
     */
    @property({ type: Boolean })
    shadow = false;

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
        visible: this.visible || this.focused,
        "md-grabber--rtl": this.isRtl
      };
    }

    private get grabberContainerClassMap() {
      return {
        [`${this.alignment}`]: true,
        shadow: this.shadow && (this.visible || this.checked)
      };
    }

    private get isRtl(): boolean {
      return getComputedStyle(this).direction === "rtl";
    }

    get iconName() {
      if (this.dragger) {
        return "list-menu-bold";
      }

      if (this.alignment === "leading" || this.alignment === "trailing") {
        const leftIcon = this.isRtl ? "arrow-right-bold" : "arrow-left-bold";
        const rightIcon = this.isRtl ? "arrow-left-bold" : "arrow-right-bold";

        return this.checked ? leftIcon : rightIcon;
      }

      return this.checked ? "arrow-up-bold" : "arrow-down-bold";
    }

    get iconSize() {
      if (this.dragger) {
        return "10";
      }
      return themeManager.isMomentumV2Enabled === false ? "10" : "12";
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
            @click=${this.handleMouseDown}
            @keydown=${this.handleKeyDown}
            @mouseenter=${this.handleMouseEnter}
            @mouseleave=${this.handleMouseLeave}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
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
