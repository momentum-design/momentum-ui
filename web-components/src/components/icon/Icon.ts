/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import iconNames from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import getColorValue from "@momentum-ui/utils/lib/getColorValue";
import { html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { styleMap } from "lit-html/directives/style-map";
import designMapping from "./momentum-ui-to-design-icons.json";
import styles from "./scss/module.scss";

export const iconSize = ["14", "16", "18", "20", "28", "36", "56", 14, 16, 18, 20, 28, 36, 56] as const;
export const iconType = ["", "white"] as const;
export const iconSet = ["momentumUI", "preferMomentumDesign", "momentumDesign"] as const;

export namespace Icon {
  export type Size = (typeof iconSize)[number];
  export type Type = (typeof iconType)[number];
  export type IconSet = (typeof iconSet)[number];
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
    @property({ type: String }) iconSet: IconSet = "momentumUI";

    private static designLookup = new Map(Object.entries(designMapping));

    @internalProperty()
    private svgIcon: HTMLElement | null = null;

    isPath(importedIcon: string) {
      return importedIcon.endsWith(".svg");
    }

    decodeIfBase64EncodedSvg(data: string) {
      const base64DataMatch = data.match(/data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/);
      if (base64DataMatch && base64DataMatch[1]) {
        const base64Data = base64DataMatch[1];
        const decodedData = atob(base64Data);
        return decodedData;
      }
      return data;
    }

    async getSvgContentFromFile(importedIcon: string) {
      const response = await fetch(importedIcon);
      const responseText = await response.text();

      return this.getSvgContentFromInline(responseText);
    }

    getSvgContentFromInline(importedIcon: string) {
      const svgContent = this.decodeIfBase64EncodedSvg(importedIcon);
      return this.parseSvgContent(svgContent);
    }

    parseSvgContent(svgContent: string) {
      try {
        const doc = new DOMParser().parseFromString(svgContent, "image/svg+xml");
        return doc.documentElement;
      } catch (error) {
        try {
          return new DOMParser().parseFromString(svgContent, "text/html").body.children[0] as HTMLElement;
        } catch (error) {
          console.error("Error parsing svg content: ", error);
          return null;
        }
      }
    }

    async loadSvgIcon(iconName: string) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const importedIcon = require(`@momentum-design/icons/dist/svg/${iconName}.svg`);

      if (this.isPath(importedIcon)) {
        this.svgIcon = await this.getSvgContentFromFile(importedIcon);
      } else {
        this.svgIcon = this.getSvgContentFromInline(importedIcon);
      }

      this.svgIcon?.setAttribute("class", `icon ${self.name}`);
      this.svgIcon?.setAttribute("part", "icon");

      //  el.setAttribute("class", `md-icon icon`);

      this.setSvgIconAttributes();
      this.requestUpdate();
    }

    setSvgIconAttributes() {
      if (!this.svgIcon) {
        return;
      }
      if (this.iconFontSize) {
        this.svgIcon.setAttribute("width", `${this.iconFontSize}px`);
      }
      if (this.iconFontSize) {
        this.svgIcon.setAttribute("height", `${this.iconFontSize}px`);
      }

      if (this.color) {
        this.svgIcon.setAttribute("fill", this.iconColor);
      } else {
        this.svgIcon.setAttribute("fill", "currentColor");
      }
    }

    private get svgIconName() {
      if (this.iconSet === "momentumDesign") {
        return this.name;
      }
      const lookupName = this.getIconName();
      const mappedName = ELEMENT.designLookup.get(lookupName);

      return mappedName || lookupName;
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (this.doesIconSetSupportSVG) {
        if (changedProperties.has("name") || changedProperties.has("iconSet")) {
          const theIconName = this.svgIconName;

          if (theIconName && theIconName !== "Unknown") {
            this.loadSvgIcon(theIconName);
          }
        } else if (changedProperties.has("iconFontSize") || changedProperties.has("color")) {
          this.setSvgIconAttributes();
        }
      }
    }

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
      return "icon";
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

    getIconName() {
      let iconName = this.name;
      iconName = iconName.startsWith("icon-") ? iconName.substring(5) : iconName;
      return iconName;
    }

    handleSizeOverride(iconName: string) {
      return `${iconName.split("_")[0]}_${this.iconFontSize}`;
    }

    get iconName() {
      const iconName = this.getIconName();

      if (this.sizeOverrided) {
        return this.handleSizeOverride(iconName);
      }
      return iconNames.includes(iconName) || iconName === ""
        ? `icon-${iconName}`
        : this.consoleHandler("name-error", iconName);
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

    private get doesIconSetSupportSVG() {
      return this.iconSet === "momentumDesign" || this.iconSet === "preferMomentumDesign";
    }

    private get isSVGRender() {
      return (this.svgIcon && this.iconSet === "preferMomentumDesign") || this.iconSet === "momentumDesign";
    }

    render() {
      return this.isSVGRender ? this.renderSVGIcon() : this.renderFontIcon();
    }

    renderFontIcon() {
      return html`
        <i
          part="icon"
          id=${this.id}
          class="md-icon icon ${classMap(this.iconClassMap)}"
          style=${styleMap(this.iconStyleMap)}
          role="img"
          aria-label=${this.ariaLabel}
          title=${this.title}
          aria-hidden=${ifDefined(this.ariaHidden || undefined)}
          @click=${(event: MouseEvent) => this.handleIconClick(event)}
        >
        </i>
      `;
    }

    renderSVGIcon() {
      return html`
        <div
          class="svg-icon-container"
          id=${this.id}
          role="img"
          aria-label=${this.ariaLabel}
          title=${this.title}
          aria-hidden=${ifDefined(this.ariaHidden || undefined)}
          @click=${(event: MouseEvent) => this.handleIconClick(event)}
        >
          ${this.svgIcon ? this.svgIcon : nothing}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-icon": Icon.ELEMENT;
  }
}
