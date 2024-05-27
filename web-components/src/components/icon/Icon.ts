/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import iconNames from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import getColorValue from "@momentum-ui/utils/lib/getColorValue";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { styleMap } from "lit-html/directives/style-map";
import "@/components/button/Button";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { ifDefined } from "lit-html/directives/if-defined";

export const iconSize = ["16", "20", "36", "56", 16, 20, 36, 56] as const;
export const iconType = ["", "white"] as const;

export namespace Icon {
  export type Size = typeof iconSize[number];
  export type Type = typeof iconType[number];
  export type ButtonProperty = {
    [key: string]: string;
  };

  @customElementWithCheck("md-icon")
  export class ELEMENT extends LitElement {
    @property({ type: String }) color = "";
    @property({ type: String }) description = "";
    @property({ type: String }) name = "";
    @property({ type: String }) id = "";
    @property({ type: String }) size = "";
    @property({ type: Boolean }) sizeOverrided = false;
    @property({ type: String }) title = "";
    @property({ type: String }) type = "";
    @property({ type: String }) ariaHidden: any;
    @property({ type: Boolean }) isActive = false;
    @property({ type: Boolean }) isComboBoxIcon = false;

    _ariaLabel = "";
    @property({ type: String })
    get ariaLabel() {
      if (this._ariaLabel) {
        return this._ariaLabel;
      }
      if (this.title && this.description) {
        return `${this.title} ${this.description}`;
      }
      if (this.title) {
        return this.title;
      }
      if (this.description) {
        return this.description;
      }
      return "";
    }

    set ariaLabel(value) {
      const oldValue = this._ariaLabel;
      this._ariaLabel = value;
      this.requestUpdate("ariaLabel", oldValue);
    }

    get buttonClassMap() {
      return {
        [`md-button--icon-${this.type}`]: !!this.type
      };
    }

    consoleHandler = (message: string, data: string) => {
      /* eslint-disable no-console */
      switch (message) {
        case "color-warn":
          console.warn(
            `[@momentum-ui/web-component] Icon: ${data} may not exist in the design system,` +
              ` please use a color name from https://momentum.design/styles/color/style`
          );
          break;
        case "name-error":
          console.warn(
            `[@momentum-ui/web-component] Icon: Icon ${data} does not exist in the design system.` +
              ` Visit https://momentum.design/icons for a list of available icons or to request a new icon.`
          );
          break;
      }
      /* eslint-enable no-console */
    };

    get iconFontSize() {
      const defaultSize = 16;
      const sizeFromName = this.name.split("_")[1];
      return this.size || sizeFromName || defaultSize;
    }

    get iconColor() {
      if (this.color.startsWith("#")) {
        this.consoleHandler("color-warn", this.color);
        return this.color;
      } else if (this.color.startsWith("var(")) {
        return this.color;
      } else return getColorValue(this.color);
    }

    get iconClassMap() {
      return {
        "md-combobox-input__icon": this.isComboBoxIcon,
        "md-combobox-input__icon--active": this.isComboBoxIcon && this.isActive,
        [`${this.iconName}`]: !!this.iconName
      };
    }

    get iconName() {
      let iconName = this.name;
      iconName = iconName.startsWith("icon-") ? iconName.substring(5) : iconName;

      if (this.sizeOverrided) {
        return `${iconName.split("_")[0]}_${this.iconFontSize}`;
      }
      return iconNames.includes(iconName) ? `icon-${iconName}` : this.consoleHandler("name-error", iconName);
    }

    get iconStyleMap() {
      return {
        ...(this.iconFontSize && { "font-size": `${this.iconFontSize}px` }),
        ...(this.color && { color: this.iconColor })
      };
    }

    static get styles() {
      return [reset, styles];
    }

    handleIconClick(event: MouseEvent) {
      this.dispatchEvent(
        new CustomEvent("icon-click", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event
          }
        })
      );
    }

    render() {
      return html`
        <i
          part="icon"
          id=${this.id}
          class="md-icon icon ${classMap(this.iconClassMap)}"
          style=${styleMap(this.iconStyleMap)}
          aria-label=${this.ariaLabel}
          title=${this.title}
          aria-hidden=${ifDefined(this.ariaHidden || undefined)}
          @click=${(event: MouseEvent) => this.handleIconClick(event)}
        >
        </i>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-icon": Icon.ELEMENT;
  }
}
